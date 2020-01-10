<template lang='pug'>


tr

  td
   input(type='number' v-on:input="$emit('update:upgradevalue',$event.target.value)"  value='0' class='upgradeInput')

  td {{col1}}
  td {{col2}}
  td {{col3}}
  td {{col4}}
  td {{col5}}
  
</template> 

<script>
export default {
  props: {
    upgradevalue:{
        default:'gf'
    },
    value:{
        default:0,
        type: Number,
        required:false
    },
    col1: {
      default: 'name',
      type: String,
      required: true
    },
    col2: {
      default: 5000,
      type: Number,
      required:true
    },
    col3: {
      default: 5000,
      type: Number,
      required:true
    },
    col4: {
      default: 5000,
      type: Number,
      required: true
    },
    col5: {
      default: 5000,
      type: Number,
      required:true
    }
  },
  computed: {
    // inputListeners: function () {
    //   var vm = this
    //   // `Object.assign` merges objects together to form a new object
    //   return Object.assign({},
    //     // We add all the listeners from the parent
    //     this.$listeners,
    //     // Then we can add custom listeners or override the
    //     // behavior of some listeners.
    //     {
    //       // This ensures that the component works with v-model
    //       input: function (event) {
    //         vm.$emit('input', event.target.value)
    //       }
    //     }
    //   )
    // }
  },
  methods:{

  }
};
</script>
