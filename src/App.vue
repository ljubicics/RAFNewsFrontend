<template>
  <div>
    <NavBar :jwttoken="jwttoken" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  components: { NavBar },
  data() {
    return {
      jwttoken: "",
    };
  },
  mounted() {
    this.jwttoken = localStorage.getItem("jwt");
  },
};
</script>

<style></style>
