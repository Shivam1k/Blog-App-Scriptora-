# Converting Interview Prep Notes to PDF

This guide will help you convert the interview preparation notes from Markdown to PDF format.

## Option 1: Using Node.js (Recommended)

1. Install the required package:
   ```bash
   npm install markdown-pdf --save-dev
   ```

2. Run the conversion script:
   ```bash
   npm run generate-pdf
   ```

3. The PDF will be generated at `interview-prep-note.pdf` in the root directory.

## Option 2: Using Online Converters

If you prefer not to install additional packages, you can use online Markdown to PDF converters:

1. Copy the contents of `interview-prep-note.md`
2. Visit one of these websites:
   - [Markdown to PDF](https://www.markdowntopdf.com/)
   - [CloudConvert](https://cloudconvert.com/md-to-pdf)
   - [Dillinger](https://dillinger.io/) (Export as PDF)
3. Paste the content and convert to PDF
4. Download the resulting PDF

## Option 3: Using VS Code Extensions

If you're using Visual Studio Code:

1. Install the "Markdown PDF" extension
2. Open `interview-prep-note.md`
3. Right-click in the editor and select "Markdown PDF: Export (pdf)"
4. The PDF will be generated in the same directory

## Customizing the PDF

If you want to customize the appearance of the PDF:

1. Edit the `convert-to-pdf.js` file
2. Add CSS styling options to the markdownpdf configuration
3. Run the conversion script again

Example with custom styling:
```javascript
markdownpdf({
  cssPath: 'path/to/custom.css'
})
.from(markdownFile)
.to(pdfFile, () => {
  console.log(`PDF created successfully at: ${pdfFile}`);
});
``` 