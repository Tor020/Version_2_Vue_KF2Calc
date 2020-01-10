<template lang='pug'>
div.container-fluid.home-hidden
  .col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main 
    div.row
      fieldset
        legend Difficulty
        label.radio-inline
          input#normaldiff.rButton(type='radio', v-model='difficulty' name='difficulty', value='Normal', checked='')
          |  Normal
        label.radio-inline
          input#harddiff.rButton(type='radio', v-model='difficulty' name='difficulty', value='Hard')
          |  Hard
        label.radio-inline
          input#suicidaldiff.rButton(type='radio', v-model='difficulty' name='difficulty', value='Suicidal')
          |  Suicidal
        label.radio-inline
          input#HOEdiff.rButton(type='radio', v-model='difficulty' name='difficulty', value='HOE')
          |  HOE
    div.row
      fieldset
          legend Choose Number of players
          label.radio-inline
            input#1play.rButton(type='radio', v-model='numberofplayers' name='numberofplayers', value='1p', checked='')
            |  1
          label.radio-inline
            input#2play.rButton(type='radio', v-model='numberofplayers' name='numberofplayers', value='2p')
            |  2
          label.radio-inline
            input#3play.rButton(type='radio', v-model='numberofplayers' name='numberofplayers', value='3p')
            |  3
          label.radio-inline
            input#4play.rButton(type='radio', v-model='numberofplayers' name='numberofplayers', value='4p')
            |  4
          label.radio-inline
            input#5play.rButton(type='radio', v-model='numberofplayers' name='numberofplayers', value='5p')
            |  5
          label.radio-inline
            input#6play.rButton(type='radio', v-model='numberofplayers' name='numberofplayers', value='6p')
            |  6
    h3.sub-header ZEDS
    
    .table-responsive
      table.table.table-striped
        tablehead3(col1='ZED' col2='Health' col3='Head Health')
        tbody
          tablerow3(
             :col2  = 'smallZeds.cyst'
             :col3  = 'smallZedsHead.cyst'
               col1 = 'Cyst')
          tablerow3(
             :col2  = 'smallZeds.alphaClot'
             :col3  = 'smallZedsHead.alphaClot'
             col1 = 'Alpha Clot')
          tablerow3(
             :col2  = 'smallZeds.slasher'
             :col3  = 'smallZedsHead.slasher'
               col1 = 'Slasher')
          tablerow3(
             :col2  = 'smallZeds.crawler'
             :col3  = 'smallZedsHead.crawler'
               col1 = 'Crawler')
          tablerow3(
             :col2  = 'smallZeds.stalker'
             :col3  = 'smallZedsHead.stalker'
               col1 = 'Stalker')
          tablerow3(
             :col2  = 'smallZeds.gorefast'
             :col3  = 'smallZedsHead.gorefast'
               col1 = 'Gorefast')
          tablerow3(
             :col2  = 'smallZeds.rioter'
             :col3  = 'smallZedsHead.rioter'
               col1 = 'Rioter')
          tablerow3(
             :col2  = 'smallZeds.siren'
             :col3  = 'smallZedsHead.siren'
               col1 = 'Siren')
          tablerow3(
             :col2  = 'smallZeds.gorefiend'
             :col3  = 'smallZedsHead.gorefiend'
               col1 = 'Gorefiend')
          tablerow3(
             :col2  = 'smallZeds.bloat'
             :col3  = 'smallZedsHead.bloat'
               col1 = 'Bloat')
          tablerow3(
             :col2  = 'smallZeds.husk'
             :col3  = 'smallZedsHead.husk'
               col1 = 'Husk')
          tablerow3(
             :col2  = 'smallZeds.edar'
             :col3  = 'smallZedsHead.edar'
               col1 = 'Edar')
          tablerow3(
             :col2  = 'largeZeds.scrake'
             :col3  = 'largeZedsHead.scrake'
               col1 = 'Scrake')
          tablerow3(
             :col2  = 'largeZeds.fleshpound'
             :col3  = 'largeZedsHead.fleshpound'
               col1 = 'Fleshpound')
          
    .table-responsive
      table.table.table-striped
        tablehead2(col1='Boss' col2='Health')
        tbody
          tablerow2( col1 = 'Hans Volter'      :col2 = 'computeBosses.HansVolter' )
          tablerow2( col1 = 'Patriarch'        :col2 = 'computeBosses.Patriarch' )
          tablerow2( col1 = 'King Fleshpound'  :col2 = 'computeBosses.KingFleshpound' )
          tablerow2( col1 = 'Abomination'      :col2 = 'computeBosses.Abomination' )


    moreinfo
      h3 Applying Damage to ZED formula
      li
        | Calculate damage in weapon-specific formula applies to melee weapon swing direction
      li  The damage is then rounded down based on the hitzone.
      |                 For example, if you shoot a Bloat's cleavers the formula would be NewDmg = (BaseWeaponDmg * .2) in most cases this causes
      |                 a base damage reduction
      li ZED Vulnerability or Resistance to Damage types is then applied
      li Check if ZED is blocking, and if so, adjust Damage value
      li Perk damage values are applied at this step.
      li
        | Check for Field Medic Injection buff Damage = Roundup (Damage x Focus Injection Mod)
      li
        | Zed 
        a(href='https://docs.google.com/spreadsheets/d/1GDpg2mN1l_86U_RaDug0glFx8cZCuErwxZLiBKl9SyY/edit#gid=2068776317&range=A122:B122') Decapitation 
        | Decapitation
        a(href='https://docs.google.com/spreadsheets/d/1GDpg2mN1l_86U_RaDug0glFx8cZCuErwxZLiBKl9SyY/edit#gid=2068776317&range=A281:E281') check
        |                     is done
      strong TLDR
      | : Start with weapon base damage
      ol
        li
          strong Skip
          |  if using a 
          strong Ranged Weapon
        li Hitzone Modifier
        li Apply dmg type resistances/weaknesses
        li
          strong Skip
          |  if ZED 
          strong Isn't Blocking
        li Perks applied to base damage here
        li Check if you have medic buff
        li Checks for ZED head pop
      |             Other Notes
      ul
        li
          | Information above paraphrased from the spreadsheet at this
          a(href='https://docs.google.com/spreadsheets/d/1GDpg2mN1l_86U_RaDug0glFx8cZCuErwxZLiBKl9SyY/edit#gid=2068776317&range=A271:B271') section
        li
          | The damage type Resistances and Vulnerabilities are applied BEFORE perk bonuses (This can be very significant
          | to the actual damage done)
        li
          | Slashing Damage Resistance does not apply to Class knives on cyst, Alpha Clot and Slasher
        li Exact damage type for each weapon found on corresponding class pages
        li
          | If the ZED isn't Resistant or Vulnerable to a damage type, you can skip step 3 as the modifier is a neutral
          | x 1.0 (nothing changes)
        li Sirens and Bloats have no vulnerable Damage Types
        li
          | If the tooltip for each ZED does not list a damage type for Resistances or Vulnerabilities, it is neutral

</template>



<script>
import moreinfo from '../../components/moreinfo/MoreInfo.vue';
import tablehead2 from '../../components/table/TableHeadTwo.vue';
import tablerow2 from '../../components/table/TableRowTwo.vue';
import tablehead3 from '../../components/table/TableHeadThree.vue';
import tablerow3 from '../../components/table/TableRowThree.vue';
import { ZedHP } from './ZedHP.js';
import { bosses } from './bosses.js';

export default {
  components: {
    moreinfo,
    tablehead2,
    tablerow2,
    tablehead3,
    tablerow3
  },
  data() {
    return {
      numberofplayers: '1p',
      difficulty     : 'Normal',
      Zeds           : ZedHP,
      bossZeds       : bosses,
      // showBosses     : false,
      // bossTable      : true
    };
  },
  computed: {
    str() {
      return this.difficulty + this.numberofplayers;
    },
    computeBosses() {
      let zedList = Object.keys(this.bossZeds);

      return zedList

        .map(i => {
          return { [i]: this.bossZeds[i][this.str] };
        })
        .reduce((acc, i) => Object.assign(acc, i), {});
    },
    smallZeds() {
      let zedList = Object.keys(this.Zeds);

      return zedList
        .map(i => {
          return { [i]: this.Zeds[i][this.difficulty] };
        })
        .reduce((acc, i) => Object.assign(acc, i), {});
    },
    largeZeds() {
      let zedList = Object.keys(this.Zeds);

      return zedList

        .map(i => {
          return { [i]: this.Zeds[i][this.str] };
        })
        .reduce((acc, i) => Object.assign(acc, i), {});
    },
    smallZedsHead() {
      let zedList = Object.keys(this.Zeds);

      return zedList
        .map(i => {
          return { [i]: this.Zeds[i]['head'][this.difficulty] };
        })
        .reduce((acc, i) => Object.assign(acc, i), {});
    },
    largeZedsHead() {
      let zedList = Object.keys(this.Zeds);

      return zedList
        .map(i => {
          return { [i]: this.Zeds[i]['head'][this.str] };
        })
        .reduce((acc, i) => Object.assign(acc, i), {});
    }
  },
  methods: {}
};
</script>



