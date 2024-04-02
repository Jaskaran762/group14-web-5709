import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ViewDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [documentCategories, setDocumentCategories] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    // Fetch document data from the API
    fetch('http://localhost:5000/documents/getAllDocuments/6605b0d736b8e62e9bcfd55d')
      .then(response => response.json())
      .then(data => {
        setDocuments(data.documents);
        setFilteredDocuments(data.documents);
        
        // Extract unique document categories and types
        const categories = Array.from(new Set(data.documents.map(doc => doc.documentCategory)));
        const types = Array.from(new Set(data.documents.map(doc => doc.documentType)));
        setDocumentCategories(categories);
        setDocumentTypes(types);
      })
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  // Filter documents based on selected categories and types
  useEffect(() => {
    const filtered = documents.filter(doc => {
      if (selectedCategories.length === 0 || selectedCategories.includes(doc.documentCategory)) {
        if (selectedTypes.length === 0 || selectedTypes.includes(doc.documentType)) {
          return true;
        }
      }
      return false;
    });
    setFilteredDocuments(filtered);
  }, [selectedCategories, selectedTypes, documents]);

  // Handle checkbox toggle for document categories
  const handleCategoryToggle = (category) => {
    const currentIndex = selectedCategories.indexOf(category);
    const newSelectedCategories = [...selectedCategories];

    if (currentIndex === -1) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelectedCategories);
  };

  // Handle checkbox toggle for document types
  const handleTypeToggle = (type) => {
    const currentIndex = selectedTypes.indexOf(type);
    const newSelectedTypes = [...selectedTypes];

    if (currentIndex === -1) {
      newSelectedTypes.push(type);
    } else {
      newSelectedTypes.splice(currentIndex, 1);
    }

    setSelectedTypes(newSelectedTypes);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Filter by Category</Typography>
            <List>
              {documentCategories.map((category) => (
                <ListItem key={category} dense button onClick={() => handleCategoryToggle(category)}>
                  <FormControlLabel
                    control={<Checkbox checked={selectedCategories.includes(category)} />}
                    label={category}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">Filter by Type</Typography>
            <List>
              {documentTypes.map((type) => (
                <ListItem key={type} dense button onClick={() => handleTypeToggle(type)}>
                  <FormControlLabel
                    control={<Checkbox checked={selectedTypes.includes(type)} />}
                    label={type}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            {filteredDocuments.map((document) => (
              <Grid item xs={12} key={document._id}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <img src={document.s3Path} alt={document.documentName} style={{ maxWidth: '100%' }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{document.documentName}</Typography>
                      <Typography variant="body2">{document.documentDescription}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary" href={document.s3Path} target="_blank" rel="noopener noreferrer">Download</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewDocuments;
