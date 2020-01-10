<template lang="pug">
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    div.row
      input(type='button' value='ಠ' @click='ಠ()')
    div.row
      input(type='button' value='Φ' @click='Φ()')
    div.row
      input(type='button' value='ᛥ' @click='ᛥ()')
    div.row
      input(type='button' value='Ѽ' @click='Ѽ()')
    div.row

</template>



<script>

import axios from 'axios'
import 'googleapis'
// import credentials from './credentials.json'

export default {
  

data(){
  return{
    output:'what the fuck',
    consolemessage:'',
    info:'',
  }
},

filters: {
  currencydecimal (value) {
    return value.toFixed(2)
  }
},

computed:{},



methods:{




Φ() {


//error catch axios
axios
  .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  .then(response => (this.info = response.data.bpi))
  .catch(error => console.log(error))

  
},
ᛥ() {
//basic axios
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))

},
Ѽ() {



},



},





mounted(){

    // axios
    //   .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //   // .then(response=>(console.log(response)))
    //   .then(response => (this.info = response.data.bpi))
  


},
created(){



},

}
</script>
