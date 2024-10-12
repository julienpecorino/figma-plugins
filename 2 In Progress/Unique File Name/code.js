
function runPlugin () {

  // This function generates a random string in the format: letter + 2 digits
function generateRandomString() {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter from A-Z
  const numbers = Math.floor(Math.random() * 100).toString().padStart(2, '0'); // Two random digits, padded with zero if needed
  return `${letter}${numbers}`;
}

// Main function to add a random ID to the names of selected nodes
function addIdToSelectedNodes() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
      figma.notify("No elements selected");
      return;
  }

  selection.forEach(node => {
      const randomString = generateRandomString();
      node.name = `${node.name}-${randomString}`;
  });

  figma.notify("IDs added to element names successfully");
}

// Run the main function
addIdToSelectedNodes();


}

runPlugin ()
