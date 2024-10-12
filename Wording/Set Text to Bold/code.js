// Configurable variables
const wordsToBold = ["Biogen does not use your personal data"]; // The words/phrases to be set in bold
const boldFontStyle = "Bold"; // Can be "Normal", "Bold", "Semi-Bold"

// Helper function to find and bold the specified words/phrases in a text node
async function boldTextInNode(textNode, words, fontStyle) {
  const text = textNode.characters;

  console.log(`Processing text node with content: "${text}"`);

  for (const word of words) {
    const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`${escapedWord}`, 'gi');
    let match;

    console.log(`Using regex for word "${word}": ${regex}`);

    while ((match = regex.exec(text)) !== null) {
      const originalFont = textNode.getRangeFontName(match.index, match.index + word.length);
      const fontName = { family: originalFont.family, style: fontStyle };

      if (originalFont.style !== fontStyle) {
        console.log(`Found match at index ${match.index}: "${match[0]}"`);
        console.log(`Attempting to load font: ${fontName.family} ${fontName.style}`);

        try {
          await figma.loadFontAsync(fontName);
          textNode.setRangeFontName(match.index, match.index + word.length, fontName);
          console.log(`Applied bold to the word "${match[0]}" at index ${match.index}`);
        } catch (err) {
          console.error(`Failed to load or apply font: ${fontName.family} ${fontName.style}`, err);
        }
      } else {
        console.log(`The word "${match[0]}" at index ${match.index} is already in the desired style.`);
      }
    }
  }
}

// Main function to process the selected text nodes
async function processSelectedTextNodes(words, fontStyle) {
  const selection = figma.currentPage.selection;

  console.log(`Current selection has ${selection.length} items.`);

  for (const node of selection) {
    if (node.type === "TEXT") {
      console.log(`Processing text node with ID: ${node.id}`);

      try {
        const fontName = node.fontName;
        if (typeof fontName === "symbol") {
          console.error(`Cannot load font for text node with ID: ${node.id}. Font name is a symbol.`);
          continue;
        }
        await figma.loadFontAsync(fontName);
        await boldTextInNode(node, words, fontStyle);
      } catch (err) {
        console.error(`Failed to load initial font for text node with ID: ${node.id}`, err);
      }
    } else {
      console.log(`Skipped non-text node with ID: ${node.id}`);
    }
  }
}

// Run the plugin
processSelectedTextNodes(wordsToBold, boldFontStyle)
  .then(() => {
    console.log("Bold styling applied to specified words/phrases!");
    figma.notify("Bold styling applied to specified words/phrases!");
    figma.closePlugin();
  })
  .catch(err => {
    console.error("Error processing text nodes:", err);
    figma.notify("An error occurred while applying bold styling.");
    figma.closePlugin();
  });
