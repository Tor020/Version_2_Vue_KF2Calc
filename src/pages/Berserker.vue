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
      div.col-xs-6.col-sm-4.col-md-3.col-lg-2
        label
          input#chkbutch(type='checkbox' tooltip='Perk Level Must Be At Least 10' v-model='butcher' :disabled='butcherbool' value='')
          | Butcher
      div.col-xs-6.col-sm-4.col-md-3.col-lg-3
          select(multiple class='form-control' tooltip='Perk Level Must Be At Least 20' v-model='selection' :disabled='perklvl20bool')
            option() < Perk Level 20
            option() Smash
            option() Massacre
      div.col-xs-6.col-sm-4.col-md-3.col-lg-3

  h3.sub-header Damage Calculation 
  .table-responsive
    table.table.table-striped
      tablehead5(col1='Melee Weapon' col2='Base Damages for Light/Heavy/Alt Swings' col3='Light Attack w/ perks' col4='Heavy Attack w/ perks' col5='Alt Attack w/ perks')
      tbody
        tr
          td Crovel Survival Tool
          td {{weaponsBase.CrovelLight}} / {{weaponsBase.CrovelHeavy}} / {{weaponsBase.CrovelAlt}}
          td  {{weaponsCalc.CrovelLight}}
          td {{weaponsCalc.CrovelHeavy}}
          td {{weaponsCalc.CrovelAlt}}
            |  Bash Attack
        tr
          td Katana
          td {{weaponsBase.KatanaLight}} / {{weaponsBase.KatanaHeavy}} / {{weaponsBase.KatanaAlt}}
          td {{weaponsCalc.KatanaLight}}
          td {{weaponsCalc.KatanaHeavy}}
          td {{weaponsCalc.KatanaAlt}}
            |  Stab Attack
        tr
          td Static Strike
          td {{weaponsBase.StaticStrikePrimary}} / {{weaponsBase.StaticStrikeHeavy}} / {{weaponsBase.StaticStrikeAlt}}
          td {{weaponsCalc.StaticStrikePrimary}}
          td {{weaponsCalc.StaticStrikeHeavy}}
          td {{weaponsCalc.StaticStrikeAlt}}
            |  Stab Attack
        tr
          td Bone Crusher
          td {{weaponsBase.BoneLight}} / {{weaponsBase.BoneHeavy}} / {{weaponsBase.BoneAlt}}
          td {{weaponsCalc.BoneLight}}
          td {{weaponsCalc.BoneHeavy}}
          td {{weaponsCalc.BoneAlt}}
            |  Bash Attack
        tr
          td Zweihander
          td {{weaponsBase.ZweiLight}} / {{weaponsBase.ZweiHeavy}} / {{weaponsBase.ZweiAlt}}
          td {{weaponsCalc.ZweiLight}}
          td {{weaponsCalc.ZweiHeavy}}
          td {{weaponsCalc.ZweiAlt}}
            |  Stab Attack
        tr
          td Pulverizer 
          td {{weaponsBase.PulverizerLight}} / {{weaponsBase.PulverizerHeavy}} / {{weaponsBase.PulverizerAlt}}
          td {{weaponsCalc.PulverizerLight}}
          td {{weaponsCalc.PulverizerHeavy}}
          td {{weaponsCalc.PulverizerAlt}}
            |  Heavy w/ explosive
    table.table.table-striped
      tablehead5(col1='Gun' col2='Base Damage' col3='Number of pellets' col4='Scaled Perk Damage' col5='Total Damage w/ All Pellets')
      tbody
        tablerow5(:col2='weaponsBase.VLAD' :col3='weaponsMisc.PELLETS.VLAD' :col4='weaponsCalc.VLAD' :col5='weaponsTotal.VLAD' col1='VLAD-1000 Nailgun')
        
      tablehead5(col1='Sawblade Launcher' col2='Base Damage' col3='Primary' col4='Chainsaw Altfire' col5='Stab')
      tbody
        tr
          td Eviscerator
          td {{weaponsBase.EvisceratorPrimary}} /  {{weaponsBase.EvisceratorStab}} / {{weaponsBase.EvisceratorChain}}
          td {{weaponsCalc.EvisceratorPrimary}}
          td {{weaponsCalc.EvisceratorStab}}
          td {{weaponsCalc.EvisceratorChain}}

  moreinfo
    li Berserkers damage is rounded
    li All Berserker damage numbers are taken here at their highest value
    li
      | Actual in-game damage dependent on melee tracers see 
      a(href='https://docs.google.com/spreadsheets/d/1GDpg2mN1l_86U_RaDug0glFx8cZCuErwxZLiBKl9SyY/edit#gid=2068776317&range=A213:B213') here

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
 
      selection: ['< Perk Level 20'],
      butcher: false,
      perkLevel: 0,
      weaponsBase: {
        CrovelHeavy: 86,
        CrovelLight: 49,
        CrovelAlt: 15,
        KatanaLight: 68,
        KatanaHeavy: 90,
        KatanaAlt: 68,
        BoneLight: 80,
        BoneHeavy: 175,
        BoneAlt: 165,
        PulverizerLight: 70,
        PulverizerHeavy: 145,
        PulverizerAlt: 528,
        ZweiLight: 85,
        ZweiHeavy: 195,
        ZweiAlt: 63,
        VLAD: 30,
        EvisceratorPrimary: 300,
        EvisceratorStab: 90,
        EvisceratorChain: 29,
        StaticStrikePrimary: 86,
        StaticStrikeHeavy: 160,
        StaticStrikeAlt: 91
      },
      weaponsMisc: {
        PELLETS: {
          VLAD: 7
        }
      }
    };
  },

  /*<!-- // vscode-fold=1 -->*/ /*<!-- // vscode-fold=1 -->*/ computed: {
    plvl: function() {
      return this.perkLevel * 0.01;
    },
    wheelValidation: function() {
      return validationCheck(this.perkLevel);
    },
    perklvl20bool: function() {
      // conditionally disables perk choices
      return this.perkLevel >= 20 ? this.perkCheck() : true;
    },
    butcherbool() {
      if (this.perkLevel < 10)
      return true

    },
    weaponsCalc: function() {
      const ಠ = this;
      const ಠಠ = this.weaponsBase;
      const smash = ಠ.selection[0] === 'Smash';
      const massacre = ಠ.selection[0] === 'Massacre';

      if (smash) {
        return {
          PulverizerHeavy    : ಠ.mathSmash(ಠಠ.PulverizerHeavy, ಠ.plvl),
          CrovelHeavy        : ಠ.mathSmash(ಠಠ.CrovelHeavy, ಠ.plvl),
          KatanaHeavy        : ಠ.mathSmash(ಠಠ.KatanaHeavy, ಠ.plvl),
          ZweiHeavy          : ಠ.mathSmash(ಠಠ.ZweiHeavy, ಠ.plvl),
          BoneHeavy          : ಠ.mathSmash(ಠಠ.BoneHeavy, ಠ.plvl),
          StaticStrikeHeavy  : ಠ.mathSmash(ಠಠ.StaticStrikeHeavy, ಠ.plvl),
          CrovelLight        : ಠ.mathDefault(ಠಠ.CrovelLight, ಠ.plvl),
          PulverizerLight    : ಠ.mathDefault(ಠಠ.PulverizerLight, ಠ.plvl),
          KatanaLight        : ಠ.mathDefault(ಠಠ.KatanaLight, ಠ.plvl),
          ZweiLight          : ಠ.mathDefault(ಠಠ.ZweiLight, ಠ.plvl),
          BoneLight          : ಠ.mathDefault(ಠಠ.BoneLight, ಠ.plvl),
          BoneAlt            : ಠ.mathDefault(ಠಠ.BoneAlt, ಠ.plvl),
          ZweiAlt            : ಠ.mathDefault(ಠಠ.ZweiAlt, ಠ.plvl),
          KatanaAlt          : ಠ.mathDefault(ಠಠ.KatanaAlt, ಠ.plvl),
          PulverizerAlt      : ಠ.mathDefault(ಠಠ.PulverizerAlt, ಠ.plvl),
          CrovelAlt          : ಠ.mathDefault(ಠಠ.CrovelAlt, ಠ.plvl),
          StaticStrikeAlt    : ಠ.mathDefault(ಠಠ.StaticStrikeAlt, ಠ.plvl),
          StaticStrikePrimary: ಠ.mathDefault(ಠಠ.StaticStrikePrimary, ಠ.plvl),
          VLAD               : ಠ.mathDefault(ಠಠ.VLAD, ಠ.plvl),
          EvisceratorPrimary : ಠ.mathDefault(ಠಠ.EvisceratorPrimary, ಠ.plvl),
          EvisceratorStab    : ಠ.mathDefault(ಠಠ.EvisceratorStab, ಠ.plvl),
          EvisceratorChain   : ಠ.mathDefault(ಠಠ.EvisceratorChain, ಠ.plvl)
        };
      }
      if (massacre) {
        return {
          PulverizerHeavy    : ಠ.mathDefault(ಠಠ.PulverizerHeavy, ಠ.plvl),
          CrovelHeavy        : ಠ.mathDefault(ಠಠ.CrovelHeavy, ಠ.plvl),
          KatanaHeavy        : ಠ.mathDefault(ಠಠ.KatanaHeavy, ಠ.plvl),
          ZweiHeavy          : ಠ.mathDefault(ಠಠ.ZweiHeavy, ಠ.plvl),
          BoneHeavy          : ಠ.mathDefault(ಠಠ.BoneHeavy, ಠ.plvl),
          CrovelLight        : ಠ.mathMassacre(ಠಠ.CrovelLight, ಠ.plvl),
          PulverizerLight    : ಠ.mathMassacre(ಠಠ.PulverizerLight, ಠ.plvl),
          KatanaLight        : ಠ.mathMassacre(ಠಠ.KatanaLight, ಠ.plvl),
          ZweiLight          : ಠ.mathMassacre(ಠಠ.ZweiLight, ಠ.plvl),
          BoneLight          : ಠ.mathMassacre(ಠಠ.BoneLight, ಠ.plvl),
          StaticStrikePrimary: ಠ.mathMassacre(ಠಠ.StaticStrikePrimary, ಠ.plvl),
          StaticStrikeAlt    : ಠ.mathDefault(ಠಠ.StaticStrikeAlt, ಠ.plvl),
          StaticStrikeHeavy  : ಠ.mathDefault(ಠಠ.StaticStrikeHeavy, ಠ.plvl),
          BoneAlt            : ಠ.mathDefault(ಠಠ.BoneAlt, ಠ.plvl),
          ZweiAlt            : ಠ.mathDefault(ಠಠ.ZweiAlt, ಠ.plvl),
          KatanaAlt          : ಠ.mathDefault(ಠಠ.KatanaAlt, ಠ.plvl),
          PulverizerAlt      : ಠ.mathDefault(ಠಠ.PulverizerAlt, ಠ.plvl),
          CrovelAlt          : ಠ.mathDefault(ಠಠ.CrovelAlt, ಠ.plvl),
          VLAD               : ಠ.mathDefault(ಠಠ.VLAD, ಠ.plvl),
          EvisceratorPrimary : ಠ.mathDefault(ಠಠ.EvisceratorPrimary, ಠ.plvl),
          EvisceratorStab    : ಠ.mathDefault(ಠಠ.EvisceratorStab, ಠ.plvl),
          EvisceratorChain   : ಠ.mathDefault(ಠಠ.EvisceratorChain, ಠ.plvl)
        };
      } else {
        return {
          PulverizerHeavy    : ಠ.mathDefault(ಠಠ.PulverizerHeavy, ಠ.plvl),
          CrovelHeavy        : ಠ.mathDefault(ಠಠ.CrovelHeavy, ಠ.plvl),
          KatanaHeavy        : ಠ.mathDefault(ಠಠ.KatanaHeavy, ಠ.plvl),
          ZweiHeavy          : ಠ.mathDefault(ಠಠ.ZweiHeavy, ಠ.plvl),
          BoneHeavy          : ಠ.mathDefault(ಠಠ.BoneHeavy, ಠ.plvl),
          StaticStrikeHeavy  : ಠ.mathDefault(ಠಠ.StaticStrikeHeavy, ಠ.plvl),
          CrovelLight        : ಠ.mathDefault(ಠಠ.CrovelLight, ಠ.plvl),
          PulverizerLight    : ಠ.mathDefault(ಠಠ.PulverizerLight, ಠ.plvl),
          KatanaLight        : ಠ.mathDefault(ಠಠ.KatanaLight, ಠ.plvl),
          ZweiLight          : ಠ.mathDefault(ಠಠ.ZweiLight, ಠ.plvl),
          BoneLight          : ಠ.mathDefault(ಠಠ.BoneLight, ಠ.plvl),
          BoneAlt            : ಠ.mathDefault(ಠಠ.BoneAlt, ಠ.plvl),
          ZweiAlt            : ಠ.mathDefault(ಠಠ.ZweiAlt, ಠ.plvl),
          KatanaAlt          : ಠ.mathDefault(ಠಠ.KatanaAlt, ಠ.plvl),
          PulverizerAlt      : ಠ.mathDefault(ಠಠ.PulverizerAlt, ಠ.plvl),
          CrovelAlt          : ಠ.mathDefault(ಠಠ.CrovelAlt, ಠ.plvl),
          StaticStrikeAlt    : ಠ.mathDefault(ಠಠ.StaticStrikeAlt, ಠ.plvl),
          StaticStrikePrimary: ಠ.mathDefault(ಠಠ.StaticStrikePrimary, ಠ.plvl),
          VLAD               : ಠ.mathDefault(ಠಠ.VLAD, ಠ.plvl),
          EvisceratorPrimary : ಠ.mathDefault(ಠಠ.EvisceratorPrimary, ಠ.plvl),
          EvisceratorStab    : ಠ.mathDefault(ಠಠ.EvisceratorStab, ಠ.plvl),
          EvisceratorChain   : ಠ.mathDefault(ಠಠ.EvisceratorChain, ಠ.plvl)
        };
      }
    },

    weaponsTotal: function() {
      return {
        VLAD: this.multiply(
          this.weaponsCalc.VLAD,
          this.weaponsMisc.PELLETS.VLAD
        )
      };
    }
  },
  methods: {
    mathSmash(weaponBase, plvl) {
      const butcher = this.butcher === true ? weaponBase * 0.25 : 0;

      return Math.round(
        weaponBase + weaponBase * plvl + butcher + weaponBase * 0.5
      );
    },

    mathMassacre(weaponBase, plvl) {
      const butcher = this.butcher === true ? weaponBase * 0.25 : 0;

      return Math.round(
        weaponBase + weaponBase * plvl + butcher + weaponBase * 0.3
      );
    },

    mathDefault(weaponBase, plvl) {
      const butcher = this.butcher === true ? weaponBase * 0.25 : 0;

      return Math.round(weaponBase + weaponBase * plvl + butcher);
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
    scrollIncrementOne(e) {
      return (this.perkLevel = wheelIncrementOne( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },
    scrollIncrementFive(e) {
      return (this.perkLevel = wheelIncrementFive( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },

    perkCheck() {
      if (this.perkLevel < 20) {
        this.selection[0] = '< Perk Level 20';
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>