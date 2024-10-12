
function runPlugin () {

  // -- I N I T I A L I S E -------------------------------------
  const INSTANCE = "INSTANCE" // To know if the selected item is a Component
  let lastElementY = 0
  let lastElementHeight = 0
  let gapElement = 500
  let gapSection = 1000
  let sortLayers

  // Get the selected elements
  let selectedElements = figma.currentPage.selection
  if (selectedElements.length == 0) {
    alert("Hey you must select some elements!")
    return
  }

// -- A C T I O N S ---------------------------------------------
  // Copy the new array into a new one.
   sortLayers = [...selectedElements]
   // Sort the current layer selection depending their position Y
   position(sortLayers)
   // Reverse layer order start from the bigenning of the array
   sortLayers.reverse()
   // Finaly set their position X Y to get a nice layout.
   layout (sortLayers)
   // All done.

// -- U T I L I T I E S -----------------------------------------

   function position(nodeData) {
  	nodeData.sort(function(node1, node2) {
  		if (node1.y < node2.y) return 1;
  		if (node1.y > node2.y) return -1;
  	});
  	return nodeData;
  }

  function layout (item) {
    for (let i = 0; i < item.length; i++) {
      item[i].x = 0
    if (i === 0) {
        lastElementY = item[i].y
        lastElementHeight = item[i].height
      } else {
        item[i].type === INSTANCE
        ?
          item[i].y = lastElementY + lastElementHeight + gapSection
        :
          item[i].y = lastElementY + lastElementHeight + gapElement
        ;
        lastElementY = item[i].y
        lastElementHeight = item[i].height
      }
    }
  }

  figma.closePlugin()

}

runPlugin ()
