import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './services/store';
import Login from './components/Login';
import Home from './components/Home';
import Forgot from './components/Forgot';
import Register from './components/Register';

import UserList from './components/users/UserList';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/register',
            component: Register,
            // beforeEnter: (to, from, next) => {
            //
            // }
        },
        {
            path: '/forgot',
            component: Forgot,
            // beforeEnter: (to, from, next) => {
            //
            // }
        },
        {
            path: '/home',
            component: Home,
            // beforeEnter: (to, from, next) => {
            //
            // }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/users',
            component: UserList
        },
        {
            path: '*',
            redirect: '/login'
        }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/forgot', '/register'];
    const authRequired = !publicPages.includes(to.path);
    // const loggedIn = localStorage.get('token');
    const loggedIn = store.state.loggingIn;
    // console.log('Store login: ', loggedIn)


    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

// router.beforeEach((to, from, next) => {
//     let token = localStorage.get('token')
//     console.log('Guard token: ', token);
//     if (to.fullPath === '/home') {
//         if (!token) {
//             next('/login');
//         }
//     }
//     if (to.fullPath === '/login') {
//         if (token) {
//             next('/nome');
//         }
//     }
//     next();
// });

export default router;
