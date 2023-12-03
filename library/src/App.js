import { useState, useEffect } from 'react'
import './App.css';
import { Table } from './Components/Table';
import { Modal } from './Components/Modal';

import db from "./Components/Firebase";
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getDocs, getFirestore, collection, onSnapshot, where, query } from 'firebase/firestore';



function App() {


const [modalOpen, setModalOpen] = useState(false);

const [rows, setRows] = useState([]);

const [rowToEdit, setrowToEdit] = useState(null);

const [books, setBooks] = useState([]);

useEffect(() => {
  const fetchBooks = async () => {
    const booksRef = collection(db, "books");
    const books = await getDocs(
      query(booksRef, where("isRent", "==", false))
    ).then((snapshot) => {
      const booksData = snapshot.docs.map((doc) => {
        console.log(doc);
        return {
          id: doc.id,
          name: doc.data().name,
          author: doc.data().author,
          publisher: doc.data().publisher,
          pagecount: doc.data().pagecount,
          status: doc.data().status
        };
      });
      setBooks(booksData);
    });
  };

  return () => fetchBooks();
}, []);

console.log("books", books);

const handleDeleteRow = (targetIndex) => {
  setRows(rows.filter((_, idx) => idx !== targetIndex));
};

const handleEditRow = (idx) => {
  setrowToEdit(idx);
  setModalOpen(true);
};

const handleSubmit = (newRow) => {
  rowToEdit === null
    ? setRows([...rows, newRow])
    : setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;

          return newRow;
        })
      );
};
 


return (
  <div className="App">
    <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
    <button onClick={() => setModalOpen(true)} className="btn">
      Add
    </button>
    {modalOpen && (
      <Modal
        closeModal={() => {
          setModalOpen(false);
          setrowToEdit(null);
        }}
        onSubmit={handleSubmit}
        defaultValue={rowToEdit !== null && rows[rowToEdit]}
      />
    )}
  </div>
);
}

export default App;