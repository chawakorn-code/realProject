import Vue from 'vue'

// save our state (isPanel open or not)
export const store = Vue.observable({
  isNavOpen: false
})

export const mutations = {
  toggleNav () {
    store.isNavOpen = !store.isNavOpen
  }
}