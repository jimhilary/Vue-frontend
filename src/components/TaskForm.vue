<template>
    <form @submit.prevent="submitForm" class="mb-4">
      <input v-model="title" type="text" placeholder="Task Title" required class="border p-2 mr -2" />
      <textarea v-model="description" placeholder="Task Description" class="border p-2 mr-2"></textarea>
      <select v-model="status" class="border p-2 mr-2">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" class="bg-blue-500 text-white p-2">Add Task</button>
    </form>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        title: '',
        description: '',
        status: 'pending',
      };
    },
    methods: {
      async submitForm() {
        await axios.post('/tasks', {
          title: this.title,
          description: this.description,
          status: this.status,
        });
        this.$emit('task-added');
        this.title = '';
        this.description = '';
        this.status = 'pending';
      },
    },
  };
  </script>