import React, {useState } from "react";

function Add() {
    const [book, setBook] = useState({
        bookcode: "",
        title: "",
        author: "",
        category: "",
        sold: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    }
    
    const onSaveClick = (event) => {
        event.preventDefault();
        console.log(book);
        // Send data to the backend via POST
        fetch("http://localhost:8080/book/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));;
    };

    return (
        <div>
            <h1>New Book</h1>
            <br />
            BookCode:{" "}
            <input type="number" value={book.bookcode} name="bookcode"
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
            <input type="checkbox" checked={book.sold} name="sold"
                onChange={handleChange} />
            <br />
            <button onClick={onSaveClick}>Save</button>
        </div>
    );
}

export default Add;
