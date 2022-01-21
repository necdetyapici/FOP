using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FOP.CoreSystem;
using FOPDB.Business;
using FOPDB.CoreSystem;
using FOPDB.Entities;
using FOPDB.Enums;

namespace FOP.Controllers.KullaniciIslemleri
{
    public class SifremiUnuttumController : WebApiBaseController
    {
        // POST: api/SifremiUnuttum
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {

                if (formData != null)
                {
                        KullanicilarInfo info = new KullanicilarInfo();
                        info.KULLANICI_ADI = formData.kullaniciAdi != null && formData.kullaniciAdi != "" ? formData.kullaniciAdi : "";
                        info.KULLANICI_E_POSTA = formData.eposta != null && formData.eposta != "" ? formData.eposta : "";

                        if (string.IsNullOrEmpty(info.KULLANICI_ADI) && string.IsNullOrEmpty(info.KULLANICI_E_POSTA))
                            info.mesaj = " Hata: Kullanıcı adı ve eposta boş geçilemez";
                        sonuc = KullaniciOlusturucu.sifreUnuttum(info);
                }
                else
                {
                    sonuc.mesaj = " Hata: Şifre güncellenecek kayıt bulunamadı.";
                }
                
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
