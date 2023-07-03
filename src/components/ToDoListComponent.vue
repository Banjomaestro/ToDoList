<template>
    <div>
      <h2>To-Do List</h2>
        <select v-model="sortOption" @change="sortTasks">
            <option value="date">Sort by Date Ascending</option>
            <option value="title">Sort by Title Ascending</option>
            <option value="date-descending">Sort by Date Descending</option>
            <option value="title-descending">Sort by Title Descending</option>
        </select>
      <table>
        <thead>
          <tr>
            <th>Validated</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in taskList._tasks" :key="task.title" @mouseover="animateRow(task)" >
            <td>
              <input type="checkbox" v-model="task.validated" @change="validateTask(task)" />
            </td>
            <td>{{ task._title }}</td>
            <td>{{ task._description }}</td>
            <td>{{ formatDate(task._dateAdded) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script>
  import { TaskList } from '../classes/TaskList';
  
  export default {
    data() {
      return {
        taskList: TaskList,
        sortOption: 'date' 

      };
    },
    created() {
     this.loadTaskList();
    },
    mounted(){
        this.emitter.on("TaskAdded", (data) => {
        this.loadTaskList();
        console.log(data);
        this.sortTasks();
    });

  },
    methods: {
    
    sortTasks() {
      if (this.sortOption === 'date') {
        this.taskList.sortByDate();
      } else if (this.sortOption === 'title') {
        this.taskList.sortByTitle();
      } else if (this.sortOption === 'title-descending') {
        this.taskList.sortByTitle(false);
      } else if (this.sortOption === 'date-descending') {
        this.taskList.sortByDate(false);
      }
      localStorage.setItem('to-do-list-sort-option', this.sortOption);
    },
    
    loadTaskList() {
        this.taskList = TaskList.getFromCache('to-do-list');
        const savedSortOption = localStorage.getItem('to-do-list-sort-option');
        if (savedSortOption) {
            this.sortOption = savedSortOption;
        }
    },

      animateRow(task) {
        console.log(task);
     },

      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },

      validateTask(task) {
        if (task.validated) {
          if (confirm('Do you want to validate this task?')) {
            const doneList = new TaskList('done-list');
            doneList.updateFromCache();
            doneList.addTask(task);
            this.taskList.removeTask(task);
            this.loadTaskList();
            this.emitter.emit("TaskValidated", { msg: "true" });
          } else {
            task.validated = false;
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.table-container {
  overflow-x: auto; 
}
@media (max-width: 768px) {
  table {
    font-size: 12px; 
  }
  .table-container {
    overflow-x: auto;
  }
}
</style>
  