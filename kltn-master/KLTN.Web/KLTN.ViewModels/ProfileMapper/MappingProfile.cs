using AutoMapper;
using KLTN.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace KLTN.ViewModels.ProfileMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() : base()
        {
            CreateMap<User, UserLoginViewModel>().ReverseMap();
        }
    }
}
