using FOP.CoreSystem;
using FOPDB.Entities;
using FOPDB.Business;
using FOPDB.Enums;
using FOPDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FOP.Controllers.KullaniciIslemleri
{
    public class KullaniciAktiflestirController : WebApiBaseController
    {


        // POST: api/KullaniciAktiflestir
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    if (Auth())
                    {
                        KontrolNoktasi = EKontrolNoktasiAdi.KullaniciAktifPasif;
                        KontrolSuid = EKontrolNoktasiSUID.Update;
                        if (!YetkiVarMiKontrol())
                        {
                            return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                        }
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                    }
                        

                    int kullaniciID = 0;
                    if (formData.KULLANICI_ID > 0)
                    {
                        kullaniciID = Convert.ToInt32(formData.KULLANICI_ID);
                        sonuc = KullaniciOlusturucu.kullaniciDurumDegistir(kullaniciID, EKullaniciDurumu.Aktif);
                        EKullaniciIslemTuru kullaniciIslemTuru = EKullaniciIslemTuru.guncelle;
                        string logAciklamaTipi = "Güncellendi";
                       
                    }
                    else
                        sonuc.mesaj = " Hata: Kullanıcı kaydı bulunamadı";
                }
                else
                {
                    sonuc.mesaj = " Hata: Aktifleştirme işlemi için kullanıcı bilgileri bulunamadı";
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
