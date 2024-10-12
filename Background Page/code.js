
function runPlugin () {

// -- C O N F I G U R E -----------------------
// add the color value you would like to apply on your document background pages.
const pageBackgroundColor = "#E4E4E4"

// -- I N I T I A L I S E -------------------------------------
// Get the selected elements
  let pages = figma.root.children

// -- A C T I O N S ---------------------------------------------
  pages.forEach(page => {
     page.backgrounds = [figma.util.solidPaint(pageBackgroundColor)]
  })

  figma.closePlugin ()
}

runPlugin ()
