// frontend/src/components/App.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileStructure from './FileStructure';
import NewFileOrDirectory from './NewFileOrDirectory';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const App = () => {
  const [fileStructure, setFileStructure] = useState(null);

  useEffect(() => {
    fetch('/api/file-structure')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setFileStructure(data))
      .catch((err) => {
        console.error('There was a problem with the fetch operation:', err);
        // Optionally, set a fallback state or display an error message
      });
  }, []);

  return (
    <Container>
      <h1>File Structure Application</h1>
      {fileStructure ? (
        <>
          <NewFileOrDirectory />
          <FileStructure structure={fileStructure} />
        </>
      ) : (
        <p>Loading file structure...</p>
      )}
    </Container>
  );
};

export default App;
