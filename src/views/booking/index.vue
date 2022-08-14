<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Booking</h4>
            <div class="row">
              <div class="col-12">
                <b-alert show variant="success" class="my-2" v-if="this.message"
                  >Added successfully</b-alert
                >
                <b-alert show variant="danger" class="my-2" v-if="this.error">{{
                  this.error
                }}</b-alert>
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
                          :value="attire"
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
                        @change="getServiceCost()"
                      >
                        <option value="">Select Service</option>
                        <option
                          :value="service"
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
                        @change="getServiceMethodCost()"
                      >
                        <option value="48" selected>48</option>
                        <option
                          :value="hour"
                          v-for="hour in this.allServiceHours"
                          :key="hour"
                        >
                          {{ hour }}
                        </option>
                      </select>
                      <!-- <v-select :options="this"></v-select> -->
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
                    <div>
                      <span
                        ><h6>
                          Service Cost: &#8358;{{ totalServiceCost }}
                        </h6></span
                      >
                      <span>
                        <h6>
                          Quick Hours Cost: &#8358;{{ totalServiceMethodCost }}
                        </h6>
                      </span>
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

      <div class="col-8" v-if="this.bookingList.length">
        <div class="card">
          <div class="card-body">
            <h4
              class="card-title d-flex justify-content-between align-items-center"
            >
              View Order
              <b-button class="btn" variant="primary" v-b-modal.customer-details
                >Process Order</b-button
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
                      <th>Subtotal Cost</th>
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
                      <td>{{ booking.attireType.title }}</td>
                      <td>{{ booking.service.title }}</td>
                      <td>
                        {{ booking.hour }}
                        <span v-if="booking.serviceMethod.cost"
                          ><b
                            >(&#8358;{{ booking.serviceMethod.cost }})</b
                          ></span
                        >
                        <span v-else>(&#8358;{{ booking.serviceMethod }})</span>
                      </td>
                      <td>{{ booking.quantity }}</td>
                      <td>{{ booking.cost }}</td>
                      <td>{{ booking.totalCost }}</td>
                      <td v-if="booking.serviceMethod.cost">
                        &#8358;{{
                          booking.serviceMethod.cost * booking.quantity +
                          booking.totalCost
                        }}
                      </td>
                      <td v-else>
                        {{
                          booking.serviceMethod * booking.quantity +
                          booking.totalCost
                        }}
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-danger"
                          @click="deleteBooking(booking.id)"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8" v-else>
        <div class="card">
          <div class="card-body">
            <h4 class="text-center">No bookings available</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- modal to add customer details -->
    <b-modal
      id="customer-details"
      size="lg"
      title="Add Customer Details"
      hide-footer
      title-class="font-18"
      ref="my-modal"
    >
      <b-alert show variant="success" class="my-2" v-if="this.orderMessage"
        >Booking Successful</b-alert
      >
      <b-alert show variant="danger" class="my-2" v-if="this.orderError"
        >Incomplete Details</b-alert
      >

      <form class="" role="form">
        <div class="row">
          <div class="col-md-12">
            <select name="" id="" v-model="customerType" class="form-control">
              <option value="">Select Customer Type</option>
              <option value="new-customer">New Customer</option>
              <option value="existing-customer">Existing Customer</option>
            </select>
          </div>
          <div class="row">
            <div class="col-md-12" style="padding: 20px">
              <form action="">
                <div class="row">
                  <div class="col-md-12" v-if="customerType == 'new-customer'">
                    <div class="row">
                      <div class="col-md-6">
                        <b-form-group
                          id="example text"
                          label="Customer Name"
                          label-for="Customer Name"
                        >
                          <b-form-input
                            for="text"
                            type="text"
                            placeholder="Customer Name"
                            v-model="customerName"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group
                          id="example text"
                          label="Customer Phone Number"
                          label-for="Customer Phone Number"
                        >
                          <b-form-input
                            for="text"
                            type="text"
                            placeholder="Customer Phone Number"
                            v-model="customerPhoneNumber"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-md-12">
                        <b-form-group
                          id="example text"
                          label="Customer Email Address"
                          label-for="Customer Email Address"
                        >
                          <b-form-input
                            for="text"
                            type="text"
                            placeholder="Customer Email Address"
                            v-model="customerEmail"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-md-12 mb-2"
                    v-if="customerType == 'existing-customer'"
                  >
                    <div class="row">
                      <div class="col-md-12">
                        <label for="">Select Customer</label>
                        <select name="" id="" class="form-control">
                          <option value="">Select Customer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="example text"
                      label="Customer Address"
                      label-for="Customer Address"
                    >
                      <b-form-input
                        for="text"
                        type="text"
                        placeholder="Customer Address"
                        v-model="customerAddress"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6 mb-2">
                    <label for="">Payment Type</label>
                    <select
                      name=""
                      id=""
                      v-model="paymentType"
                      class="form-control"
                    >
                      <option value="">Select Payment Type</option>
                      <option value="transfer">Transfer</option>
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                  <div class="col-md-6 mb-2">
                    <label for="">Delivery Method</label>
                    <select
                      name=""
                      id=""
                      v-model="deliveryType"
                      class="form-control"
                    >
                      <option value="">Select Delivery Method</option>
                      <option
                        :value="delivery.id"
                        v-for="delivery in this.getAllDeliveryMethods.data"
                        :key="delivery.id"
                      >
                        {{ delivery.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-12 mt-4">
            <b-button
              variant="primary"
              class="btn btn-block"
              @click="makeOrder()"
              v-show="!isOrderLoading"
              >Make Order</b-button
            >
            <b-button
              v-show="isOrderLoading"
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
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { mapGetters, mapActions } from "vuex";
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
      serviceHours: "",
      quantity: 1,
      serviceCost: 0,
      serviceMethodCost: null,
      bookingList: [],
      showBookingList: [],
      error: false,
      message: false,
      isLoading: false,
      isOrderLoading: false,
      orderError: false,
      orderMessage: false,

      customerType: "",
      customerName: "",
      customerPhoneNumber: "",
      customerEmail: "",
      customerAddress: "",
      paymentType: "",
      deliveryType: "",
      customerOrder: [],
    };
  },
  computed: {
    ...mapGetters([
      "getAllAttires",
      "getAllServices",
      "getAttireGroup",
      "getAllDeliveryMethods",
    ]),
    /* Total no. of records*/
    rows() {
      return this.tableData.length;
    },
    totalServiceCost() {
      return this.serviceCost * this.quantity;
    },

    totalServiceMethodCost() {
      if (!this.serviceMethodCost) {
        return 0;
      }
      return this.serviceMethodCost.cost * this.quantity;
    },
    // grandTotal() {
    //   this.bookingList.reduce
    // }
  },
  methods: {
    ...mapActions(["allAttires", "allServices"]),
    makeOrder: function () {
      this.isOrderLoading = true;
      var booking = JSON.parse(localStorage.getItem("allBookingList"));
      var newBooking = [];
      
        for (var i = 0; i < booking.length; i++) {
          if(booking[i].serviceMethod) {
            newBooking.push({
              attire_type_id: booking[i].attireType.id,
              service_id: booking[i].service.id,
              quantity: booking[i].quantity,
              service_hours: booking[i].hour,
              service_method_id: booking[i].serviceMethod.id,
            });
        }
        else {
        // for (var j = 0; j < booking.length; j++) {
          newBooking.push({
            attire_type_id: booking[i].attireType.id,
            service_id: booking[i].service.id,
            quantity: booking[i].quantity,
            service_hours: booking[i].hour,
            service_method_id: null,
          });
        // }
      }
      }
      
      
      console.log(newBooking)
      axios
        .post(
          api + "admin/booking",
          {
            customer_name: this.customerName,
            customer_phone: this.customerPhoneNumber,
            customer_email: this.customerEmail,
            address: this.customerAddress,
            payment_type: this.paymentType,
            delivery_method_id: this.deliveryType,
            bookings: [...newBooking],
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.message == "Operation Successful") {
            localStorage.removeItem("allBookingList");
            this.getBookingListFromStorage();
            this.orderMessage = true;
            this.customerName = "";
            this.customerPhoneNumber = "";
            this.customerEmail = "";
            this.customerAddress = "";
            this.paymentType = "";
            this.deliveryType = "";
            this.isOrderLoading = false;
          }
        })
        .catch(() => {
          this.orderError = true;
          this.isOrderLoading = false;
        });
    },
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    // get service cost from endpoint
    getServiceMethodCost() {
      this.message = false;
      if (this.serviceHours == 48) {
        this.serviceMethodCost = 0;
      } else {
        axios
          .get(
            api +
              `admin/service-method-cost/${this.serviceHours}/${this.serviceType.id}/${this.attireType.group}`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.data == null) {
              this.error =
                "Inform the administrator to add pricing for this service hour. Note the service type and attire type.";
            } else {
              this.serviceMethodCost = response.data.data;
            }
          });
      }
    },

    /**
     *
     */
    getServiceCost() {
      this.message = false;
      axios
        .get(
          api +
            `admin/service-cost/${this.serviceType.id}/${this.attireType.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          console.log(this.serviceType);
          if (response.status == 201) {
            if (typeof response.data.data === "undefined") {
              this.error = response.data.message;
            } else {
              this.serviceCost = response.data.data;
            }
          } else {
            this.error = "Something went wrong";
          }
        });
    },

    // creating booking inside localstorage
    createBooking() {
      if (
        this.attireType == "" &&
        this.serviceType == "" &&
        this.quantity == "" &&
        this.serviceHours == ""
      ) {
        this.error = true;
      } else {
        this.bookingList.unshift({
          id: this.bookingList.length + 1,
          attireType: this.attireType,
          hour: this.serviceHours,
          service: this.serviceType,
          quantity: this.quantity,
          cost: this.serviceCost,
          totalCost: this.totalServiceCost,
          serviceMethod: this.serviceMethodCost,
        });
        localStorage.setItem(
          "allBookingList",
          JSON.stringify(this.bookingList)
        );
        this.getBookingListFromStorage();
        this.message = true;
        this.attireType = "";
        this.serviceType = "";
        this.quantity = 1;
        this.serviceHours = "";
        this.serviceMethod = 0;
        this.totalServiceCost = 0;
        this.totalServiceMethodCost = 0;
      }
    },

    // get booking list from local storage
    getBookingListFromStorage() {
      if (localStorage.getItem("allBookingList")) {
        try {
          this.bookingList = JSON.parse(localStorage.getItem("allBookingList"));
        } catch (e) {
          console.log(e);
        }
      }
    },

    // delete booking from local storage
    deleteBooking(id) {
      if (localStorage.getItem("allBookingList")) {
        this.bookingList = JSON.parse(localStorage.getItem("allBookingList"));
        this.bookingList = this.bookingList.filter((item) => item.id != id);
        localStorage.setItem(
          "allBookingList",
          JSON.stringify(this.bookingList)
        );
        this.getBookingListFromStorage();
      }
    },
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.getBookingListFromStorage();
    // this.allAttires();
    // this.allServices();
  },
};
</script>
