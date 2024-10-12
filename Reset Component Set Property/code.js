
function runPlugin () {

// -- I N I T I A L I S E -------------------------------------
const instanceVariants = { Selected: 'Profile' }


// -- U T I L I T I E S -----------------------------------------
  const selection = figma.currentPage.selection;

  if (selection.length === 1) {
    const selectedNode = selection[0];

    if (selectedNode.type === 'INSTANCE' && selectedNode.variantProperties) {
      selectedNode.setProperties(instanceVariants)
    }
  }

}

runPlugin ()
