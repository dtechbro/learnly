<script setup lang="ts">
// import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen max-w-5xl flex flex-col items-center justify-center gap-20 mx-auto p-8">
    <div class="flex flex-col items-center gap-3"><h2 class="text-lg font-semibold">Welcome to Learnly</h2>
    <p>We would take your throught the world of gamified learning</p></div>
    

    <div>
      <router-link to="/quiz" class="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
      Get Started
      </router-link>

      <!-- <router-link to="/about" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4">
      Tap to reveal questions </router-link> -->
  </div>
    
  </div>
  
</template>