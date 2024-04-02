import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input, // Import Input component from Material-UI
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import './addDocument.css';

const AddDocumentForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [documentCategory, setDocumentCategory] = useState('');
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSnackbarClose = () => {
    setErrorSnackbar(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('documentType', documentType);
    formData.append('documentDescription', documentDescription);
    formData.append('documentCategory', documentCategory);

    try {
      const response = await fetch('http://localhost:6000/documents/addDocument', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add document');
      }
      // Handle success scenario
    } catch (error) {
      setErrorSnackbar(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="add-document-form">
        <Typography variant="h4" className="form-title">
          Add Document
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Replace input type="file" with Material-UI Input component */}
          <Input
            type="file"
            fullWidth
            onChange={handleFileChange}
            className="input-field"
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
          <TextField
            label="User ID"
            fullWidth
            className="input-field"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            label="Document Type"
            fullWidth
            className="input-field"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          />
          <TextField
            label="Document Description"
            fullWidth
            className="input-field"
            value={documentDescription}
            onChange={(e) => setDocumentDescription(e.target.value)}
          />
          <TextField
            label="Document Category"
            fullWidth
            className="input-field"
            value={documentCategory}
            onChange={(e) => setDocumentCategory(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="submit-button"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={errorSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={errorMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Paper>
    </Container>
  );
};

export default AddDocumentForm;
