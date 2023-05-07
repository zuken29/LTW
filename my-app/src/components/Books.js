import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Books(props) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []); 

function handleViewDetail(code){
    navigate("/books/".concat(code));
}

  return (
    <div>
      <h2 className="text-center">Books List</h2>
      <div className="row">
        <button
          className="btn btn-primary"
        >
            Add Book
        </button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>BookCode</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th disabled>Approved</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.bookcode}>
                <td> {book.bookcode} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
                <td> {book.category}</td>
                <td>
                  <input type="checkbox" defaultChecked={book.approved} />
                </td>
                <td>
                <button onClick={()=>handleViewDetail(book.bookcode)} className="btn btn-primary">View</button>
                <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Books;
