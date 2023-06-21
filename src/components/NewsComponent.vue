/* eslint-disable */
<template>
  <div class="news">
    <h1>{{ news.news_title }}</h1>
    <h5>{{ news.news_date_created | createdDate }}</h5>
    <p>
      <b>{{ category.category_name }}</b>
    </p>
    <p>{{ news.news_text }}</p>
    <br />
    <hr />
    <h5>Tags:</h5>
    <button v-for="tag in news.tags" :key="tag.tag_id" class="btn btn-info" @click="goToTag(tag.tag_id)">
      {{ tag.tag_keyword }}
    </button>
    <br />
    <div class="comments">
      <h4>Comments</h4>
      <form @submit.prevent="postComment">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name" />
        </div>
        <div class="form-group">
          <label for="text">Comment</label>
          <textarea v-model="text" type="text" class="form-control" id="text" placeholder="Comment" />
        </div>
        <button type="submit" class="btn btn-primary mt-2">Post comment</button>
      </form>
      <br />
      <div class="divcomments" v-for="comment in this.comments" :key="comment.comment_id">
        <h5>{{ comment.comment_author }}</h5>
        <p>{{ comment.comment_text }}</p>
        <small>{{ comment.comment_date_created | createdDate }}</small>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewsComponent",
  props: {
    news: {
      type: Object,
    },
    category: {
      type: Object,
    },
  },
  data() {
    return {
      name: "",
      comment: "",
      comments: [],
      text: "",
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.$axios.get("/api/comment/news/" + id).then((response) => {
      this.comments = response.data;
    });
  },
  methods: {
    postComment() {
      let id = this.$route.params.id;
      this.$axios
        .post("/api/comment", {
          comment_author: this.name,
          comment_text: this.text,
          comment_date_created: Date.now(),
          comment_news: id,
        })
        .then((response) => {
          const d = response.data;
          console.log(d);
          this.comments.unshift(d);
          this.$forceUpdate();
        });
    },
    goToTag(id) {
      this.$router.push("/news/tag/" + id);
    },
  },
  computed: {},
  filters: {
    createdDate: function (value) {
      const date = new Date(value);
      return date.toDateString();
    },
  },
};
</script>
<style scoped>
.news {
  text-align: center;
}
.divcomments {
  margin: 4px;
  border: 1px solid gray;
  width: 100%;
}
.btn-info {
  margin: 6px;
}
</style>
