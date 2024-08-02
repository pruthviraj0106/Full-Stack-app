import React, { useState } from 'react';
import styled from 'styled-components';

const FileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FileName = styled.span`
  margin-left: 8px;
`;

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const File = ({ node, path, renameItem, deleteItem }) => {
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
    <FileContainer>
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
        <>
          <FileIcon src="/file-icon.png" alt="file icon" />
          <FileName>{node.name}</FileName>
          <button onClick={() => setIsEditing(true)}>Rename</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </FileContainer>
  );
};

export default File;
