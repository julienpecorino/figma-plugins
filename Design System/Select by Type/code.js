
function runPlugin () {

// -- I N I T I A L I S E -------------------------------------
  let page = figma.currentPage
  let length = page.children.length
  let nodes = []

// -- A C T I O N S ---------------------------------------------
  // Select elements by type and nb of childrens then remove them
  selectByType ("TEXT", 0) // Select by Type: TEXT, INSTANCE for component occurence, FRAME...
  removeNode ()

// -- U T I L I T I E S -----------------------------------------
  function selectByType (type, children) {
    for (let i = 0; i < length; i++) {
      const node = page.children[i]
      if (children == 0) {
        if (node.type === type && !node.children ) { // Select element by type with no children
          nodes.push(node)
        }
      } else {
        if (node.type === type && node.children.length == children ) { // Select element by type and x nb of children
          nodes.push(node)
        }
      }
    }
  }

  function removeNode () {
    nodes.forEach(item => {
    item.remove()
    })
  }

  figma.closePlugin()

}

runPlugin ()
