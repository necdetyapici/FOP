using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Pict.CoreSystem
{
    public class ResimIslemleri
    {
        private static ImageCodecInfo GetEncoder(ImageFormat format)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();
            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;
        }

        public static MemoryStream ResizeImage(int newWidth, int newHeight, Stream photoStream)
        {
            Image imgPhoto = Image.FromStream(photoStream);

            int sourceWidth = imgPhoto.Width;
            int sourceHeight = imgPhoto.Height;

            //Consider vertical pics
            if (sourceWidth < sourceHeight)
            {
                int buff = newWidth;

                newWidth = newHeight;
                newHeight = buff;
            }

            int sourceX = 0, sourceY = 0, destX = 0, destY = 0;
            float nPercent = 0, nPercentW = 0, nPercentH = 0;

            nPercentW = ((float)newWidth / (float)sourceWidth);
            nPercentH = ((float)newHeight / (float)sourceHeight);
            if (nPercentH < nPercentW)
            {
                nPercent = nPercentH;
                destX = System.Convert.ToInt16((newWidth - (sourceWidth * nPercent)) / 2);
            }
            else
            {
                nPercent = nPercentW;
                destY = System.Convert.ToInt16((newHeight - (sourceHeight * nPercent)) / 2);
            }

            int destWidth = (int)(sourceWidth * nPercent);
            int destHeight = (int)(sourceHeight * nPercent);

            Bitmap bmPhoto = new Bitmap(newWidth, newHeight, PixelFormat.Format24bppRgb);

            bmPhoto.SetResolution(imgPhoto.HorizontalResolution, imgPhoto.VerticalResolution);

            Graphics grPhoto = Graphics.FromImage(bmPhoto);
            //INFO: Ana arka plan rengi, transparan resimler için önemli.
            grPhoto.Clear(Color.White);
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;

            grPhoto.DrawImage(imgPhoto,
                new Rectangle(destX, destY, destWidth, destHeight),
                new Rectangle(sourceX, sourceY, sourceWidth, sourceHeight),
                GraphicsUnit.Pixel);

            grPhoto.Dispose();
            imgPhoto.Dispose();

            MemoryStream ms = new MemoryStream();
            EncoderParameters encoderParameters = new EncoderParameters(1);
            EncoderParameter encoderQuality = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 90L);
            ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
            encoderParameters.Param[0] = encoderQuality;
            bmPhoto.Save(ms, jpgEncoder, encoderParameters);

            // MemoryStream ms = new MemoryStream();
            // bmPhoto.Save(ms, ImageFormat.Jpeg);

            return ms;
        }

        private const int MAX_IMAGE_FILE_SIZE = 2 * 4096 * 1024;

        public static bool IsValidImage(byte[] bytes)
        {
            // Mümkün mertebe geçerli bir resim (JPEG, BMP, GIF, PNG) olup olmadığını kontrol eder.

            if ((4 < bytes.Length) && (MAX_IMAGE_FILE_SIZE > bytes.Length))
            {
                byte[] header = new byte[4];
                string[] imageHeaders = new[]{
                    "\xFF\xD8",                                             // JPEG
                    "BM",                                                   // BMP
                    "GIF",                                                  // GIF
                    Encoding.ASCII.GetString(new byte[]{137, 80, 78, 71})}; // PNG

                // Dosyanın ilk 4 harfini desteklediğimiz uzantılara göre kontrol edelim.
                Array.Copy(bytes, 0, header, 0, 4);
                bool isImageHeader = imageHeaders.Count(str => Encoding.ASCII.GetString(header).StartsWith(str)) > 0;

                if (isImageHeader == true)
                {
                    try
                    {
                        using (MemoryStream ms = new MemoryStream(bytes))
                            System.Drawing.Image.FromStream(ms);
                    }
                    catch (ArgumentException)
                    {
                        return false;
                    }
                }
                return true;
            }

            return false;
        }


    }
}