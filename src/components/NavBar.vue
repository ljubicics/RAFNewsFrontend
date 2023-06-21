<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">RAFNews</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                :to="{ name: 'News' }"
                tag="a"
                class="nav-link"
                :class="{ active: this.$router.currentRoute.name === 'News' }"
                >News</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'PopularNews' }"
                tag="a"
                class="nav-link"
                :class="{ active: this.$router.currentRoute.name === 'PopularNews' }"
                >Popular</router-link
              >
            </li>
            <b-dropdown
              text="Categories"
              variant="primary"
              class="e-auto mb-2 mb-lg-0"
              style="height: 35px; margin: 3px; display: inline"
            >
              <b-dropdown-item
                href="#"
                v-for="category in categoryList"
                :key="category.category_name"
                @click="find(category.category_id)"
                >{{ category.category_name }}</b-dropdown-item
              >
            </b-dropdown>
            <li v-if="loggedIn" class="nav-item">
              <router-link
                :to="{ name: 'ManageNews' }"
                tag="a"
                class="nav-link"
                :class="{ active: this.$router.currentRoute.name === 'ManageNews' }"
                >Manage News</router-link
              >
            </li>
            <li v-if="loggedIn" class="nav-item">
              <router-link
                :to="{ name: 'Categories' }"
                tag="a"
                class="nav-link"
                :class="{ active: this.$router.currentRoute.name === 'CategoriesView' }"
                >Manage Categories</router-link
              >
            </li>
            <li v-if="loggedIn" class="nav-item">
              <router-link
                :to="{ name: 'Tags' }"
                tag="a"
                class="nav-link"
                :class="{ active: this.$router.currentRoute.name === 'TagsView' }"
                >Manage Tags</router-link
              >
            </li>
            <li v-if="loggedIn && admin" class="nav-item">
              <router-link
                :to="{ name: 'Users' }"
                tag="a"
                class="nav-link"
                :class="{ active: this.$router.currentRoute.name === 'Users' }"
                >Manage Users</router-link
              >
            </li>
          </ul>
          <form v-if="loggedIn" class="d-flex" @submit.prevent="logout">
            <button class="btn btn-outline-secondary" type="submit">Logout</button>
          </form>
          <form v-else class="d-flex" @submit.prevent="login">
            <button class="btn btn-outline-secondary" type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    jwttoken: "",
  },
  data() {
    return {
      selectedCategory: null,
      categoryList: [],
      token: "",
      loggedIn: false,
      admin: false,
    };
  },
  mounted() {
    this.$axios.get("/api/category").then((response) => {
      this.categoryList = response.data;
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      this.token = "";
      this.loggedIn = false;
      this.admin = false;
      // TODO: router.push news
      this.$router.push({ name: "Login" });
    },
    login() {
      // eslint-disable-next-line no-unused-vars
      this.$router.push({ name: "Login" }).catch((err) => {});
    },
    find(name) {
      this.$router.push(`/news/category/${name}`).then(() => {
        window.location.reload();
      });
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    jwttoken(newVal, oldVal) {
      if (newVal == null) {
        this.loggedIn = false;
        return;
      }
      this.token = newVal;
      this.loggedIn = true;
      let payload = this.token.split(".")[1];
      let u = JSON.parse(atob(payload));
      let type = JSON.stringify(u.type);
      let type2 = JSON.parse(type);
      if (type2 === "ADMIN") {
        this.admin = true;
      } else {
        this.admin = false;
      }
    },
  },
};
</script>

<style scoped></style>
