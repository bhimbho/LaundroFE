<script>
import Layout from '../layouts/main';
import PageHeader from '@/components/page-header';
import appConfig from '@/app.config';

import { mapGetters, mapActions } from "vuex";
// import axios from "axios";
// const api = process.env.VUE_APP_BASE_URL;

/**
 * Advanced table component
 */
export default {
  page: {
    title: 'Transactions',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: 'Transactions',
      items: [
        {
          text: 'Dashboard',
          href: '/',
        },
        {
          text: 'Transactions',
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
        { key: 'tag_no', sortable: true },
        { key: 'customer_name',  sortable: true },
        { key: 'customer_phone',  sortable: true },
        { key: 'delivery_method.name', label: 'Delivery Type', sortable: true },
        { key: 'payment_type', sortable: true },
        { key: 'total', label: 'Total Paid' },
        { key: 'total_quantity', label: 'Tot. Cloth' },
        { key: 'has_special', label: 'Express',  sortable: true},
        { key: 'created_at', label: 'Date Created', sortable: true },
        { key: 'action' },
      ],

      // vars
      transactions: []
    };
  },
  computed: {
    ...mapGetters(["getAllTransactions"]),
    /**
     * Total no. of records
     */
    rows() {
      return this.transactions.length;
    },
  },
  methods: {
    ...mapActions(["allTransactions"]),
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
     // get all related service cost
    // allTransactions() {
    //   axios.get(api + `admin/transactions`, {
    //     headers: {
    //       Authorization: `Bearer ${this.$store.state.token}`,
    //     },
    //   }).then(response => {
    //     this.transactions = response.data.data.data
    //   })
    

    // addTransaction: function () {
    //   this.$router.push('/transactions/add-transaction');
    // },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.allTransactions();
  },
};
</script>

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
              View Transactions
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
                :items="this.getAllTransactions"
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
              <template #cell(has_special)="has_special">
                  <p v-if="has_special.value == false">48hrs</p>
                  <p class="bg-danger text-white text-center" v-else>Yes [24/12/6hrs Service Required]</p>
              </template>
                <template v-slot:cell(action)="data">
                  <router-link
                    :to="{ name: 'transaction-details', params: { id: data.item.id } }"
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    data-toggle="tooltip"
                    title="View Transaction Orders"
                  >
                    <i class="mdi mdi-eye font-size-18"></i>
                  </router-link>
                  <!-- <a
                    href="javascript:void(0);"
                    class="text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                  >
                    <i class="mdi mdi-trash-can font-size-18"></i>
                  </a> -->
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
  </Layout>
</template>
