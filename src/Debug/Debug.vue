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

  .table-responsive








    input(type='button' value='log' @click='logIT()')
    table.table.table-striped
      tablehead5(col0='Upgrade Lvl' col1='Experimental Gun Up' col2='Base Damage' col3='Number of pellets' col4='Scaled Perk Damage' col5='Total Damage w/ All Pellets')
      tbody


      
        tablerow5(:col2='weaponsUpgradeBaseV2.M4CS.dmg' :col3='weaponsMisc.PELLETS.M4CS' :col4='weaponsCalc.M4CS' :col5='weaponTotals.M4CS' col1='M4 Combat Shotgun' :upgradevalue.sync='weaponsBaseV2.M4CS.upgradedlvl') 



  // https://medium.com/front-end-hacking/vues-v-model-directive-vs-sync-modifier-d1f83957c57c
  // https://codesandbox.io/s/5v87j5oy2p

  moreinfo
    li Support damage calculations are rounded up.

</template>
<script>
//impr
  import tablehead3 from '../components/table/TableHeadThree.vue';
  import tablerow3 from '../components/table/TableRowThree.vue';

  import tablehead4 from '../components/table/TableHeadFour.vue';
  import tablerow4 from '../components/table/TableRowFour.vue';

  import tablehead5 from '../components/table/TableHeadFive.vue';
  import tablerow5 from '../components/table/TableRowFive.vue';

  import moreinfo from '../components/moreinfo/MoreInfo.vue';
    
  import { validationCheck, wheelIncrementOne, wheelIncrementFive } from '../pages/utilities/WheelFns.js';

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
      M4CSupgrade:10,
      // upgradevalue2:10,
      weaponsBaseV2:{
        M4CS:{
          base:30,
          M4CSupgrade:2,
          upgradedlvl:'0',
        }
      },


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

  computed: {
    
    





// nope
    weaponsUpgradeBaseV2: function() {
      return {
        M4CS:{
          dmg:this.checkAndChange()
        },

      }
    },

    weaponsCalcV2: function() {
      // Shorthand reference key
      const _ = this.weaponsUpgradeBaseV2; // prefix referencing base weapon damage
      // const ಠ = this.weaponsBaseV2;
      const _$ = this.plvl; // short handle for this.plvl
      // const _M = this.weaponsMisc.PELLETS; // short handle for pellets
      // Math Operations
      const m1 = this.mathBasic; // math operation no perks
      const m2 = this.mathSalvo; // math operation for Salvo selection

      function calc(mathFunc) {
        const weapons = [
          'M4CS',
        ];

        return weapons
          .map(weapon => ({ weapon, result: mathFunc(_[weapon]['dmg'], _$) }))
          .reduce((accumulator, i) => {
            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      return !this.salvo ? calc(m1) : calc(m2);
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
      const ಠ = this.weaponsBaseV2;
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

  checkAndChange() {
    if (this.weaponsBaseV2.M4CS.upgradedlvl === '0') {

      return this.weaponsBaseV2.M4CS.base;

    } else if (this.weaponsBaseV2.M4CS.upgradedlvl === '1') {

      return Math.round(this.weaponsBaseV2.M4CS.base * 1.1);

    } else if (this.weaponsBaseV2.M4CS.upgradedlvl === '2') {

      return Math.round(this.weaponsBaseV2.M4CS.base * 1.2);
    }

  },

    logIT(){


        console.log(this.weaponsCalcV2meth())

  






    },

   weaponsCalcV2meth() {

        console.log(this.weaponsUpgradeBaseV2)
      // Shorthand reference key
      const _ = this.weaponsUpgradeBaseV2; // prefix referencing base weapon damage
      const _$ = this.plvl; // short handle for this.plvl
      // const _M = this.weaponsMisc.PELLETS; // short handle for pellets
      // Math Operations
      const m1 = this.mathBasic; // math operation no perks
      const m2 = this.mathSalvo; // math operation for Salvo selection

      function calc(mathFunc) {
        const weapons = [
          'M4CS',
        ];
        return weapons
    
          .map(weapon => ({ weapon, result: mathFunc(_[weapon]['dmg'], _$) }))

          .reduce((accumulator, i) => {

            accumulator[i.weapon] = i.result;
            return accumulator;
          }, {});
      }
      return !this.salvo ? calc(m1) : calc(m2);
    },



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
  },
  mounted(){
    (function () {
    var results, currentWindow,
    // create an iframe and append to body to load a clean window object
    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    // get the current list of properties on window
    currentWindow = Object.getOwnPropertyNames(window);
    // filter the list against the properties that exist in the clean window
    results = currentWindow.filter(function(prop) {
        return !iframe.contentWindow.hasOwnProperty(prop);
    });
    // log an array of properties that are different
    console.log(results);
    document.body.removeChild(iframe);
}());
  }

};
</script>
<style lang='scss' scoped>
</style>
