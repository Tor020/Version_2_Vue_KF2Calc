<template lang='pug'>
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Perk Level and Skill Choices
    div.row
      div.col-xs-6.col-sm-3.col-lg-2
        label
          | Perk Level 
          input#perkLVL(type='number' v-on:click.prevent='validate' v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)'  v-on:change.prevent='validate' v-on:keydown='validate' v-on:keyup='validate' v-model='perkLevel' name='perklevel' min='0' max='25' value='1')
    div.row
      div.col-xs-6.col-sm-3.col-md-3.col-lg-3
        label
          input#bombar(type='checkbox'  tooltip='Perk Level Must Be At Least 5' v-model='Bombadier' :disabled='bombardierbool' value='')
          | Bombadier
    div.row
      div.col-xs-6.col-sm-5.col-md-5.col-lg-3
        label
          input#frag(type='checkbox'  tooltip='Perk Level Must Be At Least 15' v-model='FragRounds' :disabled='fragmentationbool' value='')
          | Fragmentation Rounds
  h3.sub-header Damage Calculation
  .table-responsive
    table.table.table-striped
      tablehead3(col1='Gun' col2='Base Damage' col3='Total Damage with Perks Applied')
      tbody
        tablerow3(:col2='weaponsBase.M79G' :col3='weaponsCalc.M79G' col1='M79 Grenade Launcher')
        tablerow3(:col2='weaponsBase.SEEK' :col3='weaponsCalc.SEEK' col1='Seeker Six')
        tablerow3(:col2='weaponsBase.M16M' :col3='weaponsCalc.M16M' col1='M16 M203 Assault Rifle')
        tablerow3(:col2='weaponsBase.RPG7' :col3='weaponsCalc.RPG7' col1='RPG-7')
        tablerow3(:col2='weaponsBase.C4EX' :col3='weaponsCalc.C4EX' col1='C4 Explosives')
  .table-responsive
    table.table.table-striped
      tablehead5(col1='Gun' col2='Base Damage' col3='Number of pellets' col4='Scaled Perk Damage' col5='Full Damage w/ All Pellets')
      tbody
        tablerow5(:col2='weaponsBase.HX25' :col3='weaponsMisc.PELLETS.HX25' :col4='weaponsCalc.HX25' :col5='totals.HX25' col1='HX25 Grenade Pistol')

      tablehead5(col1='Melee Weapon' col2='Light/Heavy/Alt Swings' col3='Light Attack w/ perks' col4='Heavy Attack w/ perks' col5='Alt Attack w/ perks')
      tbody
        tr
          td Pulverizer
          td  {{weaponsBase.PulverizerLight}} / {{weaponsBase.PulverizerHeavy}} / {{weaponsBase.PulverizerAlt}}
          td  {{weaponsCalc.PulverizerLight}} 
          td  {{weaponsCalc.PulverizerHeavy}}
          td  {{weaponsCalc.PulverizerAlt}}
    table.table.table-striped
      tablehead5(col1='Gun' col2='Charge Level' col3='Base Damage' col4='Afterburn Damage' col5='Total Damage with Perks Applied')
      tbody
        td Husk Launcher
        td 
          input(v-model='huskChargeLevel' type='number' min=0 max=5 value=1)
        td {{calcHuskBase}}
        td {{calcHuskAB}}
        td {{calcHuskTotal}}

  moreinfo
    li Demolition&apos;s damage is rounded up.
    li
      | All damage numbers are taken at their highest values and are reduced the further the ZED is from
      | the 
      a(href='https://docs.google.com/spreadsheets/d/1GDpg2mN1l_86U_RaDug0glFx8cZCuErwxZLiBKl9SyY/edit#gid=2068776317&range=C186:E186') epicenter
    li Impact damage is not considered for the RPG or M79 in the table
    li
      | For reference impact damage is 150, but is affected by different resistances
      br
      |  impact damage of the Hx25 grenade pistol is 10 damage per pellet
    li
      | The M16&apos;s bullet damage do not scale with any demolitions perks its bullet damage is 30
    li 
      | Pulverizer - melee and explosion <strong>DO</strong> get the bonuses	

</template>

<script>
import tablehead3 from '../components/table/TableHeadThree.vue';
import tablerow3 from '../components/table/TableRowThree.vue';

import tablehead4 from '../components/table/TableHeadFour.vue';
import tablerow4 from '../components/table/TableRowFour.vue';

import tablehead5 from '../components/table/TableHeadFive.vue';
import tablerow5 from '../components/table/TableRowFive.vue';

import moreinfo from '../components/moreinfo/MoreInfo.vue';

import {
  validationCheck,
  wheelIncrementOne,
  wheelIncrementFive
} from './utilities/WheelFns.js';

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
      // specialperk: false,
      Bombadier: false,
      FragRounds: false,
      huskChargeLevel: '0',
      perkLevel: 0,
      weaponsBase: {
        HX25: 30,
        C4EX: 820,
        M79G: 225,
        M16M: 33,
        RPG7: 750,
        SEEK: 125,
        HuskL: this.calcHuskBase,
        PulverizerLight: 70,
        PulverizerHeavy: 145,
        PulverizerAlt: 528
      },
      weaponsMisc: {
        PELLETS: {
          HX25: 7
        }
      },
      abDmgScale: {
        HuskL: 0.1
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
    bombardierbool: function() {
      if (this.perkLevel < 5) {
        return true;
      }
    },
    fragmentationbool: function() {
      if (this.perkLevel < 15) {
        return true;
      }
    },

    weaponsCalc: function() {
      const mathC = this.mathCompose;
      const _ = this.weaponsBase; // prefix referencing base weapon damage
      const _$ = this.plvl; // short handle for this.plvl

      function calc(mathFunc) {
        const weapons = [
          'HX25',
          'C4EX',
          'M79G',
          'M16M',
          'RPG7',
          'SEEK',
          'PulverizerLight',
          'PulverizerHeavy',
          'PulverizerAlt'
        ];

        return weapons
          .map(weapon => ({ weapon, result: mathFunc(_[weapon], _$) }))
          .reduce((accumulator, i) => {
            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      return calc(mathC);
    },

    totals: function() {
      return {
        HX25: this.multiply(
          this.weaponsMisc.PELLETS.HX25,
          this.weaponsCalc.HX25
        )
      };
    },
    calcHuskBase: function() {
      if (this.huskChargeLevel === '0') {
        return 80;
      }
      if (this.huskChargeLevel === '1') {
        return 136;
      }
      if (this.huskChargeLevel === '2') {
        return 192;
      }
      if (this.huskChargeLevel === '3') {
        return 248;
      }
      if (this.huskChargeLevel === '4') {
        return 304;
      }
      if (this.huskChargeLevel === '5') {
        return 360;
      }
    },

    calcHuskTotal: function() {
      return this.mathCompose(this.calcHuskBase, this.plvl);
    },
    calcHuskAB: function() {
      return this.mathAfterBurn(this.calcHuskTotal, this.abDmgScale.HuskL);
    }
  },

  methods: {
    mathCompose(weaponBase, plvl) {
      const _bomb = this.Bombadier;
      const _frag = this.FragRounds;
      const multiply = this.multiply;

      let bombadier = _bomb ? multiply(weaponBase, 0.25) : 0;
      let fraground = _frag ? multiply(weaponBase, 0.3) : 0;
      let perkLvlBonus = multiply(weaponBase, plvl);

      let total = Math.round(weaponBase + perkLvlBonus + bombadier - fraground);

      return total;
    },

    scrollIncrementOne(e) {
      return (this.perkLevel = wheelIncrementOne( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },
    scrollIncrementFive(e) {
      return (this.perkLevel = wheelIncrementFive( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
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
      if (this.perkLevel < 15) {
        this.selection[0] = '< Perk Level 15';
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
