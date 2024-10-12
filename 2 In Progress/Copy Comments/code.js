
function runPlugin () {

// -- I N I T I A L I S E -------------------------------------
const pageName = "PRC 2.0"

// -- A C T I O N S ---------------------------------------------
copyComments();

// Function to copy all comments on the current page
function copyComments() {
  const currentPage = figma.currentPage;
  const comments = currentPage.children.filter(node => node.type === 'COMMENT');

  // Convert comments to a string
  const commentsString = comments.map(comment => `${comment.user} says: ${comment.text}`).join('\n');

  // Find or create the "PRC 2.0" page
  let pageToCopyComments = figma.root.findChild(node => node.name === pageName);

  // Create a text node on the "PRC 2.0" page and paste the comments
  const textNode = figma.createText();
  textNode.characters = commentsString;
  pageName.appendChild(textNode);
}








// -- U T I L I T I E S -----------------------------------------





}

runPlugin ()
