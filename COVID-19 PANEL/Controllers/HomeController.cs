using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using COVID_19_PANEL.Models;
using System.Net;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;

namespace COVID_19_PANEL.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            string url = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";
            string nameOfFile = "covid19.json";
            downloadFile(url, nameOfFile);

            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        
        private void downloadFile(string url, string nameOfFile)
        {
            //Download the latest json file.
            var _url = url;
            var _nameOfFile = nameOfFile;
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, _nameOfFile);
            WebClient webClient = new WebClient();
            webClient.DownloadFileAsync(new Uri(_url), filePath);
        }
    }
}
