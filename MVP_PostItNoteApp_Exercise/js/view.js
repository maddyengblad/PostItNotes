// The View handles the user's interaction
// with the UI and is responsible for the
// display of data/information.

export default class View {
  constructor(presenter) {
    const self = this;
    self.presenter = presenter;

    const header = document.getElementById("header");
    const main = document.getElementById("main");
    const color = document.getElementById("colorselector");

    // HTML header element ONCLICK event delegation
    header.onclick = function (event) {
      switch (event.target.id) {
        case "newpostit":
          self.presenter.createPostIt(color.value);
          break;

        case "save":
          self.presenter.saveToDisk();
          break;

        case "load":
          self.presenter.loadFromDisk();
          break;
      }
    };
    // HTML main element ONKEYUP event delegation
    main.onkeyup = function (event) {
      const htmlTagType = event.target.type;
      if (htmlTagType === "textarea") {
        const textareaId = event.target.id;
        const postitId = document.getElementById(textareaId).dataset.id;
        const currentTextarea = document.getElementById(textareaId);
        self.presenter.updatePostitContent(postitId, currentTextarea.value);
        self.showMessage("");
      }
    };

    // HTML main element ONCLICK event delegation
    main.onclick = function (event) {
      const htmlTagType = event.target.type;
      if (htmlTagType === "button") {
        if (self.showConfirmDialog("confirm deletion?")) {
          const postitId = event.target.dataset.id;
          self.presenter.deletePostIt(postitId);
          document.getElementById(postitId).ondragstart = null;
          document.getElementById(postitId).remove();
          self.showMessage("post it note has been deleted");
        }
      }
    };

    // HTML main element DRAGOVER (drop target)
    main.ondragover = function (event) {
      event.preventDefault();
    };

    // HTML main element ONDROP
    main.ondrop = function (event) {
      event.preventDefault();
      const postitId = event.dataTransfer.getData("text");
      // document.getElementById(postitId).style.position = "absolute";
      document.getElementById(postitId).style.top = event.clientY + "px";
      document.getElementById(postitId).style.left = event.clientX + "px";
      self.presenter.updatePostitPosition(
        postitId,
        event.clientX,
        event.clientY,
      );
    };
  } // End of constructor

  // ------- Methods that serves the view ---------- //
  showMessage(message) {
    const messageField = document.getElementById("messagefield");
    messageField.value = message;
  }
  showConfirmDialog(message) {
    const dialogAnswer = confirm(message);
    return dialogAnswer;
  }

  showPostit(postitObject) {
    const postitHTML = `
    <section class="postitsection" draggable="true" id="${postitObject.pid}">
    <div class="textareatop"><span class="postitarrow">&nbsp;&nwarr;</span>
    <button type="button" data-id="${postitObject.pid}" class="postitdeletebtn">x</button>
    </div>
    <textarea class="textarea" data-id="${postitObject.pid}" id="${postitObject.tid}">
    ${postitObject.content}
    </textarea>
    </section>
    `;

    const main = document.getElementById("main");
    main.insertAdjacentHTML("beforeend", postitHTML);

    const postitElement = document.getElementById(postitObject.pid);
    postitElement.ondragstart = function (event) {
      event.dataTransfer.setData("text", event.target.id);
    };

    document.getElementById(postitObject.pid).style.position = "absolute";
    document.getElementById(postitObject.pid).style.top =
      postitObject.posY + "px";
    document.getElementById(postitObject.pid).style.left =
      postitObject.posX + "px";
    document.getElementById(postitObject.pid).style.backgroundColor =
      postitObject.color;
    document.getElementById(postitObject.tid).style.backgroundColor =
      postitObject.color;
  }

  removeAllPostits() {
    const allPostits = document.querySelectorAll(".postitsection");

    allPostits.forEach((postit) => {
      document.getElementById(postit.id).ondragstart = null;
      document.getElementById(postit.id).remove();
    });
  }
} // End of class
