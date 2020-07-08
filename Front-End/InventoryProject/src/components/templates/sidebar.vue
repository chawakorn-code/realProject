/* eslint-disable */
<template>
  <div id="app-sidebar">
      <div class="sidebar-logo">
          <img src="/" />
      </div>
      <div class="title">
          <label>Stocking</label>
      </div>
      <div id="navbar">
          <ul class="navbar-panel">
              <li class="navbar-item">
                  <label>Hello</label>
                  <v-btn value ="recent">
                      <span>Recent</span>
                      <v-icon>mdi-history</v-icon>
                  </v-btn>
              </li>
              <li class="navbar-item">
                  <img src="" draggable="false" />
                  <label>Page1</label>
              </li>
              <li class="navbar-item">
                  <img src="" draggable="false" />
                  <label>Page2</label>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
name: 'sidebar'
}
</script>

<style lang="css" scoped>
#app-sidebar {
  height: 100%;
  width: 100%;
  background-color: pink;
}
</style>