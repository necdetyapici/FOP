using FOP.CoreSystem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.IO;
using FOPDB.Entities;
using FOPDB.CoreSystem;
using FOPDB.Enums;
using FOPDB.Models;
using FOPDB.Business;
using FOPDB.Helper.Enum;
using System.Collections.Specialized;

namespace FOP.Controllers.KullaniciIslemleri
{
    public class KullaniciController : WebApiBaseController
    {
        // GET: api/Kullanici

        public HttpResponseMessage Get()
        {
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            System.Collections.Specialized.NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            string AD_SOYAD = nvc["AD_SOYAD"] != null && nvc["AD_SOYAD"].Trim() != "" ? nvc["AD_SOYAD"].Trim() : "";
            string KULLANICI_ADI = nvc["KULLANICI_ADI"] != null && nvc["KULLANICI_ADI"].Trim() != "" ? nvc["KULLANICI_ADI"].Trim() : "";
            string CINSIYET = nvc["CINSIYET"] != null && nvc["CINSIYET"].Trim() != "" ? nvc["CINSIYET"].Trim() : "";
            int? KULLANICI_TIPI_ID = nvc["KULLANICI_TIPI_ID"] != null && nvc["KULLANICI_TIPI_ID"].Trim() != "" ? Convert.ToInt32(nvc["KULLANICI_TIPI_ID"].Trim()) : (int?)null;
            int? KULLANICI_DURUM_ID = nvc["KULLANICI_DURUM_ID"] != null && nvc["KULLANICI_DURUM_ID"].Trim() != "" ? Convert.ToInt32(nvc["KULLANICI_DURUM_ID"].Trim()) : (int?)null;
            int AKTIF_KULLANICI_TIPI_ID = AktifKullaniciBilgisi.KULLANICI_TIPI_ID;
            bool FILTER = nvc["FILTER"] == "false" ? false : true;
            bool LISTE = nvc["LISTE"] == "false" ? false : true;
            bool PERSONEL = nvc["PERSONEL"] == "true" ? true : false;
            int SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;

            int SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null &&
                nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 10;
            return JSONConvert(KullaniciOlusturucu.getData(LISTE, FILTER, PERSONEL, AKTIF_KULLANICI_TIPI_ID, AktifKullaniciBilgisi.KULLANICI_ID, AD_SOYAD, KULLANICI_ADI, CINSIYET,
                        KULLANICI_TIPI_ID, KULLANICI_DURUM_ID, AktifKullaniciBilgisi.MUSTERI_ID, SayfaNo, SayfaBasinaKayitSayisi));
        }

        // GET: api/Kullanici/5
        public HttpResponseMessage Get(int id)
        {
            IslemSonuc sonuc = new IslemSonuc();

            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.KullaniciIslemleri;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            }
            int kullaniciID;
            if (AktifKullaniciBilgisi.IS_PICT_YONETICI || AktifKullaniciBilgisi.IS_MUSTERI_YONETICI)
                kullaniciID = id;

            else
            {
                kullaniciID = AktifKullaniciBilgisi.KULLANICI_ID;
            }

            return JSONConvert(KullaniciOlusturucu.select(kullaniciID, AktifKullaniciBilgisi.KULLANICI_TIPI_ID));
        }

        
        // POST: api/Kullanici

        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    EKullaniciIslemTuru kullaniciIslem = EKullaniciIslemTuru.ekle;
                    string kullaniciIslemAciklama = "Eklendi";

                    if (Auth())
                    {
                        if (AktifKullaniciBilgisi.IS_PICT_YONETICI || AktifKullaniciBilgisi.IS_MUSTERI_YONETICI)
                        {
                            KontrolNoktasi = EKontrolNoktasiAdi.KullaniciIslemleri;
                            
                            if (formData.KULLANICI_ID != null)
                            {
                                KontrolSuid = EKontrolNoktasiSUID.Update;
                                kullaniciIslem = EKullaniciIslemTuru.guncelle;
                                kullaniciIslemAciklama = "Güncellendi";
                            }
                            else
                                KontrolSuid = EKontrolNoktasiSUID.Insert;

                            if (!YetkiVarMiKontrol())
                                return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                        }
                        else
                        {
                           sonuc.mesaj = " Hata: Müşteri kullanıcıları kullanıcı ekleme işlemi yapamaz.";
                            return JSONConvert(sonuc);
                        }
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                    }
                    
                    KullanicilarInfo info = new KullanicilarInfo();
                    if (formData.KULLANICI_ID != null && formData.KULLANICI_ID != 0)
                    {
                        info.KULLANICI_ID = (Int32)formData.KULLANICI_ID;
                        info.KULLANICI_DURUM_ID = formData.KULLANICI_DURUM_ID;
                    }
                    else
                    {
                        info.KULLANICI_DURUM_ID = (int)EKullaniciDurumu.Aktif;
                    }
                    
                    info.AD_SOYAD = formData.AD_SOYAD;
                    info.KULLANICI_E_POSTA = formData.KULLANICI_E_POSTA;

                    info.KULLANICI_SIFRE = formData.KULLANICI_SIFRE_ACIK; 
                    info.KULLANICI_TIPI_ID = formData.KULLANICI_TIPI_ID;
                    info.KULLANICI_ADI = formData.KULLANICI_ADI;
                    info.MUSTERI_ID = (formData.MUSTERI_ID == null || formData.MUSTERI_ID == 0) && AktifKullaniciBilgisi.IS_PICT_YONETICI == false ? AktifKullaniciBilgisi.MUSTERI_ID : formData.MUSTERI_ID; 
                    info.PERSONEL_TIPI_ID = formData.PERSONEL_TIPI_ID;
                    info.KULLANICI_TELEFON = formData.KULLANICI_TELEFON;
                    info.CINSIYET = formData.CINSIYET;
                    info.DOGUM_TARIHI = formData.DOGUM_TARIHI;
                    info.ISE_BASLAMA_TARIHI = formData.ISE_BASLAMA_TARIHI;
                    info.ISTEN_AYRILMA_TARIHI = formData.ISTEN_AYRILMA_TARIHI;
                    info.RESIM = formData.AvatarBase64; 
                    sonuc = KullaniciOlusturucu.ekleGuncelle(info);
                }
                else
                {
                    sonuc.basariDurumu = false;
                    sonuc.mesaj = " Hata: Lütfen eksik bırakılan bilgileri giriniz.";
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

        // DELETE: api/Kullanici/5

        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.KullaniciIslemleri;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if (!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                }

                if (AktifKullaniciBilgisi.IS_PICT_YONETICI)
                {
                    sonuc = KullaniciOlusturucu.sil(id);
                    
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