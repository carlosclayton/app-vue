<template>
    <header class="main-header">
        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

        <!-- Logo -->
        <router-link to="/home" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>A</b>LT</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>Admin</b>LTE</span>
        </router-link>

        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- Messages: style can be found in dropdown.less-->
                    <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-envelope-o"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">Nenhuma mensagem</li>

                        </ul>
                    </li>
                    <!-- Notifications: style can be found in dropdown.less -->
                    <li class="dropdown notifications-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-bell-o"></i>
                            <!--<span class="label label-warning">{{ unreadNotificationsCount }}</span>-->
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">Nenhuma tarefa</li>

                        </ul>
                    </li>
                    <!-- Tasks: style can be found in dropdown.less -->
                    <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa  fa-users"></i>
                            <!--<span class="label label-danger">{{ remainTasksCount }}</span>-->
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">You have 0 tasks</li>
                        </ul>
                    </li>
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <v-gravatar :email="currentUser.email" class="user-image" :alt="currentUser.name" />

                            <span class="hidden-xs">{{ currentUser.name }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <v-gravatar :email="currentUser.email" class="img-circle" :alt="currentUser.name" />
                                <p>
                                    {{ currentUser.name }}
                                </p>
                                {{ currentUser.email}}
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="#" class="btn btn-default btn-flat"><span
                                            class="glyphicon glyphicon-tasks"></span> Cadastro </a>
                                </div>
                                <div class="pull-right">
                                    <button @click.prevent="sendLogout" class="btn btn-danger btn-flat"><span
                                            class="glyphicon glyphicon-off"></span> Logout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
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
