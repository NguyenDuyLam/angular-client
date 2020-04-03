using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace KLTN.Common.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<T> GetRepository<T>() where T : class, IEntity, new();
        int Commit();
        Task<int> CommitAsync();
    }
    public interface IUnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
    {
        TContext Context { get; }
    }
}
