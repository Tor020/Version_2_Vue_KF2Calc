import Vue from 'vue';
import Router from 'vue-router';
import Home from './Home.vue';


//KF2
import Berserker from './pages/Berserker.vue';
import Commando from './pages/Commando.vue';
import Demolitionist from './pages/Demolitionist.vue';
import FieldMedic from './pages/FieldMedic.vue';
import Firebug from './pages/Firebug.vue';
import Gunslinger from './pages/Gunslinger.vue';
import Sharpshooter from './pages/Sharpshooter.vue';
import Support from './pages/Support.vue';
import Survivalist from './pages/Survivalist.vue';
import Swat from './pages/Swat.vue';


import Debug from './Debug/Debug.vue';

Vue.use(Router);
export default new Router({
    routes: [
        {

            path: '/',
            name: 'Home', 
            component: Home
        },
        {
            path:'/Berserker', 
            name: 'Berserker', 
            component:Berserker,
        },
        {
            path:'/Commando',
            name: 'Commando', 
            component:Commando,
        },
        {
            path:'/Demolitionist',
            name: 'Demolitionist', 
            component: Demolitionist
        },
        {
            path: '/FieldMedic',
            name: 'FieldMedic',
            component: FieldMedic
        },
        {
            path: '/Firebug',
            name: 'Firebug', 
            component: Firebug
        },
        {
            path: '/Gunslinger',
            name: 'Gunslinger', 
            component: Gunslinger
        },
        {
            path: '/Sharpshooter',
            name: 'Sharpshooter', 
            component: Sharpshooter, 
        },
        {
            path: '/Support',
            name: 'Support', 
            component: Support
        },
        {
            path: '/Survivalist',
            name: 'Survivalist', 
            component: Survivalist 
        },
        {
            path: '/Swat',
            name: 'Swat', 
            component: Swat
        },
        {
            path: '/Debug',
            name: 'Debug', 
            component: Debug
        },
        // {
        //     path: '/Debug2',
        //     name: 'Debug2', 
        //     component: Debug2
        // },


    ]
});


