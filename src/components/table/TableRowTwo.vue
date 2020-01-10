<template lang='pug'>
tr
  td {{col1}}
  td {{col2}}
  
</template> 

<script>
export default {
  props: {
    col1: {
      default: 'name',
      // type: String,
      required: true
    },
    col2: {
      default: 5000,
      // type: Number,
      required:true
    },


  }
};
</script>
