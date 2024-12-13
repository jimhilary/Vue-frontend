<template>
    <tr>
      <td class="border border-gray-300 p-2">{{ task.title }}</td>
      <td class="border border-gray-300 p-2">{{ task.description }}</td>
      <td class="border border-gray-300 p-2">{{ task.status }}</td>
      <td class="border border-gray-300 p-2">
        <button @click="toggleStatus" class="bg-yellow-500 text-white p-1 mr-2">Toggle Status</button>
        <button @click="deleteTask" class="bg-red-500 text-white p-1">Delete</button>
      </td>
    </tr>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    props: ['task'],
    methods: {
      async toggleStatus() {
        const newStatus = this.task.status === 'pending' ? 'completed' : 'pending';
        await axios.put(`/tasks/${this.task.id}`, { status: newStatus });
        this.$emit('task-updated');
      },
      async deleteTask() {
        await axios.delete(`/tasks/${this.task.id}`);
        this.$emit('task-updated');
      },
    },
  };
  </script>