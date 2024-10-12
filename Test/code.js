figma.showUI(__html__, { width: 300, height: 300 });

// Listen for messages from the UI
figma.ui.onmessage = (message) => {
  if (message.type === 'create-rect') {
    const width = message.width;
    const height = message.height;
    const color = message.color;

    // Create a rectangle based on the passed width, height, and color
    const rect = figma.createRectangle();
    rect.resize(width, height);
    rect.fills = [{ type: 'SOLID', color: color }];
    figma.currentPage.appendChild(rect);

    // After creating the rectangle, send a message back to the UI
    figma.ui.postMessage('done');

    // Optionally close the plugin or keep it open
    figma.closePlugin('Rectangle created!');
  }
};
