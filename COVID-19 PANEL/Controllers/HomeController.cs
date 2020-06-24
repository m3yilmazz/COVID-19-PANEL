using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using COVID_19_PANEL.Models;
using System.Net;
using Microsoft.AspNetCore.Hosting;
using System.IO;

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
            //Download the latest json file.
            var url = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";
            var nameOfFile = "covid19.json";
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, nameOfFile);
            WebClient webClient = new WebClient();
            webClient.DownloadFile(new Uri(url), filePath);
        
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
