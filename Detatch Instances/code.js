
function runPlugin () {

  function detachAllInstances(node) {
    if (node.type === 'INSTANCE') {
      node.detachInstance();
    } else if (node.children) {
      node.children.forEach((child) => {
        detachAllInstances(child);
      });
    }
  }
  
  function traverseAndDetach(selection) {
    selection.forEach((node) => {
      detachAllInstances(node);
    });
  }
  
  // Call the plugin function directly
  const selection = figma.currentPage.selection;
  traverseAndDetach(selection);

}

runPlugin ()
