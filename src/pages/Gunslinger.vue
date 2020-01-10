<template lang='pug'>
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Perk Level and Skill Choices
    div.row
      div.col-xs-6.col-sm-3.col-lg-2
        label
          | Perk Level 
          input#perkLVL(type='number' v-on:click.prevent='validate(); perkCheck()' v-on:change.prevent='validate(); perkCheck()' v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)' v-on:keydown='validate(); perkCheck()' v-on:keyup='validate(); perkCheck()' v-model='perkLevel' name='perklevel' min='0' max='25' value='1')
    div.row
      .col-xs-6.col-sm-4.col-md-3.col-lg-3
          select(multiple class='form-control' v-model='selection' tooltip='Perk Level Must Be At Least 15' :disabled='perklvlbool')
            option < Perk Level 15
            option Bone Breaker
            option Rack'em Up
      div.col-xs-6.col-sm-3.col-lg-2
        label(v-if="selection[0] === `Rack'em Up`")
          |   Rack em Up
          input#rackem(type='number' v-if="selection[0] === `Rack'em Up`" min='1' max='5' v-model='RackemValue')
  h3.sub-header Damage Calculation
  .table-responsive
    table.table.table-striped
      tablehead3( col2='Base Damage' col3='Total Damage with Perks Applied' col1='Gun')
      tbody
        tablerow3(:col2='weaponsBase.H9MM' :col3='weaponsCalc.H9MM' col1='9mm Handgun'        )
        tablerow3(:col2='weaponsBase.HMTE' :col3='weaponsCalc.HMTE' col1='HMTech-101 Pistol'  )
        tablerow3(:col2='weaponsBase.REV1' :col3='weaponsCalc.REV1' col1='1858 Revolver'      )
        tablerow3(:col2='weaponsBase.M191' :col3='weaponsCalc.M191' col1='M1911 Pistol'       )
        tablerow3(:col2='weaponsBase.WINC' :col3='weaponsCalc.WINC' col1='Winchester 1894'    )
        tablerow3(:col2='weaponsBase.DEAG' :col3='weaponsCalc.DEAG' col1='.50 Desert Eagle'   )
        tablerow3(:col2='weaponsBase.MAGN' :col3='weaponsCalc.MAGN' col1='500 Magnum Revolver')
        tablerow3(:col2='weaponsBase.SPXC' :col3='weaponsCalc.SPXC' col1='SPX 464 Centerfire' )

    table.table.table-striped
      tablehead5( col2='Base Damage' col3='Pellets' col4='Damage Per Pellet' col5='Total Damage with Perks Applied' col1='Gun')
      tbody
        tablerow5(:col2='weaponsBase.AF00' :col3='weaponsMisc.PELLETS.AF00' :col4='weaponsCalc.AF00' :col5='weaponTotals.AF00' col1='AF2011' )
        tablerow5(:col2='weaponsBase.GREN' :col3='weaponsMisc.PELLETS.GREN' :col4='weaponsCalc.GREN' :col5='weaponTotals.GREN' col1='HX25 Grenade Pistol' )

  moreinfo
      li Gunslinger damage is rounded up

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
 
      selection: ['< Perk Level 15'],
      RackemValue: 1,
      perkLevel: 0,
      weaponsBase: {
        H9MM: 25,
        HMTE: 20,
        REV1: 50,
        M191: 50,
        WINC: 80,
        DEAG: 91,
        MAGN: 160,
        SPXC: 165,
        AF00: 53,
        GREN: 30
      },
      weaponsMisc: {
        PELLETS: {
          GREN: 7,
          AF00: 2
        }
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

    perklvlbool: function() {
      // conditionally disables perk choices
      return this.perkLevel >= 15 ? this.perkCheck() : true;
    },
    weaponsCalc: function() {
      // Shorthand reference key
      const _ = this.weaponsBase; // prefix referencing base weapon damage
      const _$ = this.plvl; // short handle for this.plvl

      // Math Operations
      const m1 = this.mathBasic; // math operation no perks
      const m2 = this.mathBoneBreak; // math operation for BoneBreak selection
      const m3 = this.mathRackEmUp; // math operation for RackemUp selection

      function calc(mathFunc) {
        const weapons = [
          'H9MM',
          'HMTE',
          'REV1',
          'M191',
          'WINC',
          'DEAG',
          'MAGN',
          'SPXC',
          'AF00',
          'GREN'
        ];

        return weapons
          .map(weapon => ({ weapon, result: mathFunc(_[weapon], _$) }))
          .reduce((accumulator, i) => {
            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      if (this.selection[0] === '< Perk Level 15') {
        return calc(m1);
      } else if (this.selection[0] === 'Bone Breaker') {
        return calc(m2);
      } else if (this.selection[0] === `Rack'em Up`) {
        return calc(m3);
      }
    },
    weaponTotals: function() {
      const _ = this.weaponsCalc;
      const _$ = this.weaponsMisc.PELLETS;
      return {
        GREN: this.mathPellets(_.GREN, _$.GREN),
        AF00: this.mathPellets(_.AF00, _$.AF00)
      };
    }
  },

  methods: {
    mathBasic(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * plvl);
    },
    mathBoneBreak(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * plvl + weaponBase * 0.2);
    },
    mathRackEmUp(weaponBase, plvl) {
      const rack = (this.RackemValue * 0.1).toFixed(1);
      return Math.round(weaponBase + weaponBase * plvl + weaponBase * rack);
    },
    mathPellets(dmg, pellets) {
      return dmg * pellets;
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
      if (this.perkLevel < 15) {
        this.selection[0] = '< Perk Level 15';
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>