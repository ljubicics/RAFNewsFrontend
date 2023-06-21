<template>
  <div class="news">
    <br />
    <h1>All users</h1>
    <button class="btn btn-outline-primary" @click="add">Add a user</button>
    <br />
    <hr />
    <ul id="itemList">
      <li v-for="user in itemsForList" :key="user.user_id">
        <div class="newsInfoDiv">
          <h3>
            <b>{{ user.user_name }} {{ user.user_last_name }}</b>
          </h3>
          <p>{{ user.user_type }}</p>
          <button class="btn btn-outline-info" @click="edit(user.user_email)">Edit</button>
          <button class="btn btn-secondary" @click="deleteUsr(user.user_email)">Delete</button>
          <button
            v-if="user.user_type !== 'ADMIN' && user.user_status"
            class="btn btn-success"
            @click="changeStatus(user.user_email)"
          >
            Change Status
          </button>
          <button
            v-if="user.user_type !== 'ADMIN' && !user.user_status"
            class="btn btn-danger"
            @click="changeStatus(user.user_email)"
          >
            Change Status
          </button>
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
      userList: [],
      currentPage: 1,
      perPage: 10,
      status: [],
      get itemsForList() {
        return this.userList.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      },
    };
  },
  mounted() {
    this.$axios.get("/api/users").then((response) => {
      this.userList = response.data;
    });
  },
  functions: {},
  filters: {},
  computed: {
    rows() {
      return this.userList.length;
    },
  },
  methods: {
    add() {
      this.$router.push({ name: "UsersAdd" });
    },
    edit(email2) {
      this.$router.push("/users/edit/" + email2);
    },
    deleteUsr(email) {
      this.$axios.delete("api/users/delete/" + email).then((response) => {
        window.location.reload();
      });
    },
    changeStatus(email3) {
      this.$axios.get("api/users/updateStatus/" + email3).then((response) => {
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
