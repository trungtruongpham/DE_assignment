﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using book_management_helpers.CustomException;
using book_management_models;
using book_management_models.DTOs.BookDTOs;
using book_management_services.Services;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/book/")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IMapper _mapper;

        public BookController(IBookService bookService, IMapper mapper)
        {
            this._bookService = bookService;
            this._mapper = mapper;
        }

        [HttpGet("all")]
        public IActionResult GetListBooks()
        {
            var listBooks = _bookService.GetListBooks();
            var result = _mapper.Map<List<BookForListDTO>>(listBooks);

            if (result.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find book in database!");
            }

            return Ok(result);
        }

        [HttpGet("{bookId}/1")]
        public IActionResult GetBookById(Guid bookId)
        {
            var book = _bookService.GetBookById(bookId);
            var bookForReturn = _mapper.Map<BookForListDTO>(book);
        
            return Ok(bookForReturn);
        }

        [HttpGet("category")]
        public IActionResult GetBooksByCategory([FromQuery] string categoryName)
        {
            var listBooksByCategory = _bookService.GetBooksByCategory(categoryName);
            var result = _mapper.Map<List<BookForListDTO>>(listBooksByCategory);

            if (result.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable,
                    "Can't find book with given category in database!");
            }

            return Ok(result);
        }

        [HttpPost("")]
        public async Task<ActionResult> AddNewBook([FromForm] BookForCreateDTO newBook)
        {
            // var book = _mapper.Map<Book>(newBook);
            var result = await _bookService.AddNewBook(newBook);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("Create new book failed.");
        }

        [HttpPut("{bookId}")]
        public async Task<IActionResult> UpdateBook([FromBody] BookForUpdateDto updateBook, Guid bookId)
        {
            var result = await _bookService.UpdateBook(updateBook, bookId);

            if (result == true)
            {
                return Ok("Update successfull book!");
            }
            
            return BadRequest("Update failed!");
        }

        [HttpDelete("{bookId}")]
        public async Task<IActionResult> DeleteBook(Guid bookId)
        {
            var result = await _bookService.DeleteBook(bookId);

            if (result)
            {
                return Ok("Delete successful book with id : " + bookId);
            }

            return BadRequest("Delete failed book with id : " + bookId);
        }

        [HttpGet("{bookId}")]
        public IActionResult GetDetailBookData(Guid bookId)
        {
            var result = _bookService.GetDetailBookData(bookId);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("Get detail book data failed");
        }
    }
}