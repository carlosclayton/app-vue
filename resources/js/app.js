import Vue from 'vue';

import babelPolyfill from 'babel-polyfill'
import router from './routes';
import store from './services/store';
import App from './components/App';

require('./bootstrap');


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = process.env.MIX_API_URL;

require('./services/interceptor')

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {
        App
    }
})


