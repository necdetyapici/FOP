using FOP.CoreSystem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using FOPDB.Enums;
using FOPDB.Entities;
using FOPDB.Models;
using FOPDB.Business;

namespace Pict.Controllers.YonetimPaneli
{
    public class YetkiGrupKontrolNoktalariController : WebApiBaseController
    {
        // GET: api/YetkiGrupKontrolNoktalari
        public HttpResponseMessage Get(int id)
        {
            //EKontrolNoktasiAdi.YetkilendirmeIslemleri, EKontrolNoktasiSUID.Update
            if (Auth())
            {
                KontrolNoktasi = EKontrolNoktasiAdi.YetkiKontrolNoktasi;
                KontrolSuid = EKontrolNoktasiSUID.Select;
                if (!YetkiVarMiKontrol())
                    return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
            }
            else
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

            return JSONConvert(YetkiGrupKontrolNoktasiOlusturucu.getData(id));
        }

        // POST: api/YetkiGrupKontrolNoktalari
        public HttpResponseMessage Post(dynamic formData)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                if (formData != null)
                {
                    //EKontrolNoktasiAdi.YetkilendirmeIslemleri, EKontrolNoktasiSUID.Update


                    if (Auth())
                    {
                        KontrolNoktasi = EKontrolNoktasiAdi.YetkiKontrolNoktasi;
                        KontrolSuid = EKontrolNoktasiSUID.Update;
                        if (!YetkiVarMiKontrol())
                            return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);
                    }
                    else
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                    List<YetkiGrupKontrolNoktasiInfo> list =
                        JsonConvert.DeserializeObject<List<YetkiGrupKontrolNoktasiInfo>>(Convert.ToString(formData));

                    sonuc = YetkiGrupKontrolNoktasiOlusturucu.ekleGuncelle(list);
                    
                    
                }
                sonuc.mesaj = " Hata: Lütfen eksik bırakılan bilgileri giriniz.";
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticisine başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }

        // DELETE: api/YetkiGrupKontrolNoktalari/5
        public HttpResponseMessage Delete(int id)
        {
            IslemSonuc sonuc = new IslemSonuc() { basariDurumu = false };
            try
            {
                //EKontrolNoktasiAdi.YetkilendirmeIslemleri, EKontrolNoktasiSUID.Delete
                if (Auth())
                {
                    KontrolNoktasi = EKontrolNoktasiAdi.YetkiKontrolNoktasi;
                    KontrolSuid = EKontrolNoktasiSUID.Delete;
                    if (!YetkiVarMiKontrol())
                        return Request.CreateResponse(HttpStatusCode.NotFound, Uyari);

                }
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);

                return JSONConvert(YetkiGrupKontrolNoktasiOlusturucu.sil(id));
            }
            catch (Exception ex)
            {
                sonuc.basariDurumu = false;
                sonuc.mesaj = " Lütfen FOP yöneticisine başvurunuz.";
                sonuc.sistemMesaj = ex.Message.ToString();
            }
            return JSONConvert(sonuc);
        }
    }
}
