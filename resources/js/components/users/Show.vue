<template>
    <div class="modal fade" id="modal-show-user" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-body text-center">
                    <v-gravatar class="profile-user-img img-responsive img-circle" :email="user.email"
                                :alt="user.name"/>
                            <h3>{{ user.name }}</h3>
                            {{ user.email }}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

    import Vue from 'vue';
    import Gravatar from 'vue-gravatar';

    Vue.component('v-gravatar', Gravatar);

    export default {
        data() {
            return {}
        },
        props: {
            user: Object
        },
        mounted() {
            console.log('Component mounted to: ' + this.user)

        },
        methods: {},
        components: {}
    }
</script>
