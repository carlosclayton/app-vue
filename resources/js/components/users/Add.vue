<template>

    <div class="modal fade" id="modal-default" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                    <h3 class="modal-title"><span class="glyphicon glyphicon-user"></span> {{ statusForm }} user
                    </h3>
                </div>
                <ValidationObserver v-slot="{ handleSubmit, invalid }">
                    <form id="userForm" @submit.prevent="handleSubmit(onUserSubmit)">
                        <div class="modal-body">
                            <ValidationProvider name="Name" rules="required|min:3|max:100"
                                                v-slot="{ errors, failed }">
                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                    <input v-model="name" type="text" class="form-control">
                                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                                    <span class="help-block">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>


                            <ValidationProvider name="Email" rules="required|min:3|email|max:100"
                                                v-slot="{ errors, failed }">
                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                    <input v-model="email" type="email" class="form-control">
                                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                                    <span class="help-block">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>


                            <ValidationProvider name="Password" rules="required|min:3|max:100"
                                                v-slot="{ errors, failed }">
                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                    <input v-model="password" type="password" class="form-control">
                                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                                    <span class="help-block">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>


                        </div>
                        <div class="modal-footer">
                            <button type="submit" :disabled="invalid" class="btn btn-primary">Save</button>
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

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                isLoading: false
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            onUserSubmit() {
                this.isLoading = true
                Auth.addUser(this.name, this.email, this.password)
                    .then((response) => {
                        $('#modal-default').modal('hide')
                        this.getAll()
                        this.isLoading = false
                        Vue.$toast.open({
                            type: 'success',
                            message: response.body.message,
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
