import Vue from 'vue';

import App from './App.vue';
import router from './router';
import Zed from './pages/ZED/Zed.vue';



// import './GoogleFirebase/firebase.js'; need toreinstall firebase to do, trying sheets option first




import 'bootstrap/dist/css/bootstrap.css';
import './sass/style.scss';





Vue.config.productionTip = false;
const root = document.querySelector('#root');



new Vue({
  Zed,
  router,
  render: h => h(App)
}).$mount(root);




