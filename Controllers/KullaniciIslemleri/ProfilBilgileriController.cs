using FOP.CoreSystem;
using FOPDB.Business;
using FOPDB.CoreSystem;
using FOPDB.Entities;
using FOPDB.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Pict.Controllers.KullaniciIslemleri
{
    public class ProfilBilgileriController : WebApiBaseController
    {

        public HttpResponseMessage Get()
        {
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            return JSONConvert(ProfilBilgileriOlusturucu.select(AktifKullaniciBilgisi.KULLANICI_ID));
        }


        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    EKullaniciIslemTuru kullaniciIslem = EKullaniciIslemTuru.guncelle;
                    string logAciklamaTipi = "güncelleme";
                    if (!Auth())
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                    KullanicilarInfo info = new KullanicilarInfo()
                    {
                        KULLANICI_ID = AktifKullaniciBilgisi.KULLANICI_ID,
                        MUSTERI_ID = AktifKullaniciBilgisi.MUSTERI_ID,
                        KULLANICI_SIFRE = AESCryptography.EncryptStr(formData.KULLANICI_SIFRE_ACIK.ToString()),
                        KULLANICI_TELEFON = formData.KULLANICI_TELEFON,
                        DOGUM_TARIHI = formData.DOGUM_TARIHI,
                        RESIM = formData.AvatarBase64
                    };

                    sonuc = ProfilBilgileriOlusturucu.ekleGuncelle(info);
                   

                    return JSONConvert(sonuc);
                }
                else
                {
                    sonuc.basariDurumu = false;
                    sonuc.mesaj = " Hata: Profil bilgileri bulunamadı.";
                    
                }
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj = ex.Message;
            }
            return JSONConvert(sonuc);
        }

    }

}