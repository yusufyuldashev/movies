<template>
  <section>
    <div class="card">
      <h1><VueWriter :array="arr" /></h1>
      <router-link to="/movies">Movies</router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { arr: [' Website In Progress try on after a few days'] }
  },
}
</script>
<style scoped lang="scss">
section {
  height: 100vh;
}
.card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 10rem auto;
  max-width: 40rem;
  background: transparent;
  a {
    text-decoration: none;
    text-align: right;
    display: block;
    color: #2d2d42;
    font-family: 'Roboto';
    font-size: 20px;
  }
}
h1 {
  text-align: center;
  color: #2496ff;
  font-size: 30px;
}
</style>
