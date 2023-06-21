<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="News title:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.title" placeholder="Enter news title" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Text:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.text" placeholder="Enter news text" required></b-form-input>
      </b-form-group>

      <div><label>Please select category</label></div>
      <b-form-select v-model="selectedCat" :options="categories"></b-form-select>

      <b-form-group label="Select tags:" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selectedTags"
          :options="tags"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: "",
        text: "",
      },
      selectedTags: [],
      selectedCat: {},
      tags: [],
      categories: [],
      author: null,
      jwt: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.form.title == "" || this.form.text == "" || this.selectedCat == null || this.selectedTags.length == 0) {
        alert("All fields are required!");
        return;
      } else {
        let newsId = this.$route.params.id;
        this.$axios
          .patch("/api/news/" + newsId, {
            news_title: this.form.title,
            news_text: this.form.text,
            news_author: this.author,
            news_category: {
              category_id: this.selectedCat,
            },
            news_author: {
              user_id: this.author,
            },
          })
          .then((response) => {
            this.$axios.delete("/api/tagnews/delete/" + newsId);
            for (const tag of this.selectedTags) {
              this.$axios.get("/api/tagnews/add/" + newsId + "/" + tag);
            }
            this.$router.push({ name: "News" });
          });
      }
    },
  },
  mounted() {
    let newsId = this.$route.params.id;
    this.$axios.get("/api/news/" + newsId).then((response) => {
      this.form.title = response.data.news_title;
      this.form.text = response.data.news_text;
      this.selectedCat = response.data.news_category;
    });
    this.$axios.get("/api/category").then((response) => {
      for (const cat of response.data) {
        this.categories.push(new Object({ value: cat.category_id, text: cat.category_name }));
      }
    });
    this.$axios.get("api/tag").then((response) => {
      for (const tag of response.data) {
        this.tags.push(new Object({ value: tag.tag_id, text: tag.tag_keyword }));
      }
    });
    this.jwt = localStorage.getItem("jwt");
    let payload = this.jwt.split(".")[1];
    let u = JSON.parse(atob(payload));
    this.author = parseInt(JSON.stringify(u.id));
  },
};
</script>
<style></style>
