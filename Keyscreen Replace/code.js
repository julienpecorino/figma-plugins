function runPlugin() {
  
  // -- H O W   T O   U S E  -------------------------------------
  /* Select only 2 elements:
  • Your keyscreen 
  • the image that you want to replace.
  • Then run the plugin, simple as that.
  The plugin will detect which element is the image to replace, then it will duplicate the keyscreen
  transform it as PNG and replace the image with the right size, position and orientation */

  // -- I N I T I A L I S E -------------------------------------
  //Change the png quality carefully -> default 0.8 , a too high quality will take up too much memory and trow an error.
  const pngQuality = 0.8

  // Not editable variables
  const selection = figma.currentPage.selection
  let keyscreen
  let imgToReplace
  let clone
  let pngWidth
  let imageBytes
  let imageNode


  // -- A C T I O N S ---------------------------------------------

  // Error handling, nothing is selected
  if (selection.length == 0) {
    alert("Dear select 2 elements: 1/your keyscreen (a frame), 2/the image to replace, then run the plugin again!")
    figma.closePlugin()
    return
  }
  
  // Error handling, only 1 element is selected or more than 2
  if ( selection.length !== 2) {
    notifyUser('Select only 2 elements not more, not less','', 3000, true)
    figma.closePlugin()
    return
  }

  // Error handling, one of the two selected element must have an image in the background
  if (selection[0].fills[0].type !== "IMAGE" && selection[1].fills[0].type !== "IMAGE" ) {
    notifyUser('One of the two should be an image','', 3000, true)
    figma.closePlugin()
    return
  }

  // Start the script
  detectKeyscreenAndImagetoReplace ()
  // Get the correct image size from the image to be replaced
  pngWidth = imgToReplace.width
  notifyUser('Processing PNG')
  keyscreenToPng()


  // -- B U S I N E S S  L O G I C ---------------------------------------------

    /* Detect which of the two element is a image (imgToReplace) and a Frame (keyscreen)
  The Figma currentSelection order is not binded to the first element selected
  but when it was added to the canvas. */
  function detectKeyscreenAndImagetoReplace () {
    if (selection[0].fills[0].type !== "IMAGE") {
      keyscreen = selection[0]
      imgToReplace = selection[1]
    } else {
      keyscreen = selection[1]
      imgToReplace = selection[0]
    }
  }

  // Transform the Keyscreen (Frame with components) -> to a PNG with the right resolution
  async function keyscreenToPng() {
    try {
      clone = keyscreen.clone()
      imageBytes = await clone.exportAsync({
        format: 'PNG',
        constraint: { type: 'WIDTH', value: Math.round(pngWidth*pngQuality) }
      })
    } catch (e) {
      notifyUser('Error no!',e , 1000, true)
      figma.closePlugin()
      clone.remove()
      return
    }
      setPNGinBackground ()
  }

  function setPNGinBackground () {
    try {
    imageNode = figma.createImage(imageBytes);
    } catch (e) {
      notifyUser('Error, check pngQuality setting!',e , 3000, true)
      figma.closePlugin()
      clone.remove()
      return
    }
    clone.fills = [
      {
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: imageNode.hash,
      },
    ];
    replaceImageByKeyscreen ()
  }

  function replaceImageByKeyscreen () {
    /* The frame with PNG (background image) still contains all its components, 
    we need to remove it to only have the background visible */
    notifyUser('Coping & Resizing')
    while (clone.children.length > 0) {
      clone.children[0].remove();
    }
    // Get the correct image size
    const aspectRatio = clone.height / clone.width;
    clone.resize(pngWidth, pngWidth * aspectRatio);
    // Replace the second selected node with the new PNG
    const parent = imgToReplace.parent;
    const index = parent.children.indexOf(imgToReplace)
    parent.insertChild(index, clone)
    //Adjust geometry
    clone.x = imgToReplace.x
    clone.y = imgToReplace.y
    clone.rotation = imgToReplace.rotation
    // Finally remove the old image
    imgToReplace.remove()
    //Done
    figma.closePlugin("All done")
  }

  // Helper fonction to display Figma messages
  function notifyUser (message='My message', err='', timeoutMs=600, isError=false) {
    let error = err.message ? err.message : ''; 
    figma.notify(message + error, {timeout: timeoutMs, error: isError})
  }

}

runPlugin();
