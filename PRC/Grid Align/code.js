// Define the gap between frames
const GAP = 100;

// Collect all frames in the document that are direct children of the current page
const frames = figma.currentPage.children.filter(node => node.type === 'FRAME');

// Create an object to group frames by their initial y positions
const frameYposition = {};

// Group frames by their initial y positions
frames.forEach(frame => {
  const yPos = frame.y;
  if (!frameYposition[yPos]) {
    frameYposition[yPos] = [];
  }
  frameYposition[yPos].push(frame);
});

// Get an array of the unique y positions, sorted ascending
const sortedYPositions = Object.keys(frameYposition).map(Number).sort((a, b) => a - b);

// Set the initial y position for the first row
let currentY = sortedYPositions[0];

// Re-position frames, row by row, maintaining the gap
sortedYPositions.forEach(yPos => {
  const framesAtY = frameYposition[yPos];
  framesAtY.forEach(frame => {
    frame.y = currentY;
  });
  // Increase currentY by the height of the tallest frame in the row plus the gap
  const maxHeight = Math.max(...framesAtY.map(frame => frame.height));
  currentY += maxHeight + GAP;
});

// Inform the user the plugin has completed
figma.notify('Frames have been aligned vertically with a 500px gap.');
