import Vue from 'vue';
import Router from 'vue-router';

import page0 from '@/components/pages/page0';
import page1 from '@/components/pages/page1';
import page2 from '@/components/pages/page2';
import page3 from '@/components/pages/page3';
import page4 from '@/components/pages/page4';
import page5 from '@/components/pages/page5';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/page1' },
    { path: '/page0', name: 'page0', component: page0 },
    { path: '/page1', name: 'page1', component: page1 },
    { path: '/page2', name: 'page2', component: page2 },
    { path: '/page3', name: 'page3', component: page3 },    
    { path: '/page4', name: 'page4', component: page4 },
    { path: '/page5/:id', name: 'page5', component: page5 },
  ],
});
