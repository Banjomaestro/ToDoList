export class TaskList {
  
  constructor(title) {
    this._tasks = [];
    this._title = title;
  }

  get title() {
    return this._title;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  addTask(task) {
    this._tasks.push(task);
    this.saveToCache();
  }

  removeTask(task) {
    const index = this._tasks.indexOf(task);
    if (index !== -1) {
      this._tasks.splice(index, 1);
    }
    this.saveToCache();
  }

  getTaskList() {
    return this._tasks;
  }

  sortByDate(ascending = true) {
    this._tasks.sort((a, b) => {
      const dateA = new Date(a._dateAdded).getTime();
      const dateB = new Date(b._dateAdded).getTime();
      console.log(dateA)
      console.log("LOLOL")
      console.log(dateB)
      
      return ascending ? dateA - dateB : dateB - dateA;
    });
    this.saveToCache();
  }

  sortByTitle(ascending = true) {
    this._tasks.sort((a, b) => {
      const titleA = a._title.toLowerCase();
      const titleB = b._title.toLowerCase();
      return ascending ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });
    this.saveToCache();
  }

  saveToCache() {
    const serializedTasks = JSON.stringify(this._tasks);
    localStorage.setItem(this._title, serializedTasks);
  }

  updateFromCache() {
    const cachedTasks = localStorage.getItem(this._title);
    if (cachedTasks) {
      this._tasks = JSON.parse(cachedTasks);
    }
  }
  static getFromCache(title) {
    const cachedTasks = localStorage.getItem(title);
    if (cachedTasks) {
      const taskList = new TaskList(title);
      taskList.tasks = JSON.parse(cachedTasks);
      return taskList;
    } else {
      const newTaskList = new TaskList(title);
      newTaskList.saveToCache(); // Save the new task list to the cache
      return newTaskList;
    }
  }
  
}
