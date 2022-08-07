<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Delivery Method</h4>
            <div class="row">
              <div class="col-12">
                <b-alert
                  show
                  variant="success"
                  class="my-2"
                  v-if="this.message"
                  >{{ this.message }}</b-alert
                >
                <b-alert show variant="danger" class="my-2" v-if="this.error"
                  >Invalid Details</b-alert
                >
                <form class="" role="form">
                  <div class="row">
                    <div class="col-md-12">
                      <b-form-group
                        id="example text"
                        label="Delivery Method"
                        label-for="Delivery Method"
                      >
                        <b-form-input
                          for="text"
                          placeholder="Delivery Method"
                          v-model="deliveryName"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                        id="example text"
                        label="Cost"
                        label-for="Cost"
                      >
                        <b-form-input
                          for="text"
                          placeholder="Delivery Cost"
                          v-model="deliveryCost"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                        id="example text"
                        label="Delivery Times"
                        label-for="Delivery Times"
                      >
                        <b-form-input
                          for="text"
                          placeholder="Delivery Times"
                          v-model="deliveryTimes"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button
                        variant="primary"
                        class="btn btn-block"
                        v-show="!isLoading"
                        @click="addDeliveryMethods()"
                        >Create Delivery Method</b-button
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
              View Delivery Methodss
              <b-button class="btn" variant="primary"
                >Add Delivery Methods</b-button
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
                :items="this.getAllDeliveryMethods.data"
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
                    @click="getSingleDeliveryMethod(data.item.id)"
                  >
                    <i class="mdi mdi-pencil font-size-18"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                    @click.prevent="deleteDeliveryMethod(data.item.id)"
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

    <!-- modal for updating deliveryMethods -->
    <b-modal
      id="modal-lg"
      size="lg"
      title="Edit Delivery Methods"
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
              label="Delivery Method"
              label-for="Delivery Method"
            >
              <b-form-input
                for="text"
                placeholder="Delivery Methods"
                v-model="singleDeliveryMethod.name"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12">
            <b-form-group
              id="example text"
              label="Delivery Cost"
              label-for="Delivery Cost"
            >
              <b-form-input
                for="text"
                placeholder="Delivery Cost"
                v-model="singleDeliveryMethod.cost"
              ></b-form-input>
            </b-form-group>
          </div>

<<<<<<< HEAD
=======
          <div class="col-md-12">
            <b-form-group
              id="example text"
              label="Delivery Times"
              label-for="Delivery Times"
            >
              <b-form-input
                for="text"
                placeholder="Delivery Times"
                v-model="singleDeliveryMethod.times"
              ></b-form-input>
            </b-form-group>
          </div>
          
>>>>>>> cdb08eb (booking and localstorage fixed)
          <div class="col-md-12 mt-4">
            <b-button
              variant="primary"
              @click="updateDeliveryMethod(singleDeliveryMethod.id)"
              class="btn btn-block"
              v-show="!isLoading"
              >Update Delivery Method</b-button
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
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
const api = process.env.VUE_APP_BASE_URL;

/**
 * Advanced table component
 */
export default {
  page: {
    title: 'deliveryMethodss',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      tableData: tableData,
      title: 'deliveryMethodss',
      items: [
        {
          text: 'Dashboard',
          href: '/',
        },
        {
          text: 'deliveryMethodss',
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
        { key: 'name', sortable: true },
        { key: 'cost', sortable: true },
        { key: 'times', sortable: true },
        { key: 'updated_at', sortable: true },
        { key: 'action' },
      ],
<<<<<<< HEAD
      deliveryName: '',
      deliveryCost: '',
=======
      deliveryName: "",
      deliveryCost: "",
      deliveryTimes: "",
>>>>>>> cdb08eb (booking and localstorage fixed)
      message: false,
      isLoading: false,
      error: false,
      newMessage: false,
      singleDeliveryMethod: [],
    };
  },
  computed: {
    ...mapGetters(['getAllDeliveryMethods']),
    /**
     * Total no. of records
     */
    rows() {
      return this.getAllDeliveryMethods.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.allDeliveryMethods();
  },
  methods: {
    ...mapActions(['allDeliveryMethods']),
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    addDeliveryMethods() {
      this.isLoading = true;
      axios.post(api + "admin/delivery_methods", {
        name: this.deliveryName,
        cost: this.deliveryCost,
        times: this.deliveryTimes
      }, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then(response => {
        this.message = response.data.message
        this.isLoading = false;
        this.deliveryName = ""
        this.deliveryCost = ""
        this.deliveryTimes = ""
        this.allDeliveryMethods();
        console.log(response);
      }).catch(error => {
        this.isLoading = false;
        this.error = true;
        this.deliveryName = ""
        this.deliveryCost = ""
        this.deliveryTimes = ""
        console.log(error.response.data);
      })
    },

    // get single deliveryMethods
    getSingleDeliveryMethod(id) {
      this.singleDeliveryMethod =
        this.$store.getters.getSingleDeliveryMethod(id);
      console.log(this.singleDeliveryMethod);
    },

    // delete deliveryMethods
    deleteDeliveryMethod: async function (id) {
      await axios
        .delete(api + 'admin/delivery_methods/' + id, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.alldeliveryMethodss();
          console.log(response);
        });
    },

    // update admin profile
    updateDeliveryMethods: async function (id) {
      this.isLoading = true;
      await axios
        .patch(
          api + 'admin/delivery_methods/' + id,
          this.singleDeliveryMethod,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.isLoading = false;
          this.newMessage = response.data.message;
          this.allDeliveryMethods();
          console.log(response);
        });
    },
  },
};
</script>
