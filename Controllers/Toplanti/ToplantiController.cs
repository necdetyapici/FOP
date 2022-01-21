//emfa.....11/24/2017 9:12:17 AM
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
using FOP.CoreSystem;
using FOPDB.Entities;
using FOPDB.Enums;
using FOPDB.Business;
using Newtonsoft.Json;

using System.Collections.Specialized;
using System.Web.Http;

namespace Pict.Controllers.Toplanti
{
    public class ToplantiController : WebApiBaseController
    {
        //GET: api/Toplanti
        public HttpResponseMessage Get()
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.Toplanti;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            string TOPLANTI_ADI = nvc["TOPLANTI_ADI"] != null && nvc["TOPLANTI_ADI"].Trim() != "" ? nvc["TOPLANTI_ADI"].Trim() : "";
            int? MUSTERI_ID = nvc["MUSTERI_ID"] != null && nvc["MUSTERI_ID"].Trim() != "" ? Convert.ToInt32(nvc["MUSTERI_ID"].Trim()) : (int?)null;
            Int32 SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;
            Int32 SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null && nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 10;
            bool LISTE = nvc["LISTE"] == "false" ? false : true;
            DateTime? TOPLANTI_TARIHI = nvc["TOPLANTI_TARIHI"] != null && nvc["TOPLANTI_TARIHI"].Trim() != "" ? Convert.ToDateTime(nvc["TOPLANTI_TARIHI"].Trim()) : (DateTime?)null;
            return JSONConvert(ToplantiOlusturucu.getData(LISTE, TOPLANTI_ADI, TOPLANTI_TARIHI, AktifKullaniciBilgisi.MUSTERI_ID, SayfaNo, SayfaBasinaKayitSayisi));
        }

        //GET: api/Toplanti/TOPLANTI_ID
        public HttpResponseMessage Get(int id)
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.Toplanti;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(ToplantiOlusturucu.select(id, AktifKullaniciBilgisi.MUSTERI_ID));
        }
        //POST: api/Toplanti
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    EKullaniciIslemTuru kullaniciIslemTuru = EKullaniciIslemTuru.ekle;
                    string logAciklamaTipi = "Eklendi";
                    if (Auth())
                    {
                        KontrolNoktasi = EKontrolNoktasiAdi.Toplanti;
                        if (formData.InfoToplanti.TOPLANTI_ID > 0)
                        {
                            KontrolSuid = EKontrolNoktasiSUID.Update;
                            kullaniciIslemTuru = EKullaniciIslemTuru.guncelle;
                            logAciklamaTipi = "Güncellendi";
                        }
                        else
                            KontrolSuid = EKontrolNoktasiSUID.Insert;

                        if (!YetkiVarMiKontrol())
                        {
                            return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                        }
                    }
                    else
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                    ToplantiInfo infoToplanti = new ToplantiInfo();
                    if (formData.InfoToplanti.TOPLANTI_ID != null)
                    {
                        infoToplanti.TOPLANTI_ID = (int)formData.InfoToplanti.TOPLANTI_ID;
                    }

                    infoToplanti.TOPLANTI_ADI = formData.InfoToplanti.TOPLANTI_ADI;
                    infoToplanti.TOPLANTI_ACIKLAMA = formData.InfoToplanti.TOPLANTI_ACIKLAMA;
                    infoToplanti.BITIS_SAATI = formData.InfoToplanti.BITIS_SAATI;
                    infoToplanti.TOPLANTI_TARIHI = formData.InfoToplanti.TOPLANTI_TARIHI;
                    infoToplanti.TOPLANTI_BASLANGIC_SAATI = formData.InfoToplanti.TOPLANTI_BASLANGIC_SAATI;
                    infoToplanti.MUSTERI_ID = AktifKullaniciBilgisi.MUSTERI_ID;
                    infoToplanti.KAYIT_TARIHI = DateTime.Now;
                    infoToplanti.KULLANICI_ID = AktifKullaniciBilgisi.KULLANICI_ID;

                    List<ToplantiKatilimciInfo> toplantiKatilimciInfo = new List<ToplantiKatilimciInfo>();
                    if (formData.ToplantiListeKatilimci.Count > 0)
                    {
                        foreach (var item in formData.ToplantiListeKatilimci)
                        {
                            ToplantiKatilimciInfo infoToplantiKatilimci = new ToplantiKatilimciInfo();
                            infoToplantiKatilimci.KULLANICI_ID = item.KULLANICI_ID;
                            infoToplantiKatilimci.AD_SOYAD = item.KULLANICI_ID > 0 ? "" : item.AD_SOYAD;
                            infoToplantiKatilimci.TELEFON_NO = item.TOPLANTI_KATILIMCI_TELEFON_NO;
                            infoToplantiKatilimci.E_POSTA = item.TOPLANTI_KATILIMCI_E_POSTA;
                            infoToplantiKatilimci.EKLEYEN_KULLANICI_ID = AktifKullaniciBilgisi.KULLANICI_ID;
                            infoToplantiKatilimci.MUSTERI_ID = AktifKullaniciBilgisi.MUSTERI_ID;
                            infoToplantiKatilimci.KAYIT_TARIHI = DateTime.Now;
                            infoToplantiKatilimci.TOPLANTI_KATILIMCI_ROLU_TIPI_ID = item.TOPLANTI_KATILIMCI_ROLU_TIPI_ID;
                            toplantiKatilimciInfo.Add(infoToplantiKatilimci);
                        }
                    }
                    sonuc = ToplantiOlusturucu.ekleGuncelle(infoToplanti, toplantiKatilimciInfo);
                   
                }
                else
                    sonuc.mesaj = " Hata: Lütfen eksik bırakılan bilgileri giriniz";
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }

        //DELETE: api/Toplanti/TOPLANTI_ID
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.Toplanti;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if (!YetkiVarMiKontrol())
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                    }
                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                sonuc = ToplantiOlusturucu.sil(id, AktifKullaniciBilgisi.MUSTERI_ID);
               
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }
    }
}

