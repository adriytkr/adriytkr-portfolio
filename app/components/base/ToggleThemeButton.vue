<script setup lang="ts">
const colorMode=useColorMode();

function toggleTheme():void{
  colorMode.preference=colorMode.value==='light'?'dark':'light';
}
</script>

<template>
  <button @click="toggleTheme">Toggle theme</button>
</template>
