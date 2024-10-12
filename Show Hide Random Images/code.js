// Define the selection and variables
const selection = figma.currentPage.selection;

// Ensure that there is a selection
if (selection.length === 0) {
  figma.notify("Please select at least one group, frame, or instance.");
  figma.closePlugin();
}

// Function to randomly show or hide images within a node
function processNode(node) {
  // Get all image nodes within the node
  const imageNodes = [];
  
  function findImageNodes(node) {
    if (node.type === 'RECTANGLE' && node.fills.some(fill => fill.type === 'IMAGE')) {
      imageNodes.push(node);
    } else if ('children' in node) {
      for (const child of node.children) {
        console.log(`Child node type: ${child.type}, name: ${child.name}`);
        findImageNodes(child);
      }
    }
  }

  findImageNodes(node);

  // Log the image nodes found
  console.log(`Node: ${node.name}, Image Nodes Found: ${imageNodes.length}`);
  
  // Randomly show or hide one image in the collection
  if (imageNodes.length > 0) {
    const randomIndex = Math.floor(Math.random() * imageNodes.length);
    imageNodes.forEach((imgNode, index) => {
      imgNode.visible = (index === randomIndex);
      console.log(`Image Node: ${imgNode.id}, Visible: ${imgNode.visible}`);
    });
  }
}

// Process each selected node
selection.forEach(node => {
  if (['GROUP', 'FRAME', 'INSTANCE'].includes(node.type)) {
    console.log(`Processing node: ${node.name} of type: ${node.type}`);
    processNode(node);
  } else {
    console.log(`Skipped node: ${node.name} of type: ${node.type}`);
  }
});

figma.closePlugin();
