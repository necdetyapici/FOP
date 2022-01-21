using FOP.CoreSystem;
using FOPDB.Entities;
using FOPDB.Enums;
using FOPDB.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Pict.Controllers.Sistem
{
    public class SolMenuIslemleriController : WebApiBaseController
    {
        // GET: api/SolMenuIslemleri
        public HttpResponseMessage Get()
        {
            try
            {
                if (Auth() == false)
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, "Yetkisiz giriş...");

                var MenuListesi = MenuOlusturucu.getData();
                List<MenulerInfo> menuListJSON = new List<MenulerInfo>();

                foreach (var itemRoot in MenuListesi.Where(m => m.UST_MENU_ID == 0).OrderBy(m => m.MENU_SIRASI))
                {
                    //üst menü yetkisi varmı.
                    if (AktifKullaniciBilgisi.yetkisiVarMi(itemRoot.KONTROL_NOKTASI_ADI, EKontrolNoktasiSUID.Select))
                    {
                        //alt menüleri çekiliyor
                        var AltMenuListesi = MenuListesi.Where(m => m.UST_MENU_ID == itemRoot.MENU_ID).OrderBy(m => m.MENU_SIRASI);

                        //üst menünün alt menüsü varsa kontrol yap ekle
                        if (AltMenuListesi.Count() > 0)
                        {
                            //alt menü oluşturuluyor ve yetki kontrolü yapılıyor.
                            List<MenulerInfo> altMenuList = new List<MenulerInfo>();
                            foreach (var itemAltMenuler in AltMenuListesi)
                            {
                                //yetkisi varmı.
                                if (AktifKullaniciBilgisi.yetkisiVarMi(itemAltMenuler.KONTROL_NOKTASI_ADI, EKontrolNoktasiSUID.Select))
                                    altMenuList.Add(itemAltMenuler);
                            }

                            if (altMenuList != null && altMenuList.Count > 0)
                            {
                                itemRoot.AltMenuListe = altMenuList;
                                menuListJSON.Add(itemRoot);
                            }
                        }
                        else
                            menuListJSON.Add(itemRoot);
                    }
                }
                return JSONConvert(menuListJSON);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}
