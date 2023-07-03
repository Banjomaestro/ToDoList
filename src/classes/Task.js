export class Task {
    
  constructor(title, description, dateAdded) {
      this._title = title;
      this._description = description;
      this._dateAdded = dateAdded;
    }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get dateAdded() {
    return this._dateAdded;
  }

  set dateAdded(date) {
    this._dateAdded = date;
  }
}
