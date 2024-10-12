
function runPlugin () {

/*
  Plugin Goal: Substract from current select the unwanted elements
  e.g: Keep only the screens with a width of 1440px
*/

// -- I N I T I A L I S E -------------------------------------

// Which element with a specific width do you want to keep in the current selection?
const ElementWidth = 1440
// Which type of element do you want to keep in the current selection?
const elementType = 'FRAME'

// -- U T I L I T I E S -----------------------------------------

  function unselectNonFrame1440Width() {
    const selection = figma.currentPage.selection;

    figma.currentPage.selection = selection.filter((node) => {
      return node.type === elementType && node.width === ElementWidth;
    });

    figma.closePlugin();
  }

  unselectNonFrame1440Width();

}

runPlugin ()
