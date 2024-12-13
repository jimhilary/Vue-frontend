<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Task List</h1>
      <div class="mb-4">
        <TaskForm @task-added="fetchTasks" />
      </div>
      <div class="mb-4">
        <label for="filter" class="mr-2">Filter:</label>
        <select v-model="filter" @change="fetchTasks" class="border p-2">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul>
        <TaskItem
          v-for="task in paginatedTasks"
          :key="task.id"
          :task="task"
          @task-updated="fetchTasks"
        />
      </ul>
      <div class="mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TaskForm from './TaskForm.vue';
  import TaskItem from './TaskItem.vue';
  
  export default {
    components: { TaskForm, TaskItem },
    data() {
      return {
        tasks: [],
        currentPage: 1,
        perPage: 5,
        filter: 'all',
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.tasks.length / this.perPage);
      },
      paginatedTasks() {
        const start = (this.currentPage - 1) * this.perPage;
        return this.tasks.slice(start, start + this.perPage);
      },
    },
    methods: {
      async fetchTasks() {
        const response = await axios.get(`/api/tasks?filter=${this.filter}`);
        this.tasks = response.data;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
    },
    mounted() {
      this.fetchTasks();
    },
  };
  </script>