<script setup lang="ts"></script>
<template>
  <div
    class="border border-white rounded-xl grid grid-cols-1 gap-1 place-content-center py-5 px-5 text-white"
  >
    <div class="skeleton h-4 w-10 mx-auto bg-slate-700/70"></div>
    <div class="skeleton size-20 mx-auto bg-slate-700/70"></div>
    <div class="flex justify-evenly gap-5 font-bold mx-3">
      <div class="flex flex-col justify-center items-center gap-0.5">
        <div class="skeleton size-6 bg-slate-700/70"></div>
        <div class="skeleton h-4 w-10 mx-auto bg-slate-700/70"></div>
      </div>
      <div class="flex flex-col justify-center items-center gap-0.5">
        <div class="skeleton size-6 bg-slate-700/70"></div>
        <div class="skeleton h-4 w-10 mx-auto bg-slate-700/70"></div>
      </div>
    </div>
  </div>
</template>
