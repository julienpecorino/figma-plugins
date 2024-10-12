function findNodesWithColor(node, targetColor, foundNodes) {
  if ('fills' in node && Array.isArray(node.fills)) {
    for (let fill of node.fills) {
      if (fill.type === 'SOLID' && fill.color) {
        // Convert the RGB color to hex for comparison
        let colorHex = rgbToHex(Math.round(fill.color.r * 255), Math.round(fill.color.g * 255), Math.round(fill.color.b * 255));
        if (colorHex === targetColor) {
          foundNodes.push(node);
          break; // Found the color, no need to check further fills
        }
      }
    }
  }

  // Recursively check child nodes
  if ('children' in node) {
    for (let child of node.children) {
      findNodesWithColor(child, targetColor, foundNodes);
    }
  }
}

// Helper function to convert RGB to Hex
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Usage
let foundNodes = [];
findNodesWithColor(figma.currentPage, '#F74343', foundNodes);

// Assuming you want to select the found nodes themselves if they are selectable
// Note: This may need adjustment based on the specific requirements, such as selecting specific types of parent nodes
figma.currentPage.selection = foundNodes.filter(node => node.type !== 'DOCUMENT' && node.type !== 'PAGE');
