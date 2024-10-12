
function runPlugin () {



// Function to recursively find all text layers
function findAllTextLayers(node, textLayers) {
  if (node.type === 'TEXT') {
      textLayers.push(node.characters);
  }
  if ('children' in node) {
      for (const child of node.children) {
          findAllTextLayers(child, textLayers);
      }
  }
}

// Main function to execute the task
async function extractAndCombineText() {
  const textLayers = [];
  const currentPage = figma.currentPage;

  // Find all text layers in the current page
  findAllTextLayers(currentPage, textLayers);

  // Join the text values with a comma
  const combinedText = textLayers.join("\n");

  // Create a new text layer
  const newTextLayer = figma.createText();

  // Load the font before setting characters
  await figma.loadFontAsync(newTextLayer.fontName);

  // Set the combined text
  newTextLayer.characters = combinedText;

  // Add the new layer to the current page
  currentPage.appendChild(newTextLayer);
}

// Run the function
extractAndCombineText();





}

runPlugin ()
