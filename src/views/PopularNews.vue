<template>
  <div class="news">
    <br />
    <h1>Most popular news</h1>
    <br />

    <ul id="itemList">
      <li v-for="news in itemsForList" :key="news.news_id">
        <div class="newsInfoDiv">
          <h3 @click="goToNews(news.news_id)">
            <b>{{ news.news_title }}</b>
          </h3>
          <p>( {{ news.news_date_created | createdDate }} )</p>
          <p>
            Category: <b>{{ news.news_category.category_name }}</b>
          </p>
          <p>{{ news.news_text | shortText }}</p>
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
      newsList: [],
      currentPage: 1,
      perPage: 10,
      get itemsForList() {
        return this.newsList.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      },
    };
  },
  mounted() {
    this.$axios.get("/api/news/popular").then((response) => {
      this.newsList = response.data;
    });
  },
  functions: {},
  filters: {
    shortText: function (value) {
      if (!value.length > 32) return value;
      value = value.substr(0, 28) + "...";
      return value;
    },
    createdDate: function (value) {
      const date = new Date(value);
      return date.toDateString();
    },
  },
  computed: {
    rows() {
      return this.newsList.length;
    },
  },
  methods: {
    goToNews(id) {
      let route = this.$router.resolve("/news/singlenews/" + id);
      window.open(route.href, "_blank");
      this.$axios.patch("api/news/update/" + id);
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
</style>
