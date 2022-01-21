using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pict.CoreSystem
{
    public static class HTMLFark
    {
        static readonly char KUCUKTUR = '<';
        static readonly char BUYUKTUR = '>';

        public static Fark Bul(string source, string target)
        {
            var sourceSinifi = TagListesiOlustur(source).ToList();
            var targetSinifi = TagListesiOlustur(target).ToList();

            siniflariIsle(sourceSinifi, targetSinifi);

            return farkiOlustur(sourceSinifi, targetSinifi);
        }

        private static Fark farkiOlustur(List<HtmlTag> sourceSinifi, List<HtmlTag> targetSinifi)
        {
            throw new NotImplementedException();
        }

        private static void siniflariIsle(List<HtmlTag> sourceSinifi, List<HtmlTag> targetSinifi)
        {
            for (int i = 0; i < sourceSinifi.Count; i++)
            {
                var src = sourceSinifi[i];
                src.DegisiklikTipi = new List<DegisiklikTipi>();

                for (int j = i; j < targetSinifi.Count; j++)
                {
                    var trg = targetSinifi[j];
                    trg.DegisiklikTipi = new List<DegisiklikTipi>();

                    if (src.Pozisyon.Equals(trg.Pozisyon))
                    {
                        if (src.Tag.Equals(trg.Tag))
                        {
                            degerleriKontrolEt(src, trg);
                        }
                        else
                        {
                            degerleriKontrolEt(src, trg);
                            src.DegisiklikTipi.Add(DegisiklikTipi.TagDegisik);
                            trg.DegisiklikTipi.Add(DegisiklikTipi.TagDegisik);
                        }
                    }
                    else
                    {
                        if (src.Tag.Equals(trg.Tag))
                        {
                            src.DegisiklikTipi.Add(DegisiklikTipi.PozisyonDegisik);
                            trg.DegisiklikTipi.Add(DegisiklikTipi.PozisyonDegisik);
                        }

                        degerleriKontrolEt(src, trg);

                    }
                }
            }
        }

        private static void degerleriKontrolEt(HtmlTag src, HtmlTag trg)
        {
            if (src.Deger.Equals(trg.Deger))
            {
                degerlerdeEsit(src, trg);
            }
            else
            {
                degerlerFarkli(src, trg);
            }
        }

        private static void degerlerFarkli(HtmlTag src, HtmlTag trg)
        {
            var yuzde = degisiklikYuzdesi(src.Deger, trg.Deger);

            if (yuzde <= 30)
            {
                src.DegisiklikTipi.Add(DegisiklikTipi.Duzenleme);
                trg.DegisiklikTipi.Add(DegisiklikTipi.Duzenleme);

            }
            else
            {
                src.DegisiklikTipi.Add(DegisiklikTipi.Silme);
                trg.DegisiklikTipi.Add(DegisiklikTipi.Ekleme);
            }
        }

        private static void degerlerdeEsit(HtmlTag src, HtmlTag trg)
        {
            src.DegisiklikTipi.Add(DegisiklikTipi.Yok);
            trg.DegisiklikTipi.Add(DegisiklikTipi.Yok);
        }

        private static IEnumerable<HtmlTag> TagListesiOlustur(string html)
        {
            var value = html.Replace("\r", "");
            value = html.Replace("\n", "");

            var index = 0;

            while (index < value.Length)
            {
                var tag = new HtmlTag();
                var tagBaslangici = value.IndexOf(KUCUKTUR, index);
                var tagSonu = value.IndexOf(BUYUKTUR, index);

                var sonrakiTagBaslangici = value.IndexOf(KUCUKTUR, index + tagSonu);

                if (sonrakiTagBaslangici == -1)
                {
                    tag.Deger = value.Substring(tagSonu + 1);
                }
                else
                {
                    tag.Deger = value.Substring(tagSonu + 1, sonrakiTagBaslangici - tagSonu + 1);
                }

                tag.Tag = value.Substring(tagBaslangici, tagSonu - tagBaslangici + 1);
                Pozisyon poz;
                poz.Baslangic = tagBaslangici;
                poz.Bitis = tagSonu;
                tag.Pozisyon = poz;
                index = tagSonu;

                yield return tag;
            }
        }

        private static double degisiklikYuzdesi(string kaynak, string hedef)
        {
            var one = 1.0d;

            if (kaynak == hedef)
                return one * 100;

            var stepsToSame = levenshteinAdimiHesapla(kaynak, hedef);

            return (1.0 - (stepsToSame / (double)Math.Max(kaynak.Length, hedef.Length))) * 100;
        }

        private static int levenshteinAdimiHesapla(string kaynak, string hedef)
        {
            if (kaynak == null)
                throw new ArgumentNullException(nameof(kaynak));

            if (hedef == null)
                throw new ArgumentNullException(nameof(hedef));

            if (kaynak.Equals(hedef))
                return kaynak.Length;

            var kaynakLength = kaynak.Length;
            var hedefLength = hedef.Length;

            if (kaynakLength == 0)
                return hedefLength;

            if (hedefLength == 0)
                return kaynakLength;

            int[,] uzaklik = new int[kaynakLength + 1, hedefLength + 1];

            for (int i = 0; i < kaynakLength; i++)
            {
                uzaklik[i, 0] = i;
            }

            for (int i = 0; i < hedefLength; i++)
            {
                uzaklik[0, i] = i;
            }

            for (int i = 1; i < kaynakLength; i++)
            {
                for (int j = 1; j < hedefLength; j++)
                {
                    var fark = hedef[j - 1].Equals(kaynak[i - 1]) ? 0 : 1;

                    var min = Math.Min(uzaklik[i - 1, j] + 1, uzaklik[i, j - 1] + 1);

                    min = Math.Min(min, uzaklik[i - 1, j - 1] + fark);

                    uzaklik[i, j] = min;
                }
            }

            return uzaklik[kaynakLength, hedefLength];
        }
    }

    public struct Pozisyon
    {
        public int Baslangic;
        public int Bitis;

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            var tagObj = (Pozisyon)obj;

            return Baslangic.Equals(tagObj.Baslangic) && Bitis.Equals(tagObj.Bitis);
        }

        public override int GetHashCode()
        {
            var hash = 31;
            hash = (37 * hash) ^ Baslangic;
            hash = (37 * hash) ^ Bitis;
            return hash;
        }
    }

    public class HtmlTag
    {
        public Pozisyon Pozisyon { get; set; }
        public string Tag { get; set; }
        public string Deger { get; set; }
        public IList<DegisiklikTipi> DegisiklikTipi { get; set; }
    }

    public enum DegisiklikTipi
    {
        KontrolEdilmedi = 0,
        Yok,
        Ekleme,
        Duzenleme,
        Silme,
        TagDegisik,
        PozisyonDegisik
    }

    public class Fark
    {
        public string Kaynak { get; set; }
        public string Hedef { get; set; }
    }
}