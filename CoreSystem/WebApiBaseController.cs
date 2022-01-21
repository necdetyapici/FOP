using FOPDB.Entities;
using FOPDB.Enums;
using FOPDB.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FOP.CoreSystem
{
    public class WebApiBaseController : ApiController
    {
        string Headers = "";
        public AktifKullaniciBilgisi AktifKullaniciBilgisi = null;

        public string Uyari { get; set; }
        public EKontrolNoktasiAdi KontrolNoktasi { get; set; }
        public EKontrolNoktasiSUID KontrolSuid { get; set; }
        protected bool Auth()
        {
            try
            {

                if (Request.Headers.GetValues("AUTH_TOKEN").ToString() != null)
                {
                    IEnumerable<string> headerValues = Request.Headers.GetValues("AUTH_TOKEN");
                    Headers = headerValues.FirstOrDefault();
                }

                AktifKullaniciBilgisi = OturumKontrol.TokenKontrol(Headers);

                Uyari = string.Empty;
                if (AktifKullaniciBilgisi.TOKEN == null)
                {
                    Uyari = "Oturumunuz sonlanmıştır. Lütfen sisteme yeniden giriş yapınız.";
                    return false;
                }
                else
                    return true;

            }
            catch (Exception)
            {
                return false;
            }
        }

        protected bool Auth(EKontrolNoktasiAdi kontrolNoktasiAdi, EKontrolNoktasiSUID kontrolNoktasiSUID)
        {
            if (Auth())
            {
                KontrolNoktasi = kontrolNoktasiAdi;
                KontrolSuid = kontrolNoktasiSUID;
                return YetkiVarMiKontrol();
            }
            return false;
        }
        protected bool YetkiVarMiKontrol()
        {
            //default true.çünkü yetki kontrolü yapılmayan yerlerin çalışması gerekir
            bool result = true;
            if (KontrolNoktasi.ToString() != string.Empty)
                result = AktifKullaniciBilgisi.yetkisiVarMi(KontrolNoktasi.ToString(), KontrolSuid);
            Uyari = string.Empty;
            if (!result)
                Uyari = "Lütfen sistem yöneticisine haber veriniz. Hata: Yetkisiz erişim...";

            return result;
        }

        public static HttpResponseMessage JSONConvert(Object obje, bool DatabaseConvert = false)
        {
            return JSONIslemleri.JSONConvert(obje, DatabaseConvert);
        }
        protected  string getIpAdres()
        {
            String IP_ADRES = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(IP_ADRES))
                return HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            else
                return string.Empty;
        }
    }
}