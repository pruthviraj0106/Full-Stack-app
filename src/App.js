
import React, { useState } from 'react';
import styled from 'styled-components';
import FileStructure from './components/FileStructure';
import NewFileOrDirectory from './components/NewFileOrDirectory';

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  border-right: 1px solid #ccc;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const initialFileStructure = {
  name: 'root',
  type: 'directory',
  children: [
    { name: 'public', type: 'directory', children: [] },
    { name: 'src', type: 'directory', children: [] },
  ],
};

const App = () => {
  const [fileStructure, setFileStructure] = useState(initialFileStructure);

  const addNewItem = (path, newItem) => {
    const addItem = (node, path, newItem) => {
      if (path.length === 0) {
        node.children.push(newItem);
        return;
      }
      const [next, ...rest] = path;
      const child = node.children.find(child => child.name === next);
      if (child) addItem(child, rest, newItem);
    };

    const newFileStructure = { ...fileStructure };
    addItem(newFileStructure, path, newItem);
    setFileStructure(newFileStructure);
  };

  const renameItem = (path, newName) => {
    const rename = (node, path, newName) => {
      if (path.length === 0) {
        node.name = newName;
        return;
      }
      const [next, ...rest] = path;
      const child = node.children.find(child => child.name === next);
      if (child) rename(child, rest, newName);
    };

    const newFileStructure = { ...fileStructure };
    rename(newFileStructure, path, newName);
    setFileStructure(newFileStructure);
  };

  const deleteItem = (path) => {
    const removeItem = (node, path) => {
      if (path.length === 0) return null;
      const [next, ...rest] = path;
      const index = node.children.findIndex(child => child.name === next);
      if (index === -1) return node;
      if (rest.length === 0) {
        node.children.splice(index, 1);
        return null;
      }
      node.children[index] = removeItem(node.children[index], rest);
      return node;
    };

    const newFileStructure = { ...fileStructure };
    removeItem(newFileStructure, path);
    setFileStructure(newFileStructure);
  };

  return (
    <Container>
      <Sidebar>
        <h1>File Structure</h1>
        <NewFileOrDirectory addNewItem={addNewItem} />
        <FileStructure
          structure={fileStructure}
          renameItem={renameItem}
          deleteItem={deleteItem}
        />
      </Sidebar>
      <Content>
        <h2>Content Area</h2>
        <p>selected file or directory</p>
      </Content>
    </Container>
  );
};

export default App;
