//emfa.....5/4/2017 11:12:24 AM
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
namespace Pict.Controllers.YonetimPaneli
{
    public class MusteriController : WebApiBaseController
    {
        //GET: api/Musteri
        public HttpResponseMessage Get()
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.MusteriTanimlari;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            string MUSTERI_ADI = nvc["MUSTERI_ADI"] != null && nvc["MUSTERI_ADI"].Trim() != "" ? nvc["MUSTERI_ADI"].Trim() : "";
            string MUSTERI_E_POSTA = nvc["MUSTERI_E_POSTA"] != null && nvc["MUSTERI_E_POSTA"].Trim() != "" ? nvc["MUSTERI_E_POSTA"].Trim() : "";
            int? MUSTERI_IL_ID = nvc["MUSTERI_IL_ID"] != null && nvc["MUSTERI_IL_ID"].Trim() != "" ? Convert.ToInt32(nvc["MUSTERI_IL_ID"].Trim()) : (int?)null;
            int? MUSTERI_ILCE_ID = nvc["MUSTERI_ILCE_ID"] != null && nvc["MUSTERI_ILCE_ID"].Trim() != "" ? Convert.ToInt32(nvc["MUSTERI_ILCE_ID"].Trim()) : (int?)null;
            Int32 SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;
            Int32 SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null && nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 10;
            bool LISTE = nvc["LISTE"] == "false" ? false : true;
            return JSONConvert(MusteriOlusturucu.getData(LISTE, MUSTERI_ADI, MUSTERI_E_POSTA, MUSTERI_IL_ID, MUSTERI_ILCE_ID, SayfaNo, SayfaBasinaKayitSayisi));
        }

        //GET: api/Musteri/MUSTERI_ID
        public HttpResponseMessage Get(int id)
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.MusteriTanimlari;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if(!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(MusteriOlusturucu.select(id));
        }
        //POST: api/Musteri
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
                        KontrolNoktasi = EKontrolNoktasiAdi.MusteriTanimlari;
                        if (formData.MUSTERI_ID > 0)
                        {
                            KontrolSuid = EKontrolNoktasiSUID.Update;
                            kullaniciIslemTuru = EKullaniciIslemTuru.guncelle;
                            logAciklamaTipi = "Güncellendi";
                        }
                        else
                            KontrolSuid = EKontrolNoktasiSUID.Insert;
                        if(!YetkiVarMiKontrol())
                            return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                    }
                    else
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                    MusteriInfo info = new MusteriInfo();
                    if (formData.MUSTERI_ID != null)
                    {
                        info.MUSTERI_ID = (int)formData.MUSTERI_ID;
                        
                    }
                    info.MUSTERI_ADI = formData.MUSTERI_ADI;
                    info.MUSTERI_ADRESI = formData.MUSTERI_ADRESI;
                    info.MUSTERI_TELEFON = formData.MUSTERI_TELEFON;
                    info.MUSTERI_FAKS = formData.MUSTERI_FAKS;
                    info.MUSTERI_E_POSTA = formData.MUSTERI_E_POSTA;
                    info.MUSTERI_IL_ID = formData.MUSTERI_IL_ID;
                    info.MUSTERI_ILCE_ID = formData.MUSTERI_ILCE_ID;
                    info.SOZLESME_BASLAMA_TARIHI = formData.SOZLESME_BASLAMA_TARIHI;
                    info.SOZLESME_BITIS_TARIHI = formData.SOZLESME_BITIS_TARIHI;
                    info.KULLANICI_ID = AktifKullaniciBilgisi.KULLANICI_ID;
                    info.LDAP_KULLANIMI = formData.LDAP_KULLANIMI;
                    info.LDAP_ADRESI = formData.LDAP_ADRESI;
                    info.LDAP_KULLANICI_E_POSTA = formData.LDAP_KULLANICI_E_POSTA;
                    info.LDAP_KULLANICI_SIFRE = formData.LDAP_KULLANICI_SIFRE;
                    info.KAYIT_TARIHI = DateTime.Now;
                    sonuc = MusteriOlusturucu.ekleGuncelle(info);

                    if (sonuc.basariDurumu)
                    {
                        var kayitNo = Convert.ToInt32(sonuc.returnKayitNo);

                    }
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

        //DELETE: api/Musteri/MUSTERI_ID
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.MusteriTanimlari;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if(!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                sonuc = MusteriOlusturucu.sil(id);
              
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

