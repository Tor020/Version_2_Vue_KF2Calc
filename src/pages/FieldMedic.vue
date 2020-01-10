<template lang='pug'>
div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main
  div.container-fluid
    h3.sub-header Set Skill Choice
    div.row
      div.col-xs-6.col-sm-3
        label
          input#chkBS(type='checkbox' v-model='battleSurgeon' tooltip='Perk Level Must Be At Least 20' value='')
          | Battle Surgeon
  h3.sub-header Damage Calculation
  .table-responsive
    table.table.table-striped

    
      tablehead3(col1='Gun' col2='Base Damage' col3='Total Damage with Perks Applied')
      tbody
        tablerow3(:col2='weaponsBase.H101' :col3='weaponsCalc.H101' col1='HMTech-101 Pistol')
        tablerow3(:col2='weaponsBase.H201' :col3='weaponsCalc.H201' col1='HMTech-201 SMG')
        tablerow3(:col2='weaponsBase.H401' :col3='weaponsCalc.H401' col1='HMTech-401 Assault Rifle')

      tablehead3(col1='Harpoon' col2='Base Damage' col3='Total Damage with Perks Applied')
      tbody
        tablerow3(:col2='weaponsBase.Hemo' :col3='weaponsCalc.Hemo' col1='Hemoglobin')

    table.table.table-striped
      tablehead5(col1='Shotgun' col2='Base Damage' col3='Number of pellets' col4='Scaled Perk Damage' col5='Full Damage w/ All Pellets')
      tbody
        tablerow5(:col2='weaponsBase.H301' :col3='weaponsMisc.PELLETS.H301' :col4='weaponsCalc.H301' :col5='weaponsTotal.H301' col1='HMTech-301 Shotgun ')
        
  input.btn.moreInfoButtonClass(type='button' @click='moreInfo = !moreInfo' value='More Info' disabled)
  .moreInfoDivClass(v-if='moreInfo')



</template>
<script>
import tablehead3 from '../components/table/TableHeadThree.vue';
import tablerow3 from '../components/table/TableRowThree.vue';

import tablehead4 from '../components/table/TableHeadFour.vue';
import tablerow4 from '../components/table/TableRowFour.vue';

import tablehead5 from '../components/table/TableHeadFive.vue';
import tablerow5 from '../components/table/TableRowFive.vue';

export default {
  components: {
    tablehead3,
    tablerow3,
    tablehead4,
    tablerow4,
    tablehead5,
    tablerow5,
  },


  data() {
    return {
      moreInfo:false,
      battleSurgeon: false,
      perkLevel: 0,
      weaponsBase: {
        H101: 20,
        H201: 17,
        H301: 20,
        H401: 35,
        Hemo: 50
      },
      weaponsMisc: {
        PELLETS: {
          H301: 6
        }
      }
    };
  },

  /*<!-- // vscode-fold=1 -->*/
   computed: {
    plvl: function() {
      return this.perkLevel * 0.01;
    },
    weaponsCalc: function() {
      // Shorthand reference key
      const _ = this.weaponsBase; // prefix referencing base weapon damage
      const _$ = this.plvl; // short handle for this.plvl

      // Math Operations
      const m1 = this.mathBasic; // math operation no perks
      const m2 = this.mathBattle; // math operation with battleSurgeon

      function calc(mathFunc) {
        const weapons = ['H101', 'H201', 'H301', 'H401', 'Hemo'];

        return weapons
          .map(weapon => ({ weapon, result: mathFunc(_[weapon], _$) }))
          .reduce((accumulator, i) => {
            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      return !this.battleSurgeon ? calc(m1) : calc(m2);
    },
    weaponsTotal: function() {
      const _ = this.weaponsCalc;
      const _$ = this.weaponsMisc.PELLETS;
      return {
        H301: this.mathPellets(_.H301, _$.H301)
      };
    }
  },
  methods: {
    mathBasic(weaponBase, plvl) {
      return weaponBase;
    },
    mathBattle(weaponBase, plvl) {
      return Math.round(weaponBase + weaponBase * 0.2);
    },
    mathPellets(dmg, pellets) {
      return dmg * pellets;
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