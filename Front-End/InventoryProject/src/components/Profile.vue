<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>Fist Name</td>
            <td>{{first_name}}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{{last_name}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      first_name: ''
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/test')
      .then((res) => {
        console.log(res.data[0].name)
        this.first_name = res.data[0].name
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // methods: {
  //   create () {
  //     axios.get('http://localhost:3000/api/test')
  //     .then((res) => {
  //       console.log(res.data);
  //       this.first_name = res.data;
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // }
}
</script>
