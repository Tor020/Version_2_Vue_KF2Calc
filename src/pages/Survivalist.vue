<template lang='pug'>
.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main


</template>
<script>
import tablehead3 from '../components/table/TableHeadThree.vue';
import tablerow3 from '../components/table/TableRowThree.vue';

import tablehead4 from '../components/table/TableHeadFour.vue';
import tablerow4 from '../components/table/TableRowFour.vue';

import tablehead5 from '../components/table/TableHeadFive.vue';
import tablerow5 from '../components/table/TableRowFive.vue';

import moreinfo from '../components/moreinfo/MoreInfo.vue';
   


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
      moreInfo:false,
      weaponsBase:{
    // Berserker
        CrovelHeavy: 86,
        CrovelLight: 49,
        CrovelAlt: 15,
        KatanaLight: 68,
        KatanaHeavy: 90,
        KatanaAlt: 68,
        BoneLight: 80,
        BoneHeavy: 165,
        BoneAlt: 175,
        PulverizerLight: 70,
        PulverizerHeavy: 145,
        PulverizerAlt: 528,
        ZweiLight: 85,
        ZweiHeavy: 195,
        ZweiAlt: 63,
        VLAD: 30,
        EvisceratorPrimary: 480,
        EvisceratorStab: 90,
        EvisceratorChain: 29,
    // Commando
        LMGs: 30,
        AR15: 30,
        Bull: 30,
        M16m: 30,
        AK12: 40,
        HMTe: 40,
        Scar: 55,
    // Demolitionist
        HX25:30 ,
        C4EX:820,
        M79G:225,
        M16M:30,
        RPG7:750,
        SEEK:125,
        // PulverizerLight:70,
        // PulverizerHeavy:145,
        // PulverizerAlt:528,
    // Medic
        H101: 20,
        H201: 15,
        H301: 20,
        H401: 35,
        Hemo: 75,
    // Firebug
        Caulk: 10,
        Spitf: 40,
        Mac10: 25,
        Trenc: 27,
        Flame: 21,
        Micro: 14,
    // Gunslinger
        H9MM: 15,
        HMTE: 20,
        REV1: 50,
        M191: 50,
        WINC: 80,
        DEAG: 91,
        MAGN: 160,
        SPXC: 180,
        AF00: 53,
        GREN: 30,
    // Sharpshooter
        Winc: 80,
        SPX4: 180,
        Cros: 350,
        M14E: 90,
        Rail: 750,
        R185: 50,
        M500: 160,
        Spit: 40,
    // Swat
        MP7:16,
        MP5:25,
        P90:30,
        Hec:45,
        Kri:33,
        HMT:15,
        Mac:25, 
    // Support
        SG50: 20,
        DBSH: 25,
        HZ12: 20,
        M4CS: 30,
        AA12: 20,
        VLAD: 30,
        INCE: 27,
        HMTE: 20,
        },
      weaponsMisc: {
        PELLETS: {
          SG50: 7,
          DBSH: 12,
          HZ12: 10,
          M4CS: 7,
          AA12: 7,
          VLAD: 7,
          INCE: 9,
          HMTE: 6,
        }
      }

    }
  },

}
</script>
<style lang='scss' scoped>

</style>

