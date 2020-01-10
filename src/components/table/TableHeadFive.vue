<template lang='pug'>
thead
  tr
    th {{col0}}
    th {{col1}}
    th {{col2}}
    th {{col3}}
    th {{col4}}
    th {{col5}}
  
</template>

<script>
export default {
  props: {
    col0: {
      default: 'fug',
      type: String,
      required: false
    },
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
    col4: {
      default: 'fug',
      type: String,
      required: true
    },
    col5: {
      default: 'fug',
      type: String,
      required: true
    }
  }
};
</script>