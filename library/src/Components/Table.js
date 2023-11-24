import React from 'react';
import "../CSS/Table.css";
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"

export const Table = ({rows, deleteRow, editRow}) => {
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
          {
            rows.map((row, idx) => {
              const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
              return <tr key={idx}>
                <td>{row.book}</td>
                <td>{row.author}</td>
                <td>{row.publisher}</td>
                <td>{row.PageCount}</td>
                <td>
              <span className={`label label-${row.status}`}>{statusText}
              </span>
            </td>
            <td className="fit">
              <span className="actions">
                <BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
                <BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />
              </span>
            </td>
              </tr>
            })
          }
          
        </tbody>
      </table>
    </div>
  )
}

{/*  İLK OLUŞTURDUĞUM YAPI */}
          {/* 
          <tr>
            <td>Home</td>
            <td>This is the main page</td>
            <td>
              <span className="label label-delivered">Delivered</span>
            </td>
            <td>
              <span className="actions">
                <BsFillTrashFill className="delete-btn" />
                <BsFillPencilFill />
              </span>
            </td>
          </tr>
          <tr>
            <td>Page 2</td>
            <td>This is the second page</td>
            <td>
              <span className="label label-reading">Reading</span>
            </td>
            <td>
              <span className="actions" >
                <BsFillTrashFill className="delete-btn" />
                <BsFillPencilFill />
              </span>
            </td>
          </tr>
          <tr>
            <td>Page 3</td>
            <td>This is the third page</td>
            <td>
              <span className="label label-Notdelivered">Not delivered</span>
            </td>
            <td>
              <span className="actions">
                <BsFillTrashFill className="delete-btn" />
                <BsFillPencilFill />
              </span>
            </td>
          </tr> */}