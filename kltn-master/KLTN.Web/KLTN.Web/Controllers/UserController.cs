using System;
using System.Threading.Tasks;
using KLTN.Common.DTO;
using KLTN.Models.Data;
using KLTN.Services.Interfaces;
using KLTN.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        protected readonly IUserServices _userServices;
        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpPost]
        public async Task<ResultDTO> Login(UserLoginViewModel data)
        {
            try
            {
                var res = _userServices.Login(data);
                return new ResultDTO { IsSuccess = true, Data = res};
            }
            catch(Exception ex)
            {
                return new ResultDTO { IsSuccess = false, Data = ex, Messages = { "Error System" } };
            }
        }
    }
}