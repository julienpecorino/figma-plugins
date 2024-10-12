// Define the page name to which groups will be copied
const targetPageName = "PRC";

// Get the current page and the target page
const currentPage = figma.currentPage;
const targetPage = figma.root.children.find(page => page.name === targetPageName);

// Check if the target page exists
if (!targetPage) {
  figma.notify(`Page named "${targetPageName}" not found`);
  figma.closePlugin();
}

// Function to clone nodes
function cloneNode(node) {
  const clone = node.clone();
  targetPage.appendChild(clone);
  return clone;
}

// Filter groups from the current page that are the first child
const groups = currentPage.children.filter(node => node.type === 'GROUP');

// Clone each group, keep their x position, align in Y with 500px gap
let currentY = 0;
groups.forEach(group => {
  const clone = cloneNode(group);
  clone.x = group.x;
  clone.y = currentY;
  clone.name = group.name; // Keep the same name
  currentY += clone.height + 500; // Increment Y position by the group's height plus 500px gap
});

// Notify the user and close the plugin
figma.notify(`Copied ${groups.length} groups to "${targetPageName}"`);
figma.closePlugin();
