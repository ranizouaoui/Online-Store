<template>
  <div>
    <navbarView> </navbarView>
    <FooterView> </FooterView>
  </div>
</template>

<script>
import NavbarView from "./views/NavbarView.vue";
import FooterView from "./components/Footer.vue";
export default {
  name: "App",
  components: { NavbarView, FooterView },
};
</script>


