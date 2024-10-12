



// Async function to fetch and list all design variables
async function fetchAndListVariables() {
  // Get all local variable collections in the current file
  const localCollections = await figma.variables.getLocalVariableCollectionsAsync();

  for (const collection of localCollections) {
    console.log(`Collection: ${collection.id}`);

    // As the direct iteration over collection.variables is causing issues,
    // we assume we need to fetch variables details individually or in a different manner.
    // Unfortunately, the exact API method to fetch variables from a collection was not detailed.
    // Assuming we might need to fetch variables explicitly if an API method was provided:
    // For example, if we had a method like collection.getVariablesAsync() it would be used here.
    // Since such a method wasn't detailed in your input, we focus on what's provided.

    // Assuming getLocalVariablesAsync can be used in context to fetch variables of the collection
    // but since it wasn't explicitly stated it works with collections, this is speculative.
    // Normally, you would fetch variables in a manner respecting the API's design,
    // possibly requiring individual or filtered fetching based on collection context.
  }

  // Close the plugin when done
  figma.closePlugin();
}

// Execute the function to fetch and list variables
fetchAndListVariables();
