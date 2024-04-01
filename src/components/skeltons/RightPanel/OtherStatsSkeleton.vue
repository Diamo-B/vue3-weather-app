<script setup lang="ts"></script>
<template>
  <div
    class="grid grid-cols-2 mx-5 text-white font-bold text-center 2xl:mt-2 flex-1 gap-1"
  >
    <div
      v-for="i in Array(6)"
      :key="i"
      class="border skeleton bg-slate-700/70"
    ></div>
  </div>
</template>
