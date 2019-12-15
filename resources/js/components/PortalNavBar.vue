<template>
    <header class="main-header">
        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>
        <header class="main-header">
            <nav class="navbar navbar-static-top">
                <div class="container">
                    <div class="navbar-header">
                        <a href="../../index2.html" class="navbar-brand"><b>My </b> Commerce</a>
                    </div>


                    <!-- Navbar Right Menu -->
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li >
                                <a href="#">Register</a>
                            </li>
                            <!-- User Account Menu -->
                            <li class="dropdown user user-menu">
                                <!-- Menu Toggle Button -->
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Login</a>

                            </li>

                            <!-- Tasks Menu -->
                            <li class="dropdown tasks-menu">
                                <!-- Menu Toggle Button -->
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <span class="glyphicon glyphicon-shopping-cart"></span>
                                    <span class="label label-danger">9</span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="header">You have 9 tasks</li>
                                    <li>
                                        <!-- Inner menu: contains the tasks -->
                                        <ul class="menu">
                                            <li><!-- Task item -->
                                                <a href="#">
                                                    <!-- Task title and progress text -->
                                                    <h3>
                                                        Design some buttons
                                                        <small class="pull-right">20%</small>
                                                    </h3>
                                                    <!-- The progress bar -->
                                                    <div class="progress xs">
                                                        <!-- Change the css width attribute to simulate progress -->
                                                        <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                            <span class="sr-only">20% Complete</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <!-- end task item -->
                                        </ul>
                                    </li>
                                    <li class="footer">
                                        <a href="#">View all tasks</a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                    <!-- /.navbar-custom-menu -->
                </div>
                <!-- /.container-fluid -->
            </nav>
        </header>

    </header>
</template>

<script>

    import Vue from 'vue';
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/index.css';
    Vue.use(VueToast);

    import Gravatar from 'vue-gravatar';
    Vue.component('v-gravatar', Gravatar);

    import Simplert from 'vue2-simplert';
    import Auth from '../services/auth';

    export default {
        name: 'va-navibar',
        data() {
            return {
                unreadMessagesCount: 5,
                unreadNotificationsCount: 10,
                remainTasksCount: 14,
                currentUser: [],
                user: [],
                rota: this.$route.name
            }
        },
        mounted() {
            Auth.user()
                .then((response) => {
                    console.log('User: ', response)
                    this.currentUser = response.body
                })

        },
        methods: {
            logout() {
                Auth.logout()
                    .then(() => {
                        this.$store.dispatch('initLogout')
                        this.$router.push('/login');
                        Vue.$toast.open({
                            type: 'success',
                            message: 'Logout with success.',
                            position: 'bottom',
                            duration: 5000
                        })
                    })
                    .catch((response) => {
                        Vue.$toast.open({
                            type: 'error',
                            message: response.body.error,
                            position: 'bottom',
                            duration: 5000
                        })
                    })


            },
            sendLogout() {
                let obj = {
                    title: 'Logout',
                    message: 'Deseja sair do sistema?',
                    type: 'error',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'Sim',
                    customCloseBtnText: 'Não',
                    customConfirmBtnClass: 'btn btn-primary btn-block margin-bottom btn-lg',
                    customCloseBtnClass: 'btn btn-danger btn-block margin-bottom btn-lg',
                    onConfirm: this.logout
                }
                this.$refs.simplert.openSimplert(obj)

            }
        },
        computed: {},
        created() {
            //this.getUser();
        },
        components: {
            Simplert
        }
    }

</script>
