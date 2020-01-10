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
      input(type='button' value='log-Φ-ᛥ-ಠ' @click='logΦandᛥ()')
    div.row

</template>



<script>



export default {
  data() {
    return {
      output: '',
      consolemessage: '',
      info: ''
    };
  },
  computed: {},





  methods: {
    Φ() {



    },
    ᛥ() {


    },

    ಠ() {



    },
    logΦandᛥ() {
      console.log(Φ())
      console.log(ᛥ())
      console.log(ಠ())

    }
  },

  mounted() {

  },
  created() {}
};
</script>
