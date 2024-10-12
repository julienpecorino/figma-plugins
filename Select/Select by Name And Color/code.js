// Variables to change
const nodeNameToSelect = ""; // Optional: Change this to the name of the node you want to select, leave empty to ignore name
const nodeColorHexToSelect = "#33009A"; // Change this to the hex color code of the node you want to select
const searchBy = "fill"; // Change to "stroke", "fill", or "both" depending on what you want to search for

// Convert hex color to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r: r / 255, g: g / 255, b: b / 255 };
}

// Function to compare colors (with a tolerance for potential slight variations)
function colorsMatch(color1, color2, tolerance = 0.01) {
  return (
    Math.abs(color1.r - color2.r) < tolerance &&
    Math.abs(color1.g - color2.g) < tolerance &&
    Math.abs(color1.b - color2.b) < tolerance
  );
}

// Recursive function to get all children inside frames, groups, or any node with children (go through all nested levels)
function getAllChildrenRecursively(nodes) {
  let allNodes = [];
  nodes.forEach(node => {
    if (node.type !== "PAGE") {
      allNodes.push(node); // Include the current node
    }
    if ('children' in node) {
      // If the node has children, recursively include all nested children
      allNodes.push(...getAllChildrenRecursively(node.children));
    }
  });
  return allNodes;
}

// Get the current selection or the entire page if nothing is selected
let nodesToSearch = figma.currentPage.selection.length > 0
  ? getAllChildrenRecursively(figma.currentPage.selection) // Get all nested children in the current selection
  : figma.currentPage.findAll(); // Search the entire page if nothing is selected

// Function to select nodes by (optional) name and color
function selectNodesByNameAndColor(name, colorHex, searchBy) {
  const color = hexToRgb(colorHex);
  console.log(`Looking for nodes with ${name ? `name "${name}" and` : ""} color ${colorHex} (RGB: ${JSON.stringify(color)})`);

  const matchingNodes = nodesToSearch.filter(node => {
    if (name && node.name !== name) return false; // Check name if it's provided and not empty

    let strokeMatches = false;
    let fillMatches = false;

    // Check stroke if applicable
    if (searchBy === "stroke" || searchBy === "both") {
      if (node.strokes && node.strokes.length > 0) {
        strokeMatches = node.strokes.some(stroke => {
          if (stroke.type === 'SOLID') {
            return colorsMatch(stroke.color, color); // Compare stroke colors
          }
          return false;
        });
      }
    }

    // Check fill if applicable
    if (searchBy === "fill" || searchBy === "both") {
      if (node.fills && node.fills.length > 0) {
        fillMatches = node.fills.some(fill => {
          if (fill.type === 'SOLID') {
            return colorsMatch(fill.color, color); // Compare fill colors
          }
          return false;
        });
      }
    }

    // If searching by both, ensure both stroke and fill match
    if (searchBy === "both") {
      return strokeMatches && fillMatches;
    }

    // Return true if either stroke or fill matches, depending on the search mode
    return strokeMatches || fillMatches;
  });

  if (matchingNodes.length > 0) {
    // Set only the matching nodes as the current selection
    figma.currentPage.selection = matchingNodes;
    figma.viewport.scrollAndZoomIntoView(matchingNodes);
    figma.notify(`${matchingNodes.length} node(s) with ${name ? `name "${name}" and ` : ""}the specified ${searchBy} color selected.`);
  } else {
    figma.notify(`No node found with ${name ? `name "${name}" and ` : ""}the specified ${searchBy} color.`);
  }
}

// Call the function
selectNodesByNameAndColor(nodeNameToSelect, nodeColorHexToSelect, searchBy);

// Close the plugin
figma.closePlugin();
