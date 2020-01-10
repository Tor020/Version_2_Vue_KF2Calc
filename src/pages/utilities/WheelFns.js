
/*
     █████╗ ██████╗ ██████╗     ████████╗ ██████╗       █████╗ ████████╗████████╗██████╗ ██╗██████╗ ██╗   ██╗████████╗███████╗███████╗
    ██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔═══██╗     ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██║██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
    ███████║██║  ██║██║  ██║       ██║   ██║   ██║     ███████║   ██║      ██║   ██████╔╝██║██████╔╝██║   ██║   ██║   █████╗  ███████╗
    ██╔══██║██║  ██║██║  ██║       ██║   ██║   ██║     ██╔══██║   ██║      ██║   ██╔══██╗██║██╔══██╗██║   ██║   ██║   ██╔══╝  ╚════██║
    ██║  ██║██████╔╝██████╔╝       ██║   ╚██████╔╝     ██║  ██║   ██║      ██║   ██║  ██║██║██████╔╝╚██████╔╝   ██║   ███████╗███████║
    ╚═╝  ╚═╝╚═════╝ ╚═════╝        ╚═╝    ╚═════╝      ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝
*/

/*

v-on:wheel.prevent='scrollIncrementOne($event)' v-on:wheel.shift.prevent='scrollIncrementFive($event)'

*/

/*
 █████╗ ██████╗ ██████╗     ████████╗ ██████╗     ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗
██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔═══██╗    ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
███████║██║  ██║██║  ██║       ██║   ██║   ██║    ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║
██╔══██║██║  ██║██║  ██║       ██║   ██║   ██║    ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║
██║  ██║██████╔╝██████╔╝       ██║   ╚██████╔╝    ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║
╚═╝  ╚═╝╚═════╝ ╚═════╝        ╚═╝    ╚═════╝     ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝
*/

/*

import { validationCheck, wheelIncrementOne, wheelIncrementFive } from './utilities/WheelFns.js';

*/

/*
     █████╗ ██████╗ ██████╗     ████████╗ ██████╗      ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗   ██╗████████╗███████╗██████╗
    ██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔═══██╗    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔══██╗
    ███████║██║  ██║██║  ██║       ██║   ██║   ██║    ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║   ██║   █████╗  ██║  ██║
    ██╔══██║██║  ██║██║  ██║       ██║   ██║   ██║    ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║   ██║   ██╔══╝  ██║  ██║
    ██║  ██║██████╔╝██████╔╝       ██║   ╚██████╔╝    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝   ██║   ███████╗██████╔╝
    ╚═╝  ╚═╝╚═════╝ ╚═════╝        ╚═╝    ╚═════╝      ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═════╝
*/
/*

    wheelValidation: function() {
      return validationCheck(this.perkLevel);
    },

/*

/*
 █████╗ ██████╗ ██████╗     ████████╗ ██████╗     ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔═══██╗    ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
███████║██║  ██║██║  ██║       ██║   ██║   ██║    ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
██╔══██║██║  ██║██║  ██║       ██║   ██║   ██║    ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
██║  ██║██████╔╝██████╔╝       ██║   ╚██████╔╝    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
╚═╝  ╚═╝╚═════╝ ╚═════╝        ╚═╝    ╚═════╝     ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝

*/

/*

    scrollIncrementOne(e) {
      return (this.perkLevel = wheelIncrementOne( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },
    scrollIncrementFive(e) {
      return (this.perkLevel = wheelIncrementFive( e.deltaY, this.perkLevel, this.wheelValidation.lowCheck, this.wheelValidation.highCheck ));
    },

*/

export const validationCheck = function(num) {
        /* Statement 1 - Avoid Numbers greater than 25 */

        let obj = {}
 
        if (num >= 25) {
          obj.highCheck = false;
        } else {
          obj.highCheck = true;
        }



        /* Statement 2 - Avoid 0 and Negatives */
        if (num <= 0) {
          obj.lowCheck = false;
        } else {
          obj.lowCheck = true;
        }


 
        return obj;

      };
export const wheelIncrementOne = function (e, num, lowCheck, highCheck ) {


let result;

        if (e >= 0.01 && lowCheck) {
        result = num - 1;




        } else if (e <= 0.01 && highCheck) {
   

         result = num + 1;



        } else { result = num }


   
      return result;

      
      };

export const wheelIncrementFive = function(e, num, lowCheck, highCheck ) {

let result;

        if (e >= 0.01 && lowCheck) {

        result = num - 4;

         if (result < 0) { result = 0; }  // validation for negatives

        } else if (e <= 0.01 && highCheck) {
   
         result = num + 4;

         if (result > 25) { result = 25; } // validation for above cap

        } else { result = num; }           // validation for edge cases

      return result;

      };



