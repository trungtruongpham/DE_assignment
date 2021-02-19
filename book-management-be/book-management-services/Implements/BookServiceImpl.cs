﻿using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

namespace book_management_services.Implements
{
    public class BookServiceImpl : IBookService
    {
        private readonly IUnitOfWorks _unitOfWorks;
        private readonly BookRepositoryImpl _bookRepository;

        public BookServiceImpl(IUnitOfWorks unitOfWork)
        {
            this._unitOfWorks = unitOfWork;
            this._bookRepository = this._unitOfWorks.BookRepository();
        }

        public IEnumerable<Book> GetListBooks()
        {
            var result = this._bookRepository.GetList();

            return result;
        }

        public IEnumerable<Book> GetBooksByCategory(string categoryName)
        {
            var result = this._bookRepository.GetBooksByCategory(categoryName);

            return result;
        }
    }
}