using System;
using System.Collections.Generic;
using System.Text;

namespace KLTN.Common.Interfaces
{
    public interface ISoftDeleteEntity
    {
        bool IsDeleted { get; set; }
    }
}
