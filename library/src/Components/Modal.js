import React, {useState} from 'react'
import "../CSS/Modal.css"

export const Modal = ({closeModal, onSubmit, defaultValue}) => {
const [formState, setFormState] = useState(
    defaultValue || {
      id:"",  book: "", author: "", publisher: "", pagecount: "", status: "delivered"
    }
);
const [alarms, setAlarms] = useState("");

const validateForm = () => {
    if (formState.book && formState.author && formState.publisher && formState.pagecount && formState.status) {
        setAlarms("");
        return true;
    } else {
        let errorFields = [];
        for(const [key, value] of Object.entries(formState)) {
            if (!value) {
                errorFields.push(key);
            }
        }
        setAlarms(errorFields.join(","));
        return false;
    }
};

const handleChange = (e) => {
    setFormState({...formState, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    onSubmit(formState);
    closeModal();
}


  return (
    <div className="modal-container" onClick={(e) => {
        if(e.target.className === "modal-container")
        closeModal();
    }}>
       <div className="modal">
        <form>
            <div className="form-group">
                <label htmlFor="book">Book</label>
                <input name="book" onChange={handleChange} value={formState.book} ></input>
            </div>
            <div className="form-group">
                <label htmlFor="author">Author</label>
                <input name="author" onChange={handleChange} value={formState.author} ></input>
            </div>
            <div className="form-group">
                <label htmlFor="publisher">Publisher</label>
                <input name="publisher" onChange={handleChange} value={formState.publisher}  ></input>
            </div>
            <div className="form-group">
                <label htmlFor="pagecount">Page Count</label>
                <input name="pagecount" onChange={handleChange} value={formState.pagecount} ></input>
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select name="status" onChange={handleChange} value={formState.status}>
                    <option value="delivered">Delivered</option>
                    <option value="reading">Reading</option>
                    <option value="alarm">Alarm</option>
                </select>
            </div>
            {alarms && <div className="alarm">{`Please include: ${alarms}`}</div>}
            <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
        </form>
       </div>
    </div>
  )
}
