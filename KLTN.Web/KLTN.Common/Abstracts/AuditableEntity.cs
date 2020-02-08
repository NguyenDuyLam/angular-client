using KLTN.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace KLTN.Common.Abstracts
{
    public class AuditableEntity : IAuditableEntity
    {
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public Guid Id { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset Modified { get; set; }

    }
}
