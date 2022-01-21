using FOPDB.Entities;
using FOPDB.Enums;
using FOPDB.Models;
using FOPDB.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Web;

namespace FOP.CoreSystem
{
    public static class OturumKontrol
    {
        public static string GetAuth()
        {
            OperationContext context = OperationContext.Current;
            MessageProperties messageProperties = context.IncomingMessageProperties;

            HttpRequestMessageProperty requestProperty = messageProperties[HttpRequestMessageProperty.Name] as HttpRequestMessageProperty;

            string customHeaderValue = requestProperty.Headers["AUTH_TOKEN"];
            return customHeaderValue;
        }

        public static AktifKullaniciBilgisi TokenKontrol(string TOKEN)
        {
            try
            {
                var kullanici = TokenOlusturucu.select(TOKEN);
                if (kullanici != null)
                {
                    if (kullanici.GUNCELLEME_ZAMANI.AddMinutes(60) < DateTime.Now)
                    {
                        TokenOlusturucu.sil(TOKEN);
                        kullanici = null;
                        return new AktifKullaniciBilgisi() { basariDurumu = false };
                    }
                    else
                    {
                        AktifKullaniciBilgisi kullaniciBilgi = KullaniciOlusturucu.kullaniciBilgi(kullanici.KULLANICI_ID);
                        kullaniciBilgi.TOKEN = kullanici.TOKEN_HASH;
                        TokenOlusturucu.tokenUpdate(TOKEN);
                        return kullaniciBilgi;
                    }
                }
                else
                    return new AktifKullaniciBilgisi() { basariDurumu = false };
            }
            catch (Exception)
            {
                throw new Exception("Yetki kontrolü sırasında bir hata oluştu.");
            }
        }
    }
}