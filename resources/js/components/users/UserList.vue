<template>
    <div class="wrapper">
        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

        <notifications group="foo" position="bottom right"/>
        <va-navibar></va-navibar>
        <va-slider></va-slider>
        <div id="content-wrap" class="content-wrapper">
            <section class="content-header">
                <h1>
                    Users
                    <small>manager all users</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="#">Users</a></li>
                    <li class="active">All</li>
                </ol>
            </section>
            <section class="content">
                <div class="row">
                    <div class="col-md-3">
                        <button type="button" class="btn btn-primary btn-block margin-bottom btn-lg" data-toggle="modal"
                                data-target="#modal-default">
                            <span class="glyphicon glyphicon-plus"></span> Add
                        </button>
                        <div class="box box-primary">
                            <div class="box-header with-border"><h3 class="box-title"><span
                                    class="glyphicon glyphicon-cog"></span> Access </h3>
                                <div class="box-tools">
                                    <button type="button" data-widget="collapse" class="btn btn-box-tool"><i
                                            class="fa fa-minus"></i></button>
                                </div>
                            </div>
                            <div class="box-body no-padding">
                                <ul class="nav nav-pills nav-stacked">
                                    <li class="active"><a href="#" @click="getAll()"><i
                                            class="fa fa-fw fa-list-ul"></i> Users
                                    </a></li>
                                    <!--<li><a href="#"><i-->
                                    <!--class="fa fa-trash-o"></i> Trash-->
                                    <!--</a></li>-->
                                </ul>
                            </div>
                        </div>

                        <div class="box box-primary">
                            <div class="box-header with-border"><h3 class="box-title"><span
                                    class="glyphicon glyphicon-tasks"></span> Filters</h3>
                                <div class="box-tools">
                                    <button type="button" data-widget="collapse" class="btn btn-box-tool"><i
                                            class="fa fa-minus"></i></button>
                                </div>
                            </div>
                            <div class="box-body no-padding">
                                <ul class="nav nav-pills nav-stacked">
                                    <li><a href="#" @click="byFilter(2)"><i class="fa fa-circle-o text-blue"></i>
                                        Clients</a></li>
                                    <li><a href="#" @click="byFilter(1)"><i class="fa fa-circle-o text-green"></i> Admin</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="box box-primary">
                            <div class="box-header with-border"><h3 class="box-title"><span
                                    class="glyphicon glyphicon-search"></span> Pesquisa</h3>
                                <div class="box-tools pull-right">
                                    <button type="button" data-widget="collapse" class="btn btn-box-tool"><i
                                            class="fa fa-minus"></i></button>
                                </div>
                            </div>
                            <div class="box-body">

                                <ValidationObserver v-slot="{ handleSubmit, invalid }">
                                    <form @submit.prevent="handleSubmit(onSubmit)">
                                        <div class="col-md-6">
                                            <ValidationProvider name="by" rules="required"
                                                                v-slot="{ errors, failed }">
                                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                                    <label for="by">By:</label>
                                                    <select v-model="by" id="by" name="by" class="form-control">
                                                        <option value="id" selected="selected">ID</option>
                                                        <option value="name">Nome</option>
                                                        <option value="email">E-mail</option>
                                                        <option value="role">Role</option>
                                                    </select>
                                                    <span class="help-block">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                        </div>

                                        <div class="col-md-6">
                                            <ValidationProvider name="Operator" rules="required"
                                                                v-slot="{ errors, failed }">
                                                <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                                                    <label for="operator">Operator:</label>
                                                    <select v-model="operator" id="operator" name="operator"
                                                            class="form-control">
                                                        <option value="=" selected="selected">Equal</option>
                                                        <option value="like">Like</option>
                                                    </select>
                                                    <span class="help-block">{{ errors[0] }}</span>
                                                </div>
                                            </ValidationProvider>
                                        </div>

                                        <div class="col-md-12">
                                            <ValidationProvider name="Keyword" rules="required|min:1|max:100"
                                                                v-slot="{ errors, failed }">
                                                <div :class="{'input-group': true,  'has-feedback': true, 'has-error': failed }">
                                                    <input v-model="keyword" id="keyword" required="required"
                                                           name="keyword" type="id"
                                                           class="form-control" im-insert="true"
                                                           placeholder="Type key word...">
                                                    <span class="input-group-btn">
                                                    <button type="submit" class="btn btn-block btn-primary">
                                                        <i class="fa fa-search"></i> Search</button>
                                                    </span>
                                                </div>
                                                <span class="help-block text-red">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                    </form>
                                </ValidationObserver>


                            </div>
                        </div>
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <span class="glyphicon glyphicon-th-list"></span>
                                <h3 class="box-title">Users</h3>

                                <div class="box-tools pull-right">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"
                                            data-toggle="tooltip"
                                            title="" data-original-title="Collapse">
                                        <i class="fa fa-minus"></i></button>
                                </div>
                            </div>
                            <div class="box-body" style="">
                                <DataTable
                                        :header-fields="headerFields"
                                        :sort-field="sortField"
                                        :sort="sort"
                                        :data="users || []"
                                        :is-loading="isLoading"
                                        :css="datatableCss"
                                        not-found-msg="Items not found"
                                        @onUpdate="dtUpdateSort"
                                        trackBy="id"
                                >
                                    <div slot="actions" slot-scope="props">
                                        <!--<button type="button" class="btn btn-info" @click="dtShowClick(props);">-->
                                            <!--<i class="fa fa-fw fa-reorder"></i>-->
                                        <!--</button>-->
                                        <button type="button" class="btn btn-warning" @click="dtEditClick(props);">
                                            <i class="glyphicon glyphicon-edit"></i>
                                        </button>
                                        <!--<button type="button" class="btn btn-danger" @click="dtDestroyClick(props);">-->
                                            <!--<i class="glyphicon glyphicon-trash"></i>-->
                                        <!--</button>-->
                                    </div>

                                    <Pagination
                                            slot="pagination"
                                            :page="currentPage"
                                            :total-items="totalItems"
                                            :items-per-page="itemsPerPage"
                                            :css="paginationCss"
                                            @onUpdate="changePage"
                                            @updateCurrentPage="updateCurrentPage"
                                    />
                                    <div class="items-per-page" slot="ItemsPerPage">
                                        <label>Items per page</label>
                                        <ItemsPerPageDropdown
                                                :list-items-per-page="listItemsPerPage"
                                                :items-per-page="itemsPerPage"
                                                :css="itemsPerPageCss"
                                                @onUpdate="updateItemsPerPage"
                                        />
                                    </div>
                                    <Spinner slot="spinner"/>
                                </DataTable>

                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </div>
        <va-footer></va-footer>

        <!--<div class="modal fade" id="modal-default" style="display: none;">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
                            <!--<span aria-hidden="true">×</span></button>-->
                        <!--<h3 class="modal-title"><span class="glyphicon glyphicon-user"></span> {{ statusForm }} user-->
                        <!--</h3>-->
                    <!--</div>-->
                    <!--<ValidationObserver v-slot="{ handleSubmit, invalid }">-->
                        <!--<form id="userForm" @submit.prevent="handleSubmit(onUserSubmit)">-->
                            <!--<div class="modal-body">-->
                                <!--<ValidationProvider name="Name" rules="required|min:3|max:100"-->
                                                    <!--v-slot="{ errors, failed }">-->
                                    <!--<div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">-->
                                        <!--<input v-model="name" type="text" class="form-control">-->
                                        <!--<span class="glyphicon glyphicon-user form-control-feedback"></span>-->
                                        <!--<span class="help-block">{{ errors[0] }}</span>-->
                                    <!--</div>-->
                                <!--</ValidationProvider>-->


                                <!--<ValidationProvider name="Email" rules="required|min:3|email|max:100"-->
                                                    <!--v-slot="{ errors, failed }">-->
                                    <!--<div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">-->
                                        <!--<input v-model="email" type="email" class="form-control">-->
                                        <!--<span class="glyphicon glyphicon-envelope form-control-feedback"></span>-->
                                        <!--<span class="help-block">{{ errors[0] }}</span>-->
                                    <!--</div>-->
                                <!--</ValidationProvider>-->


                                <!--<ValidationProvider name="Password" rules="required|min:3|max:100"-->
                                                    <!--v-slot="{ errors, failed }">-->
                                    <!--<div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">-->
                                        <!--<input v-model="password" type="password" class="form-control">-->
                                        <!--<span class="glyphicon glyphicon-lock form-control-feedback"></span>-->
                                        <!--<span class="help-block">{{ errors[0] }}</span>-->
                                    <!--</div>-->
                                <!--</ValidationProvider>-->


                            <!--</div>-->
                            <!--<div class="modal-footer">-->
                                <!--<button type="submit" :disabled="invalid" class="btn btn-primary">Save</button>-->
                                <!--<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>-->
                            <!--</div>-->
                        <!--</form>-->
                    <!--</ValidationObserver>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <user-add></user-add>
        <user-edit :user="user"></user-edit>
        <!--<div class="modal fade" id="modal-show" style="display: none;">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
                            <!--<span aria-hidden="true">×</span></button>-->
                        <!--<h3 class="modal-title"><span class="glyphicon glyphicon-user"></span> Show user</h3>-->
                    <!--</div>-->

                    <!--<div class="modal-body">-->
                        <!--<table class="table table-condensed">-->
                            <!--<tbody>-->
                            <!--<tr>-->
                                <!--<th style="width: 10px">Nome:</th>-->
                                <!--<th>{{ name }}</th>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Email:</td>-->
                                <!--<td>{{ email }}</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                    <!--</div>-->

                    <!--<div class="modal-footer">-->
                        <!--<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>-->
                    <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash; /.modal-content &ndash;&gt;-->
            <!--</div>-->
            <!--&lt;!&ndash; /.modal-dialog &ndash;&gt;-->
        <!--</div>-->
    </div>

</template>

<script>
    import Vue from 'vue';
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/index.css';

    Vue.use(VueToast);

    import Simplert from 'vue2-simplert';

    import Notifications from 'vue-notification'
    import velocity from 'velocity-animate'
    import VAFooter from '../Footer.vue'
    import VANaviBar from '../NavBar.vue'
    import VASlider from '../Slider.vue'

    Vue.use(Notifications)

    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    import Spinner from "vue-simple-spinner";
    import {DataTable, ItemsPerPageDropdown, Pagination} from "v-datatable-light";
    import orderBy from "lodash.orderby";

    import Auth from '../../services/auth'

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

    import AddUser from '../../components/users/Add'
    import EditUser from '../../components/users/Edit'
    import eventBus from '../../services/eventbus'

    export default {
        data() {
            return {
                by: '',
                operator: '',
                keyword: '',
                fullPage: true,
                users: [],
                statusForm: 'New',

                user: {
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                },
                isLoading: false,
                sort: "desc",
                sortField: "id",
                listItemsPerPage: [5, 10, 20, 50, 100],
                itemsPerPage: 10,
                currentPage: 1,
                totalItems: 0,
                datatableCss: {
                    table: "table table-condensed table-hover table-striped",
                    th: "header-item",
                    thWrapper: "th-wrapper",
                    thWrapperCheckboxes: "th-wrapper checkboxes",
                    arrowsWrapper: "arrows-wrapper",
                    arrowUp: "arrow up",
                    arrowDown: "arrow down",
                    footer: "footer"
                },
                paginationCss: {
                    paginationItem: "pagination-item",
                    moveFirstPage: "move-first-page",
                    movePreviousPage: "move-previous-page",
                    moveNextPage: "move-next-page",
                    moveLastPage: "move-last-page",
                    pageBtn: "page-btn"
                },
                itemsPerPageCss: {
                    select: "item-per-page-dropdown"
                },
                headerFields: [
                    {
                        name: "id",
                        label: "ID",
                        sortable: true
                    },
                    {
                        name: "name",
                        label: "Name",
                        sortable: true
                    },
                    {
                        name: "email",
                        label: "E-mail",
                        sortable: true
                    },
                    {
                        name: "role",
                        label: "Role",
                        sortable: true
                    },
                    {
                        name: "created_at",
                        label: "Data",
                        sortable: true
                    },
                    "__slot:actions",
                ]
            }
        },
        mounted() {
            console.log('User component monted')
            this.getAll();

            eventBus.$on('getAllUsers', () => {
                this.getAll()
            })
        },
        methods: {
            getAll() {
                this.isLoading = true
                Auth.users(this.currentPage, this.itemsPerPage, this.sortField, this.sort)
                    .then((response) => {
                        console.log('Users: ', response)
                        this.users = response.body.data.data
                        this.currentPage = response.body.data.meta.pagination.current_page
                        this.totalItems = response.body.data.meta.pagination.total
                        this.itemsPerPage = response.body.data.meta.pagination.per_page
                        this.isLoading = false
                    })
                    .catch((error) => {

                    })
            },
            dtEditClick(props) {
                this.user = {
                    'id': props.rowData.id,
                    'name': props.rowData.name,
                    'email': props.rowData.email,
                    'password': props.rowData.password
                }
                $('#modal-edit-user').modal('show')
            },
            dtShowClick(props) {
                this.id = props.rowData.id;
                this.name = props.rowData.name;
                this.email = props.rowData.email;
                $('#modal-show').modal('show')
            },
            dtUpdateSort: function ({sortField, sort}) {
                this.isLoading = true
                console.log('New sort: ', sortField + ' ' + sort)

                Auth.users(this.currentPage, this.itemsPerPage, sortField, sort)
                    .then((response) => {
                        console.log('Users: ', response)
                        this.users = response.body.data.data
                        this.currentPage = response.body.data.meta.pagination.current_page
                        this.totalItems = response.body.data.meta.pagination.total
                        this.itemsPerPage = response.body.data.meta.pagination.per_page
                        this.isLoading = false
                    })
                    .catch((error) => {

                    })
            },

            updateItemsPerPage: function (itemsPerPage) {
                this.isLoading = true
                console.log("Updated list per page: ", itemsPerPage);
                Auth.users(this.currentPage, itemsPerPage, this.sortField, this.sort)
                    .then((response) => {
                        console.log('Users: ', response)
                        this.users = response.body.data.data
                        this.currentPage = response.body.data.meta.pagination.current_page
                        this.totalItems = response.body.data.meta.pagination.total
                        this.itemsPerPage = response.body.data.meta.pagination.per_page
                        this.isLoading = false
                    })
                    .catch((error) => {

                    })


            },

            changePage: function (currentPage) {
                this.isLoading = true
                Auth.users(currentPage, this.itemsPerPage, this.sortField, this.sort)
                    .then((response) => {
                        console.log('Users: ', response)
                        this.users = response.body.data.data
                        this.currentPage = response.body.data.meta.pagination.current_page
                        this.totalItems = response.body.data.meta.pagination.total
                        this.itemsPerPage = response.body.data.meta.pagination.per_page
                        this.isLoading = false
                    })
                    .catch((error) => {

                    })

                console.log("load data for the new page", currentPage);
            },

            updateCurrentPage: function (currentPage) {
                this.currentPage = currentPage;
                console.log("update current page without need to load data", currentPage);
            },
            onCancel() {
                console.log('User cancelled the loader.')
            },
            byFilter(filter) {
                this.by = 'role'
                this.operator = '='
                this.keyword = filter
                this.onSubmit();
            },

            onSubmit() {
                this.isLoading = true
                Auth.usersSearch(this.by, this.operator, this.keyword)
                    .then((response) => {
                        console.log('Users: ', response)
                        this.users = response.body.data.data
                        this.currentPage = response.body.data.meta.pagination.current_page
                        this.totalItems = response.body.data.meta.pagination.total
                        this.itemsPerPage = response.body.data.meta.pagination.per_page
                        this.isLoading = false
                    })
                    .catch((error) => {

                    })
            },
            // onUserSubmit() {
            //     this.isLoading = true
            //     if (this.statusForm === 'New') {
            //         Auth.addUser(this.name, this.email, this.password)
            //             .then((response) => {
            //                 $('#modal-default').modal('hide')
            //                 this.getAll()
            //                 this.isLoading = false
            //                 Vue.$toast.open({
            //                     type: 'success',
            //                     message: response.body.message,
            //                     position: 'bottom',
            //                     duration: 5000
            //                 })
            //             })
            //             .catch((error) => {
            //                 Vue.$toast.open({
            //                     type: 'error',
            //                     message: response.body.errors.message,
            //                     position: 'bottom',
            //                     duration: 5000
            //                 })
            //             })
            //     } else {
            //         console.log('Atualizando...')
            //         Auth.updateUser(this.id, this.name, this.email, this.password)
            //             .then((response) => {
            //                 $('#modal-default').modal('hide')
            //                 this.getAll()
            //                 this.isLoading = false
            //                 Vue.$toast.open({
            //                     type: 'success',
            //                     message: response.body.data,
            //                     position: 'bottom',
            //                     duration: 5000
            //                 })
            //             })
            //             .catch((error) => {
            //                 Vue.$toast.open({
            //                     type: 'error',
            //                     message: response.body.errors.message,
            //                     position: 'bottom',
            //                     duration: 5000
            //                 })
            //             })
            //     }
            // },
            destroy() {
                Auth.destroyUser(this.id)
                    .then((response) => {
                        this.getAll()
                        Vue.$toast.open({
                            type: 'success',
                            message: response.body.message,
                            position: 'bottom',
                            duration: 5000
                        })
                    })
                    .catch((response) => {
                        Vue.$toast.open({
                            type: 'error',
                            message: response.body.message,
                            position: 'bottom',
                            duration: 5000
                        })
                    })

            },
            dtDestroyClick(props) {
                this.id = props.rowData.id;

                let obj = {
                    title: 'Remove ' + props.rowData.name,
                    message: 'Are you sure?',
                    type: 'error',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'Yes',
                    customCloseBtnText: 'No',
                    customConfirmBtnClass: 'btn btn-primary btn-block margin-bottom btn-lg',
                    customCloseBtnClass: 'btn btn-danger btn-block margin-bottom btn-lg',
                    onConfirm: this.destroy
                }
                this.$refs.simplert.openSimplert(obj)

            }
        },
        components: {
            Simplert,
            Loading,
            'va-footer': VAFooter,
            'va-navibar': VANaviBar,
            'va-slider': VASlider,
            DataTable,
            ItemsPerPageDropdown,
            Pagination,
            Spinner,
            ValidationProvider,
            ValidationObserver,
            'user-add': AddUser,
            'user-edit': EditUser
        }
    }
</script>


<style>


    #app .items-per-page {
        height: 100%;
        display: flex;
        align-items: center;
        color: #337ab7;
    }

    #app .items-per-page label {
        margin: 0 15px;
    }

    /* Datatable CSS */
    #v-datatable-light .header-item {
        cursor: pointer;
        color: #337ab7;
        transition: color 0.15s ease-in-out;
    }

    #v-datatable-light .header-item:hover {
        color: #ed9b19;
    }

    #v-datatable-light .header-item.no-sortable {
        cursor: default;
    }

    #v-datatable-light .header-item.no-sortable:hover {
        color: #337ab7;
    }

    #v-datatable-light .header-item .th-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        font-weight: bold;
    }

    #v-datatable-light .header-item .th-wrapper.checkboxes {
        justify-content: center;
    }

    #v-datatable-light .header-item .th-wrapper .arrows-wrapper {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        justify-content: space-between;
    }

    #v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
        justify-content: center;
    }

    #v-datatable-light .arrow {
        transition: color 0.15s ease-in-out;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }

    #v-datatable-light .arrow.up {
        border-bottom: 8px solid #337ab7;
    }

    #v-datatable-light .arrow.up:hover {
        border-bottom: 8px solid #ed9b19;
    }

    #v-datatable-light .arrow.down {
        border-top: 8px solid #337ab7;
    }

    #v-datatable-light .arrow.down:hover {
        border-top: 8px solid #ed9b19;
    }

    #v-datatable-light .footer {
        display: flex;
        justify-content: space-between;
        width: 500px;
    }

    /* End Datatable CSS */

    /* Pagination CSS */
    #v-datatable-light-pagination {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0;
        padding: 0;
        width: 300px;
        height: 30px;
    }

    #v-datatable-light-pagination .pagination-item {
        width: 30px;
        margin-right: 5px;
        font-size: 16px;
        transition: color 0.15s ease-in-out;
    }

    #v-datatable-light-pagination .pagination-item.selected {
        color: #ed9b19;
    }

    #v-datatable-light-pagination .pagination-item .page-btn {
        background-color: transparent;
        outline: none;
        border: none;
        color: #337ab7;
        transition: color 0.15s ease-in-out;
    }

    #v-datatable-light-pagination .pagination-item .page-btn:hover {
        color: #ed9b19;
    }

    #v-datatable-light-pagination .pagination-item .page-btn:disabled {
        cursor: not-allowed;
        box-shadow: none;
        opacity: 0.65;
    }

    /* END PAGINATION CSS */

    /* ITEMS PER PAGE DROPDOWN CSS */
    .item-per-page-dropdown {
        background-color: transparent;
        min-height: 30px;
        border: 1px solid #337ab7;
        border-radius: 5px;
        color: #337ab7;
    }

    .item-per-page-dropdown:hover {
        cursor: pointer;
    }
</style>
