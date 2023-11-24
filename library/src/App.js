import { useState } from 'react'
import './App.css';
import { Table } from './Components/Table';
import { Modal } from './Components/Modal';


function App() {
const [modalOpen, setModalOpen] = useState(false);

const [rows, setRows] = useState([
  {book: "Müzakereler", author: "Deleuze", publisher: "Norgunk", PageCount: "188", status: "delivered" },
  {book: "Felsefe Nedir?", author: "Deleuze, Guattari", publisher: "Norgunk", PageCount: "168", status: "reading" },
  {book: "Bin Yayla", author: "Deleuze", publisher: "Norgunk", PageCount: "300", status: "alarm" }
]);
const [rowToEdit, setrowToEdit] = useState(null);

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