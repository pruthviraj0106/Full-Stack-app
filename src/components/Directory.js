import React, { useState } from 'react';
import styled from 'styled-components';

const DirectoryContainer = styled.div`
  margin-left: 20px;
`;

const DirectoryName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FolderIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const Directory = ({ node, path, renderStructure, renameItem, deleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleRename = () => {
    renameItem([...path, node.name], newName);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteItem([...path, node.name]);
  };

  return (
    <DirectoryContainer>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleRename}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <DirectoryName>
          <FolderIcon
            src="/folder-icon.png"
            alt="folder icon"
            onClick={() => setIsOpen(!isOpen)}
          />
          <span onClick={() => setIsOpen(!isOpen)}>{node.name}</span>
          <button onClick={() => setIsEditing(true)}>Rename</button>
          <button onClick={handleDelete}>Delete</button>
        </DirectoryName>
      )}
      {isOpen && node.children.map(child => renderStructure(child, [...path, node.name]))}
    </DirectoryContainer>
  );
};

export default Directory;
