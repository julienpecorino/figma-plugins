
function runPlugin () {

  // Define the component names
  const componentNames = ["Red Boxing/Box", "Red Boxing/Arrow"]
  const pageName = "PRC 1.9"

  figma.on("run", () => figma.notify("Red Boxings are being copied, be kind..."))

  // Retrieve instances of the specified components on the current page
  const instances = figma.currentPage.findAll(node => componentNames.includes(node.name) && node.type === "INSTANCE")

  if (instances.length > 0) {
    // Group instances by their parent name
    const groupedInstances = instances.reduce((groups, instance) => {
      const parentName = instance.parent.name;
      if (!groups[parentName]) {
        groups[parentName] = [];
      }
      groups[parentName].push(instance);
      return groups;
    }, {});

    // Find the "PRC Test 2" page
    const prcTest2Page = figma.root.findOne(node => node.name === pageName && node.type === "PAGE");

    if (prcTest2Page) {
      // Select the "PRC Test 2" page
      figma.currentPage = prcTest2Page;

      // Iterate through each parent name and its instances
      for (const [parentName, instances] of Object.entries(groupedInstances)) {
        // Find frames with the same name on the current page
        const frames = figma.currentPage.findAll(node => node.name === parentName && node.type === "FRAME");

        if (frames.length > 0) {
          // Clone instances and add them to each frame
          frames.forEach(frame => {
            instances.forEach(instance => {
              const clonedInstance = instance.clone();
              frame.appendChild(clonedInstance);
            });
          });

          console.log(`Components cloned and added to existing frames with name '${parentName}' on the '${pageName}' page successfully.`);
          setTimeout(figma.closePlugin(`All Red Boxing pasted on the '${pageName}' page.`), 2000);
        } else {
          console.error(`Frames with name '${parentName}' not found on the '${pageName}' page.`);
          figma.closePlugin(`Frames with name '${parentName}' not found on the '${pageName}' page.`);
        }
      }
    } else {
      console.error(`Page '${pageName}' not found.`);
      figma.closePlugin(`Page '${pageName}' not found.`);
    }
  } else {
    console.error("Components not found on the current page.");
    figma.closePlugin("Components not found on the current page.");
  }


}

runPlugin ()
