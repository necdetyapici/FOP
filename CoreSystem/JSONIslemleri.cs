using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace FOP.CoreSystem
{
    public static class JSONIslemleri
    {
        public static HttpResponseMessage JSONConvert(Object obje, bool DatabaseConvert = false)
        {
            string output = null;

            if (DatabaseConvert == true)
                output = Newtonsoft.Json.JsonConvert.SerializeObject(obje, Newtonsoft.Json.Formatting.None, new Newtonsoft.Json.JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
            else
                output = Newtonsoft.Json.JsonConvert.SerializeObject(obje);


            var resp = new HttpResponseMessage { Content = new StringContent(output, System.Text.Encoding.UTF8, "application/json") };
            resp.StatusCode = HttpStatusCode.OK;
            return resp;
        }

        public static T ObjeyeCevir<T>(this string obje) where T : class
        {
            return (Newtonsoft.Json.JsonConvert.DeserializeObject(obje) as T);
        }
    }
}