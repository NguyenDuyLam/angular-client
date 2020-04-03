using KLTN.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KLTN.Web
{
    public class DataInitializer
    {
        public static void Initializer(KLTNDatabaseContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
