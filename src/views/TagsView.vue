<template>
  <div class="tags">
    <br />
    <h1>All tags</h1>
    <button class="btn btn-outline-primary" @click="add">Add a tag</button>
    <br />
    <hr />
    <ul id="itemList">
      <li v-for="tag in itemsForList" :key="tag.tag_id">
        <div class="tagsInfoDiv">
          <h3>
            <b>{{ tag.tag_keyword }}</b>
          </h3>
          <button class="btn btn-secondary" @click="edit(tag.tag_id)">Edit</button>
          <button class="btn btn-danger" @click="deleteTag(tag.tag_id)">Delete</button>
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
      tagList: [],
      currentPage: 1,
      perPage: 10,
      get itemsForList() {
        return this.tagList.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      },
    };
  },
  mounted() {
    this.$axios.get("/api/tag").then((response) => {
      this.tagList = response.data;
    });
  },
  functions: {},
  filters: {},
  computed: {
    rows() {
      return this.tagList.length;
    },
  },
  methods: {
    add() {
      this.$router.push({ name: "AddTag" });
    },
    edit(id) {
      this.$router.push("/tag/edit/" + id);
    },
    deleteTag(tagId) {
      this.$axios.delete("api/tag/" + tagId).then((response) => {
        window.location.reload();
      });
    },
  },
};
</script>
<style>
.tagsInfoDiv {
  border: 2px solid blue;
  width: 100%;
  margin: 8px;
}
ul {
  list-style-type: none;
}
.tags {
  text-align: center;
}
h3 {
  cursor: pointer;
}
.btn {
  margin-bottom: 4px;
}
</style>
