using KLTN.Models;
using KLTN.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KLTN.Services.Interfaces
{
    public interface IUserServices
    {
        object Login(UserLoginViewModel data);
        User GetUserByUserNameAndPasswordAsync(UserLoginViewModel data);

    }
}
