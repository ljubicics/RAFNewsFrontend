<template>
  <div class="pt-5">
    <h1>Edit category</h1>
    <form @submit.prevent="edit">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name" />
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
      tagId: null,
    };
  },
  methods: {
    edit() {
      if (this.name.length > 0) {
        this.$axios
          .patch("api/tag/" + this.tagId, {
            tag_keyword: this.name,
          })
          .then((response) => {
            this.$router.push("/tag");
          });
      } else {
        alert("All fields are required!");
        return;
      }
    },
  },
  mounted() {
    let id = this.$route.params.id;
    this.$axios.get("/api/tag/" + id).then((response) => {
      console.log(response);
      const a = response.data;
      this.name = a.tag_keyword;
      this.tagId = a.tag_id;
    });
  },
};
</script>

<style scoped></style>
