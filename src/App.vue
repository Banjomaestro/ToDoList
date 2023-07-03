<template>
  <TaskFormComponent/>
  <ToDoListComponent/>
  <DoneListComponent/>
</template>

<script>
import TaskFormComponent from './components/TaskFormComponent.vue'
import ToDoListComponent from './components/ToDoListComponent.vue'
import DoneListComponent from './components/DoneListComponent.vue'


export default {
  name: 'App',
  components: {
    TaskFormComponent,
    ToDoListComponent,
    DoneListComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
