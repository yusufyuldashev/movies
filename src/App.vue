<template>
  <div>
    <the-header></the-header>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
export default {
  components: { TheHeader },
  data() {
    return {}
  },
}
</script>

<style scoped>
div {
  background-color: #20202b;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
