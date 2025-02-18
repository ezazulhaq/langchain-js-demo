import os from 'os';
import path from 'path';
import PDFSearchSystem from "./pdfSearchSystem.js";

// Initialize the system
const searchSystem = new PDFSearchSystem();
await searchSystem.initialize();

// Process a directory of PDFs
// const dirResults = await searchSystem.processPDFDirectory(
//     path.join(os.homedir(), 'workspace/angularApps/angular-projects/library/tafsir_al_quran_ibn_kathir')
// );
// console.log('Processed directory:', dirResults);

// Search documents
const searchResults = await searchSystem.searchDocuments(
    "Who is Muhammad?"
);
console.log('Search results:', searchResults);

// Get statistics
const stats = await searchSystem.getDocumentStatistics();
console.log('System statistics:', stats);