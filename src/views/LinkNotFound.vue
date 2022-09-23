<template>
  <div style="color: var(--title-color); text-align: center; padding: 60px 0">
    <h2
      style="
        font-size: 160px;
        color: var(--title-color);
        line-height: 1;
        margin: 0 0 25px;
      "
    >
      404
    </h2>
    <div></div>
    <h4>Sorry, The page you were looking for in Our site does not exist.</h4>
    <br />
    <button
      type="button"
      class="btn btn-primary"
      style="background: #39b5ff"
      @click="GoToHome"
    >
      GO BACK HOME
    </button>
  </div>
</template>
<script>
import router from "../router";
export default {
  name: "LinkNotFound",
  methods: {
    GoToHome() {
      router.push("/");
    },
  },
};
</script>
