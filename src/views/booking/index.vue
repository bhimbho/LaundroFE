<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Booking</h4>
            <div class="row">
              <div class="col-12">
                <form class="" role="form">
                  <div class="row">
                    <div class="col-md-12 mb-2">
                      <label for="">Attire Type</label>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        v-model="attireType"
                      >
                        <option value="">Select Attire Type</option>
                        <option
                          :value="attire.group"
                          :data-id="attire.group"
                          v-for="attire in this.getAllAttires"
                          :key="attire.id"
                        >
                          {{ attire.title }}
                        </option>
                      </select>
                    </div>
                    <!-- <div class="col-md-12 mb-2">
                      <label for="Service">Attire Group</label>
                      <select name="" id="" class="form-control" v-model="attireGroup">
                        <option value="">Select Attire Group</option>
                        <option :value="group" v-for="group in this.getAttireGroup" :key="group">{{group}}</option>
                      </select>
                    </div> -->
                    <div class="col-md-12 mb-2">
                      <label for="Service">Service</label>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        v-model="serviceType"
                        @change="getBookingServiceCost()"
                      >
                        <option value="">Select Service</option>
                        <option
                          :value="service.id"
                          v-for="service in this.getAllServices"
                          :key="service.id"
                        >
                          {{ service.title }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label for="Service">Service Hours</label>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        v-model="serviceHours"
                        @change="getBookingServiceCost()"
                      >
                        <option value="">Select Service Houres</option>
                        <option
                          :value="hour"
                          v-for="hour in this.allServiceHours"
                          :key="hour"
                        >
                          {{ hour }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                        id="example text"
                        label="Quantity"
                        label-for="Quantity"
                      >
                        <b-form-input
                          for="text"
                          type="number"
                          placeholder="Quantity"
                          v-model="quantity"
                          value="1"
                          min="1"
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
                          type="number"
                          placeholder="Quantity"
                          v-model="serviceCost"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                        id="example text"
                        label="Total service cost"
                        label-for="total service cost"
                      >
                        <b-form-input
                          for="text"
                          type="number"
                          placeholder="total service cost"
                          v-model="totalServiceCost"
                          readonly
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button
                        variant="primary"
                        class="btn btn-block"
                        @click="createBooking()"
                        >Create Booking</b-button
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h4
              class="card-title d-flex justify-content-between align-items-center"
            >
              View Order
              <b-button class="btn" variant="primary" @click="addOrder()"
                >Add Order</b-button
              >
            </h4>
            <div class="row mt-4">
              <!-- Table -->
              <div class="table-responsive mb-0">
                <table class="table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Attire Type</th>
                      <th>Service Type</th>
                      <th>Service Hours</th>
                      <th>Quantity</th>
                      <th>Cost</th>
                      <th>Total Cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(booking, index) in this.bookingList"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ booking.attireType }}</td>
                      <td>{{ booking.service }}</td>
                      <td>{{ booking.hour }}</td>
                      <td>{{ booking.quantity }}</td>
                      <td>{{ booking.cost }}</td>
                      <td>{{ booking.totalCost }}</td>
                      <td>
                        <button class="btn btn-sm btn-danger" @click="deleteBooking(booking.id)">delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

import { tableData } from "./dataAdvancedtable";

/**
 * Advanced table component
 */
export default {
  page: {
    title: "Order",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      tableData: tableData,
      title: "Order",
      items: [
        {
          text: "Dashboard",
          href: "/dashboard",
        },
        {
          text: "order",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "name", sortable: true },
        { key: "position", sortable: true },
        { key: "office", sortable: true },
        { key: "age", sortable: true },
        { key: "date", sortable: true },
        { key: "salary", sortable: true },
        { key: "action" },
      ],
      allServiceHours: [24, 12, 6],
      attireType: "",
      serviceType: "",
      attireGroup: "",
      serviceHours: "",
      quantity: 1,
      serviceCost: "",
      bookingList: [],
      showBookingList: [],
    };
  },
  computed: {
    ...mapGetters(["getAllAttires", "getAllServices", "getAttireGroup"]),
    /* Total no. of records*/
    rows() {
      return this.tableData.length;
    },
    totalServiceCost() {
      return this.serviceCost * this.quantity;
    },
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    // get service cost from endpoint
    getBookingServiceCost() {
      console.log("attire:", this.attireType);
      console.log("hour:", this.serviceHours);
      console.log("service", this.serviceType);
      axios
        .get(
          api +
            `admin/service-method-cost/${this.serviceHours}/${this.serviceType}/${this.attireType}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.serviceCost = response.data.data.cost;
          // this.totalServiceCost = this.serviceCost * this.quantity;
        });
    },

    // creating booking
    createBooking() {
      this.bookingList.unshift({
        id: this.bookingList.length + 1,
        attireType: this.attireType,
        hour: this.serviceHours,
        service: this.serviceType,
        quantity: this.quantity,
        cost: this.serviceCost,
        totalCost: this.totalServiceCost,
      });
      console.log(this.bookingList);
      localStorage.setItem("allBookingList", JSON.stringify(this.bookingList));
      this.getBookingListFromStorage();
    },

    // getBookingListFromStorage() {
    //   this.showBookingList = JSON.parse(localStorage.getItem("allBookingList"));
    //   console.log(this.showBookingList);
    // },
    getBookingListFromStorage() {
      if (localStorage.getItem("allBookingList")) {
        try {
          this.bookingList = JSON.parse(
            localStorage.getItem("allBookingList")
          );
        } catch (e) {
          console.log(e);
        }
      }
    },

    // delete booking from list
    deleteBooking(id) {
      alert(id);
      console.log(id)
      if (localStorage.getItem("allBookingList")) {
          this.bookingList = JSON.parse(
            localStorage.getItem("allBookingList"));
          this.bookingList = this.bookingList.filter(item => item.id != id);
          localStorage.setItem("allBookingList", JSON.stringify(this.bookingList));
          this.getBookingListFromStorage()
          console.log(this.bookingList);
      }
    },

    addOrder: function () {
      this.$router.push("/order/add-order");
    },
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.getBookingListFromStorage();
  },
};
</script>
