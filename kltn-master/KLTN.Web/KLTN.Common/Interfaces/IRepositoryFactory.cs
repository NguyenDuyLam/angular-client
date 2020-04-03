using System;
using System.Collections.Generic;
using System.Text;

namespace KLTN.Common.Interfaces
{
    public interface IRepositoryFactory
    {
        IRepository<T> GetRepository<T>() where T : class, IEntity, new();
    }
}

