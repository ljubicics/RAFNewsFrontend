<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Name:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Last Name:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.last_name" placeholder="Enter lastname" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Password:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.password"
          placeholder="Enter password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="User type:" v-slot="{ ariaDescribedby }">
        <b-form-radio v-model="form.type" :aria-describedby="ariaDescribedby" name="some-radios" value="ADMIN"
          >Admin</b-form-radio
        >
        <b-form-radio v-model="form.type" :aria-describedby="ariaDescribedby" name="some-radios" value="CONTENT_CREATOR"
          >Content Creator</b-form-radio
        >
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
        email: "",
        name: "",
        last_name: "",
        password: "",
        type: null,
        options: [],
      },
    };
  },
  methods: {
    onSubmit() {
      if (
        this.form.email == "" ||
        this.form.name == "" ||
        this.form.last_name == "" ||
        this.form.password == "" ||
        this.form.type == null
      ) {
        alert("All fields are required!");
        return;
      } else {
        this.$axios
          .post("/api/users", {
            user_name: this.form.name,
            user_last_name: this.form.last_name,
            user_email: this.form.email,
            user_type: this.form.type,
            user_status: true,
            user_password: this.form.password,
          })
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "Users" });
          });
      }
    },
  },
};
</script>
<style></style>
