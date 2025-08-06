import React from 'react';

const FileUploader = ({ onFileChange, onUpload }) => (
  <div>
    <input type="file" accept="audio/mpeg" onChange={onFileChange} />
    <button onClick={onUpload}>Upload</button>
  </div>
);

export default FileUploader;
