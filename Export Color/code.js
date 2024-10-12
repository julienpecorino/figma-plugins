


function runPlugin () {
  let selectedElements = figma.currentPage.selection
  if (selectedElements.length == 0) {
    alert("Tu dois selection des coleurs !!")
    return
  }
  let colors = []
  let cleanColor = []

  // Convert rgb to HexCode
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  // Convert rgb to HexCode -> Main function
  // See other functions as well https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  // --------------------------------------------

  // 1) Get all colors in an Object
  selectedElements.forEach(element => {
      let r = Math.round(element.fills[0].color.r*255)
      let g = Math.round(element.fills[0].color.g*255)
      let b = Math.round(element.fills[0].color.b*255)

      let hex = rgbToHex(r, g, b)
      colors.push({id:Number(element.name), color:hex})
    }
  )

  let printColors = JSON.stringify(colors)
  console.log(printColors)
  console.log('-------')

  // 2) Sort the colors by their name 1, 2, 3, 4...
  let colorSorted = colors.sort( (a,b) => a.id - b.id)

  // 3) Get only the color value in a clean array
  // Delete -- colorSorted.forEach(element => console.log("colors -> "+element.name+" - "+element.color))
  colorSorted.forEach(element => cleanColor.push(element.color))

  let printColorsSorted = JSON.stringify(colorSorted)
  console.log(printColorsSorted)
  console.log('-------')

  // 4) Finally print the color to grab the value as simple to copy and past
  let printCleanColor = JSON.stringify(cleanColor)
  alert(printCleanColor)

  figma.closePlugin()
}

runPlugin ()
