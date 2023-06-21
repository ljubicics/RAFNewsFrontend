<template>
  <div class="news">
    <br />
    <h1>Manage news</h1>
    <button class="btn btn-outline-primary" @click="add">Add news</button>
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
          <button class="btn btn-secondary" @click="edit(news.news_id)">Edit</button>
          <button class="btn btn-danger" @click="deleteNews(news.news_id)">Delete</button>
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
    this.$axios.get("/api/news").then((response) => {
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
    },
    add() {
      this.$router.push({ name: "AddNews" });
    },
    edit(id) {
      this.$router.push("/news/edit/" + id);
    },
    deleteNews(newsId) {
      this.$axios.delete("api/news/delete/" + newsId).then((response) => {
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
  margin: 4px;
}
</style>
