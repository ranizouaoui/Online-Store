<template>
  <div
    class="vh-100 d-flex justify-content-center align-items-center"
    style="background: rgb(57 181 255)"
  >
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card bg-white">
            <div class="card-body p-5">
              <form class="mb-3 mt-md-4" @submit.prevent="loginUser">
                <h2
                  class="fw-bold mb-2 text-uppercase"
                  style="margin-left: 29%; padding-bottom: 22px"
                >
                  Welcome !
                </h2>
                <!-- <p class="mb-5">Please enter your login and password!</p> -->
                <div class="alert alert-danger" v-if="messageError">
                  {{ messageError }}
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="name@example.com"
                    v-model="user.email"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="*******"
                    v-model="user.password"
                  />
                </div>
                <!-- <p class="small">
                  <a class="text-primary" href="forget-password.html"
                    >Forgot password?</a
                  >
                </p> -->
                <div class="d-grid">
                  <button class="btn btn-outline-dark" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div>
                <p class="mb-0 text-center">
                  Don't have an account?
                  <router-link to="/signin" class="text-primary fw-bold"
                    >Sign Up</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
import router from "../router";
export default {
  name: "LoginView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      messageError: "",
    };
  },
  methods: {
    loginUser() {
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((dataUser) => {
          localStorage.setItem("uidUser", dataUser.user.uid);
          if (this.$store.state.count > 0) {
            router.push("/cart");
          } else {
            router.push("/products");
          }
        })
        .catch(() => {
          this.messageError = "invalid email and password";
        });
    },
  },
};
</script>