using Microsoft.AspNetCore.Mvc;

namespace COVID_19_PANEL.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}