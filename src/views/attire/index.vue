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
              View Attire
              <b-button class="btn" variant="primary" @click="addAttire()"
                >Add Attire</b-button
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
                :items="this.getAllAttires"
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
                <template #cell(attire_image)="data">
                  <img :src="data.item.attire_image" width="50" height="50" />
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
                    @click="getSingleAttire(data.item.id)"
                  >
                    <i class="mdi mdi-pencil font-size-18"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                    @click.prevent="deleteAttire(data.item.id)"
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
    <!-- modal for updating attire -->
    <b-modal
      id="modal-lg"
      size="lg"
      title="Edit Attire"
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
                v-model="singleAttire.title"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              id="example text"
              label="Attire Image"
              label-for="Attire Image"
            >
              <b-form-input
                type="file"
                for="text"
                ref="attireImage"
                @change="uploadAttireImage()"
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="col-md-12 mt-4">
            <b-button
              variant="primary"
              @click="updateAttire(singleAttire.id)"
              class="btn btn-block"
              v-show="!isLoading"
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
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
const api = process.env.VUE_APP_BASE_URL;

/**
 * Advanced table component
 */
export default {
  page: {
    title: 'Attire',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      tableData: tableData,
      title: 'Attire',
      items: [
        {
          text: 'Dashboard',
          href: '/dashboard',
        },
        {
          text: 'Attire',
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
        { key: 'attire_image', sortable: true },
        { key: 'group', sortable: true },
        { key: 'updated_at', sortable: true },
        { key: 'action' },
      ],
      singleAttire: [],
      api: api,
      newMessage: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(['getAllAttires']),
    rows() {
      return this.getAllAttires.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.allAttires();
    console.log(this.$store.allAttires, this.api);
  },
  methods: {
    ...mapActions(['allAttires']),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    addAttire: function () {
      this.$router.push('/attire/add-attire');
    },

    // get single attire
    getSingleAttire(id) {
      this.singleAttire = this.$store.getters.getSingleAttire(id);
      console.log(this.singleAttire);
    },

    // delete attire
    deleteAttire: async function (id) {
      await axios
        .delete(api + 'admin/attires/' + id, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.allAttires();
          console.log(response);
        });
    },

    // update attire
    updateAttire: async function (id) {
      this.isLoading = true;
      await axios
        .patch(api + 'admin/attires/' + id, this.singleAttire, {
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
};
</script>
