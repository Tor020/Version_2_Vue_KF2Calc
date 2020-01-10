// https://stackoverflow.com/questions/43046425/how-can-we-conditionally-load-a-vendor-css-with-webpack
// https://medium.com/webpack/the-new-css-workflow-step-1-79583bd107d7
// https://www.bensmithett.com/smarter-css-builds-with-webpack/


// https://github.com/vuejs-templates/webpack/issues/604
// https://stackoverflow.com/questions/47893611/conditional-stylesheet-in-vue-component


// https://vuetifyjs.com/en/style/theme

// import './Themes/_dark.scss';



function dolocalStorage(){
  localStorage.themeSelection = 'false';
}

checkLocalStorage()
// dolocalStorage()


function checkLocalStorage(){
      if (localStorage.themeSelection === undefined) {
      } else {
      }

/*
    if (localStorage.themeSelection === 'dark') {
        import('./theme-a.css').then(() => {
          
        });
    else (localStorage.themeSelection === 'light') {
        import('./theme-b.css').then(() => {

        });
    }
*/







  }


/*
clear() //cleans all locastorage
key() // localStorage.key(0) will return the key in the key:value pair that items are stored as.
getItem() // localStorage.getItem('userName') will return the value part of the key:value pair.
setItem()  // Adds items to localStorage w/ keyvalue pair
removeItem() localStorage.removeItem('item) // removes the item from the localStorage with that key
getItem + .key can be chained together in conjuction for more dynamic usage
localStorage.getItem(localStorage.key(0))
*/