<template lang='pug'>
div
  input.btn.moreInfoButtonClass(type='button' @click='moreInfo = !moreInfo' value='More Info') 
  .moreInfoDivClass(v-if='moreInfo')
    ul 
      slot
</template>


<script>
export default {
    data() {
    return {
      moreInfo:false,
      }
    }
  }

</script>
