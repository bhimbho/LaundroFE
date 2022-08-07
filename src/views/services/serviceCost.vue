<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Add Service Cost for {{ singleService.title }}
            </h4>
            <div class="row">
              <div class="col-12">
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
                          :value="singleService.id"
                          readonly
                          disabled
                        ></b-form-input>
                        <b-form-input
                          for="text"
                          placeholder="Service Title"
                          v-model="singleService.id"
                          readonly
                          disabled
                          hidden
                          ref="singleServiceId"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                        label="Service Attire"
                        label-for="Service Attire"
                      >
                        <select
                          name=""
                          id=""
                          class="form-control"
                          v-model="serviceAttire"
                        >
                          <option
                            :value="attire.id"
                            v-for="attire in this.getAllAttires"
                            :key="attire.id"
                          >
                            {{ attire.title }}
                          </option>
                        </select>
                      </b-form-group>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                        id="example text"
                        label="Service Cost"
                        label-for="Service Cost"
                      >
                        <b-form-input
                          for="text"
                          placeholder="Service Title"
                          v-model="serviceCost"
                        ></b-form-input>
                      </b-form-group>
                    </div>

                    <div class="col-md-12 mt-4">
                      <b-button
                        variant="primary"
                        @click="addServiceCost()"
                        class="btn btn-block"
                        v-show="!isLoading"
                        >Add Service Cost</b-button
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

      <!-- data table for all service cost -->
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h4
              class="card-title d-flex justify-content-between align-items-center"
            >
              View Services for {{ singleService.title }}
              <router-link class="btn btn-primary" to="/services"
                >Go to All Services</router-link>
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

<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import { mapGetters } from "vuex";
import axios from "axios";
const api = process.env.VUE_APP_BASE_URL;

export default {
  page: {
    title: "Forms Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      id: this.$route.params.id,
      title: "Services",
      items: [
        {
          text: "Dashboard",
          href: "/dashboard",
        },
        {
          text: "Services",
          active: true,
        },
      ],
      status: "not_accepted",
      checkCustom: "not_accepted",
      checked: true,
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
      singleService: [],
      serviceAttire: "",
      serviceCost: "",

      message: false,
      isLoading: false,
      error: false,
      newMessage: false,
    };
  },
  computed: {
    ...mapGetters(["getAllServices", "getAllAttires"]),
    rows() {
      return this.getAllServices.length;
    },
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    // get single service
    getSingleService() {
      this.singleService = this.$store.getters.getSingleService(this.id);
      console.log(this.singleService);
    },

    // add service cost for single service
    addServiceCost: async function () {
      await axios
        .post(
          api + "admin/service-cost",
          {
            service_id: this.$refs.singleServiceId.value,
            attire_type_id: this.serviceAttire,
            cost: this.serviceCost,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getSingleService();
  },
};
</script>
