// Come back to this later - get feature working first

const validateObj = function ()  {

return { 
  lowCheck:'',
  highCheck:'',

  



validationCheck: function(perklvl) {
        /* Statement 1 - Avoid Numbers greater than 25 */
        if (perklvl >= 25) {
      return    this.highCheck = false;
        } else {
       return   this.highCheck = true
        }
        /* Statement 2 - Avoid 0 and Negatives */
        if (perklvl <= 0) {
       return   this.lowCheck = false;
        } else {
       return   this.lowCheck = true;
        }
      },

wheelIncrementOne: function (e) {
        this.validationCheck() // This function sets the variables on the vue instance that the conditional checks before incrementing or decrementing above / below the cap

        if (e.deltaY >= 0.01 && this.lowCheck) {
       return this.perkLevel = this.perkLevel - 1;

          /*  console.log('scroll down'); A positive e.deltaY value indicates scrolling down */

        } else if (e.deltaY <= 0.01 && this.highCheck) {

       return this.perkLevel = this.perkLevel + 1;

          /*  console.log('scroll up');  A negative e.deltaY value indicates scrolling up */

        }
        this.validate() // This function is called at the end so that if the number ends up above 25 due to scroll and normal input type incrementation with the keyboard; the number gets transformed back to a cap of 25
      },

wheelIncrementFive: function(e) {
        this.validationCheck() // This function sets the variables on the vue instance that the conditional checks before incrementing or decrementing above / below the cap

        if (e.deltaY >= 0.01 && this.lowCheck) {
       return   this.perkLevel = this.perkLevel - 4;

          /*  console.log('scroll down'); A positive e.deltaY value indicates scrolling down */

        } else if (e.deltaY <= 0.01 && this.highCheck) {

      return    this.perkLevel = this.perkLevel + 4;

          /*  console.log('scroll up');  A negative e.deltaY value indicates scrolling up */

        }
        this.validate() // This function is called at the end so that if the number ends up above 25 due to scroll and normal input type incrementation with the keyboard; the number gets transformed back to a cap of 25

      },
validate: function(perklvl) {
        if (perklvl > 25) {
     return     perklvl = 25;
        } else if (perklvl < 0) {
     return     perklvl = 1;
        }
      },

  }
}
export default validateObj;


