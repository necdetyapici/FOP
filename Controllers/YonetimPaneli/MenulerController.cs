//emfa.....3/8/2018 11:53:38 AM
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
    public class MenulerController : WebApiBaseController
    {
        //GET: api/Menuler
        public HttpResponseMessage Get()
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.MenuIslemleri;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            string MENU_ADI = nvc["MENU_ADI"] != null && nvc["MENU_ADI"].Trim() != "" ? nvc["MENU_ADI"].Trim() : "";
            Int32 SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;
            Int32 SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null && nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 10;
            bool LISTE = nvc["LISTE"] == "false" ? false : true;
            return JSONConvert(MenulerOlusturucu.getData(LISTE, MENU_ADI, SayfaNo, SayfaBasinaKayitSayisi));
        }

        //GET: api/Menuler/MENU_ID
        public HttpResponseMessage Get(int id)
        {
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.MenuIslemleri;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(MenulerOlusturucu.select(id));
        }
        //POST: api/Menuler
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null){
                    EKullaniciIslemTuru kullaniciIslemTuru = EKullaniciIslemTuru.ekle;
                    string logAciklamaTipi = "Eklendi";
                    if (Auth()){
                        KontrolNoktasi = EKontrolNoktasiAdi.MenuIslemleri;
                        if (formData.YENI_MENU_ID > 0){
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
                    MenulerInfo info = new MenulerInfo();
                    if (formData.YENI_MENU_ID != null) {
                        info.YENI_MENU_ID = (int)formData.YENI_MENU_ID;
                    }
                    info.MENU_ID = (int)formData.MENU_ID;
                    info.MENU_ADI = formData.MENU_ADI;
                    info.DURUM = formData.DURUM;
                    info.URL = formData.URL;
                    info.UST_MENU_ID = formData.UST_MENU_ID == null ? 0 : formData.UST_MENU_ID;
                    info.KONTROL_NOKTASI_ADI = formData.KONTROL_NOKTASI_ADI;
                    info.MENU_SIRASI = formData.MENU_SIRASI;
                    info.ACIKLAMA = formData.ACIKLAMA;
                    info.IKON = formData.IKON;
                    sonuc = MenulerOlusturucu.ekleGuncelle(info);
                    if (sonuc.basariDurumu) {
                        var kayitNo = Convert.ToInt32(sonuc.returnKayitNo);
                    }
                }
                else
                    sonuc.mesaj = " Hata: Lütfen eksik bırakılan bilgileri giriniz.";

            }
            catch (Exception ex){
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticinize başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }

        //DELETE: api/Menuler/MENU_ID
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.MenuIslemleri;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if (!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                    
                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                sonuc = MenulerOlusturucu.sil(id);
                
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

