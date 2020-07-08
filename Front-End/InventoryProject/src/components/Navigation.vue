<template>
  <div>
    <nav class="main-nav">
      <div class="logo">
        STOCK
      </div>
      <Burger></Burger>
    </nav>

    <Sidebar>
      <ul class="sdiebar-panel-nav">
        <li><a href="#home"></a></li>
        <li><a href="#about"></a></li>
        <li><a href="#contact"></a></li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from './menu/burger'
import Sidebar from './menu/sidebar'
export default {
  name: 'Navigation',
  components: {
    Burger,
    Sidebar
  }

}
</script>

<style>
.hidden {
  visibility: hidden;
}
button {
  cursor: pointer;
}
/* remove blue outline */
button:focus {
  outline: 0;
}
.burger-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.burger-bar {
  background-color: #130f40;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}
.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(0.8);
}
.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}
.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}
.burger-bar--3 {
  transform: translateY(6px);
}
#burger.active .burger-button {
  transform: rotate(-180deg);
}
#burger.active .burger-bar {
  background-color: #fff;
}
#burger.active .burger-bar--1 {
  transform: rotate(45deg);
}
#burger.active .burger-bar--2 {
  opacity: 0;
}
#burger.active .burger-bar--3 {
  transform: rotate(-45deg);
}
</style>
