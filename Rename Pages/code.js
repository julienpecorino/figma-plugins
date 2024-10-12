
// This function renames pages based on specific keywords
function renamePages() {
  // List of keywords to check for in page names
  const keywords = ['Cover', 'Ready to Dev', 'Design', 'Exploration'];

  // Loop through each page in the document
  figma.root.children.forEach(page => {
    // Normalize the page name to lowercase for case-insensitive comparison
    const pageNameLower = page.name.toLowerCase();

    // Check each keyword
    for (const keyword of keywords) {
      // If the page name contains the keyword (case-insensitive)
      if (pageNameLower.includes(keyword.toLowerCase())) {
        // Rename the page to the keyword and exit the loop for this page
        page.name = keyword;
        break; // Stop checking other keywords once a match is found
      }
    }
  });

  // Inform the user that the pages have been renamed
  figma.notify('Pages have been renamed according to keywords.');
}

// Runs the renamePages function when the plugin is executed
renamePages();

// Close the plugin when it's done executing
figma.closePlugin();
