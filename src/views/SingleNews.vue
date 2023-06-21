<template>
  <div>
    <NewsComponent :news="news" :category="category" />
  </div>
</template>
<script>
import NewsComponent from "../components/NewsComponent.vue";
export default {
  name: "SingleNews",
  data() {
    return {
      news: {},
      category: {},
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.$axios.get("/api/news/" + id).then((response) => {
      this.news = response.data;
      this.category = this.news.news_category;
    });
  },
  components: { NewsComponent },
};
</script>
<style scoped>
h1 {
  margin-top: 24px;
}
</style>
