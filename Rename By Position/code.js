
function runPlugin () {

  // Get the current Figma page
const currentPage = figma.currentPage;

// Sort frames by their x and y positions
const sortedFrames = currentPage.children
  .filter(frame => frame.type === 'FRAME')
  .sort((a, b) => {
    // First, compare y positions
    if (a.y === b.y) {
      // If y positions are equal, compare x positions
      return a.x - b.x;
    }
    return a.y - b.y;
  });

// Initialize variables
let pageNumber = 1;
let prevY = sortedFrames[0].y;
let prevX = sortedFrames[0].x;

// Rename frames based on x and y positions
for (let i = 0; i < sortedFrames.length; i++) {
  const frame = sortedFrames[i];

  // If the frame's y position is greater than the previous y position,
  // increment the page number
  if (frame.y > prevY) {
    pageNumber++;
    prevX = frame.x; // Reset prevX when moving to a new row
  } else if (frame.x > prevX) {
    pageNumber++; // Increment the page number if x is greater in the same row
  }

  // Calculate the new name based on x, y position
  const newName = `Page ${pageNumber}`;

  // Set the new name for the frame
  frame.name = newName;

  // Update the previous y and x positions
  prevY = frame.y;
  prevX = frame.x;
}

// Notify the user that renaming is complete
figma.notify('Frames renamed based on x and y positions (left to right, top to bottom)!');
figma.closePlugin();


}

runPlugin ()
