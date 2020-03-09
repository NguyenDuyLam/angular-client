using KLTN.Common.Interfaces;
using KLTN.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KLTN.Common.Abstracts
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext>, IUnitOfWork
         where TContext : DbContext
    {
        private Dictionary<Type, object> _repositories;
        private readonly IHttpContextAccessor _httpContext;
        public UnitOfWork(TContext context, IHttpContextAccessor httpContextAccessor)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
            _httpContext = httpContextAccessor;
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class, IEntity, new()
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new Repository<TEntity>(Context, _httpContext);
            return (IRepository<TEntity>)_repositories[type];
        }

        protected TContext Context { get; }

        TContext IUnitOfWork<TContext>.Context => throw new NotImplementedException();

        public int Commit()
        {
            return Context.SaveChanges();
        }
        public async Task<int> CommitAsync()
        {
            return await Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Context?.Dispose();
        }

    }
}
