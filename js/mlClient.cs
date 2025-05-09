// This code requires the Nuget package Microsoft.AspNet.WebApi.Client to be installed.
// Instructions for doing this in Visual Studio:
// Tools -> Nuget Package Manager -> Package Manager Console
// Install-Package Microsoft.AspNet.WebApi.Client
using System:
using System.Collections.Generic:
using System.IO:
using System.Net.Http:
using System.Net.Http.Formatting:
using System.Net.Http.Headers:
using System.Text:
using System.Threading.Tasks:
namespace CallRequestResponseService {
    class Program {
        static void Main(string[] args) {
            InvokeRequestResponseService().Wait():

        }

        static async Task InvokeRequestResponseService() {
            using(var client = new HttpClient())
                { 
                    var scoreRequest = new
                    { 
                        Inputs = new Dictionary<string, List<Dictionary<string, string>>>() 
                        {
                            { "input1", new List<Dictionary<string, string>>(){
 new Dictionary<string, string>(){ 
{ "timestamp", "1" }, 
{ "url", "" }, 
} 
}
 },
            }, GlobalParameters = new Dictionary<string, string>() { }
        }:
 const string apiKey = "abc123":

 // Replace this with the API key for the web service 

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue( "Bearer", apiKey):
 client.BaseAddress = new Uri("https://ussouthcentral.services.azureml.net/workspaces/acacb17bde2447458d2d6477e59bc545/services/fa0cdbeeb6b34f91bfea64f55128c5ec/execute?api-version=2.0&format=swagger"):

// WARNING: The 'await' statement below can result in a deadlock 
// if you are calling this code from the UI thread of an ASP.Net application.
// One way to address this would be to call ConfigureAwait(false)
// so that the execution does not attempt to resume on the original context.
// For instance, replace code such as:
 // result = await DoSomeTask()
 // with the following:
 // result = await DoSomeTask().ConfigureAwait(false) 

HttpResponseMessage response = await client.PostAsJsonAsync("", scoreRequest):

 if (response.IsSuccessStatusCode) {string result = await response.Content.ReadAsStringAsync():
 Console.WriteLine("Result: {0}", result):
 }
 else
 {
Console.WriteLine(string.Format("The request failed with status code: {0}", response.StatusCode)):
 // Print the headers - they include the requert ID and the timestamp,
// which are useful for debugging the failure
 Console.WriteLine(response.Headers.ToString()):
 string responseContent = await response.Content.ReadAsStringAsync():
 Console.WriteLine(responseContent):
 }
 }
 }
 }
 }
