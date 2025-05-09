using System;
using System.Text;
using System.Net;
using System.IO;

namespace x {

    public class y
    {

        public static void Main()
        {
            string apiKey = "J3OuNAbIIbt1Kkb0JGqR";
            string apiSecret = "7XFo840NBZsLVnVlykek";

            string domain = "example.com";

            string apiUrl = "https://api.webshrinker.com/categories/v3/" + Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes(domain));

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(apiUrl);
            request.ContentType = "application/json; charset=utf-8";
            request.Headers["Authorization"] = "Basic " + Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes(apiKey + ":" + apiSecret));
            request.PreAuthenticate = true;
            HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            using (Stream responseStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                Console.WriteLine(reader.ReadToEnd());
            }
        }
    }
}
