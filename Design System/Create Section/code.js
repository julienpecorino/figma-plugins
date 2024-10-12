
function runPlugin () {

  // -- I N I T I A L I S E -------------------------------------
  const key = '906803205c4f78d5552f551f098d5d074f5ab81b'   //component ID -> Flow title in Ideally Library / Utils

  // Get the selected elements
  let selectedElements = figma.currentPage.selection
  if (selectedElements.length == 0) {
    alert("1. You need to temporary frame all the components that you'd want to create a Title 2. Rename your frame, it will be used to set the Title Name 3. Then select all your frames to run this micro plugin.")
    return
  }

  // -- A C T I O N S ---------------------------------------------
  // For each selected frames, create a Title and rename it as per these frames
  selectedElements.forEach(element => {
    importComponent(element.name, element.x, element.y)
    }
  )

  // -- U T I L I T I E S -----------------------------------------
  //Import component from Library: Ideally UX / Utils / Flow title
  async function importComponent(name, posX, posY) {
    await figma.loadFontAsync({family: "HeadingNow", style: "76 Bold" }) // Need to load the font first, Figma Constraint
    let importComponent = await figma.importComponentByKeyAsync(key)
    let addedComponent = importComponent.createInstance() // Add to the page
    addedComponent.children[0].children[0].characters = name // Access the Text element and update its value
    addedComponent.setProperties({ Size: 'medium' }) // Set the component variant
    addedComponent.x = posX
    addedComponent.y = posY - addedComponent.height - 20
  }

  // Need a time out othewise the plugin close before the await function above have loaded the elements
  setTimeout(() => {
    figma.closePlugin()
  }, 1000)


}

runPlugin ()
