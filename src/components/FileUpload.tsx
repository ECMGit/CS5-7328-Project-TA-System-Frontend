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
  fileEntity: File | undefined;
  setFileEntity: React.Dispatch<React.SetStateAction<File | undefined>>;
};

/* File Upload Button */
export default function FileUpload({
  fileStatus,
  setFileStatus,
  fileName,
  setFileName,
  fileEntity,
  setFileEntity,
}: FileUploadProps) {
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
    fileEntity = e.target.files?.[0];
    if (fileEntity) {
      setFileStatus(true);
      setFileName(fileEntity.name);
      setFileEntity(fileEntity);
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
