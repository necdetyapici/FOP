//emfa.....9/16/2019 12:27:05 PM
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
namespace Pict.Controllers
{
    public class ToplantiKatilimciRoluTipiController : WebApiBaseController
    {
        //GET: api/ToplantiKatilimciRoluTipi
        public HttpResponseMessage Get()
        {
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            NameValueCollection nvc = HttpUtility.ParseQueryString(Request.RequestUri.Query);
            string TOPLANTI_KATILIMCI_ROLU_TIPI_ADI = nvc["TOPLANTI_KATILIMCI_ROLU_TIPI_ADI"] != null ? nvc["TOPLANTI_KATILIMCI_ROLU_TIPI_ADI"].ToString() : string.Empty;
            int? MUSTERI_ID = nvc["MUSTERI_ID"] != null && nvc["MUSTERI_ID"].Trim() != "" ? Convert.ToInt32(nvc["MUSTERI_ID"].Trim()) : (int?)null;
            int? TOPLANTI_KATILIMCI_ROLU_TIPI_ID = nvc["TOPLANTI_KATILIMCI_ROLU_TIPI_ID"] != null && nvc["TOPLANTI_KATILIMCI_ROLU_TIPI_ID"].Trim() != "" ? Convert.ToInt32(nvc["TOPLANTI_KATILIMCI_ROLU_TIPI_ID"].Trim()) : (int?)null;
            DateTime? KAYIT_TARIHI = nvc["KAYIT_TARIHI"] != null && nvc["KAYIT_TARIHI"].Trim() != "" ? Convert.ToDateTime(nvc["KAYIT_TARIHI"].Trim()) : (DateTime?)null;
            Int32 SayfaNo = nvc["SayfaNo"] != null && nvc["SayfaNo"].Trim() != "" ? Convert.ToInt32(nvc["SayfaNo"].Trim()) : 1;
            Int32 SayfaBasinaKayitSayisi = nvc["SayfaBasinaKayitSayisi"] != null && nvc["SayfaBasinaKayitSayisi"].Trim() != "" ? Convert.ToInt32(nvc["SayfaBasinaKayitSayisi"].Trim()) : 15;
            bool LISTE = nvc["LISTE"] == "true" ? true : false;

            return JSONConvert(ToplantiKatilimciRoluTipiOlusturucu.getData(LISTE, TOPLANTI_KATILIMCI_ROLU_TIPI_ID, TOPLANTI_KATILIMCI_ROLU_TIPI_ADI, AktifKullaniciBilgisi.MUSTERI_ID, SayfaNo, SayfaBasinaKayitSayisi));
        }

        //GET: api/ToplantiKatilimciRoluTipi/TOPLANTI_KATILIMCI_ROLU_TIPI_ID
        public HttpResponseMessage Get(int id)
        {
            if (Auth())
            {
                KontrolSuid = EKontrolNoktasiSUID.Select;
                KontrolNoktasi = EKontrolNoktasiAdi.MusteriTanimlari;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(ToplantiKatilimciRoluTipiOlusturucu.select(id, AktifKullaniciBilgisi.MUSTERI_ID));
        }
        //POST: api/ToplantiKatilimciRoluTipi
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    EKullaniciIslemTuru kullaniciIslemTuru = EKullaniciIslemTuru.ekle;
                    string logAciklamaTipi = "Eklendi";
                    if (Auth())
                    {
                        KontrolNoktasi = EKontrolNoktasiAdi.MusteriTanimlari;
                        if (formData.TOPLANTI_KATILIMCI_ROLU_TIPI_ID > 0)
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
                    ToplantiKatilimciRoluTipiInfo info = new ToplantiKatilimciRoluTipiInfo();
                    if (formData.TOPLANTI_KATILIMCI_ROLU_TIPI_ID != null)
                        info.TOPLANTI_KATILIMCI_ROLU_TIPI_ID = (int)formData.TOPLANTI_KATILIMCI_ROLU_TIPI_ID;
                    info.TOPLANTI_KATILIMCI_ROLU_TIPI_ADI = formData.TOPLANTI_KATILIMCI_ROLU_TIPI_ADI;
                    info.MUSTERI_ID = AktifKullaniciBilgisi.MUSTERI_ID;
                    info.KULLANICI_ID = AktifKullaniciBilgisi.KULLANICI_ID;
                    info.KAYIT_TARIHI = DateTime.Now;
                    sonuc = ToplantiKatilimciRoluTipiOlusturucu.ekleGuncelle(info);
                    
                }
                else
                    sonuc.mesaj = "Kaydetmek için gelmesi gereken veri bulunumadı";
            }
            catch (Exception ex)
            {
                sonuc.mesaj = "Kaydetme işlemi sırasında bir hata oluştu. Hata :" + ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }

        //DELETE: api/ToplantiKatilimciRoluTipi/TOPLANTI_KATILIMCI_ROLU_TIPI_ID
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (Auth())
                {
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    KontrolNoktasi = EKontrolNoktasiAdi.MusteriTanimlari;
                    if (!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
                sonuc = ToplantiKatilimciRoluTipiOlusturucu.sil(id, AktifKullaniciBilgisi.MUSTERI_ID);
               
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

