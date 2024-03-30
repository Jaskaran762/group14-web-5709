const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Import controllers
const {
  addDocument,
  getDocument,
  deleteDocument 
} = require('./../controllers/documentUploadController');

// Routes
router.post('/addDocument', upload.single('file'), addDocument);
router.get('/getAllDocuments/:userId', getDocument);
router.delete('/delete/:documentId', deleteDocument);

module.exports = router;
