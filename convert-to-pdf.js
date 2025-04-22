const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const path = require('path');

// Path to the markdown file
const markdownFile = path.join(__dirname, 'interview-prep-note.md');
// Path for the output PDF
const pdfFile = path.join(__dirname, 'interview-prep-note.pdf');

// Check if the markdown file exists
if (!fs.existsSync(markdownFile)) {
  console.error('Error: interview-prep-note.md file not found!');
  process.exit(1);
}

console.log('Converting markdown to PDF...');

// Convert markdown to PDF
markdownpdf()
  .from(markdownFile)
  .to(pdfFile, () => {
    console.log(`PDF created successfully at: ${pdfFile}`);
  }); 