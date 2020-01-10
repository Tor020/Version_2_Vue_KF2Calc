<template lang='pug'>
tr
  td {{col1}}
  td {{col2}}
  td {{col3}}
  td {{col4}}
  td {{col5}}
  td {{col6}}
  
</template> 

<script>
export default {
  props: {
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
    },
    col6: {
      default: 5000,
      type: Number,
      required:true
    },
  }
};
</script>
