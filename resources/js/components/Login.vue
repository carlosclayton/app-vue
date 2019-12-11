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

                <!--<v-facebook-login app-id="1847547945539092" :login-options="options"-->
                <!--class="btn btn-block  btn-flat"></v-facebook-login>-->


                <facebook-login
                        version="v5.0"
                        appId="1847547945539092"
                        @login="getUserData"
                        @logout="onLogout"
                        @get-initial-status="getUserData"
                        @sdk-loaded="sdkLoaded"
                >
                </facebook-login>

                <button v-on:click="loginGoogle()" class="btn  btn-google"><i
                        class="fa fa-google-plus"></i> Sign in using Google+
                </button>

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

    import facebookLogin from 'facebook-login-vuejs';

    //import GoogleLogin from 'vue-google-login';
    // import { LoaderPlugin } from 'vue-google-login';
    // Vue.use(LoaderPlugin, {
    //     client_id: "230302491628-tp96rbpasjj46aaph451tom8d8s885sh.apps.googleusercontent.com"
    // });


    import GAuth from 'vue-google-oauth2'

    const GauthOption = {
        clientId: '595939423328-44gl35nf3l39h6o42ap8spgdi1nlmved.apps.googleusercontent.com',
        scope: 'profile email',
        prompt: 'select_account'
    }
    Vue.use(GAuth, GauthOption)


    import Auth from '../services/auth'

    import {extend} from 'vee-validate';

    import * as rules from 'vee-validate/dist/rules';
    import {messages} from 'vee-validate/dist/locale/pt_BR.json';

    import {ValidationProvider, ValidationObserver} from 'vee-validate';

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

                isConnected: false,
                name: '',
                email: '',
                FB: undefined,

                fullPage: true,

            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            getUserData() {
                this.FB.api('/me', 'GET', {fields: 'id,name,email, picture'},
                    userInformation => {
                        console.log('User face: ', userInformation)
                        Auth.register(userInformation.name, userInformation.email, userInformation.id)
                            .then((response) => {
                                this.$store.dispatch('initLogin')
                                console.log('Token: ', response.body.token)
                                this.$router.push('home');
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
                    }
                )
            },
            sdkLoaded(payload) {
                this.isConnected = payload.isConnected
                this.FB = payload.FB
                if (this.isConnected) this.getUserData()
            },
            onLogin() {
                this.isConnected = true
                this.getUserData()
            },
            onLogout() {
                this.isConnected = false;
            },
            loginGoogle() {
                console.log('Login google...')
                this.$gAuth.signIn()
                    .then(GoogleUser => {
                        console.log(GoogleUser.w3.ig + " " + GoogleUser.w3.U3 + " " + GoogleUser.w3.Eea)
                        Auth.register(GoogleUser.w3.ig, GoogleUser.w3.U3, GoogleUser.w3.Eea)
                            .then((response) => {
                                this.$store.dispatch('initLogin')
                                console.log('Token: ', response.body.token)
                                this.$router.push('home');
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

                    })
                    .catch(error => {
                        //on fail do something
                    })
            },
            onFailure(error) {
                console.log('Error: ', error)
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
            Loading,
            facebookLogin

        }
    }
</script>
<style>

    .container {
        width: 100%;
    }

    .container button {
        cursor: default;
        min-width: 15rem;
        color: #fff;
        box-sizing: border-box;
        margin: 0;
        align-items: center;
        border-radius: 0.25rem;
        justify-content: center;
        background-color: #3c57a4;
        width: 100px;
        display: inline-block;
        margin-bottom: 4px;
        font-weight: normal;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
    }

    .container button img {
        position: relative;
        top: 0px;
        left: 0px;
        width: 15px;
    }

    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        cursor: default;
        min-width: 15rem;
        color: #fff;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.05);
        margin: 0;
        padding-top: 0.5rem;
        padding-left: 1.275rem;
        padding-right: 1.275rem;
        padding-bottom: 0.5rem;
        display: flex;
        align-items: center;
        border-radius: 0.25rem;
        justify-content: center;
        background-color: #3c57a4;
        width: 100%;
        margin-bottom: 5px;
    }

    .fb-signin-button i {
        margin-right: 2px;
    }

    .button {
        margin: 100%;
    }
</style>