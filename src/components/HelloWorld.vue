<template>
    <div>
      <h1>Hello, {{ name }}!</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  });
</script>
  