
function runPlugin () {

  // Plugin goal: Be able to select an element inside another by its id position, 
  // for example there is 5 Tabs in navigation instances, you want to select each 3rd Tab in all navs.

  // -- I N I T I A L I S E -------------------------------------

  //Which parent instace to select?
  const parentInstanceName = "Library / Library Panel"
  //Which instance childred to select?
  const childrenInstanceName = "Button/Tag"
  // What is the children id position? Count from the bottom of your layer list!!
  const childrenId=  1

  // -- U T I L I T I E S -----------------------------------------

  const currentPage = figma.currentPage;
  const selectedInstances = [];

  // Find all instances named "Bottom bar" on the current page
  const bottomBars = currentPage.findAll(node => node.type === 'INSTANCE' && node.name === parentInstanceName);

  // Iterate through each "Bottom bar" instance
  bottomBars.forEach((bottomBar) => {
    // Find all instances named "Tab" inside "Bottom Bar"
    const tabInstances = bottomBar.findAll(node => node.type === 'INSTANCE' && node.name === childrenInstanceName);
    
    // Check if there are at least 3 "Tab" instances inside "Bottom Bar"
    if (childrenId <= tabInstances.length ) {
      // Select the 3rd "Tab" instance
      selectedInstances.push(tabInstances[childrenId]);
    } else {
      alert("review your children name")
      return
    }
  });

  // Select the found instances
  figma.currentPage.selection = selectedInstances;

}

runPlugin ()
