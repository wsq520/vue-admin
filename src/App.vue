<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchGrades');
    // this.$store.dispatch('fetchColleges');
    // this.$store.dispatch('fetchMajors');
    // this.$store.dispatch('fetchClubTypes');
  }
}
</script>
