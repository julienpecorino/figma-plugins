// Configuration variables
const notificationMessage = "Text and formatting updated in all selected layers.";
const noSelectionMessage = "Please select at least one text layer.";
const nonTextSelectionMessage = "Selection contains non-text elements. Please select only text layers.";
const componentWarningMessage = "Text in components cannot be replaced.";

// Function to check if a node is inside a component
function isInsideComponent(node) {
  let parent = node.parent;
  while (parent) {
    // Only restrict nodes inside a COMPONENT, but allow for INSTANCE
    if (parent.type === 'COMPONENT') {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

// Function to load all fonts used in a text node
async function loadFontsInTextNode(node) {
  const fontRanges = node.getRangeAllFontNames(0, node.characters.length);
  for (const font of fontRanges) {
    await figma.loadFontAsync(font); // Load each font asynchronously
  }
}

// Function to copy text and formatting from reference node to target node
async function copyTextAndFormatting(sourceNode, targetNode) {
  // Get text and styles from the source node
  const text = sourceNode.characters;

  // Ensure all fonts from the target node are loaded before applying changes
  await loadFontsInTextNode(targetNode);

  // Set the characters in the target node after loading fonts
  targetNode.characters = text;

  // Copy styles like font name, size, and other properties
  for (let i = 0; i < sourceNode.characters.length; i++) {
    const fontName = sourceNode.getRangeFontName(i, i + 1);
    const fontSize = sourceNode.getRangeFontSize(i, i + 1);
    const textDecoration = sourceNode.getRangeTextDecoration(i, i + 1);
    const textCase = sourceNode.getRangeTextCase(i, i + 1);
    const fills = sourceNode.getRangeFills(i, i + 1);
    const letterSpacing = sourceNode.getRangeLetterSpacing(i, i + 1);
    const lineHeight = sourceNode.getRangeLineHeight(i, i + 1);

    // Apply these styles to the target node for the same range
    targetNode.setRangeFontName(i, i + 1, fontName);
    targetNode.setRangeFontSize(i, i + 1, fontSize);
    targetNode.setRangeTextDecoration(i, i + 1, textDecoration);
    targetNode.setRangeTextCase(i, i + 1, textCase);
    targetNode.setRangeFills(i, i + 1, fills);
    targetNode.setRangeLetterSpacing(i, i + 1, letterSpacing);
    targetNode.setRangeLineHeight(i, i + 1, lineHeight);
  }
}

// Main function
async function main() {
  // Get the current selection
  const selection = figma.currentPage.selection;

  // Ensure there's a selection and that it's not empty
  if (selection.length === 0) {
    figma.notify(noSelectionMessage);
    figma.closePlugin();
    return;
  }

  // Ensure all selected elements are text nodes
  if (!selection.every(node => node.type === "TEXT")) {
    figma.notify(nonTextSelectionMessage);
    figma.closePlugin();
    return;
  }

  // Check if any selected text node is inside a component
  if (selection.some(isInsideComponent)) {
    figma.notify(componentWarningMessage);
    figma.closePlugin();
    return;
  }

  // Load fonts and copy text and formatting from the first selected node to others
  const referenceNode = selection[0];
  await loadFontsInTextNode(referenceNode);

  for (let i = 1; i < selection.length; i++) {
    const targetNode = selection[i];
    
    // Load the necessary fonts in the target node as well
    await loadFontsInTextNode(targetNode);

    // Copy the text and formatting from the reference to the target
    await copyTextAndFormatting(referenceNode, targetNode);
  }

  // Notify the user and close the plugin
  figma.notify(notificationMessage);
  figma.closePlugin();
}

// Call the main function to run the plugin
main();
