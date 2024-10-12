
function runPlugin () {

// -- I N I T I A L I S E -------------------------------------
// Get the selected elements
// Define the main function for the Figma plugin
// Define the main function for the Figma plugin
// Define the main function for the Figma plugin
const main = async () => {
  // Get the currently selected node (assuming it's an instance)
  const selectedNode = figma.currentPage.selection[0];

  if (selectedNode && selectedNode.type === "INSTANCE") {
    // Get the master component of the selected instance
    const masterComponent = selectedNode.mainComponent;
    console.log('Master? '+masterComponent)

    if (masterComponent) {
      // Create a copy of the master component on the current page
      const copyComponent = masterComponent.clone();
      copyComponent.name = masterComponent.name + " Copy"; // You can customize the copied component name

      // Add the copied component to the current page
      figma.currentPage.appendChild(copyComponent);

      // Select the copied component
      figma.currentPage.selection = [copyComponent];

      // Close the plugin
      //figma.closePlugin();
    } else {
      // Show an error message if the selected instance doesn't have a master component
     // figma.closePlugin("Selected instance doesn't have a master component.");
    }
  } else {
    // Show an error message if the selected node is not an instance
    //figma.closePlugin("Please select an instance component.");
  }
};

// Run the main function
main();


// -- A C T I O N S ---------------------------------------------


// -- U T I L I T I E S -----------------------------------------

}

runPlugin ()
