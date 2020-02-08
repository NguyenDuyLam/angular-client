using KLTN.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace KLTN.Common.Interfaces
{
    public interface IAuditableEntity : IEntity
    {
        string CreatedBy { get; set; }
        string ModifiedBy { get; set; }
        DateTimeOffset Created { get; set; }
        DateTimeOffset Modified { get; set; }
    }
}
