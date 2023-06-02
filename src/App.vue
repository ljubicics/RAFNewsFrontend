<template>
  <div>
    <NavBar :jwttoken="jwttoken"/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  components: {NavBar},
  data(){
    return{
      jwttoken: ''
    }
  }
}
</script>

<style>

</style>
