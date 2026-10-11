import Vue from 'vue';

import '@/styles/form.css';
import '@/styles/global.css';
import 'font-awesome/css/font-awesome.css';

import App from './App';
import router from './router';
import Share from './utils/share';

// Pressing Enter in a field moves focus to the next one, referenced by
// the value passed to the directive (e.g. `v-focus-next-on-enter="'age'"`).
Vue.directive('focusNextOnEnter', {
  bind (el, binding, vnode) {
    el.addEventListener('keyup', (ev) => {
      if (ev.keyCode !== 13) return
      const next = vnode.context.$refs[binding.value]
      const focusable = next && (next.$el ? next.$el.querySelector('input, textarea, [tabindex]') : null)
      if (focusable) {
        focusable.focus()
        focusable.select()
      }
    })
  }
})

// Native share is optional; init() is a no-op kept for compatibility.
Share.init();

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
