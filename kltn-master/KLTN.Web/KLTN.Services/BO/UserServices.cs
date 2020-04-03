using KLTN.Common.DTO;
using KLTN.Common.Interfaces;
using KLTN.Models;
using KLTN.Services.Interfaces;
using KLTN.ViewModels;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KLTN.Services.BO
{
    public class UserServices : IUserServices
    {
        private readonly IUnitOfWork _uow;
        private readonly AppSetting _appSetting;

        public UserServices(IUnitOfWork uow, IOptions<AppSetting> appSetting)
        {
            _uow = uow;
            _appSetting = appSetting.Value;
        }
        public User GetUserByUserNameAndPasswordAsync(UserLoginViewModel data)
        {
            var userExist = _uow.GetRepository<User>().FindBy(x => x.UserName == data.UserName && x.Password == data.Password).SingleOrDefault();
            if (userExist.Equals(null))
            {
                return null;
            }
            return userExist;
        }

        public object Login(UserLoginViewModel data)
        {
            var user = GetUserByUserNameAndPasswordAsync(data);
            if (user == null)
            {
                return null;
            }
            else
            {
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSetting.Secrect));
                double tokenExpiryTime = Convert.ToDouble(_appSetting.ExpireTime);
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                            new Claim(JwtRegisteredClaimNames.Sub, user.FullName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim("User_id", Convert.ToString(user.Id)),
                            new Claim("Username", user.FullName),
                            new Claim(ClaimTypes.Role, user.Role),
                            new Claim("LoggedOn", DateTime.Now.ToString()),

                    }),
                    SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _appSetting.Site,
                    Audience = _appSetting.Audience,
                    Expires = DateTime.UtcNow.AddMinutes(tokenExpiryTime)
                };
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var token = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
                return new { token = tokenHandler.WriteToken(token), expiration = token.ValidTo, username = user.UserName, role = user.Role, userId = user.Id, name = user.FullName };
            }
        }
    }
}
