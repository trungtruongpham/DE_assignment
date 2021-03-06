﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs;

namespace book_management_persistence.Repositories
{
    public interface IBaseRepository<T> where T : BaseModel
    {
        IEnumerable<T> GetList();
        Task<bool> InsertAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync(Guid id);
        Task<T> GetByIdAsync(Guid id);
        Task<bool> SaveAll();


        IEnumerable<T> QueryAll();
        void Add(T entity);
        void Update(T entity);
        void UpdateMany(IEnumerable<T> entity);
        void Delete(T entity);
        void SaveChange();
        void Remove(T entity);
        T GetById(object id);

        IEnumerable<T> GetMultiPaging(out int total, /*string searchTitle,*/ int index = 0, int size = 50, string[] includes = null);

    }
}