<template>
  <div class="pt-5">
    <h1>New tag</h1>
    <form @submit.prevent="add">
      <div class="form-group">
        <label for="description">Keyword</label>
        <input v-model="keyword" type="text" class="form-control" id="keyword" placeholder="Keyword" />
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
      keyword: "",
    };
  },
  methods: {
    add() {
      if (this.keyword.length > 0) {
        this.$axios
          .post("/api/tag", {
            tag_keyword: this.keyword,
          })
          .then((response) => {
            console.log(response.data);
            this.$router.push("/tag");
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
