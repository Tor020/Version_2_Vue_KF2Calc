<template lang='pug'>
thead
  tr
    th {{col1}}
    th {{col2}}
    th {{col3}}
  
</template>

<script>
export default {
  props: {
    col1: {
      default: 'fug',
      type: String,
      required: true
    },
    col2: {
      default: 'fug',
      type: String,
      required: true
    },
    col3: {
      default: 'fug',
      type: String,
      required: true
    },

  }
};
</script>