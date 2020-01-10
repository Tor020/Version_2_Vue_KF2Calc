<template lang='pug'>
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Perk Level and Skill Choices
    div.row
      div.col-xs-6.col-sm-3.col-lg-2
        label
          | Perk Level 
          input#perkLVL(type='number' v-on:click.prevent='validate' v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)' v-on:change.prevent='validate' v-on:keydown='validate' v-on:keyup='validate' v-model='perkLevel' name='perklevel' min='0' max='25' value='1')
  h3.sub-header Damage Calculation
  .table-responsive
    table.table.table-striped
      tablehead3(col1='Gun' col2='Base Damage' col3='Total Damage with Perks Applied')
      tbody
        tablerow3(:col2='weaponsBase.MP7' :col3='weaponsCalc.MP7' col1='MP7 SMG')
        tablerow3(:col2='weaponsBase.HMT' :col3='weaponsCalc.HMT' col1='HMTech-201 SMG')
        tablerow3(:col2='weaponsBase.Mac' :col3='weaponsCalc.Mac' col1='Mac 10')
        tablerow3(:col2='weaponsBase.MP5' :col3='weaponsCalc.MP5' col1='MP5RAS SMG')
        tablerow3(:col2='weaponsBase.P90' :col3='weaponsCalc.P90' col1='P90 SMG')
        tablerow3(:col2='weaponsBase.Kri' :col3='weaponsCalc.Kri' col1='Kriss SMG')
        tablerow3(:col2='weaponsBase.Hec' :col3='weaponsCalc.Hec' col1='Heckler & Koch Ump')

  label
  moreinfo
      li SWAT damage is rounded

    
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
    moreinfo,

  },
  data() {
    return {
 
      perkLevel: 0,
      weaponsBase: {
        MP7: 16,
        MP5: 25,
        P90: 30,
        Hec: 45,
        Kri: 33,
        HMT: 15,
        Mac: 25
      }
    };
  },

  /*<!-- // vscode-fold=1 -->*/ computed: {
    plvl: function() {
      return this.perkLevel * 0.01;
    },
        wheelValidation: function() {
      return validationCheck(this.perkLevel);
    },
    weaponsCalc: function() {
      // Shorthand reference key
      const _ = this.weaponsBase; // prefix referencing base weapon damage
      const _$ = this.plvl; // short handle for this.plvl

      // Math Operations
      const m1 = this.mathBasic; // math operation no perks

      function calc(mathFunc) {
        const weapons = ['MP7', 'MP5', 'P90', 'Hec', 'Kri', 'HMT', 'Mac'];

        return weapons
          .map(weapon => ({ weapon, result: mathFunc(_[weapon], _$) }))
          .reduce((accumulator, i) => {
            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      return calc(m1);
    }
  },
  methods: {
    mathBasic(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * plvl);
    },
    scrollIncrementOne(e) {
      return (this.perkLevel = wheelIncrementOne( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },
    scrollIncrementFive(e) {
      return (this.perkLevel = wheelIncrementFive( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
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