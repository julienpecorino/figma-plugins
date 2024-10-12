
function runPlugin () {

  // -- I N I T I A L I S E -------------------------------------
  // Get the selected elements
  let pages = figma.root.children

// -- A C T I O N S ---------------------------------------------
  pages.forEach(page => {
     page.backgrounds = [figma.util.solidPaint("#FFFFFF")]
  })
  
  figma.closePlugin ()
}

runPlugin ()
