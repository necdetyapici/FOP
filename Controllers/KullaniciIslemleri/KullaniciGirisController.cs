using FOP.CoreSystem;
using FOPDB.Business;
using FOPDB.Entities;
using FOPDB.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TermAB.Controllers.KullaniciIslemleri
{
    public class KullaniciGirisController : ApiController
    {
        public HttpResponseMessage Get()
        {
            try
            {
                return JSONIslemleri.JSONConvert(KullaniciOlusturucu.getIP());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }

        // POST: api/KullaniciGiris
        public HttpResponseMessage Post(dynamic formData)
        {
            AktifKullaniciBilgisi kullanici = new AktifKullaniciBilgisi() { basariDurumu = false };
            try
            {
                //string KullaniciAdi = formData.kullaniciAdi != null && formData.kullaniciAdi != "" ? formData.kullaniciAdi : "";
                string KullaniciEposta = formData.KullaniciEposta != null && formData.KullaniciEposta != "" ? formData.KullaniciEposta : "";
                string KullaniciSifre = formData.sifre != null && formData.sifre != "" ? formData.sifre : "";
                if (string.IsNullOrEmpty(KullaniciEposta) && string.IsNullOrEmpty(KullaniciSifre))
                    kullanici.mesaj = " Hata: Kullanıcı ve şifre boş geçilemez";
                else
                    kullanici = KullaniciOlusturucu.kullaniciKontrol(KullaniciEposta, KullaniciSifre);

                if (kullanici.basariDurumu)
                {
                    bool SistemeEklendi = TokenOlusturucu.KullaniciEkle(kullanici);
                    if (SistemeEklendi == false)
                        throw new Exception(" Hata: Kullanıcı sisteme eklenemedi");
                    
                }

            }
            catch (Exception ex)
            {
                kullanici.basariDurumu = false;
                kullanici.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                kullanici.sistemMesaj = ex.Message.ToString();
            }
            return JSONIslemleri.JSONConvert(kullanici);
        }

        [Route("api/TalepProje/KullaniciCikis")]
        public HttpResponseMessage KullaniciCikis()
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (Request.Headers.GetValues("AUTH_TOKEN").ToString() != null)
                {
                    IEnumerable<string> headerValues = Request.Headers.GetValues("AUTH_TOKEN");
                    string Headers = headerValues.FirstOrDefault();
                    sonuc = TokenOlusturucu.sil(Headers);
                }
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