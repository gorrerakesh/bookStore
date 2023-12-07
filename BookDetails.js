import React, { useEffect, useState } from "react";
import BooksInfo from "./BooksInfo";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = ({ edititem = {}, setEdititem, click }) => {
  const [input, setInput] = useState({
    title: "",
    author: "",
    price: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleName = (e) => {
    setEdititem({ ...edititem, title: e.target.value });
  };

  const handleAuthor = (e) => {
    setEdititem({ ...edititem, author: e.target.value });
  };
  const handlePrice = (e) => {
    setEdititem({ ...edititem, price: e.target.value });
  };

  const handletitle = (e) => {
    setInput({ ...input, title: e.target.value });
  };
  const handleauthor = (e) => {
    setInput({ ...input, author: e.target.value });
  };
  const handleprice = (e) => {
    setInput({ ...input, price: e.target.value });
  };

  const resetValuse = () => {
    setInput({
      title: "",
      author: "",
      price: "",
    });
  };
  const handleSubmit = () => {
    axios
      .post("http://localhost:555/books", input)
      .then((res) => {
        console.log(res.data);
        toast("Submited Sucessfully");

        resetValuse();
      })

      .catch((err) => {
        console.log(err, "error");
      });
    console.log(toast);
    // if (input.title.trim() === "") {
    //   setErrorMessage("Title cannot be empty");
    // }
  };

  const handleupdat = () => {
    axios
      .put(`http://localhost:555/books/${edititem._id}`, edititem)
      .then((res) => {
        console.log(res.data);
        setEdititem("");
        toast("Updated Sucessfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form>
      <ToastContainer />
      <div>
        {edititem && click ? (
          <div className="formDiv">
            <label className="label" htmlFor="">
              Book Name
            </label>
            <br />
            <input
              value={edititem.title}
              onChange={handleName}
              className="input"
              type="text"
              placeholder="Book Name"
            />
            <br />
            <label className="label">Author Name</label>
            <br />
            <input
              value={edititem.author}
              onChange={handleAuthor}
              className="input"
              type="text"
              placeholder="Author"
            />
            <br />
            <label className="label"> Price</label>
            <br />
            <input
              value={edititem.price}
              onChange={handlePrice}
              className="input"
              type="Number"
              placeholder="Price"
            />
            <br />
            <button className=" btn" onClick={handleupdat}>
              Update
            </button>
          </div>
        ) : (
          <div className="formDiv">
            <label className="label" htmlFor="">
              Book Name
            </label>
            <br />
            <input
              value={input.title}
              onChange={handletitle}
              className="input"
              type="text"
              placeholder="Book Name"
              required
            />

            {/* {errorMessage && (
            <p style={{ color: "red", fontSize: "17" }}>{errorMessage}</p>
          )} */}

            <br />
            <label className="label">Author Name</label>
            <br />
            <input
              value={input.author}
              onChange={handleauthor}
              className="input"
              type="text"
              placeholder="Author"
              required
            />
            <br />
            <label className="label"> Price</label>
            <br />
            <input
              value={input.price}
              onChange={handleprice}
              className="input"
              type="Number"
              placeholder="Price"
              required
            />
            <br />
            <button
              disabled={edititem.title || edititem.author || edititem.price}
              onClick={handleSubmit}
              className=" btn"
            >
              Submit
            </button>
          </div>
        )}
        {/* <button onClick={notify}>Notify!</button> */}
      </div>
    </form>
  );
};

export default BookDetails;
