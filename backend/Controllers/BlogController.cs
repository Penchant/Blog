using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogApi;
using BlogApi.Models;

namespace blogApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogContext _context;

        public BlogController(BlogContext context)
        {
            _context = context;
        }

         // POST: api/login
        [HttpPost("login")]
        public ActionResult<IEnumerable<Post>> Login([FromForm]string username, [FromForm]string password)
        {
            if(username.Equals("user") && password.Equals("pass")){
                return Ok(true);
            }

            return new JsonResult(false){StatusCode = 401};
        }
    }
}