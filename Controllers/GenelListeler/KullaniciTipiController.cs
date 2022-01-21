using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using FOP.CoreSystem;
using FOPDB.Business;

namespace Pict.Controllers.GenelListeler
{
    public class KullaniciTipiController : WebApiBaseController
    {
        //hadi örnek olsun
        //GET: api/KullaniciTipi
        public HttpResponseMessage Get()
        {
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            return JSONConvert(PictGenel.kullaniciTipiGetData(AktifKullaniciBilgisi.KULLANICI_TIPI_ID));
        }
    }
}
