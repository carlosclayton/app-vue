<template>
    <aside id="slider" class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <div class="user-panel">
                <div class="pull-left image">
                    <v-gravatar :email="currentUser.email" class="img-circle" :alt="currentUser.name" />
                </div>
                <div class="pull-left info">
                    <p>{{ currentUser.name }}</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
                </div>
            </form>
            <ul class="sidebar-menu tree" data-widget="tree">
                <li class="header">MAIN NAVIGATION</li>

                <li>
                    <router-link :to="{ path: 'home'}"> <i class="fa fa-dashboard"></i> <span>Dashboard</span></router-link>
                </li>
                <li>
                    <router-link :to="{ path: 'users'}"><i class="fa fa-book"></i> Usuários</router-link>
                </li>
            </ul>

        </section>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
    import Vue from 'vue';
    import Gravatar from 'vue-gravatar';

    Vue.component('v-gravatar', Gravatar);

    import Auth from '../services/auth';
    export default {
        name: 'va-slider',
        props: {},
        created() {

        },
        data() {
            return {
                currentUser: [],
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
        computed: {},
        components: {}
    }
</script>
