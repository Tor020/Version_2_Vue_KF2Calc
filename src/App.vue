<template lang='pug'>
  div
    nav.navbar.navbar-inverse.navbar-fixed-top
      div.container-fluid
        .navbar-header
          button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#navbar', aria-expanded='false', aria-controls='navbar')
            span.sr-only Toggle navigation
          router-link(to='/' class='navbar-brand') Killing Floor 2 Damage Calculator
                      //- router-link(tag='a'  to='/' class='navvar-brand' active-class='active' exact) Killing Floor 2 Damage Calculator
        #navbar.navbar-collapse.collapse
          ul.nav.navbar-nav.navbar-right
            li
              a(href='https://www.reddit.com/r/killingfloor/') KF Subreddit
            li
              a(href='https://docs.google.com/spreadsheets/d/1GDpg2mN1l_86U_RaDug0glFx8cZCuErwxZLiBKl9SyY/edit#gid=2068776317') Killing Floor 2 Stats Spreadsheet
    div.container-fluid
      div.row
        .col-sm-3.col-md-2.sidebar
          ul.nav.nav-sidebar
            router-link(tag='li'  to='/' active-class='active' exact)
              a Overview  
              hr
            router-link(tag='li' active-class='active' to='/Berserker')
              a Berserker   
                img(src="./assets/Perks/Berserker.png")
            router-link(tag='li' active-class='active' to='/Commando')
              a Commando 
                img(src="./assets/Perks/Commando.png")
            router-link(tag='li' active-class='active' to='/Demolitionist')
              a Demolitionist 
                img(src="./assets/Perks/Demolitionist.png")
            router-link(tag='li' active-class='active' to='/FieldMedic')
              a FieldMedic  
                img(src="./assets/Perks/Fieldmedic.png")
            router-link(tag='li' active-class='active' to='/Gunslinger')
              a Gunslinger 
                img(src="./assets/Perks/Gunslinger.png")
            router-link(tag='li' active-class='active' to='/Sharpshooter')
              a Sharpshooter
                img(src="./assets/Perks/Sharpshooter.png")
            router-link(tag='li' active-class='active' to='/Support')
              a Support 
                img(src="./assets/Perks/Support.png")
            router-link(tag='li' active-class='active' to='/Swat')
              a Swat 
                img(src="./assets/Perks/Swat.png")
            router-link(tag='li' active-class='active' to='/Firebug')
              a Firebug 
               img(src="./assets/Perks/Firebug.png")
            hr
            router-link(tag='li' active-class='active' to='/Debug')     
              a Debug ⚗️
            hr
            // router-link(tag='li' active-class='active' to='/Debug')     
            //   a Debug2 ⚗️
            hr


            // router-link(tag='li' active-class='active' to='/Survivalist')
            //   a Survivalist ❌
            //     img(src="./assets/Perks/Survivalist.png")
            // input(type='button' value='hideZed' @click='hideZed')
    router-view
             
    // Zed(v-show='currentComponent!=="/"')
</template> 


<script>

import Zed from './pages/ZED/Zed.vue';

export default {
  components: {
 Zed
  },

data(){
  return{
  hidden:false,
  }
},
computed:{
  currentComponent(){
  return this.$route.path
  },
},
methods:{
  hideZed(){
  return this.hidden = !this.hidden
  },

},

mounted(){

}


}

</script>


<style lang="scss">
img{
  height:26px;
   
}




</style>
