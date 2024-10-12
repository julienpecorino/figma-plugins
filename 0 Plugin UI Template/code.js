// Show the UI when the plugin is run
figma.showUI(__html__, { width: 300, height: 200 });

// Example: sending a message to the UI once it's shown
figma.ui.postMessage({ message: 'UI is now displayed!' });

// Listen for messages from the UI
figma.ui.onmessage = (message) => {
  if (message.type === 'create-rect') {
    // Example: Create a rectangle when a button is clicked in the UI
    const rect = figma.createRectangle();
    rect.resize(100, 100);
    figma.currentPage.appendChild(rect);
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
    figma.closePlugin('Rectangle created!');
  }
};
