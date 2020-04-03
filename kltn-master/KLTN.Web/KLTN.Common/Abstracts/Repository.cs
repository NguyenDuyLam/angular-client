using AutoMapper.QueryableExtensions;
using KLTN.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KLTN.Common.Abstracts
{
    public class Repository<T> : IRepository<T>
        where T : class, IEntity, new()
    {
        private IQueryable<T> Query
        {
            get
            {
                var query = _context.Set<T>().AsQueryable();
                if (typeof(ISoftDeleteEntity).IsAssignableFrom(typeof(T)))
                {
                    query = query.Where(x => !((ISoftDeleteEntity)x).IsDeleted);
                }
                return query;
            }
        }
        protected DbContext _context;
        protected IHttpContextAccessor _httpContext;

        public Repository(DbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContext = httpContextAccessor;
        }

        #region Update Database

        public void Add(T entity)
        {
            entity.Id = Guid.NewGuid();
            var auditableEntity = entity as IAuditableEntity;
            if (auditableEntity != null)
            {
                var identityName = "System Account";
                var identityId = Guid.Empty;
                var claimsIdentity = _httpContext.HttpContext.User.Identity as ClaimsIdentity;
                if (claimsIdentity != null && claimsIdentity.Claims != null)
                {
                    identityName = claimsIdentity.Name;
                    var claimValues = claimsIdentity.Claims.Select(x => new { Value = x.Value, Type = x.Type });
                    var idClaim = claimValues.LastOrDefault(x => x.Type.Equals((new IdentityOptions()).ClaimsIdentity.UserIdClaimType));
                    if (idClaim != null)
                    {
                        identityId = new Guid(idClaim.Value);
                    }
                }
                auditableEntity.CreatedBy = identityName;
                auditableEntity.Created = DateTime.Now;
                auditableEntity.ModifiedBy = identityName;
                auditableEntity.Modified = DateTime.Now;
            }
            var dbEntityEntry = _context.Entry(entity);
            _context.Set<T>().Add(entity);
        }

        public void Add(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                entity.Id = Guid.NewGuid();
                var auditableEntity = entity as IAuditableEntity;
                if (auditableEntity != null)
                {
                    var identityName = "System Account";
                    var identityId = Guid.Empty;
                    if (ClaimsPrincipal.Current != null && ClaimsPrincipal.Current.Identity != null)
                    {
                        identityName = ClaimsPrincipal.Current.Identity.Name;
                        var claimsIdentity = ClaimsPrincipal.Current.Identity as ClaimsIdentity;
                        if (claimsIdentity.Claims != null)
                        {
                            var claimValues = claimsIdentity.Claims.Select(x => new { Value = x.Value, Type = x.Type });
                            var idClaim = claimValues.LastOrDefault(x => x.Type.Equals((new IdentityOptions()).ClaimsIdentity.UserIdClaimType));
                            if (idClaim != null)
                            {
                                identityId = new Guid(idClaim.Value);
                            }
                        }
                    }
                    auditableEntity.CreatedBy = identityName;
                    auditableEntity.Created = DateTime.Now;
                    auditableEntity.ModifiedBy = identityName;
                    auditableEntity.Modified = DateTime.Now;
                }
            }
            _context.Set<T>().AddRange(entities);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            return await Query.Where(predicate).AnyAsync();
        }

        public async Task<int> CountAllAsync()
        {
            return await Query.CountAsync();
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> predicate)
        {
            return await Query.Where(predicate).CountAsync();
        }

        public void Delete(T entity)
        {
            var softDeleteEntity = entity as ISoftDeleteEntity;
            if (softDeleteEntity != null)
            {
                softDeleteEntity.IsDeleted = true;
                var dbEntityEntry = _context.Entry(softDeleteEntity);
                dbEntityEntry.Property(x => x.IsDeleted).IsModified = true;
            }
            else
            {
                var dbEntityEntry = _context.Entry(entity);
                dbEntityEntry.State = EntityState.Deleted;
            }
        }

        public void Delete(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                Delete(entity);
            }
        }

        public void Edit(T entity)
        {
            var auditableEntity = entity as IAuditableEntity;
            if (auditableEntity != null)
            {
                var identityName = "System Account";
                var identityId = Guid.Empty;
                var claimsIdentity = _httpContext.HttpContext.User.Identity as ClaimsIdentity;
                if (claimsIdentity != null && claimsIdentity.Claims != null)
                {
                    identityName = claimsIdentity.Name;
                    var claimValues = claimsIdentity.Claims.Select(x => new { Value = x.Value, Type = x.Type });
                    var idClaim = claimValues.LastOrDefault(x => x.Type.Equals((new IdentityOptions()).ClaimsIdentity.UserIdClaimType));
                    if (idClaim != null)
                    {
                        identityId = new Guid(idClaim.Value);
                    }
                }
                auditableEntity.ModifiedBy = identityName;
                auditableEntity.Modified = DateTime.Now;

                var dbEntityEntry = _context.Entry(auditableEntity);
                dbEntityEntry.State = EntityState.Modified;
                dbEntityEntry.Property(x => x.CreatedBy).IsModified = false;
                dbEntityEntry.Property(x => x.Created).IsModified = false;
            }
            else
            {
                var dbEntityEntry = _context.Entry(entity);
                dbEntityEntry.State = EntityState.Modified;
            }
        }

        public void Edit(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                Edit(entity);
            }
        }
        #endregion

        #region Query without project
        public IEnumerable<T> GetAll(string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.OrderBy(order).AsEnumerable();
        }


        public IEnumerable<T> GetAll(string order, int pageIndex, int limit, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).AsEnumerable();
        }


        public async Task<IEnumerable<T>> GetAllAsync(string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.OrderBy(order).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(string order, int pageIndex, int limit, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync<TKey>(Expression<Func<T, TKey>> order, int pageIndex, int limit, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ToListAsync();
        }

        public T FindById(Guid id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.FirstOrDefault(x => x.Id == id);
        }

        public T FindById(Guid id)
        {
            IQueryable<T> query = Query;
            return query.FirstOrDefault(x => x.Id == id);
        }
        public async Task<T> FindByIdAsync(Guid id)
        {
            IQueryable<T> query = Query;
            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }


        public async Task<T> FindByIdAsync(Guid id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.FirstOrDefaultAsync(e => e.Id == id);
        }
        public T GetSingle(Expression<Func<T, bool>> predicate, string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            query = query.OrderBy(order);
            if (predicate == null)
            {
                return query.FirstOrDefault();
            }
            return query.Where(predicate).FirstOrDefault();
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate, string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            query = query.OrderBy(order);
            if (predicate == null)
            {
                return await query.FirstOrDefaultAsync();
            }
            return await query.Where(predicate).FirstOrDefaultAsync();
        }
        public async Task<T> GetSingleAsync(string predicate, object[] parameters, string order = "")
        {
            return await Query.Where(predicate, parameters).OrderBy(order).FirstOrDefaultAsync();
        }

        public IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate, string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.Where(predicate).OrderBy(order).AsEnumerable();
        }
        public IEnumerable<T> FindBy(string order, int pageIndex, int limit, Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.Where(predicate).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).AsEnumerable();
        }
        public IEnumerable<T> FindBy(string predicate, object[] parameters, string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.Where<T>(predicate, parameters).OrderBy(order).AsEnumerable();
        }
        public IEnumerable<T> FindBy(string order, int pageIndex, int limit, string predicate, object[] parameters, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.Where(predicate, parameters).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).AsEnumerable();
        }

        public async Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> predicate, string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.Where(predicate).OrderBy(order).ToListAsync();
        }
        public async Task<IEnumerable<T>> FindByAsync(string order, int pageIndex, int limit, Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.Where(predicate).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ToListAsync();
        }
        public async Task<IEnumerable<T>> FindByAsync(string predicate, object[] parameters, string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.Where(predicate, parameters).OrderBy(order).ToListAsync();
        }
        public async Task<IEnumerable<T>> FindByAsync(string order, int pageIndex, int limit, string predicate, object[] parameters, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.Where(predicate, parameters).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ToListAsync();
        }

        #endregion
        #region query with project
        public IEnumerable<H> GetAll<H>(string order = "")
        {
            return Query.OrderBy(order).ProjectTo<H>().AsEnumerable();
        }
        public IEnumerable<H> GetAll<H>(string order, int pageIndex, int limit)
        {
            return Query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().AsEnumerable();
        }
        public async Task<IEnumerable<H>> GetAllAsync<H>(string order = "")
        {
            return await Query.OrderBy(order).ProjectTo<H>().ToListAsync();
        }
        public async Task<IEnumerable<H>> GetAllAsync<H>(string order, int pageIndex, int limit)
        {
            return await Query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().ToListAsync();
        }
        public async Task<IEnumerable<H>> GetAllAsync<H, TKey>(Expression<Func<T, TKey>> order, int pageIndex, int limit)
        {
            return await Query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().ToListAsync();
        }
        public H FindById<H>(Guid id)
        {
            return Query.Where(x => x.Id == id).ProjectTo<H>().FirstOrDefault();
        }
        public async Task<H> FindByIdAsync<H>(Guid id)
        {

            return await Query.Where(x => x.Id == id).ProjectTo<H>().FirstOrDefaultAsync();
        }
        public H GetSingle<H>(Expression<Func<T, bool>> predicate, string order = "")
        {
            if (predicate == null)
            {
                return Query.OrderBy(order).ProjectTo<H>().FirstOrDefault();
            }
            return Query.Where(predicate).OrderBy(order).ProjectTo<H>().FirstOrDefault();
        }
        public async Task<H> GetSingleAsync<H>(Expression<Func<T, bool>> predicate, string order = "")
        {
            return await Query.Where(predicate).OrderBy(order).ProjectTo<H>().FirstOrDefaultAsync();
        }

        public IEnumerable<H> FindBy<H>(Expression<Func<T, bool>> predicate, string order = "")
        {
            return Query.Where(predicate).OrderBy(order).ProjectTo<H>().AsEnumerable();
        }
        public IEnumerable<H> FindBy<H>(string order, int pageIndex, int limit, Expression<Func<T, bool>> predicate)
        {
            return Query.Where(predicate).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().AsEnumerable();
        }

        public IEnumerable<H> FindBy<H>(string predicate, object[] parameters, string order = "")
        {
            return Query.Where<T>(predicate, parameters).OrderBy(order).ProjectTo<H>().AsEnumerable();
        }
        public IEnumerable<H> FindBy<H>(string order, int pageIndex, int limit, string predicate, object[] parameters)
        {
            return Query.Where<T>(predicate, parameters).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().AsEnumerable();
        }
        public async Task<IEnumerable<H>> FindByAsync<H>(string predicate, object[] parameters, string order = "")
        {
            return await Query.Where<T>(predicate, parameters).OrderBy(order).ProjectTo<H>().ToListAsync();
        }

        public async Task<IEnumerable<H>> FindByAsync<H>(string order, int pageIndex, int limit, string predicate, object[] parameters)
        {
            return await Query.Where<T>(predicate, parameters).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().ToListAsync();
        }
        public async Task<IEnumerable<H>> FindByAsync<H>(Expression<Func<T, bool>> predicate, string order = "")
        {
            return await Query.Where(predicate).OrderBy(order).ProjectTo<H>().ToListAsync();
        }
        public async Task<IEnumerable<H>> FindByAsync<H>(string order, int pageIndex, int limit, Expression<Func<T, bool>> predicate)
        {
            return await Query.Where(predicate).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().ToListAsync();
        }
        public async Task<IEnumerable<H>> FindByAsync<H, TKey>(Expression<Func<T, TKey>> order, int pageIndex, int limit, Expression<Func<T, bool>> predicate)
        {
            return await Query.Where(predicate).OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().ToListAsync();
        }
        public IQueryable<T> GetQuery()
        {
            return Query;
        }
        public async Task<IEnumerable<H>> FindByAsync<H>(IQueryable<T> query, string order, int pageIndex, int limit, params Expression<Func<T, object>>[] includeProperties)
        {
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ProjectTo<H>().ToListAsync();
        }
        public async Task<IEnumerable<T>> FindByAsync(IQueryable<T> query, string order, int pageIndex, int limit, params Expression<Func<T, object>>[] includeProperties)
        {
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.OrderBy(order).Skip((pageIndex - 1) * limit).Take(limit).ToListAsync();
        }

        public async Task<IEnumerable<H>> FindByAsync<H>(Expression<Func<T, bool>> predicate, string order = "", params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Query;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return await query.Where(predicate).OrderBy(order).ProjectTo<H>().ToListAsync();

        }
        #endregion

    }
}
