<template>
  <div class="news">
    <br />
    <h1>All categories</h1>
    <button class="btn btn-outline-primary" @click="add">Add a category</button>
    <br />
    <hr />
    <ul id="itemList">
      <li v-for="category in itemsForList" :key="category.category_id">
        <div class="newsInfoDiv">
          <h3>
            <b>{{ category.category_name }}</b>
          </h3>
          <p>{{ category.category_description }}</p>
          <button class="btn btn-secondary" @click="edit(category.category_name)">Edit</button>
          <button class="btn btn-secondary" @click="deleteCat(category.category_name)">Delete</button>
        </div>
      </li>
    </ul>
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="itemList" align="center">
    </b-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
      currentPage: 1,
      perPage: 10,
      get itemsForList() {
        return this.categoryList.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      },
    };
  },
  mounted() {
    this.$axios.get("/api/category").then((response) => {
      this.categoryList = response.data;
    });
  },
  functions: {},
  filters: {},
  computed: {
    rows() {
      return this.categoryList.length;
    },
  },
  methods: {
    add() {
      this.$router.push({ name: "AddCategory" });
    },
    edit(name) {
      this.$router.push("/categories/edit/" + name);
    },
    deleteCat(name) {
      this.$axios.delete("api/category/" + name).then((response) => {
        window.location.reload();
      });
    },
  },
};
</script>
<style>
.newsInfoDiv {
  border: 2px solid blue;
  width: 100%;
  margin: 8px;
}
ul {
  list-style-type: none;
}
.news {
  text-align: center;
}
h3 {
  cursor: pointer;
}
.btn {
  margin-bottom: 4px;
}
</style>
