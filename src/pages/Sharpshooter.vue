<template lang='pug'>
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Perk Level and Skill Choices
    div.row
      div.col-xs-6.col-sm-3.col-lg-2
        label
          | Perk Level 
          input#perkLVL(type='number' v-on:click.prevent='validate' v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)' v-on:change.prevent='validate' v-on:keydown='validate' v-on:keyup='validate' v-model='perkLevel' name='perklevel' min='0' max='25' value='1')
    div.row
      div.col-xs-6.col-sm-3.col-md-2.col-lg-2
        label
          input#sniper(type='checkbox' tooltip='Perk Level Must Be At Least 5' :disabled='sniperBool' v-model='Sniper' value='')
          | Sniper
    div.row  
      div.col-xs-6.col-sm-3.col-md-2.col-lg-2
        label
          input#stability(type='checkbox' tooltip='Perk Level Must Be At Least 10' :disabled='stabilityBool' v-model='Stability' value='')
          | Stability
    div.row  
      div.col-xs-6.col-sm-4.col-md-2.col-lg-2
        label
          input#rackemchk(type='checkbox' tooltip='Perk Level Must Be At Least 15' :disabled='rackemBool' v-model='Rackem' value='')
          | Rack em Up
          input#rackem(type='number' min='1' max='5' v-model='RackemValue' v-show='Rackem' value='1' )
    div.row  
      div.col-xs-6.col-sm-3.col-md-2.col-lg-2
        label
          input#deadeye(type='checkbox' tooltip='Perk Level Must Be At Least 20' :disabled='deadeyeBool' v-model='Deadeye' value='')
          | Deadeye
          
  h3.sub-header Damage Calculation
  .table-responsive
    table.table.table-striped
      tablehead4(col1='Gun' col2='Base Damage' col3='Total Damage with Perks Applied' col4='Headshot Damage with perks Applied')
      tbody
        tablerow4(:col2='weaponsBase.H9MM' :col3='weaponsCalc.H9MM' :col4='weaponsCalcHs.H9MM' col1='9mm Handgun')
        tablerow4(:col2='weaponsBase.Spit' :col3='weaponsCalc.Spit' :col4='weaponsCalcHs.Spit' col1='Spitfire')
        tablerow4(:col2='weaponsBase.R185' :col3='weaponsCalc.R185' :col4='weaponsCalcHs.R185' col1='1858 Revolver') 
        tablerow4(:col2='weaponsBase.M14E' :col3='weaponsCalc.M14E' :col4='weaponsCalcHs.M14E' col1='M14 EBR') 
        tablerow4(:col2='weaponsBase.Winc' :col3='weaponsCalc.Winc' :col4='weaponsCalcHs.Winc' col1='Winchester 1894') 
        tablerow4(:col2='weaponsBase.M500' :col3='weaponsCalc.M500' :col4='weaponsCalcHs.M500' col1='.500 Magnum') 
        tablerow4(:col2='weaponsBase.SPX4' :col3='weaponsCalc.SPX4' :col4='weaponsCalcHs.SPX4' col1='SPX 464 Centerfire') 
        tablerow4(:col2='weaponsBase.Cros' :col3='weaponsCalc.Cros' :col4='weaponsCalcHs.Cros' col1='Crossbow') 
        tablerow4(:col2='weaponsBase.Rail' :col3='weaponsCalc.Rail' :col4='weaponsCalcHs.Rail' col1='Rail Gun') 
        tablerow4(:col2='weaponsBase.M99A' :col3='weaponsCalc.M99A' :col4='weaponsCalcHs.M99A' col1='M99 AMR') 

  moreinfo
    li Sharpshooter damage is rounded up
      
</template>
<script>

import tablehead3 from '../components/table/TableHeadThree.vue';
import tablerow3 from '../components/table/TableRowThree.vue';

import tablehead4 from '../components/table/TableHeadFour.vue';
import tablerow4 from '../components/table/TableRowFour.vue';

import tablehead5 from '../components/table/TableHeadFive.vue';
import tablerow5 from '../components/table/TableRowFive.vue';

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
    moreinfo
  },
  data() {
    return {
      Sniper: false,
      Stability: false,
      Rackem: false,
      RackemValue: 1,
      Deadeye: false,
      perkLevel: 0,
      weaponsBase: {
        H9MM: 25,
        Winc: 80,
        SPX4: 165,
        Cros: 350,
        M14E: 80,
        Rail: 560,
        R185: 50,
        M500: 160,
        Spit: 40,
        M99A: 850
      }
    };
  },

  /*<!-- // vscode-fold=1 -->*/
  computed: {
    sniperBool   : function() {
      if (this.perkLevel < 5 ) {
        return true;
      }
    },
    stabilityBool: function() {
      if (this.perkLevel < 10) {
        return true;
      }
    },
    rackemBool   : function() {
      if (this.perkLevel < 15) {
        return true;
      }
    },
    deadeyeBool  : function() {
      if (this.perkLevel < 20) {
        return true;
      }
    },
    wheelValidation: function() {
      return validationCheck(this.perkLevel);
    },
    rkVal: function() {
      return (this.RackemValue * 0.1).toFixed(1);
    },
    plvl: function() {
      return this.perkLevel * 0.01;
    },
    weaponsCalc: function() {
      // Shorthand reference key

      const _ = this.weaponsBase; // prefix referencing base weapon damage
      const m1 = this.mathCompose;

      return this.calc(m1);
    },
    weaponsCalcHs: function() {
      const _ = this.weaponsBase;
      const m2 = this.mathComposeHeadShot;
      return this.calc(m2);
    }
  },
  methods: {
    scrollIncrementOne(e) {
      return (this.perkLevel = wheelIncrementOne( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },
    scrollIncrementFive(e) {
      return (this.perkLevel = wheelIncrementFive( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },

    calc(func) {
      const _ = this.weaponsBase; // prefix referencing base weapon damage

      const weapons = [
        'H9MM',
        'Winc',
        'SPX4',
        'Cros',
        'M14E',
        'Rail',
        'R185',
        'M500',
        'Spit',
        'M99A'
      ];
      return weapons
        .map(weapon => ({ weapon, res: func(this.weaponsBase[weapon]) }))
        .reduce((accumulator, i) => {
          accumulator[i.weapon] = i.res;
          return accumulator;
        }, {});
    },
    mathCompose(weaponBase) {
      // Shorthand reference key
      const __ = this; //  prefix referencing this
      const _ = this.multiply; //  short handle for math generic function

      let sniper = __.Sniper ? _(weaponBase, 0.25) : 0; // Check for Sniper Perk
      let stability = __.Stability ? _(weaponBase, 0.3) : 0; // Check for Stability Perk
      let rackem = __.Rackem ? _(weaponBase, __.rkVal) : 0; // Check for Rackem Perk

      return Math.ceil(weaponBase + sniper + stability + rackem);
    },
    mathComposeHeadShot(weaponBase, plvl) {
      // Shorthand reference key
      const __ = this; //  prefix referencing this
      const _ = this.multiply; //  short handle for multiply function

      let sniper = __.Sniper ? _(weaponBase, 0.25) : 0; // Check for Sniper Perk
      let stability = __.Stability ? _(weaponBase, 0.3) : 0; // Check for Stability Perk
      let rackem = __.Rackem ? _(weaponBase, __.rkVal) : 0; // Check for Rackem Perk
      let deadeye = __.Deadeye ? _(weaponBase, 0.1) : 0; // Check for Deadeye Perk

      let standardCalc = _(weaponBase, this.plvl);

      return Math.ceil(
        weaponBase + standardCalc + sniper + stability + rackem + deadeye
      );
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
    }
  }
};
</script>
<style lang='scss' scoped>
</style>