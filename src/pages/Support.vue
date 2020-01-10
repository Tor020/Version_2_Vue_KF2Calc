<template lang='pug'>
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Perk Level and Skill Choices
    div.row
      div.col-xs-6.col-sm-3.col-lg-2
        label
          | Perk Level 
          input#perkLVL(type='number' v-on:click.prevent='validate(); perkCheck()' v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)'
  v-on:change.prevent='validate(); perkCheck()' v-on:keydown='validate(); perkCheck()' v-on:keyup='validate(); perkCheck()' v-model='perkLevel' name='perklevel' min='0' max='25' value='1')
    div.row
      div.col-xs-6.col-sm-3.col-lg-2
        label
          input#chkSalvo(type='checkbox' v-model='salvo' tooltip='Perk Level Must Be At Least 10' :disabled='salvoPerkLvl' value='')
          | Salvo
  h3.sub-header Damage Calculation
  .table-responsive
    table.table.table-striped
      tablehead5(col1='Gun' col2='Base Damage' col3='Number of pellets' col4='Scaled Perk Damage' col5='Total Damage w/ All Pellets')
      tbody
        tablerow5(:col2='weaponsBase.HMTE' :col3='weaponsMisc.PELLETS.HMTE' :col4='weaponsCalc.HMTE' :col5='weaponTotals.HMTE' col1='HMTech-301 Shotgun')
        tablerow5(:col2='weaponsBase.SG50' :col3='weaponsMisc.PELLETS.SG50' :col4='weaponsCalc.SG50' :col5='weaponTotals.SG50' col1='SG 500 Pump-Action')
        tablerow5(:col2='weaponsBase.AA12' :col3='weaponsMisc.PELLETS.AA12' :col4='weaponsCalc.AA12' :col5='weaponTotals.AA12' col1='AA-12 Auto Shotgun')
        tablerow5(:col2='weaponsBase.HZ12' :col3='weaponsMisc.PELLETS.HZ12' :col4='weaponsCalc.HZ12' :col5='weaponTotals.HZ12' col1='HZ12 Multi-Action')
        tablerow5(:col2='weaponsBase.VLAD' :col3='weaponsMisc.PELLETS.VLAD' :col4='weaponsCalc.VLAD' :col5='weaponTotals.VLAD' col1='VLAD-1000 Nailgun')
        tablerow5(:col2='weaponsBase.INCE' :col3='weaponsMisc.PELLETS.INCE' :col4='weaponsCalc.INCE' :col5='weaponTotals.INCE' col1='Incendiary Trench Gun')
        tablerow5(:col2='weaponsBase.DOOM' :col3='weaponsMisc.PELLETS.DOOM' :col4='weaponsCalc.DOOM' :col5='weaponTotals.DOOM' col1='Doomstick')
        tablerow5(:col2='weaponsBase.M4CS' :col3='weaponsMisc.PELLETS.M4CS' :col4='weaponsCalc.M4CS' :col5='weaponTotals.M4CS' col1='M4 Combat Shotgun')
        tablerow5(:col2='weaponsBase.DBSH' :col3='weaponsMisc.PELLETS.DBSH' :col4='weaponsCalc.DBSH' :col5='weaponTotals.DBSH' col1='Double-barrel Boomstick')

  moreinfo
    li Support damage calculations are rounded up.

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
 
      salvo: '',
      perkLevel: 0,

      weaponsBase: {
        SG50: 20,
        DBSH: 25,
        HZ12: 20,
        M4CS: 30,
        AA12: 20,
        VLAD: 30,
        INCE: 27,
        DOOM: 36,
        HMTE: 20
      },
      weaponsMisc: {
        PELLETS: {
          SG50: 7,
          DBSH: 10,
          HZ12: 10,
          M4CS: 8,
          AA12: 7,
          VLAD: 7,
          INCE: 8,
          DOOM: 6,
          HMTE: 6
        }
      }
    };
  },
  /*<!-- // vscode-fold=1 -->*/ 
  computed: {

      weaponsBaseV2: function() {
return {

  
}



       },



    plvl: function() {
      return this.perkLevel * 0.01;
    },
    wheelValidation: function() {
      return validationCheck(this.perkLevel);
    },
    salvoPerkLvl: function() {
      // conditionally disables perk choices
      return this.perkLevel >= 10 ? this.perkCheck() : true;
    },

    weaponsCalc: function() {
      // Shorthand reference key
      const _ = this.weaponsBase; // prefix referencing base weapon damage
      const _$ = this.plvl; // short handle for this.plvl
      // const _M = this.weaponsMisc.PELLETS; // short handle for pellets
      // Math Operations
      const m1 = this.mathBasic; // math operation no perks
      const m2 = this.mathSalvo; // math operation for Salvo selection

      function calc(mathFunc) {
        const weapons = [
          'SG50',
          'DBSH',
          'HZ12',
          'M4CS',
          ,
          'AA12',
          'VLAD',
          'INCE',
          'HMTE',
          'DOOM'
        ];

        return weapons
          .map(weapon => ({ weapon, result: mathFunc(_[weapon], _$) }))
          .reduce((accumulator, i) => {
            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      return !this.salvo ? calc(m1) : calc(m2);
    },

    weaponTotals: function() {
      const _ = this.weaponsCalc;
      const _$ = this.weaponsMisc.PELLETS;
      return {
        SG50: this.mathPellets(_.SG50, _$.SG50),
        DBSH: this.mathPellets(_.DBSH, _$.DBSH),
        HZ12: this.mathPellets(_.HZ12, _$.HZ12),
        M4CS: this.mathPellets(_.M4CS, _$.M4CS),
        AA12: this.mathPellets(_.AA12, _$.AA12),
        VLAD: this.mathPellets(_.VLAD, _$.VLAD),
        INCE: this.mathPellets(_.INCE, _$.INCE),
        HMTE: this.mathPellets(_.HMTE, _$.HMTE),
        DOOM: this.mathPellets(_.DOOM, _$.DOOM)
      };
    }
  },
  methods: {
    mathBasic(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * plvl);
    },
    mathSalvo(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * plvl + weaponBase * 0.3);
    },
    mathPellets(dmg, pellets) {
      return dmg * pellets;
    },
    perkCheck() {
      if (this.perkLevel < 10) {
        this.salvo = false;
      }
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
