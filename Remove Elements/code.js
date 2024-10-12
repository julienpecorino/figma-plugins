
function removeNamedElements(node) {
  const elementsToRemove = ["Sessions", "Program Builder / Header", "Library / Library Panel"];
  let removedCount = 0;

  // Recursively check each node and its children
  function checkAndRemove(node) {
    // If the node is a group or a frame, check its children
    if ("children" in node) {
      for (const child of node.children) {
        checkAndRemove(child);
      }
    }

    // Remove the node if its name matches and it's not the top-level node being checked
    if (elementsToRemove.includes(node.name)) {
      node.remove();
      removedCount++;
    }
  }

  // Start the recursive removal process from the current node
  checkAndRemove(node);

  // Return the count of removed elements to provide feedback
  return removedCount;
}

// Iterate over all selected nodes and remove matching elements
let totalRemoved = 0;
figma.currentPage.selection.forEach(selectedNode => {
  totalRemoved += removeNamedElements(selectedNode);
});

// Notify the user how many elements were removed
figma.closePlugin(`Removed ${totalRemoved} elements.`);
