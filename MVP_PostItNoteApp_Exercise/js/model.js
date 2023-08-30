// The Model is a container for data.
// It includes methods that serves the data.
export default class Model {
  constructor() {
    // Model has one attribute: postitList. It is an
    // inventory list. Each postit note is an object
    // in this list.
    // Object relation: composition. If the list is
    // deleted, all postit note objects is deleted too.

    this.postitList = [];
  }

  // ------- Methods that serves data/inventory list ---------- //
  getPostitListNumber() {
    return this.postitList.length;
  }

  resetPostitList() {
    this.postitList = [];
  }

  addPostitToList(newPostit) {
    this.postitList.push(newPostit);
  }
  updatePostitPosition(postitId, clientX, clientY) {
    const index = this.postitList.findIndex(
      (element, index, array) => element.pid === postitId,
    );
    this.postitList[index].posX = clientX;
    this.postitList[index].posY = clientY;
    console.log(this.postitList[index]);
  }

  deletePostIt(postitId) {
    const index = this.postitList.findIndex(
      (element, index, array) => element.pid === postitId,
    );
    this.postitList.splice(index, 1);
  }

  getPostitList() {
    return this.postitList;
  }

  updatePostitContent(postitId, newContent) {
    const index = this.postitList.findIndex(
      (element, index, array) => element.pid === postitId,
    );

    this.postitList[index].content = newContent;
  }
}
