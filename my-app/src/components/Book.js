import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function Book() {
  const [book, setBook] = useState({
    bookcode: "",
    title: "",
    author: "",
    category: "",
    sold: false,
  });
  const { bookcode } = useParams();

  const navigate = useNavigate();

  const onSaveClick = (event) => {
    event.preventDefault();
    console.log(book);
    // Send data to the backend via POST
    fetch(`http://localhost:8080/book/${bookcode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to add book");
        } else {
          navigate(`/`);
        }
      })
      .then((data) => console.log(data))
      .catch(error => {
        console.error(error);
      });


  };

  useEffect(() => {
    axios.get(`http://localhost:8080/book/${bookcode}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error =>
        console.error(error)
      );
  }, [bookcode]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  }

  return (
    <div>
      <h1>{bookcode < 0 ? "New Book" : `Book ${bookcode}`}</h1>
      <br />
      BookCode:{" "}
      <input type="number" value={book.bookcode} name="bookcode" disabled
        onChange={handleChange} />
      <br />
      Title:{" "}
      <input type="text" value={book.title} name="title"
        onChange={handleChange} />
      <br />
      Author:{" "}
      <input type="text" value={book.author} name="author"
        onChange={handleChange} />
      <br />
      Category:{" "}
      <input type="text" value={book.category} name="category"
        onChange={handleChange} />
      <br />
      Approved:{" "}
      <input type="checkbox" checked={book.sold} name="sold" onChange={handleChange} />
      <br />
      <button onClick={onSaveClick}>Save</button>
    </div>
  );
}

export default Book;
