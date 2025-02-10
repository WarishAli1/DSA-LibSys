let books = [
  {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      year: "1925",
      category: "Fiction",
      remarks: "Classic American Literature"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-1847941831",
    year: "2018",
    category: "Self-Help",
    remarks: "An easy & proven way to build good habits & break bad ones"
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "978-0593135204",
    year: "2021",
    category: "Science Fiction",
    remarks: "A lone astronaut must save humanity from extinction"
  },
  {
    id: 4,
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "978-1786892720",
    year: "2020",
    category: "Fiction",
    remarks: "Between life and death there is a library"
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    isbn: "978-0441172719",
    year: "1965",
    category: "Science Fiction",
    remarks: "A masterpiece of scientific fiction"
  }
];

function displayBooks(booksArray = books) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  booksArray.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td>${book.year}</td>
          <td>${book.category}</td>
          <td>${book.remarks}</td>
          <td>
              <button class="action-btn edit-btn" title="Edit" onclick="editBook(${book.id})">
                  <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete-btn" title="Delete" onclick="deleteBook(${book.id})">
                  <i class="fas fa-trash-alt"></i>
              </button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

function addBook(event) {
  event.preventDefault();
  const newBook = {
      id: books.length + 1,
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      isbn: document.getElementById('isbn').value,
      year: document.getElementById('year').value,
      category: document.getElementById('category').value,
      remarks: document.getElementById('remarks').value
  };
  books.push(newBook);
  displayBooks();
  document.getElementById('book-form').reset();
  alert('Book added successfully!');
}

function editBook(id) {
  const book = books.find(book => book.id === id);
  if (!book) return;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('isbn').value = book.isbn;
  document.getElementById('year').value = book.year;
  document.getElementById('category').value = book.category;
  document.getElementById('remarks').value = book.remarks;
  document.getElementById('book-id').value = book.id;
  document.getElementById('submit-btn').textContent = 'Update Book';
  document.getElementById('form-title').textContent = 'Update Book Record';
  document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
}

function updateBook(event) {
  event.preventDefault();
  const bookId = parseInt(document.getElementById('book-id').value);
  if (!bookId) {
      addBook(event);
      return;
  }
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex === -1) return;
  books[bookIndex] = {
      id: bookId,
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      isbn: document.getElementById('isbn').value,
      year: document.getElementById('year').value,
      category: document.getElementById('category').value,
      remarks: document.getElementById('remarks').value
  };
  displayBooks();
  document.getElementById('book-form').reset();
  document.getElementById('book-id').value = '';
  document.getElementById('submit-btn').textContent = 'Add Book';
  document.getElementById('form-title').textContent = 'Add New Book Record';
  alert('Book updated successfully!');
}

function deleteBook(id) {
  if (confirm('Are you sure you want to delete this book?')) {
      books = books.filter(book => book.id !== id);
      displayBooks();
      alert('Book deleted successfully!');
  }
}

function searchBooks(query) {
  const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.isbn.toLowerCase().includes(query.toLowerCase())
  );
  displayBooks(filteredBooks);
}

function sortTable(column) {
  const properties = ['title', 'author', 'isbn', 'year', 'category', 'remarks'];
  const property = properties[column];
  books.sort((a, b) => {
      if (a[property].toLowerCase() < b[property].toLowerCase()) return -1;
      if (a[property].toLowerCase() > b[property].toLowerCase()) return 1;
      return 0;
  });
  displayBooks();
}

document.addEventListener('DOMContentLoaded', function() {
  displayBooks();
  const form = document.getElementById('book-form');
  form.addEventListener('submit', function(event) {
      if (document.getElementById('book-id').value) {
          updateBook(event);
      } else {
          addBook(event);
      }
  });
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', function(event) {
      searchBooks(event.target.value);
  });
});