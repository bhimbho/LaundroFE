<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Service Cost Method</h4>
            <div class="row">
              <div class="col-12">
                <b-alert show variant="success" class="my-2" v-if="this.message">{{this.message}}</b-alert>
                <b-alert show variant="danger" class="my-2" v-if="this.error">{{ error.message.error }}</b-alert>
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
                        label="Attire Group"
                        label-for="Attire Group"
                      >
                        <select
                          name=""
                          id=""
                          class="form-control"
                          v-model="serviceAttireGroup"
                        >
                        <option value="">Select Attire Group</option>
                          <option
                            :value="group"
                            v-for="group in this.getAttireGroup"
                            :key="group"
                          >
                            {{ group }}
                          </option>
                        </select>
                      </b-form-group>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                        label="Service Time"
                        label-for="Service Time"
                      >
                        <select
                          name=""
                          id=""
                          class="form-control"
                          v-model="serviceTime"
                        >
                          <option value="">Select Service Time</option>
                          <option value="24">24</option>
                          <option value="12">12</option>
                          <option value="6">6</option>
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
                          placeholder="Service Cost"
                          v-model="serviceCost"
                        ></b-form-input>
                      </b-form-group>
                    </div>

                    <div class="col-md-12 mt-4">
                      <b-button
                        variant="primary"
                        @click="addServiceCostMethod()"
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
              View Services Cost Method  for {{singleService.title}}
              <router-link class="btn btn-primary" to="/services"
                >Go to All Services</router-link
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
                :items="this.relatedServiceMethods"
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
              <template #cell(action)="item">
              <i size="sm" @click="deleteServiceMethod(item)"  class="mr-2 mdi mdi-trash-can"></i>
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
      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "group", sortable: true },
        { key: "hours", sortable: true },
        { key: "cost", sortable: true },
        { key: "action" },
      ],
      singleService: [],
      serviceCost: "",
      serviceAttireGroup: "",
      serviceTime: "",
      relatedServiceMethods: [],
    
      message: false,
      isLoading: false,
      error: false,
      newMessage: false,
    };
  },
  computed: {
    ...mapGetters(["getAllServices", "getAttireGroup"]),
    rows() {
      return this.relatedServiceMethods.length;
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
    },
    // add service cost method for single service
    addServiceCostMethod: async function () {
      await axios
        .post(
          api + "admin/service-method",
          {
            service_id: this.singleService.id,
            cost: this.serviceCost,
            group: this.serviceAttireGroup,
            hours: this.serviceTime,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.message = response.data.message
           this.getServiceCostMethod();
        })
    },
    // get all service cost method
    getServiceCostMethod() {
      axios.get(api + `admin/all-service-methods/${this.singleService.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      }).then(response => {
        this.relatedServiceMethods = response.data.data
      })
    },
    // get service cost method for single service
    deleteServiceMethod (serviceMethod) {
      axios.delete(api + `admin/service-method/${serviceMethod.item.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      }).then(response => {
        this.message = response.data.message
        this.getServiceCostMethod();
      })
    },
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getSingleService();
    this.getServiceCostMethod();
  },
};
</script>