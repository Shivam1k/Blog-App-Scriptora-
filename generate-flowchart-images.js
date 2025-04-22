const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Path to the markdown file with Mermaid diagrams
const markdownFile = path.join(__dirname, 'blog-application-flowchart.md');
// Directory for output images
const outputDir = path.join(__dirname, 'flowchart-images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to extract Mermaid diagrams from markdown
function extractMermaidDiagrams(markdown) {
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
  const diagrams = [];
  let match;
  
  while ((match = mermaidRegex.exec(markdown)) !== null) {
    diagrams.push(match[1]);
  }
  
  return diagrams;
}

// Function to generate image from Mermaid diagram
async function generateImage(diagram, index) {
  const tempFile = path.join(outputDir, `diagram-${index}.mmd`);
  const outputFile = path.join(outputDir, `diagram-${index}.png`);
  
  // Write diagram to temporary file
  fs.writeFileSync(tempFile, diagram);
  
  try {
    // Use mmdc (Mermaid CLI) to generate image
    await execPromise(`npx -p @mermaid-js/mermaid-cli mmdc -i ${tempFile} -o ${outputFile} -b transparent`);
    console.log(`Generated image: ${outputFile}`);
    
    // Clean up temporary file
    fs.unlinkSync(tempFile);
    
    return outputFile;
  } catch (error) {
    console.error(`Error generating image for diagram ${index}:`, error);
    return null;
  }
}

// Main function
async function main() {
  try {
    // Read markdown file
    const markdown = fs.readFileSync(markdownFile, 'utf8');
    
    // Extract diagrams
    const diagrams = extractMermaidDiagrams(markdown);
    console.log(`Found ${diagrams.length} Mermaid diagrams`);
    
    // Generate images
    const imageFiles = [];
    for (let i = 0; i < diagrams.length; i++) {
      const imageFile = await generateImage(diagrams[i], i);
      if (imageFile) {
        imageFiles.push(imageFile);
      }
    }
    
    console.log(`Generated ${imageFiles.length} images in ${outputDir}`);
    
    // Create a simple HTML file to view all diagrams
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Blog Application Flowcharts</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
          h1 { text-align: center; }
          .diagram { margin-bottom: 40px; }
          img { max-width: 100%; border: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <h1>Blog Application Flowcharts</h1>
        ${imageFiles.map((file, index) => `
          <div class="diagram">
            <h2>Diagram ${index + 1}</h2>
            <img src="${path.basename(file)}" alt="Diagram ${index + 1}">
          </div>
        `).join('')}
      </body>
      </html>
    `;
    
    fs.writeFileSync(path.join(outputDir, 'index.html'), htmlContent);
    console.log(`Created HTML viewer at ${path.join(outputDir, 'index.html')}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 