
function runPlugin () {
  // Function to unlock all layers on the current page
  function unlockAllLayers() {
    const currentPage = figma.currentPage;

    // Iterate through all the layers on the current page
    currentPage.children.forEach(layer => {
      if (layer.locked) {
        // Unlock the layer
        layer.locked = false;
      }
    });

    // Tell Figma to close the plugin
    figma.closePlugin();
  }

  // Run the plugin
  unlockAllLayers();
}

runPlugin ()
