import React, { useState } from 'react';

const NewFileOrDirectory = ({ addNewItem }) => {
  const [newItemName, setNewItemName] = useState('');
  const [isDirectory, setIsDirectory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addNewItem([], {
        name: newItemName,
        type: isDirectory ? 'directory' : 'file',
        children: isDirectory ? [] : undefined
      });
      setNewItemName('');
      setIsDirectory(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New item name"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      />
      <select value={isDirectory} onChange={(e) => setIsDirectory(e.target.value === 'true')}>
        <option value={false}>File</option>
        <option value={true}>Directory</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewFileOrDirectory;
