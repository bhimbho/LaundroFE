<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4
              class="card-title d-flex justify-content-between align-items-center"
            >
              View Administrator
              <b-button class="btn" variant="primary" @click="addAdmin()"
                >Add Administrator</b-button
              >
            </h4>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-right"
                >
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="this.getAllAdministrators"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template #cell(no)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(updated_at)="data">
                  {{ new Date(data.value).toLocaleString() }}
                </template>
                <template v-slot:cell(action)="data">
                  <a
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    data-toggle="tooltip"
                    title="Edit"
                    v-b-modal.modal-lg
                    @click="getSingleAdministrator(data.item.id)"
                  >
                    <i class="mdi mdi-pencil font-size-18"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                    @click.prevent="deleteAdministrator(data.item.id)"
                  >
                    <i class="mdi mdi-trash-can font-size-18"></i>
                  </a>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-right"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-lg"
      size="lg"
      title="Edit Profile"
      hide-footer
      title-class="font-18"
      ref="my-modal"
    >
      <b-alert show variant="success" class="my-2" v-if="this.newMessage">{{
        this.newMessage
      }}</b-alert>

      <form class="" role="form">
        <div class="row">
          <div class="col-md-6">
            <b-form-group
              id="example text"
              label="First Name"
              label-for="First Name"
            >
              <b-form-input
                for="text"
                placeholder="First Name"
                v-model="singleAdministrator.firstname"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              id="example text"
              label="Last Name"
              label-for="Last Name"
            >
              <b-form-input
                for="text"
                placeholder="Last Name"
                v-model="singleAdministrator.lastname"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              id="example text"
              label="Email Address"
              label-for="Email Address"
            >
              <b-form-input
                type="email"
                for="text"
                placeholder="Email Address"
                v-model="singleAdministrator.email"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              id="example text"
              label="Username"
              label-for="Username"
            >
              <b-form-input
                for="text"
                placeholder="Username"
                v-model="singleAdministrator.username"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12">
            <label for="">Roles</label>
            <select class="form-control" v-model="singleAdministrator.role">
              <option>Select</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>
          <div class="col-md-12 mt-4">
            <b-button
              variant="primary"
              class="btn btn-block"
              v-show="!isLoading"
              @click="updateAdministratorProfile(singleAdministrator.id)"
              >Update Administrator Profile</b-button
            >
            <b-button
              v-show="isLoading"
              variant="primary"
              class="btn btn-block waves-effect waves-light"
              disabled
            >
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </b-button>
          </div>
        </div>
      </form>
    </b-modal>
  </Layout>
</template>

<script>
import Layout from '../layouts/main';
import PageHeader from '@/components/page-header';
import appConfig from '@/app.config';

import { tableData } from './dataAdvancedtable';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
const api = process.env.VUE_APP_BASE_URL;

/**
 * Advanced table component
 */
export default {
  page: {
    title: 'Advanced Table',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      tableData: tableData,
      title: 'Advanced Table',
      items: [
        {
          text: 'Tables',
          href: '/',
        },
        {
          text: 'Advanced',
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: 'age',
      sortDesc: false,
      fields: [
        'no',
        { key: 'username', sortable: true },
        { key: 'firstname', sortable: true },
        { key: 'lastname', sortable: true },
        { key: 'email', sortable: true },
        { key: 'role', sortable: true },
        { key: 'updated_at', sortable: true },
        { key: 'action' },
      ],
      message: false,
      singleAdministrator: [],
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      username: '',
      password: '',
      confirmPassword: '',
      newMessage: false,
      isLoading: false,
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    ...mapGetters(['getAllAdministrators']),
    AllAdministrators() {
      return this.getAllAdministrators;
    },
    rows() {
      return this.getAllAdministrators.length;
    },
  },
  methods: {
    /**
     * Search the table data with search input
     */
    ...mapActions(['allAdministrators']),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    addAdmin: function () {
      this.$router.push('/administrator/add-administrator');
    },
    // get single addministrator

    getSingleAdministrator(id) {
      this.singleAdministrator = this.$store.getters.getSingleAdministrator(id);
      console.log(this.singleAdministrator);
    },
    // delete administrator
    deleteAdministrator: async function (id) {
      await axios
        .delete(api + 'admin/delete_profile/' + id, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.allAdministrators();
          console.log(response);
        });
    },

    // update admin profile
    updateAdministratorProfile: async function (id) {
      this.isLoading = true;
      await axios
        .patch(api + 'admin/update_profile/' + id, this.singleAdministrator, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.isLoading = false;
          this.newMessage = response.data.message;
          this.allAdministrators();
          console.log(response);
        });
    },
  },
  mounted() {
    this.allAdministrators();
    this.totalRows = this.items.length;
  },
};
</script>
