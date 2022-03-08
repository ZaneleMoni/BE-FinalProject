<template>
  <Home />
  <Login />
  <Register />
  <About />
  <Blogs />
  <Episodes/>
  <Contact />

</template>

<script>
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import About from './components/About.vue'
import Blogs from './components/Blogs.vue'
import Episodes from './components/Episodes.vue'
import Contact from './components/Contact.vue'




export default {
  name: 'App',
  components: {
    Home,
   Login,
  Register,
  About,
  Blogs,
  Episodes,
   Contact
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
  margin-top: 60px;
}
</style>
