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

namespace FOP.Controllers.KullaniciIslemleri
{
    public class KullaniciYetkiGruplariController : WebApiBaseController
    {
        // GET: api/KullaniciYetkiGruplari/5
        public HttpResponseMessage Get()
        {
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            int KULLANICI_ID = nvc["KULLANICI_ID"] != null && nvc["KULLANICI_ID"].Trim() != "" ? Convert.ToInt32(nvc["KULLANICI_ID"].Trim()) : 0;
            return JSONIslemleri.JSONConvert(KullaniciYetkiGrupOlusturucu.getData(AktifKullaniciBilgisi.MUSTERI_ID, KULLANICI_ID));
        }

        // POST: api/KullaniciYetkiGruplari
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    if (Auth())
                    {
                        KontrolNoktasi = EKontrolNoktasiAdi.KullaniciIslemleri;
                        KontrolSuid = EKontrolNoktasiSUID.Insert;
                        if (!YetkiVarMiKontrol())
                            return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                    }
                    else
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                    KullaniciYetkiGrupInfo info = new KullaniciYetkiGrupInfo()
                    {
                        KULLANICI_ID = formData.KULLANICI_ID,
                        YETKI_GRUP_ID = formData.YETKI_GRUP_ID
                    };
                    sonuc = KullaniciYetkiGrupOlusturucu.ekleGuncelle(info);
                    
                    
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

        // DELETE: api/KullaniciYetkiGruplari/5
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {//EKontrolNoktasiAdi.KullaniciIslemleri, EKontrolNoktasiSUID.Delete
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.KullaniciIslemleri;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if (!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                sonuc = KullaniciYetkiGrupOlusturucu.sil(id, AktifKullaniciBilgisi.MUSTERI_ID);

                
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }

            return JSONIslemleri.JSONConvert(sonuc);
        }
    }
}
