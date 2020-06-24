using Microsoft.AspNetCore.Mvc;

namespace COVID_19_PANEL.Controllers
{
    public class NewsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}