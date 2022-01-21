using FOP.CoreSystem;
using FOPDB.Entities;
using FOPDB.Enums;
using FOPDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FOPDB.Business;

namespace FOP.Controllers.KullaniciIslemleri
{
    public class KullaniciPasiflestirController : WebApiBaseController
    {
        // POST: api/KullaniciPasiflestir
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
                            return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                    }
                        
                    int kullaniciID = 0;
                    if (formData.KULLANICI_ID > 0)
                    {
                        kullaniciID = Convert.ToInt32(formData.KULLANICI_ID);
                        sonuc = KullaniciOlusturucu.kullaniciDurumDegistir(kullaniciID, EKullaniciDurumu.Pasif);
                        EKullaniciIslemTuru kullaniciIslemTuru = EKullaniciIslemTuru.guncelle;
                        string logAciklamaTipi = "Güncellendi";
                       
                    }
                    else
                        sonuc.mesaj = " Hata: Kullanıcı kaydı bulunamadı";
                }
                else
                {
                    //return Request.CreateResponse(HttpStatusCode.NotFound, "Pasifleştirme için gelmesi gereken veri bulunamadı");
                    sonuc.mesaj = " Hata: Kullanıcı kaydı bulunamadı";
                }
                
            }
            catch (Exception ex)
            {
                //string Hata = "Pasifleştirme işlemi sırasında bir hata oluştu. Hata :" + ex.Message.ToString();
                //return Request.CreateResponse(HttpStatusCode.NotFound, Hata);
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }
    }
}
