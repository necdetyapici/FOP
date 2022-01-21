using FOP.CoreSystem;
using FOPDB.Entities;
using FOPDB.Enums;
using FOPDB.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using FOPDB.Business;

namespace Pict.Controllers.YonetimPaneli
{
    public class YetkiGruplariController : WebApiBaseController
    {
        //GET: api/YetkiGruplari
        public HttpResponseMessage Get()
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.YetkilendirmeIslemleri;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            string YETKI_GRUP_ADI = nvc["YETKI_GRUP_ADI"] != null && nvc["YETKI_GRUP_ADI"].Trim() != "" ? nvc["YETKI_GRUP_ADI"].Trim() : "";
            Int32 SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;
            Int32 SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null && nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 10;
            bool LISTE = nvc["LISTE"] == "false" ? false : true;
            return JSONConvert(YetkiGrupOlusturucu.getData(LISTE, YETKI_GRUP_ADI, AktifKullaniciBilgisi.MUSTERI_ID, SayfaNo, SayfaBasinaKayitSayisi));
        }

        //GET: api/YetkiGruplari/YETKI_GRUP_ID
        public HttpResponseMessage Get(int id)
        {
            //EKontrolNoktasiAdi.YetkilendirmeIslemleri, EKontrolNoktasiSUID.Select
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.YetkilendirmeIslemleri;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }   
            else 
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(YetkiGrupOlusturucu.select(id));
        }

        //POST: api/YetkiGruplari
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    EKullaniciIslemTuru kullaniciIslemTuru = EKullaniciIslemTuru.ekle;
                    string logAciklamaTipi = "Eklendi";
                    if (Auth()){
                        KontrolNoktasi = EKontrolNoktasiAdi.YetkilendirmeIslemleri;
                        if (formData.YETKI_GRUP_ID > 0)
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
                    YetkiGrupInfo info = new YetkiGrupInfo();
                    if (formData.YETKI_GRUP_ID > 0){
                        info.YETKI_GRUP_ID = (int)formData.YETKI_GRUP_ID;
                       
                    }
                    info.YETKI_GRUP_ADI = formData.YETKI_GRUP_ADI;
                    info.YETKI_GRUP_ACIKLAMA = formData.YETKI_GRUP_ACIKLAMA;
                    info.KAYIT_TARIHI = DateTime.Now;
                    info.KULLANICI_ID = AktifKullaniciBilgisi.KULLANICI_ID;
                    sonuc = YetkiGrupOlusturucu.ekleGuncelle(info);
                }
                else
                    sonuc.mesaj = " Hata: Lütfen eksik bırakılan bilgileri giriniz.";
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;

                sonuc.mesaj = " Lütfen FOP yöneticisine başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }

        //DELETE: api/YetkiGruplari/YETKI_GRUP_ID
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                //EKontrolNoktasiAdi.YetkilendirmeIslemleri, EKontrolNoktasiSUID.Delete
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.YetkilendirmeIslemleri;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if (!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);

                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                sonuc = YetkiGrupOlusturucu.sil(id);
               
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticisine başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }
    }
}
