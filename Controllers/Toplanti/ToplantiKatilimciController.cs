//emfa.....11/28/2017 11:47:40 AM
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
using System.Collections.Specialized;
namespace Pict.Controllers.Toplanti
{
    public class ToplantiKatilimciController : WebApiBaseController
    {
        //GET: api/ToplantiKatilimci
        public HttpResponseMessage Get()
        {
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            int? KULLANICI_ID = nvc["KULLANICI_ID"] != null && nvc["KULLANICI_ID"].Trim() != "" ? Convert.ToInt32(nvc["KULLANICI_ID"].Trim()) : (int?)null;
            int? TOPLANTI_ID = nvc["TOPLANTI_ID"] != null && nvc["TOPLANTI_ID"].Trim() != "" ? Convert.ToInt32(nvc["TOPLANTI_ID"].Trim()) : (int?)null;
            int? MUSTERI_ID = nvc["MUSTERI_ID"] != null && nvc["MUSTERI_ID"].Trim() != "" ? Convert.ToInt32(nvc["MUSTERI_ID"].Trim()) : (int?)null;
            Int32 SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;
            Int32 SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null && nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 10;
            string TOPLANTI_ADI = nvc["TOPLANTI_ADI"] != null && nvc["TOPLANTI_ADI"].Trim() != "" ? nvc["TOPLANTI_ADI"].Trim() : "";
            DateTime? TOPLANTI_TARIHI = nvc["TOPLANTI_TARIHI"] != null && nvc["TOPLANTI_TARIHI"].Trim() != "" ? Convert.ToDateTime(nvc["TOPLANTI_TARIHI"].Trim()) : (DateTime?)null;
            bool LISTE = nvc["LISTE"] == "false" ? false : true;
            return JSONConvert(ToplantiKatilimciOlusturucu.getData(LISTE, TOPLANTI_ADI, TOPLANTI_TARIHI, KULLANICI_ID, TOPLANTI_ID, AktifKullaniciBilgisi.MUSTERI_ID, SayfaNo, SayfaBasinaKayitSayisi));
        }

        //GET: api/ToplantiKatilimci/TOPLANTI_KATILIMCI_ID
        public HttpResponseMessage Get(int id)
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.Toplanti;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(ToplantiKatilimciOlusturucu.select(id, AktifKullaniciBilgisi.MUSTERI_ID));
        }
        //POST: api/ToplantiKatilimci
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
                        if (formData.TOPLANTI_KATILIMCI_ID > 0)
                        {
                            KontrolSuid = EKontrolNoktasiSUID.Update;
                            kullaniciIslemTuru = EKullaniciIslemTuru.guncelle;
                            logAciklamaTipi = "Güncellendi";
                        }
                        else
                            KontrolSuid = EKontrolNoktasiSUID.Insert;
                        if (!YetkiVarMiKontrol())
                            return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                    }
                    else
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                    ToplantiKatilimciInfo info = new ToplantiKatilimciInfo();
                    if (formData.TOPLANTI_KATILIMCI_ID != null)
                    {
                        info.TOPLANTI_KATILIMCI_ID = (int)formData.TOPLANTI_KATILIMCI_ID;

                    }
                    info.TOPLANTI_KATILIMCI_ROLU_TIPI_ID = formData.TOPLANTI_KATILIMCI_ROLU_TIPI_ID;
                    info.KULLANICI_ID = formData.KULLANICI_ID > 0 ? formData.KULLANICI_ID : null;
                    info.TOPLANTI_ID = formData.TOPLANTI_ID;
                    info.TELEFON_NO = formData.TOPLANTI_KATILIMCI_TELEFON_NO;
                    info.E_POSTA = formData.TOPLANTI_KATILIMCI_E_POSTA;
                    info.AD_SOYAD = formData.KULLANICI_ID > 0 ? "" : formData.AD_SOYAD;
                    info.EKLEYEN_KULLANICI_ID = AktifKullaniciBilgisi.KULLANICI_ID;
                    info.MUSTERI_ID = AktifKullaniciBilgisi.MUSTERI_ID;
                    info.KAYIT_TARIHI = DateTime.Now;

                    sonuc = ToplantiKatilimciOlusturucu.ekleGuncelle(info);
                   
                }
                else
                    sonuc.mesaj = " Hata: Lütfen eksik bırakılan bilgileri giriniz.";
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }

        //DELETE: api/ToplantiKatilimci/TOPLANTI_KATILIMCI_ID
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
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                sonuc = ToplantiKatilimciOlusturucu.sil(id, AktifKullaniciBilgisi.MUSTERI_ID);
                
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

