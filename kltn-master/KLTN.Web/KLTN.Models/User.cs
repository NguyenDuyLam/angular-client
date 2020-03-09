using KLTN.Common.Abstracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace KLTN.Models
{
    public class User: Entity
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public DateTimeOffset? BirthDate { get; set; }
        public string Email { get; set; }
        public bool Block { get; set; }
        public string Role { get; set; }
        public int? Vcoin { get; set; }  //Money buy course
        public int? GoogleId { get; set; }
        public int? FacebookId { get; set; }
    }
}
