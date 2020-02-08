using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace KLTN.Models.Data
{
    public class KLTNDatabaseContext: DbContext
    {
        public KLTNDatabaseContext()
        {

        }

        public KLTNDatabaseContext(DbContextOptions<KLTNDatabaseContext> options)
            : base(options)
        {
        }
        //public KLTNDatabaseContext(string connectionString)
        //    : base(GetOptions(connectionString))
        //{

        //}
        //private static DbContextOptions GetOptions(string connectionString)
        //{
        //    return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        //}

        public virtual DbSet<User> Users { get; set; }
        public virtual  DbSet<Vocaburaly> Vocaburalies{ get; set; }
    }
}
