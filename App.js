import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    if (inputValue.trim() === '') return; // Prevent empty items

    if (editIndex !== null) {
      const updatedItems = items.map((item, index) =>
        index === editIndex ? inputValue : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, inputValue]);
    }
    setInputValue('');
  };

  const handleEditItem = (index) => {
    setInputValue(items[index]);
    setEditIndex(index);
  };

  const handleDeleteItem = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  return (
    <div className="app-container">
      <h1>CRUD Example</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add or Edit Item"
          className="input-field"
        />
        <button onClick={handleAddItem} className="submit-button">
          {editIndex !== null ? 'Update Item' : 'Add Item'}
        </button>
      </div>
      <h2 className="item-count">Total Items: {items.length}</h2>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            {item}
            <div className="button-group">
              <button onClick={() => handleEditItem(index)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDeleteItem(index)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
