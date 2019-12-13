<template>
    <div class="modal fade" id="modal-edit-user" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                    <h3 class="modal-title"><span class="glyphicon glyphicon-user"></span> Update user
                    </h3>
                </div>
                <ValidationObserver v-slot="{ handleSubmit, invalid }">
                    <form id="userForm" @submit.prevent="handleSubmit(onUserSubmit)">
                        <div class="modal-body">
                            <ValidationProvider name="Name" rules="required|min:3|max:100"
                                                v-slot="{ errors, failed }">
                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                    <input v-model="user.name" type="text" class="form-control">
                                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                                    <span class="help-block">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>


                            <ValidationProvider name="Email" rules="required|min:3|email|max:100"
                                                v-slot="{ errors, failed }">
                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                    <input v-model="user.email" type="email" class="form-control">
                                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                                    <span class="help-block">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>


                            <ValidationProvider name="Password" rules="required|min:3|max:100"
                                                v-slot="{ errors, failed }">
                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                    <input v-model="user.password" type="password" class="form-control">
                                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                                    <span class="help-block">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>


                        </div>
                        <div class="modal-footer">
                            <button type="submit" :disabled="invalid" class="btn btn-primary">Update</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/index.css';
    Vue.use(VueToast);


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

    import eventBus from '../../services/eventbus'

    import Auth from '../../services/auth'

    export default {
        data() {
            return {
                isLoading: false
            }
        },
        props: {
            user: Object
        },
        mounted() {
            console.log('Component mounted to: ' + this.user)

        },
        methods: {
            onUserSubmit() {
                console.log('New user: ', this.user)
                this.isLoading = true
                Auth.updateUser(this.user.id, this.user.name, this.user.email, this.user.password)
                    .then((response) => {
                        $('#modal-edit-user').modal('hide')
                        eventBus.$emit('getAllUsers')
                        this.isLoading = false
                        Vue.$toast.open({
                            type: 'success',
                            message: response.body.data,
                            position: 'bottom',
                            duration: 5000
                        })
                    })
                    .catch((error) => {
                        Vue.$toast.open({
                            type: 'error',
                            message: response.body.errors.message,
                            position: 'bottom',
                            duration: 5000
                        })
                    })
            },
        },
        components: {
            ValidationProvider,
            ValidationObserver,
        }
    }
</script>
