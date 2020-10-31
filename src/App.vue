<template>
  <div id="app">
    <Header/>
    <SearchForm @search="search"/>
    <router-view/>
  </div>
</template>
<script>
import Header from './components/layout/Header.vue';
import SearchForm from './components/SearchForm.vue';
import About from '@/views/About.vue';
export default {
  name: 'App',
  components: {
    Header,
    SearchForm,About,
  },
  data(){return {reformatedSearchString: '',}},

  methods:{
        search (searchParams) {
      this.reformatedSearchString = searchParams.join(' ')
      console.log('app.js-query',this.reformatedSearchString)
      if(this.reformatedSearchString)
      {
      this.$router.push({ path: 'about', query: { query: this.reformatedSearchString }, })
      }
    },

  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
