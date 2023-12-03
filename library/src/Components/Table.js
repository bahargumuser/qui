import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { collection, getDocs, where, query } from 'firebase/firestore';
import db from './Firebase';
import '../CSS/Table.css';
import '../CSS/Modal.css';

export const Table = ({ rows, deleteRow, editRow }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = collection(db, 'books');
      const booksQuery = query(booksRef, where('isRent', '==', false));
      
      try {
        const snapshot = await getDocs(booksQuery);
        const booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          author: doc.data().author,
          publisher: doc.data().publisher,
          pagecount: doc.data().pagecount,
          status: doc.data().status
        }));
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
    return () => {
    };
  }, []);

  console.log('books', books);

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Page Count</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.pagecount}</td>
                <td>{book.status}</td>
                <td>
                  <span className={`label label-${book.status}`}>
                    {book.status}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(book.id)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(book.id)}
                    />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
