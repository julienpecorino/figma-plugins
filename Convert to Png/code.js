// Variables to adjust export settings
const exportScale = 3; // Scale the image by 2 for high resolution
const exportFormat = 'PNG'; // Format of the export (PNG or JPG)

// Function to export the selected frame and paste it back as an image
async function exportAndPasteSelectedFrameAsPNG() {
  // Ensure a node is selected
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify("No frame selected. Please select a frame.");
    return;
  }

  // Get the first selected item
  const selectedNode = selection[0];

  // Export the frame as PNG with the specified scale
  const pngBytes = await selectedNode.exportAsync({ format: exportFormat, constraint: { type: 'SCALE', value: exportScale } });

  // Create a new image from the PNG bytes
  const image = figma.createImage(pngBytes);

  // Ensure we are working within the current page context
  const currentPage = figma.currentPage;
  if (!currentPage) {
    figma.notify("Error: Current page is undefined.");
    figma.closePlugin();
    return;
  }

  // Create a new rectangle node to hold the image
  const imageNode = figma.createRectangle();
  imageNode.resize(selectedNode.width * exportScale, selectedNode.height * exportScale);

  // Set the fills of the rectangle to the exported PNG
  imageNode.fills = [{ type: 'IMAGE', imageHash: image.hash, scaleMode: 'FILL' }];

  // Get the absolute position of the selected node
  const selectedNodeBounds = selectedNode.absoluteTransform;

  // Extract the absolute x and y coordinates
  const absoluteX = selectedNodeBounds[0][2];
  const absoluteY = selectedNodeBounds[1][2];

  // Adjust the position of the new image node relative to the selected node
  imageNode.x = absoluteX + selectedNode.width + 50; // Position to the right of the selected node
  imageNode.y = absoluteY; // Align with the selected node vertically
  currentPage.appendChild(imageNode);

  // Notify the user
  figma.notify("Frame exported and pasted as high-resolution PNG.");
}

// Run the export function when the plugin is executed
exportAndPasteSelectedFrameAsPNG().then(() => figma.closePlugin()).catch(error => {
  console.log("An error occurred: " + error);
  figma.closePlugin();
});
