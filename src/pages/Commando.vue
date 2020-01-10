<template lang="pug">
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Perk Level and Skill Choices
  div.row
    div.col-xs-6.col-sm-3.col-lg-2
      label
        | Perk Level 
        input#perkLVL(type='number' v-on:click.prevent="validate" v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)' v-on:change.prevent="validate" v-on:keydown="validate" v-on:keyup="validate" v-model="perkLevel" name='perklevel' min='0' max='25' value='1')
  div.row
    .col-xs-6.col-sm-5.col-lg-3
      label
        input#chkHPR(type='checkbox' tooltip='Perk Level Must Be At Least 20' v-bind:disabled="lvl20 === true" v-model="hollowPointRounds" value='')
        | Hollow Point Rounds

  h3.sub-header Damage Calculation
  .table-responsive
    table.table.table-striped
      tablehead3(col1='Gun' col2='Base Damage' col3='Total Damage with Perks Applied')
      tbody
        tablerow3(:col2='weaponsBase.AR15' :col3='weaponsCalc.AR15' col1='AR-15 Varmint Rifle')
        tablerow3(:col2='weaponsBase.Bull' :col3='weaponsCalc.Bull' col1='SA80 L85A2 Bull')
        tablerow3(:col2='weaponsBase.LMGs' :col3='weaponsCalc.LMGs' col1='Stoner 63A LMGs')
        tablerow3(:col2='weaponsBase.M16m' :col3='weaponsCalc.M16m' col1='M16m M203 Assault Rifle')
        tablerow3(:col2='weaponsBase.HMTe' :col3='weaponsCalc.HMTe' col1='HMTe-401 Assault Rifle')
        tablerow3(:col2='weaponsBase.AK12' :col3='weaponsCalc.AK12' col1='Kalashnikov AK-12')
        tablerow3(:col2='weaponsBase.Scar' :col3='weaponsCalc.Scar' col1='SCAR-H Assault Rifle')
  moreinfo
    li Commando damage is rounded up
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
      highCheck:'',
      lowCheck:'',
      hollowPointRounds: false,
      perkLevel: 0,
      weaponsBase: {
        LMGs: 30,
        AR15: 30,
        Bull: 30,
        M16m: 33,
        AK12: 40,
        HMTe: 35,
        Scar: 55
      }
    };
  },
  /*<!-- // vscode-fold=1 -->*/ computed: {
    lvl20: function() {
      if (this.perkLevel < 20) {
        this.hollowPointRounds = false;
        return true;
      }
    },
    wheelValidation: function() {
      return validationCheck(this.perkLevel);
    },
    plvl: function() {
      return this.perkLevel * 0.01;
    },
    weaponsCalc: function() {
      // Shorthand reference key
      const _ = this.weaponsBase; // prefix referencing base weapon damage
      const _$ = this.plvl; // short handle for this.plvl

      // Math Operations
      const m1 = this.mathBasic; // math operation no perks
      const m2 = this.mathHPR; // math operation for HollowPoint selection

      function calc(mathFunc) {
        const weapons = [
          'LMGs',
          'AR15',
          'Bull',
          'M16m',
          'AK12',
          'HMTe',
          'Scar'
        ];

        return weapons.map(weapon => ({ weapon, result: mathFunc(_[weapon], _$) }))
          .reduce((accumulator, i) => {
            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      return !this.hollowPointRounds ? calc(m1) : calc(m2);
    }
  },

  methods: {
    mathBasic(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * plvl);
    },
    mathHPR(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * plvl + weaponBase * 0.3);
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
    },
    perkCheck() {
      this.hollowPointRounds = false;
      this.lvl20 = true;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>