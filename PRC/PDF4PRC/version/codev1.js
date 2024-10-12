// Define constants
const frameWidth = 1684;
const frameHeight = 1190;
const margin = 50; // Default margin in pixels
const titleFontSize = 32; // Font size for the title
const titleFontWeight = "Bold"; // Font weight for the title
const titlePositionX = 24; // X position for the title
const titlePositionY = 24; // Y position for the title
const frameGap = 200; // Gap between frames in pixels
const jpgScale = 1.1; // JPG export scale (adjust to indirectly affect quality)

// Function to convert frames to JPG and place in new frames
async function convertFramesToJPG() {
  // Ensure there is a selection and they are all groups
  const selection = figma.currentPage.selection;
  if (selection.length === 0 || !selection.every(node => node.type === 'GROUP')) {
    figma.notify('Please select one or more groups');
    return;
  }

  // Load the font for the title (both Regular and Bold)
  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: titleFontWeight })
  ]);

  // Get the X starting position from the first selected group
  const startingXPosition = selection[0].x;

  // Process each selected group in parallel
  await Promise.all(selection.map(async (group) => {
    const groupName = group.name; // Get the group name for the title

    // Process each child in the group
    const framePromises = group.children
      .filter(node => node.type === 'FRAME')
      .map(async (node, index) => {
        // Export the frame as JPG with specified scale
        const jpg = await node.exportAsync({ format: 'JPG', constraint: { type: 'SCALE', value: jpgScale } });
        // Create a new image in the Figma UI
        const newNode = figma.createImage(jpg);
        const imageFill = { type: 'IMAGE', imageHash: newNode.hash, scaleMode: 'FILL' };

        // Create a new frame
        const newFrame = figma.createFrame();
        newFrame.resize(frameWidth, frameHeight);
        newFrame.x = startingXPosition + index * (frameWidth + frameGap);
        newFrame.y = node.y; // Keep the original Y position

        // Add title text
        const title = figma.createText();
        title.fontSize = titleFontSize;
        title.fontName = { family: "Inter", style: titleFontWeight };
        title.characters = groupName;
        title.x = titlePositionX;
        title.y = titlePositionY;
        newFrame.appendChild(title);

        // Calculate the scaled dimensions to fit the frame with margin while maintaining aspect ratio
        const aspectRatio = node.width / node.height;
        let scaledWidth = node.width;
        let scaledHeight = node.height;
        const availableWidth = frameWidth - 2 * margin;
        const availableHeight = frameHeight - 2 * margin - titleFontSize;

        if (scaledWidth > availableWidth) {
          scaledWidth = availableWidth;
          scaledHeight = scaledWidth / aspectRatio;
        }

        if (scaledHeight > availableHeight) {
          scaledHeight = availableHeight;
          scaledWidth = scaledHeight * aspectRatio;
        }

        // Create a rectangle for the image
        const rect = figma.createRectangle();
        rect.resize(scaledWidth, scaledHeight);
        rect.fills = [imageFill];

        // Center the rectangle inside the new frame
        rect.x = (frameWidth - scaledWidth) / 2;
        rect.y = (frameHeight - scaledHeight) / 2 + titleFontSize / 2;

        // Add the rectangle to the new frame
        newFrame.appendChild(rect);

        // Add the new frame to the current page
        figma.currentPage.appendChild(newFrame);
      });

    await Promise.all(framePromises);
    group.remove();
  }));

  // Notify the user of completion
  figma.notify('Conversion complete');
}

// Run the function
convertFramesToJPG().then(() => figma.closePlugin()).catch(err => {
  console.error(err);
  figma.notify('An error occurred');
  figma.closePlugin();
});
