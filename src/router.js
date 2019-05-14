import Vue from 'vue';
import Router from 'vue-router';
import Airplane from './components/Airplane.vue';
import Calculator from './components/Calculator.vue';
import Thanos from './components/Thanos.vue';

Vue.directive('dynamic', function(newValue) {
  this.el.innerHTML = newValue;
  this.vm.$compile(this.el);
});

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/airplane',
      component: Airplane,
    },
    {
      path: '/calculator',
      component: Calculator,
    },
    {
      path: '/thanos',
      component: Thanos,
    },
  ],
});

export default router;
