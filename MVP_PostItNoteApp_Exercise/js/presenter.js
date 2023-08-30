// The Presenter acts as the middleman between
// the View (UI) and the Model (data).

export default class Presenter {
  constructor() {
    this.postIdCounter = 0; // løbenr som indgår i postit notes id
  }

  initialize(model, view) {
    this.model = model;
    this.view = view;
  }

  // ------- Methods that serves the presenter ---------- //

  saveToDisk() {
    let dialogAnswer = true;
    const dataToSave = JSON.stringify(this.model.getPostitList());

    if (localStorage.getItem("postits") !== null) {
      dialogAnswer = this.view.showConfirmDialog(
        "content exists on disk, overwrite it?",
      );
    }
    if (dialogAnswer) {
      localStorage.setItem("postits", dataToSave);
      this.view.showMessage("post it notes saved");
    } else {
      this.view.showMesage("nothing was saved");
    }
  }

  loadFromDisk() {
    let dialogAnswer = true;

    if (this.model.getPostitListNumber() > 0) {
      dialogAnswer = this.view.showConfirmDialog(
        "do you want to overwrite existing content?",
      );
    }

    if (dialogAnswer) {
      this.view.removeAllPostits();
      this.model.resetPostitList();
      this.postIdCounter = 0;

      const localPostitList = JSON.parse(localStorage.getItem("postits"));

      for (const postit of localPostitList) {
        const postitObject = {
          pid: "postit" + this.postIdCounter,
          tid: "textarea" + this.postIdCounter,
          posX: postit.posX,
          posY: postit.posY,
          color: postit.color,
          content: postit.content,
        };
        this.model.addPostitToList(postitObject);
        this.view.showPostit(postitObject);
        this.postIdCounter++;
      }

      this.view.showMessage("postit notes loaded from disk");
    } else {
      this.view.showMessage("nothing was loaded");
    }
  }

  createPostIt(postitColor) {
    const postitObject = {
      pid: "postit" + this.postIdCounter,
      tid: "textarea" + this.postIdCounter,
      posX: 45,
      posY: 45,
      color: postitColor,
      content: "",
    };
    this.model.addPostitToList(postitObject);
    this.view.showPostit(postitObject);
    this.postIdCounter++;
  }

  updatePostitPosition(postitId, clientX, clientY) {
    this.model.updatePostitPosition(postitId, clientX, clientY);
  }

  deletePostIt(postitId) {
    this.model.deletePostIt(postitId);
  }

  updatePostitContent(postitId, newContent) {
    this.model.updatePostitContent(postitId, newContent);
  }
} // slut på presenter
