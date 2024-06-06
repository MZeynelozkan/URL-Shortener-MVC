import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import view from "./view.js";

async function controlLinks(apiLink, originalLink) {
  try {
    // Create links
    await model.pushingLinks(apiLink, originalLink);
    console.log(model.state.linkArr);

    // Rendering
    view.render(model.state.linkArr);
  } catch (error) {
    console.error(error);
  }
}

function init() {
  view.handleTextInput(controlLinks);
  view.bindCopyButton();
  view.dropdown();
}

init();
