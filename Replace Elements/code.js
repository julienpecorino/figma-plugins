// Configurable variables
const FRAME_NAMES = ["Sessions", "Frame 2026"];
const PARENT_WIDTH = 1440;

function replaceFramesWithSelection() {
  const currentSelection = figma.currentPage.selection;

  if (currentSelection.length !== 1) {
    figma.closePlugin("Please select only one element to replace frames.");
    return;
  }

  figma.notify("Replacing elements in all pages, can take 2 mins, please wait...");

  setTimeout(() => {
    const replacementNode = currentSelection[0];

    figma.root.children.forEach(page => {
      traverseAndReplace(page, replacementNode);
    });

    figma.closePlugin("Frames replaced successfully.");
  }, 100);
}

function traverseAndReplace(node, replacementNode) {
  if ("children" in node) {
    for (let i = node.children.length - 1; i >= 0; i--) {
      let child = node.children[i];

      if (child.type === 'FRAME || INSTANCE' && child.parent.width === PARENT_WIDTH && FRAME_NAMES.includes(child.name)) {
        replaceNode(child, replacementNode);
      } else if (child.children && child.children.length > 0) {
        traverseAndReplace(child, replacementNode);
      }
    }
  }
}

function replaceNode(node, replacementNode) {
  const newNode = replacementNode.clone();
  newNode.x = node.x;
  newNode.y = node.y;

  const parent = node.parent;
  const index = parent.children.indexOf(node);

  node.remove();
  parent.insertChild(index, newNode);
}

replaceFramesWithSelection();
