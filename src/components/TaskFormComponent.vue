<template>
  <div class="create-task">
    <h2>Create Task</h2>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <form @submit.prevent="addTask">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title" required/>
      <br/>
      <label for="description">Description:</label>
      <textarea id="description" v-model="description" required></textarea>
      <br/>
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
import { Task } from '../classes/Task';
import { TaskList } from '../classes/TaskList';

export default {
  data() {
    return {
      title: '',
      description: '',
      errorMessage: ''
    };
  },
  methods: {
    addTask() {
      this.errorMessage = '';
      if (!this.title || !this.description) {
        this.errorMessage = 'Please fill in all fields.';
        return;
      }
      let taskList = TaskList.getFromCache('to-do-list');
      taskList.addTask(new Task(this.title, this.description, new Date()));
      this.title = '';
      this.description = '';
      alert('Task added successfully!');
      this.emitter.emit('TaskAdded', { msg: 'true' });
    }
  }
};
</script>

<style scoped>
.create-task {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
}
.create-task h2 {
  margin-top: 0;
}
.create-task form {
  display: grid;
  gap: 10px;
}
.create-task label {
  font-weight: bold;
}
.create-task input,
.create-task textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.create-task button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.create-task button:hover {
  background-color: #45a049;
}
.error-message {
  color: red;
  margin-bottom: 1em;
}
</style>
