using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR.Hubs;
using System.Web.Routing;


[assembly: OwinStartup(typeof(Pict.Startup))]
namespace Pict
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();


            // app.UseSignalR();
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888


        }
    }
}