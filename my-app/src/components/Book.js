import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Book(props) {
  const params = useParams();
  const [book, setBook] = useState({});
  const bookcode = params.bookcode;
  const onSaveClick = () => {
    console.log(book);
    // Send data to the backend via POST
    fetch(`http://localhost:8080/book/save/${bookcode}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(book), // body data type must match "Content-Type" header
      headers: {
        'Content-Type': 'application/json; charset=ISO-8859-1',
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));;
  };

  useEffect(() => {
    fetch(`http://localhost:8080/book/${bookcode}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>{bookcode < 0 ? "New Book" : `Book ${bookcode}`}</h1>
      BookCode:{" "}
      <input type="number" value={book.bookcode}
        onChange={(e) => setBook({ ...book, bookcode: e.target.value })} />
      <br />
      Title:{" "}
      <input type="text" value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })} />
      <br />
      Author:{" "}
      <input type="text" value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })} />
      <br />
      Category:{" "}
      <input type="text" value={book.category}
        onChange={(e) => setBook({ ...book, category: e.target.value })} />
      <br />
      Approved:{" "}
      <input type="checkbox" checked={book.approved}
        onChange={(e) => setBook({ ...book, approved: e.target.checked })} />
      <br />
      <button onClick={onSaveClick}>Save</button>
    </div>
  );
}

export default Book;
