<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Services</h4>
            <div class="row">
              <div class="col-12">
                <b-alert show variant="success" class="my-2" v-if="this.message">{{this.message}}</b-alert>
                <b-alert show variant="danger" class="my-2" v-if="this.error">Invalid Details</b-alert>
                <form class="" role="form">
                  <div class="row">
                    <div class="col-md-12">
                      <b-form-group
                        id="example text"
                        label="Title"
                        label-for="Title"
                      >
                        <b-form-input
                          for="text"
                          placeholder="Service Title"
                          v-model="serviceTitle"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button variant="primary" class="btn btn-block" v-show="!isLoading" @click="addService()"
                        >Create Service</b-button
                      >
                      <b-button v-show="isLoading" variant="primary"
                             class="btn btn-block waves-effect waves-light"
                             disabled
                             >
                              <b-spinner small type="grow"></b-spinner>
                              Loading...
                            </b-button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h4
              class="card-title d-flex justify-content-between align-items-center"
            >
              View Services
              <b-button class="btn" variant="primary" @click="addService()"
                >Add Service</b-button
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
                :items="this.getAllServices"
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
                    @click="getSingleService(data.item.id)"
                  >
                    <i class="mdi mdi-pencil font-size-18"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                    @click.prevent="deleteService(data.item.id)"
                  >
                    <i class="mdi mdi-trash-can font-size-18"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    data-toggle="tooltip"
                    title="Edit"
                    v-b-modal.edit-service-cost
                    @click="getServiceCost(data.item.id)"
                  >
                    <i class="mdi mdi-pencil font-size-18"></i>
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

    <!-- modal for updating service -->
    <b-modal
      id="modal-lg"
      size="lg"
      title="Edit Service"
      hide-footer
      title-class="font-18"
      ref="my-modal"
    >
      <b-alert show variant="success" class="my-2" v-if="this.newMessage">{{
        this.newMessage
      }}</b-alert>

      <form class="" role="form">
        <div class="row">
          <div class="col-md-12">
            <b-form-group
              id="example text"
              label="Service Title"
              label-for="Service Title"
            >
              <b-form-input
                for="text"
                placeholder="Service Title"
                v-model="singleService.title"
              ></b-form-input>
            </b-form-group>
          </div>
          
          <div class="col-md-12 mt-4">
            <b-button
              variant="primary"
                @click="updateService(singleService.id)"
              class="btn btn-block" v-show="!isLoading" 
              >Update Attire</b-button
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

    <!-- modal to add service cost -->
    <b-modal
      id="edit-service-cost"
      size="lg"
      title="Edit Service"
      hide-footer
      title-class="font-18"
      ref="my-modal"
    >
      <b-alert show variant="success" class="my-2" v-if="this.newMessage">{{
        this.newMessage
      }}</b-alert>

      <form class="" role="form">
        <div class="row">
          <div class="col-md-12">
            <b-form-group
              id="example text"
              label="Service Title"
              label-for="Service Title"
            >
              <b-form-input
                for="text"
                placeholder="Service Title"
                v-model="singleService.title"
              ></b-form-input>
            </b-form-group>
          </div>
          
          <div class="col-md-12 mt-4">
            <b-button
              variant="primary"
                @click="updateService(singleService.id)"
              class="btn btn-block" v-show="!isLoading" 
              >Update Attire</b-button
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
import { mapGetters, mapActions } from "vuex";
import axios from "axios"
const api = process.env.VUE_APP_BASE_URL;

/**
 * Advanced table component
 */
export default {
  page: {
    title: 'Services',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      tableData: tableData,
      title: 'Services',
      items: [
        {
          text: 'Dashboard',
          href: '/',
        },
        {
          text: 'Services',
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
        { key: 'title', sortable: true },
        { key: 'updated_at', sortable: true },
        { key: 'action' },
      ],
      serviceTitle: "",
      message: false,
      isLoading: false,
      error: false,
      newMessage: false,
      singleService: [],
    };
  },
  computed: {
    ...mapGetters(["getAllServices"]),
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.allServices();
  },
  methods: {
    ...mapActions(["allServices"]),
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    addService() {
      this.isLoading = true;
      axios.post(api + "admin/services", {
        title: this.serviceTitle
      }, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then(response => {
        this.message = response.data.message
        this.isLoading = false;
        this.serviceTitle = ""
        this.allServices();
        console.log(response);
      }).catch(error => {
        this.isLoading = false;
        this.error = true;
        this.serviceTitle = ""
        console.log(error.response.data);
      })
    },

    // get single service
    getSingleService(id) {
      this.singleService = this.$store.getters.getSingleService(id);
      console.log(this.singleService);
    },

    // delete service
    deleteService: async function (id) {
      await axios
        .delete(api + "admin/services/" + id, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.allServices();
          console.log(response);
        });
    },

    // update admin profile
    updateService: async function (id) {
      this.isLoading = true;
      await axios
        .patch(api + "admin/services/" + id, this.singleService, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.isLoading = false;
          this.newMessage = response.data.message;
          this.allServices();
          console.log(response);
        });
    },
  },
};
</script>
