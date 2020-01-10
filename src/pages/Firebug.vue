<template lang='pug'>
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Perk Level and Skill Choices
    div.row
      div.col-xs-6.col-sm-3.col-lg-2
        label
          | Perk Level 
          input#perkLVL(type='number' v-on:click.prevent='validate(); perkCheck()' v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)'  v-on:change.prevent='validate(); perkCheck()' v-on:keydown='validate(); perkCheck()' v-on:keyup='validate(); perkCheck()' v-model='perkLevel' name='perklevel' min='0' max='25' value='1')
    div.row
      div.col-xs-6.col-sm-5.col-md-5.col-lg-5
        label
          input#bringTH(type='checkbox' v-model='bringTheHeat' tooltip='Perk Level Must Be At Least 5' :disabled='bringTheHeatBool' value='')
          | Bring The Heat
  h3.sub-header Damage Calculation
  .table-responsive
  table.table.table-striped
    tablehead4(col1='Gun' col2='Base Damage' col3='Afterburn Damage' col4='Total Damage with Perks Applied')
    tbody
      tablerow4(:col2='weaponsBase.Flame' :col3='weaponsAB.Flame' :col4='weaponsCalc.Flame' col1='Flamethrower') 
      tablerow4(:col2='weaponsBase.Micro' :col3='weaponsAB.Micro' :col4='weaponsCalc.Micro' col1='Microwave Gun') 
      tablerow4(:col2='weaponsBase.Mac10' :col3='weaponsAB.Mac10' :col4='weaponsCalc.Mac10' col1='Mac 10') 
      tablerow4(:col2='weaponsBase.Spitf' :col3='weaponsAB.Spitf' :col4='weaponsCalc.Spitf' col1='Spitfire') 

  table.table.table-striped
    tablehead6(col1='Shotgun' col2='Base Damage' col3='Number of pellets' col4='Afterburn Damage' col5='Scaled Perk Damage'  col6='Full Damage w/ All Pellets' )
    tbody
      tablerow6(:col2='weaponsBase.Trenc' :col3='weaponsMisc.pellets.TRENCH' :col4='weaponsAB.Trenc' :col5='weaponsCalc.Trenc' :col6='weaponTrenc' col1='Incendiary Trench Gun')
  table.table.table-striped
    tablehead5(col1='Gun' col2='Charge Level' col3='Base Damage' col4='Afterburn Damage' col5='Total Damage with Perks Applied')
    tbody
      tr
        td Husk Launcher
        td 
          input(v-model='huskChargeLevel' type='number' min=0 max=5 value=1)
        td {{calcHuskBase}}
        td {{calcHuskAB}}
        td {{calcHuskTotal}}

  moreinfo
    li Firebug damage is rounded
    li
      | C&B flamethrower and microwavegun have a post-shooting life time where it does damage without consuming
      | ammo (duration - 0.35s)
    li
      | Even if you tap fire C&B flamethrower and microwavegun, a minimum amount of ammo is concerned, but
      | it is currently bugged, and may cause up to 9 hits PC v1.050
    li
      | Afterburn damage is dealt every 0.4s for 1.7s. There may be inconsistencies with the way damage occurs
      | from Afterburn. Refer to the spreadsheet for 
      a(href='https://docs.google.com/spreadsheets/d/1GDpg2mN1l_86U_RaDug0glFx8cZCuErwxZLiBKl9SyY/edit#gid=2068776317&range=A197:B197') specifics
    




</template>


<script>
import tablehead3 from '../components/table/TableHeadThree.vue';
import tablerow3 from '../components/table/TableRowThree.vue';

import tablehead4 from '../components/table/TableHeadFour.vue';
import tablerow4 from '../components/table/TableRowFour.vue';

import tablehead5 from '../components/table/TableHeadFive.vue';
import tablerow5 from '../components/table/TableRowFive.vue';

import tablehead6 from '../components/table/TableHeadSix.vue';
import tablerow6 from '../components/table/TableRowSix.vue';

import moreinfo from '../components/moreinfo/MoreInfo.vue';
   
import { validationCheck, wheelIncrementOne, wheelIncrementFive } from './utilities/WheelFns.js';


export default {
  components: {
    tablehead3,
    tablerow3,
    tablehead4,
    tablerow4,
    tablehead5,
    tablerow5,
    tablehead6,
    tablerow6,
    moreinfo,

  },

  data() {
    return {
      
      bringTheHeat: false,
      perkLevel: 0,
      huskChargeLevel:'0',
      weaponsBase: {
        Caulk: 10,
        Spitf: 40,
        Mac10: 25,
        Trenc: 27,
        Flame: 18,
        Micro: 16,
        MicroAlt:210,
        HuskL: this.calcHuskBase,
      },
      weaponsMisc: {
        pellets: {
          TRENCH: 9
        }
      },
      abDuration: {
        Caulk: 1.7,
        Spitf: 1.7,
        Mac10: 2,
        Trenc: 1.7,
        Flame: 1.7,
        Micro: 1.7,
        HuskL: 2.5,
      },
      abInterval: {
        Caulk: 0.4,
        Spitf: 0.4,
        Mac10: 0.5,
        Trenc: 0.5,
        Flame: 0.5,
        Micro: 0.5,
        HuskL: 0.5,
      },
      abDmgScale: {
        Caulk: 0.8,
        Spitf: 0.8,
        Mac10: 0.3,
        Trenc: 0.7,
        Flame: 0.8,
        Micro: 0.8,
        HuskL: 0.1,
      }

    };
  },

  /*<!-- // vscode-fold=1 -->*/ 
  computed: {
    plvl: function() {
      return  this.perkLevel * 0.008.toFixed(3);
    },
    bringTheHeatBool: function() {
      if(this.perkLevel < 5){
        return true
      }

    },
    wheelValidation: function() {
      return validationCheck(this.perkLevel);
    },

    weaponsCalc: function() {
      return this.calcRegular(this.mathCompose);
    },
    weaponsAB: function() {
      return this.calcAfterBurn(this.mathAfterBurn);
    },
    weaponTrenc: function() {
      return this.weaponsMisc.pellets.TRENCH * this.weaponsCalc.Trenc;
    },
    calcHuskBase: function() {
      if (this.huskChargeLevel === '0'){
        return 80
      }
      if (this.huskChargeLevel === '1'){
        return 136
      }
      if (this.huskChargeLevel === '2'){
        return 192
      }
      if (this.huskChargeLevel === '3'){
        return 248
      }
      if (this.huskChargeLevel === '4'){
        return 304
      }
      if (this.huskChargeLevel === '5'){
        return 360
      }
    },
    calcHuskTotal: function(){
      return this.mathCompose(this.calcHuskBase, this.plvl)
    },
    calcHuskAB:function(){
      return this.mathAfterBurn(this.calcHuskTotal, this.abDmgScale.HuskL)
    }

  },
  methods: {
    getHuskDamage(){

    },
    calcAfterBurn() {
      const weapons = ['Caulk', 'Spitf', 'Trenc', 'Flame', 'Micro', 'Mac10',];

      return weapons
        .map(weapon => ({ weapon, res: this.mathAfterBurn( this.weaponsCalc[weapon], this.abDmgScale[weapon] ) } ) ) .reduce((accumulator, i) => {
          accumulator[i.weapon] = i.res;
           return accumulator;
        }, {});
    },
    calcRegular(func) {
      const weapons = ['Caulk', 'Spitf', 'Trenc', 'Flame', 'Micro', 'Mac10',];

      return weapons
        .map(weapon => ({
          weapon,
          res: func(this.weaponsBase[weapon], this.plvl)
        }))
        .reduce((accumulator, i) => {
          accumulator[i.weapon] = i.res;
          return accumulator;
        }, {});
    },
    scrollIncrementOne(e) {
      return (this.perkLevel = wheelIncrementOne( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },
    scrollIncrementFive(e) {
      return (this.perkLevel = wheelIncrementFive( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },

    mathCompose(weaponBase, plvl) {
      let standardCalc = weaponBase + weaponBase * plvl;

      let bringTheHeat = this.bringTheHeat ? this.multiply(weaponBase, 0.35) : 0;

      return Math.round(standardCalc + bringTheHeat);
    },
    mathAfterBurn(calcDmg, DmgScale) {
      return Math.round(calcDmg * DmgScale);
    },



    multiply(a, b) {
      return a * b;
    },

    validate() {
      if (this.perkLevel > 25) {
        this.perkLevel = 25;
      } else if (this.perkLevel < 0) {
        this.perkLevel = 1;
      }
    },
    perkCheck() {


      
    },
  }
};
</script>
<style lang='scss' scoped>
</style>