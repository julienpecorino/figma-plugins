// Variables (Can be modified if needed)
const selection = figma.currentPage.selection; // Current user selection

// Function to recursively find all mask layers in a node
function findMasks(node) {
  let masks = [];

  // If the node is a mask, add it to the array
  if (node.isMask) {
    masks.push(node);
  }

  // If the node has children, recursively search in them
  if ("children" in node) {
    for (const child of node.children) {
      masks = masks.concat(findMasks(child)); // Recursively check for masks in child nodes
    }
  }

  return masks;
}

// Function to search for all masks within the current selection
function selectAllMasksInSelection() {
  let maskLayers = [];

  // Loop through the selected nodes and find all masks
  for (const node of selection) {
    maskLayers = maskLayers.concat(findMasks(node));
  }

  // Update the selection with all mask layers found
  if (maskLayers.length > 0) {
    figma.currentPage.selection = maskLayers;
    figma.notify(`${maskLayers.length} mask layer(s) selected.`);
  } else {
    figma.notify('No mask layers found in the selection.');
  }

  figma.closePlugin();
}

// Execute the function
selectAllMasksInSelection();
