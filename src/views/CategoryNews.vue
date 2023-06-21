<template>
  <div class="news">
    <br />
    <h1>
      News from category <u>{{ ctgName }}</u>
    </h1>
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
      perPage: 1,
      ctgName: "",
      get itemsForList() {
        return this.newsList.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      },
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.$axios.get("/api/news/allNewsByCategory/" + id).then((response) => {
      this.newsList = response.data;
    });
    this.$axios.get("/api/category/").then((response2) => {
      const data = response2.data;
      for (const d of data) {
        if (d.category_id == id) {
          this.ctgName = d.category_name;
        }
      }
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
