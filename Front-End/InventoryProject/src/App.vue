/* eslint-disable */
<template>
  <v-app>
    <!-- <div class="app-sidebar">
      <sidebar />
    </div> -->
    <div class="app-topbar">
      <topbar />
    </div>
    <div class="app-view">
      <router-view /> 
    </div>
  </v-app>
</template>

<script>
import sidebar from "@/components/templates/sidebar";
import topbar from "@/components/templates/topbar";
export default {
  name: "App",
  components: {
    sidebar,
    topbar
  }
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-size: 8px;
  overflow: hidden;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}
#app {
  font-family: Helvetica Neue, Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: #fff;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
span,
li,
ul,
p {
  margin: 0;
  padding: 0;
}
/* .app-layout {
  display: grid;
  grid-template-rows: 50px calc(100vw - 80px);
} */
/* .app-sidebar {
  grid-row: span 2;
} */
/* .app-view {
  overflow: scroll;
  height: 100%;
  width: 100%;
} */
</style>
/* eslint-disable */