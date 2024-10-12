// Function to update text elements in the selection
async function updateSelectedTextElements() {
    // Keywords to filter local variables
    const keywords = ['Strenghtening', 'Stretching'];

    // Get the current selection in the Figma document
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
        console.log('No elements selected.');
        figma.notify('Please select the text elements to update.');
        return;
    }

    // Get all local variables in the document
    const allVariables = figma.variables.getLocalVariables();
    console.log('All Variables:', allVariables);

    // Filter variables that contain any of the specified keywords in their name
    const filteredVariables = allVariables.filter(variable => 
        keywords.some(keyword => variable.name.includes(keyword))
    );
    console.log('Filtered Variables:', filteredVariables);

    if (filteredVariables.length === 0) {
        console.log('No variables found matching the keywords. Please check the variable names and keywords.');
        return;
    }

    // Store the values of the filtered variables in an array
    const variableValues = filteredVariables.map(variable => {
        const modes = Object.keys(variable.valuesByMode);
        if (modes.length > 0) {
            const mode = modes[0]; // Assuming you want the first mode
            return variable.valuesByMode[mode];
        }
        return undefined;
    });
    console.log('Variable Values:', variableValues);

    // Iterate through each selected text node and corresponding value by index
    for (let i = 0; i < selection.length; i++) {
        const textNode = selection[i];
        const value = variableValues[i] !== undefined ? variableValues[i] : 'undefined';
        console.log('Updating Text Node with Value:', value);

        if (textNode.type === 'TEXT') {
            await figma.loadFontAsync(textNode.fontName); // Ensure font is loaded before modifying text
            textNode.characters = value.toString();
            console.log(`Updated Text Node ${textNode.id} with value: ${value}`);
        } else {
            console.log('The selected node is not a text node and was skipped.');
        }
    }

    // Notify the user that the update is complete
    figma.notify('Text elements updated successfully');
}

// Call the function to update the text elements
updateSelectedTextElements();
