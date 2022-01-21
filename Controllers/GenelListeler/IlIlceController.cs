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
    public class IlIlceController : WebApiBaseController
    {
       
        public HttpResponseMessage GetIlIlce(int id)
        {
            int IL_ILCE_TURU_ID = id;
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            return JSONConvert(PictGenel.ilIlceGetData(IL_ILCE_TURU_ID));
        }
        public HttpResponseMessage GetIlIlce(int id,int MUSTERI_IL_ID)
        {
            int IL_ILCE_TURU_ID = id;
            if (!Auth())
                return Request.CreateResponse(HttpStatusCode.Unauthorized, Uyari);
            return JSONConvert(PictGenel.ilIlceGetData(IL_ILCE_TURU_ID, MUSTERI_IL_ID));
        }

        



    }
}
