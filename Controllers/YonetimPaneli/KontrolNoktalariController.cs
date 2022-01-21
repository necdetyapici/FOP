//emfa.....3/13/2018 3:59:39 PM
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
    public class KontrolNoktalariController : WebApiBaseController
    {
        //GET: api/KontrolNoktalari
        public HttpResponseMessage Get()
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.KontrolNoktalariIslemleri;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            string KONTROL_NOKTASI_ADI = nvc["KONTROL_NOKTASI_ADI"] != null && nvc["KONTROL_NOKTASI_ADI"].Trim() != "" ? nvc["KONTROL_NOKTASI_ADI"].Trim() : "";
            string KONTROL_NOKTASI_ACIKLAMA = nvc["KONTROL_NOKTASI_ACIKLAMA"] != null && nvc["KONTROL_NOKTASI_ACIKLAMA"].Trim() != "" ? nvc["KONTROL_NOKTASI_ACIKLAMA"].Trim() : "";
            Int32 SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;
            Int32 SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null && nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 15;

            return JSONConvert(KontrolNoktalariOlusturucu.getData(KONTROL_NOKTASI_ACIKLAMA, KONTROL_NOKTASI_ADI, SayfaNo, SayfaBasinaKayitSayisi));
        }

        //GET: api/KontrolNoktalari/KONTROL_NOKTASI_ID
        public HttpResponseMessage Get(int id)
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.KontrolNoktalariIslemleri;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(KontrolNoktalariOlusturucu.select(id));
        }
        //POST: api/KontrolNoktalari
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
                        KontrolNoktasi = EKontrolNoktasiAdi.KontrolNoktalariIslemleri;
                        if (formData.KONTROL_NOKTASI_ID > 0)
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

                    KontrolNoktalariInfo info = new KontrolNoktalariInfo();
                    if (formData.KONTROL_NOKTASI_ID != null)
                    {
                        info.KONTROL_NOKTASI_ID = (int)formData.KONTROL_NOKTASI_ID;
                        
                    }
                    info.KONTROL_NOKTASI_ADI = formData.KONTROL_NOKTASI_ADI;
                    info.KONTROL_NOKTASI_ACIKLAMA = formData.KONTROL_NOKTASI_ACIKLAMA;
                    sonuc = KontrolNoktalariOlusturucu.ekleGuncelle(info);
                    
                }
                else
                    sonuc.mesaj = " Hata: Lütfen eksik bırakılan bilgileri giriniz.";
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj= ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }

        //DELETE: api/KontrolNoktalari/KONTROL_NOKTASI_ID
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.KontrolNoktalariIslemleri;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if (!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                sonuc = KontrolNoktalariOlusturucu.sil(id);

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

