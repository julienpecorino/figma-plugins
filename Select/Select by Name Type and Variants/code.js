// Define the variables at the top for easy customization
const elementName = "Header"; // Replace with the name criteria
const elementType = "INSTANCE"; // Replace with the type criteria (e.g., FRAME, INSTANCE, RECTANGLE, etc.)
const variantName = "Context"; // Replace with the variant name criteria for instances, or "undefined" to ignore
const variantValue = "desktop"; // Replace with the variant value criteria for instances, or "undefined" to ignore

// Function to find and select elements based on the criteria
function findAndSelectElements() {
  const nodes = figma.currentPage.findAll(node => {
    // Check if node matches the name criteria
    const nameMatch = node.name === elementName;

    // Check if node matches the type criteria
    const typeMatch = node.type === elementType;

    // Check if node matches the variant criteria if it's an instance
    let variantMatch = true;
    if (node.type === "INSTANCE" && node.variantProperties && variantName !== "undefined" && variantValue !== "undefined") {
      variantMatch = node.variantProperties[variantName] === variantValue;
    }

    // Return true if all criteria are met
    return nameMatch && typeMatch && variantMatch;
  });

  // Select the found nodes
  figma.currentPage.selection = nodes;

  // Zoom into the selection
  if (nodes.length > 0) {
    figma.viewport.scrollAndZoomIntoView(nodes);
  } else {
    figma.notify("No elements found matching the criteria.");
  }
}

// Run the function to find and select elements
findAndSelectElements();

// Close the plugin
figma.closePlugin();
