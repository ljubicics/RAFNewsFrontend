<template>
  <div class="pt-5">
    <h1>New category</h1>
    <form @submit.prevent="add">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input v-model="description" type="text" class="form-control" id="description" placeholder="Description" />
      </div>
      <button type="submit" class="btn btn-primary mt-2">Edit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginUser",
  data() {
    return {
      name: "",
      description: "",
      categoryId: null,
    };
  },
  methods: {
    add() {
      if (this.name.length > 0 && this.description.length > 0) {
        this.$axios
          .patch("api/category/" + this.categoryId, {
            category_name: this.name,
            category_description: this.description,
          })
          .then((response) => {
            this.$router.push("/categories");
          });
      } else {
        alert("All fields are required!");
        return;
      }
    },
  },
  mounted() {
    let id = this.$route.params.id;
    this.$axios.get("/api/category/" + id).then((response) => {
      console.log(response.data);
      const a = response.data;
      this.name = a.category_name;
      this.description = a.category_description;
      this.categoryId = a.category_id;
    });
  },
};
</script>

<style scoped></style>
