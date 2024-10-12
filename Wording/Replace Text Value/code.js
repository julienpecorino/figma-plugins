// Plugin code to update text values of selected text elements in Figma

// Variable to change the text value
const replaceText = "To ensure patient safety, we must verify your profession and identity before you can manage your patients on Physio.me";

// Function to update text nodes
async function updateTextNodes(nodes) {
  for (const node of nodes) {
    if (node.type === 'TEXT') {
      await figma.loadFontAsync(node.fontName);
      node.characters = replaceText;
    } else if ('children' in node) {
      await updateTextNodes(node.children);
    }
  }
}

// Main function to run the plugin
async function main() {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    figma.notify("Please select at least one text element.");
    return;
  }
  await updateTextNodes(selection);
  figma.notify("Text elements updated successfully.");
}

// Run the main function
main().then(() => figma.closePlugin()).catch(error => {
  console.error(error);
  figma.notify("An error occurred. Please check the console for details.");
  figma.closePlugin();
});
