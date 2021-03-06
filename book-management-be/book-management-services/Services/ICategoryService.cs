﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;

namespace book_management_services.Services
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetAllCategory();
        void Add(Category Category);
        void Update(Category Category);
        void Delete(Guid id);
        IEnumerable<Category> GetAll();
        //IEnumerable<Category> GetAllPaging(int page, int pageSize, out int totalRow);
        Category GetById(Guid id);
        Task<IEnumerable<Category>> GetCategoryForMain();
        void SaveChanges();

        IEnumerable<Category> GetCategoryByName(string szName);

        IEnumerable<Category> GetAllPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize);

        IEnumerable<Category> GetForListParams();
    }
}