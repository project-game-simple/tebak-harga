<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    created() {
      if (localStorage.nickname) {
        this.$store.dispatch('setNickname', localStorage.nickname)
        this.$store.dispatch('getProducts')
        this.$store.dispatch('setCategory')
      }
    } 
  }
</script>
