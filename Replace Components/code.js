
/*
Goal: Replace components by a new one and update the text values from the old to new components.
How to use : Place an instance of the new compoent in the parent frame container the current compoent and run the plugin.
*/
async function replaceComponents() {
  // Define function scope to encapsulate variables
  async function runReplacement() {
    const selectedComponent = figma.currentPage.selection[0];
    const parentFrame = selectedComponent.parent;

    // Check if selection is valid
    if (selectedComponent && selectedComponent.type === 'INSTANCE' && selectedComponent.name === 'checkbox') {
      const mainComponent = selectedComponent.mainComponent;

      // Store references to new components to update selection later
      const newComponents = [];

      // Iterate through all children of the parent frame
      for (const child of parentFrame.children) {
        // Log the child being processed
        console.log(`Processing child: ${child.name} (${child.id})`);

        // Skip the selected component itself
        if (child.id === selectedComponent.id) {
          console.log("Skipping the selected component itself.");
          continue;
        }

        // Find the text element in the child
        const textElement = child.findOne(node => node.type === 'TEXT');
        if (textElement) {
          // Memorize text value
          const textValue = textElement.characters;
          console.log(`Found text element with value: ${textValue}`);

          // Create a new instance of the main component
          const newComponent = mainComponent.createInstance();
          
          // Find the text element in the new component
          const newTextElement = newComponent.findOne(node => node.type === 'TEXT');
          if (newTextElement) {
            // Load the font before setting the text value
            await figma.loadFontAsync(newTextElement.fontName);
            newTextElement.characters = textValue;
            console.log(`Set text value in new component: ${textValue}`);
          }

          // Check if the parent frame uses auto layout
          if (!parentFrame.layoutMode) {
            // Position the new component at the same location as the old one if not using auto layout
            newComponent.x = child.x;
            newComponent.y = child.y;
          }

          // Add the new component to the parent frame
          parentFrame.appendChild(newComponent);
          newComponents.push(newComponent);

          // Log before removing the old component
          console.log(`Removing component: ${child.name} (${child.id})`);

          // Remove the old component
          child.remove();
        } else {
          console.log(`No text element found in child: ${child.name} (${child.id})`);
        }
      }

      // Deselect all and select the new components
      figma.currentPage.selection = newComponents;
      figma.notify("Components replaced successfully!");
    } else {
      figma.notify("Please select a valid 'checkbox' instance.");
    }

    // Close the plugin
    figma.closePlugin();
  }

  // Run the function to encapsulate variables
  await runReplacement();
}

// Run the async function
replaceComponents();
