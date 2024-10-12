// Define the text value to search for
const TEXT_VALUE_TO_FIND = "To ensure patient safety, we must validate your profession and identity before you can invite and assign patients to a program.";

// Main function to run the plugin
function selectTextNodesByValue() {
  // Get the current page
  const currentPage = figma.currentPage;

  // Clear any current selection
  figma.currentPage.selection = [];

  // Find all text nodes containing the specified text value (partial match)
  const textNodes = currentPage.findAll(node => 
    node.type === "TEXT" && node.characters.includes(TEXT_VALUE_TO_FIND)
  );

  // Select the found text nodes
  figma.currentPage.selection = textNodes;

  // Notify the user about the result
  if (textNodes.length > 0) {
    figma.notify(`${textNodes.length} text node(s) found and selected.`);
  } else {
    figma.notify("No text nodes found with the specified text value.");
  }

  // Close the plugin
  figma.closePlugin();
}

// Run the main function
selectTextNodesByValue();

