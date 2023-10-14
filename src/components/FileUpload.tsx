import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Define types of the props from parent component
type FileUploadProps = {
  fileStatus: boolean;
  setFileStatus: React.Dispatch<React.SetStateAction<boolean>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
};

/* File Upload Button */
export default function FileUpload({ fileStatus, setFileStatus, fileName, setFileName }: FileUploadProps) {
  // Style the upload button
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  /**
   * Handles the file uploaded to the browser
   * @param e: the event from browser event loop.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileStatus(true);
      setFileName(file.name);
    }
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      <p style={{ fontSize: '1rem', marginTop: '2px' }}>
        {fileStatus ? 'File selected: ' + fileName : 'No file selected'}
      </p>
    </>
  );
}
