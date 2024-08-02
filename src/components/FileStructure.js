import React from 'react';
import Directory from './Directory';
import File from './File';

const FileStructure = ({ structure, renameItem, deleteItem }) => {
  const renderStructure = (node, path = []) => {
    if (node.type === 'directory') {
      return (
        <Directory
          key={node.name}
          node={node}
          path={path}
          renderStructure={renderStructure}
          renameItem={renameItem}
          deleteItem={deleteItem}
        />
      );
    }
    return (
      <File
        key={node.name}
        node={node}
        path={path}
        renameItem={renameItem}
        deleteItem={deleteItem}
      />
    );
  };

  return <div>{renderStructure(structure)}</div>;
};

export default FileStructure;
