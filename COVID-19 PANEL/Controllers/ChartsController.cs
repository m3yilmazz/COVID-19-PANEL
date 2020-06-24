using Microsoft.AspNetCore.Mvc;

namespace COVID_19_PANEL.Controllers
{
    public class ChartsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}