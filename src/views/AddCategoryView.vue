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
      <button type="submit" class="btn btn-primary mt-2">Add</button>
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
    };
  },
  methods: {
    add() {
      if (this.name.length > 0 && this.description.length > 0) {
        this.$axios
          .post("/api/category", {
            category_name: this.name,
            category_description: this.description,
          })
          .then((response) => {
            console.log(response.data);
            this.$router.push("/categories");
          });
      } else {
        alert("All fields are required!");
        return;
      }
    },
  },
};
</script>

<style scoped></style>
