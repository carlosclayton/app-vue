<template>

    <div class="login-box">

        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"></loading>


        <div class="login-logo">
            <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>
        <!-- /.login-logo -->
        <div class="login-box-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <ValidationObserver v-slot="{ handleSubmit, invalid }">
                <form @submit.prevent="handleSubmit(onSubmit)">

                    <ValidationProvider name="Email" rules="required|min:3|email|max:100" v-slot="{ errors, failed }">
                        <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                            <input v-model="email" type="email" class="form-control">
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                            <span class="help-block">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>


                    <ValidationProvider name="Password" rules="required|min:3|max:100" v-slot="{ errors, failed }">
                        <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                            <input v-model="password" type="password" class="form-control">
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                            <span class="help-block">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>

                    <div class="row">
                        <div class="col-xs-8">
                            <div class="checkbox icheck">
                                <label>
                                    <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false"
                                         style="position: relative;"><input type="checkbox"
                                                                            style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;">
                                        <ins class="iCheck-helper"
                                             style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                    </div>
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-xs-4">
                            <button type="submit" :disabled="invalid" class="btn btn-primary btn-block btn-flat">
                                Sign
                                In
                            </button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
            </ValidationObserver>

            <div class="social-auth-links text-center">
                <p>- OR -</p>
                <!--<v-facebook-login app-id="1847547945539092" class="btn btn-block  btn-flat"></v-facebook-login>-->

                <fb-signin-button
                        :params="fbSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                    Sign in with Facebook
                </fb-signin-button>

                <button @click.prevent="loginGoogle()" class="btn btn-block btn-google"><i class="fa fa-google-plus"></i> Sign in using Google+</button>

                <br/>
                <router-link :to="{ path: 'forgot'}">I forgot my password</router-link>
                <hr/>
                <router-link :to="{ path: 'register'}">Register</router-link>
            </div>

        </div>
        <!-- /.login-box-body -->
    </div>
</template>

<script>


    import Vue from 'vue';
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/index.css';

    Vue.use(VueToast);


    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    import FBSignInButton from 'vue-facebook-signin-button'
    Vue.use(FBSignInButton)

    //import GoogleLogin from 'vue-google-login';
    // import { LoaderPlugin } from 'vue-google-login';
    // Vue.use(LoaderPlugin, {
    //     client_id: "230302491628-tp96rbpasjj46aaph451tom8d8s885sh.apps.googleusercontent.com"
    // });


    import GAuth from 'vue-google-oauth2'
    const gauthOption = {
        clientId: '230302491628-tp96rbpasjj46aaph451tom8d8s885sh.apps.googleusercontent.com',
        scope: 'profile email',
        prompt: 'select_account'
    }
    Vue.use(GAuth, gauthOption)

    // import Vue from 'vue'
    // import VueResource from 'vue-resource'
    //
    // Vue.use(VueResource)

    import Jwt from '../services/resources'
    import Auth from '../services/auth'

    import {extend} from 'vee-validate';

    import * as rules from 'vee-validate/dist/rules';
    import {messages} from 'vee-validate/dist/locale/pt_BR.json';

    import {ValidationProvider, ValidationObserver} from 'vee-validate';
    import localStorage from "../services/localStorage";

    Object.keys(rules).forEach(rule => {
        extend(rule, {
            ...rules[rule], // copies rule configuration
            message: messages[rule] // assign message
        });
    });

    export default {
        data() {
            return {
                email: '',
                password: '',
                isLoading: false,
                fbSignInParams: {
                    scope: 'email,user_likes',
                    return_scopes: true
                },
                fullPage: true,
                params: {
                    client_id: '230302491628-tp96rbpasjj46aaph451tom8d8s885sh.apps.googleusercontent.com'
                },
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }

            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {

            onSignInSuccess (response) {
                FB.api('/me', dude => {
                    console.log(`Good to see you, ${dude.name}.`)
                })
            },
            onSignInError (error) {
                console.log('OH NOES', error)
            },

            onSuccess(googleUser) {
                console.log(googleUser);

                // This only gets the user information: id, name, imageUrl and email
                console.log(googleUser.getBasicProfile());
            },
            loginGoogle(){
                this.$gAuth.signIn()
                    .then(GoogleUser => {
                        // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
                        console.log('user', GoogleUser)
                        // GoogleUser.getId() : Get the user's unique ID string.
                        // GoogleUser.getBasicProfile() : Get the user's basic profile information.
                        // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
                        this.isSignIn = this.$gAuth.isAuthorized
                    })
                    .catch(error  => {
                        //on fail do something
                    })
            },
            onFailure(error){
                console.log('Error: ',error)
            },
            onCancel() {
                console.log('User cancelled the loader.')
            },
            onSubmit() {
                this.isLoading = true
                Auth.login(this.email, this.password)
                    .then((response) => {
                        this.$store.dispatch('initLogin')
                        console.log('Token: ', response.body.token)
                        this.$router.push('home');
                        this.isLoading = false
                    }, response => {
                        console.log('Error: ', response.body.error)
                        this.isLoading = false
                        Vue.$toast.open({
                            type: 'error',
                            message: response.body.error,
                            position: 'bottom',
                            duration: 5000
                        })
                    });

                // Jwt.accessToken(this.email, this.password)
                //     .then(response => {
                //         console.log('Token: ', response.body.token)
                //         localStorage.set('token',response.body.token )
                //     }, response => {
                //         console.log('Error: ', response.body.error)
                //     });

                // this.$http.post('http://api-laravel-rest.herokuapp.com/api/access_token', {
                //     email: this.email,
                //     password: this.password
                // }).then(response => {
                //     console.log('Token: ', response.body.token)
                // }, response => {
                //     console.log('Error: ', response.body.error)
                // });
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver,
            Loading

        }
    }
</script>


<style>
    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #4267b2;
        color: #fff;
    }
</style>