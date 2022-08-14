<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
// import mapGetters from "vuex"
import printJS from 'print-js'

export default {
  page: {
    title: "Forms Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      id: this.$route.params.id,
      title: "View Transactions",
      items: [
        {
          text: "Dashboard",
          href: "/dashboard",
        },
        {
          text: "Transactions",
          active: true,
        },
      ],
      status: "not_accepted",
      checkCustom: "not_accepted",
      checked: true,
      singleTransaction: [],
    };
  },
  computed: {
    // ...mapGetters(["getSingleTransaction"]),
  },
  methods: {
    getSingleTransaction() {
      this.singleTransaction = this.$store.getters.getSingleTransaction(
        this.id
      );
    },
    async printInvoice () {
      const localOptions = {
        specs: [
          'fullscreen=no',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://unpkg.com/kidlat-css/css/kidlat.css',
          {'width': '300px'}
        ]
      };
      // Pass the element id here
      await this.$htmlToPaper('printArea', localOptions);

      
    },
    printMe() {
      printJS({ 
        printable: 'printArea', 
        type: 'html', 
        css: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.5.3/css/bootstrap.min.css',
        maxWidth: '800',
        style: {
          'display': 'block'
        } })
    }
  },
  mounted() {
    this.getSingleTransaction();
    console.log(process.env.BASE_URL)
  },
};
</script>
<style scoped>
#printArea {
  /* display: none; */
}
@media print {
  #printArea {
    display: block;
  }
}
</style>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12 d-flex justify-content-end mb-3">
        <button class="btn btn-primary" @click="printArea()">Print Invoice</button>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">User Details</h4>
            <div class="row">
              <div class="col-12">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{{ this.singleTransaction.customer_name }}</td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td>{{ this.singleTransaction.customer_phone }}</td>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <td>{{ this.singleTransaction.customer_email }}</td>
                    </tr>
                    <tr>
                      <td>House Address</td>
                      <td>{{ this.singleTransaction.address }}</td>
                    </tr>
                  </tbody>
                </table>
                {{ this.singleTransaction.service_method }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Delivery Details</h4>
            <div class="row">
              <div class="col-12">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Delivery Method:</td>
                      <td v-if="this.singleTransaction.delivery_method">{{this.singleTransaction.delivery_method.name}}</td>
                    </tr>
                    <tr>
                      <td>Delivery Cost:</td>
                      <td v-if="this.singleTransaction.delivery_method">&#8358;{{Number(this.singleTransaction.delivery_method.cost).toLocaleString()}}.00</td>
                    </tr>
                    <tr>
                      <td>Delivery Times:</td>
                      <td v-if="this.singleTransaction.delivery_method">{{this.singleTransaction.delivery_method.times}}</td>
                    </tr>
                    <tr>
                      <td>payment Type:</td>
                      <td>{{ this.singleTransaction.payment_type }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title d-flex justify-content-between">Booking Details <span><b>Grand Total: &#8358;{{ Number(this.singleTransaction.total).toLocaleString() }}.00</b></span></h4>
            <div class="row">
              <div class="col-md-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Attire Type</th>
                      <th>Attire Group</th>
                      <th>Quantity</th>
                      <th>Date of Delivery</th>
                      <th>Cost</th>
                      <th>Service Hours</th>
                      <th>Service Cost</th>
                      <th>Per Booking Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="booking in this.singleTransaction.bookings" :key="booking.id">
                      <td>{{booking.service.title}}</td>
                      <td>{{booking.attire_type.title}}</td>
                      <td>{{booking.attire_type.group}}</td>
                      <td>{{booking.quantity}}</td>
                      <td>{{booking.expected_collection_date}}</td>
                      <td>&#8358;{{Number(booking.service.service_cost.cost).toLocaleString()}}.00</td>
                      <td v-if="booking.service_method">{{booking.service_method.hours}}</td>
                      <td v-else>48</td>
                      <td v-if="booking.service_method">&#8358;{{Number(booking.service_method.cost).toLocaleString()}}.00</td>
                      <td v-else>&#8358;{{booking.service.service_cost.cost}}</td>
                      <td><b>&#8358;{{Number(booking.perBookingTotal).toLocaleString()}}.00</b></td>
                    </tr>
                    <tr>
                      <td colspan="2">Total Quantity:</td>
                      <td>{{ this.singleTransaction.total_quantity }}</td>
                    </tr>
                    <tr>
                      <td colspan="2" style="font-size: 18px;">Grand Total:</td>
                      <td style="font-size: 18px;"><b>&#8358;{{ Number(this.singleTransaction.total).toLocaleString() }}.00</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      class="" id="printArea"
      style="min-height: 450px"
    >
      <div class="card" style="height: 100%">
        <div class="card-body" style="padding: 10px">
          <div class="card-image d-flex justify-content-center">
            <img
              src="@/assets/images/logo-dark.png"
              alt="Eligail Clothing Services"
              style="width: 75px; object-fit: contain"
            />
          </div>
          <p
            class="text-center mt-1 mb-0"
            style="font-size: 10px; font-weight: 600"
          >
            Eligail Laundry & Clothing Services
          </p>
          <p
            class="text-center mt-1 mb-0"
            style="font-size: 9px; font-weight: 400"
          >
            33 Ubi Ave 3 #7-50
          </p>
          <p
            class="text-center mt-1 mb-0"
            style="font-size: 9px; font-weight: 400"
          >
            Tel: +2349060058210
          </p>
          <p class="mt-2 mb-0" style="font-size: 10px; font-weight: 400">
            Tag No: {{this.singleTransaction.tag_no}}
          </p>
          <div class="d-flex justify-content-between mt-2">
            <p class="mb-0" style="font-size: 10px; font-weight: 700">
              Refund no: 34567
            </p>
            <p class="mb-0" style="font-size: 10px; font-weight: 700">
              Date: {{new Date().toLocaleDateString('pl', {day: 'numeric', month: 'numeric', year: '2-digit'})}}
            </p>
          </div>
          <div class="card-table mt-3">
            <div
              class="card-table-header d-flex justify-content-between"
              style="gap: 10px"
            >
              <span
                class="card-table-title"
                style="font-size: 11px; font-weight: 600"
              >
                Qty
              </span>
              <span
                class="card-table-title"
                style="font-size: 11px; font-weight: 600"
              >
                Description
              </span>
              <span
                class="card-table-title"
                style="font-size: 11px; font-weight: 600"
              >
                Unit
              </span>
              <span
                class="card-table-title"
                style="font-size: 11px; font-weight: 600"
              >
                Amount
              </span>
            </div>
            <div class="card-table-body">
              <div
                class="card-table-row mt-2 d-flex justify-content-between"
                style="gap: 10px" v-for="booking in this.singleTransaction.bookings" :key="booking.id"
              >
                <div
                  class="card-table-item"
                  style="font-size: 10px; font-weight: 400; padding-right: 13px"
                >
                  {{booking.quantity}}
                </div>
                <div
                  class="card-table-item"
                  style="font-size: 10px; font-weight: 400"
                >
                  <span>{{booking.attire_type.title}} </span>
                  <span>({{booking.service.title}}) </span>
                  <span>{{booking.service_method.hours}} </span>
                </div>
                <div
                  class="card-table-item"
                  style="font-size: 10px; font-weight: 400"
                >
                  &#8358;{{Number(booking.service_method.cost) + Number(booking.service.service_cost.cost)}}
                 </div>
                <div
                  class="card-table-item"
                  style="font-size: 10px; font-weight: 400"
                >
                  &#8358;{{Number(booking.perBookingTotal).toLocaleString()}}.00
                </div>
              </div>
            </div>
          </div>
          <div
            class="card-table-footer mt-4 pt-2"
            style="border-top: 1px solid #505d69"
          >
            <div class="card-table-amount mt-2 d-flex justify-content-between">
              <span style="font-size: 10px; font-weight: 400">
                Delivery Type
              </span>
              <span style="font-size: 10px; font-weight: 400"> {{this.singleTransaction.delivery_method.name}} </span>
            </div>
            <div class="card-table-amount mt-2 d-flex justify-content-between">
              <span style="font-size: 10px; font-weight: 400">
                Delivery Fee
              </span>
              <span style="font-size: 10px; font-weight: 400"> &#8358;{{Number(this.singleTransaction.delivery_method.cost).toLocaleString()}}.00 </span>
            </div>
            <div class="card-table-amount mt-2 d-flex justify-content-between">
              <span style="font-size: 10px; font-weight: 400"> Total </span>
              <span style="font-size: 10px; font-weight: 400">
                &#8358;{{ Number(this.singleTransaction.total).toLocaleString() }}.00
              </span>
            </div>
            <div class="card-table-amount mt-2 d-flex justify-content-between">
              <span style="font-size: 10px; font-weight: 400">
                Paid By: {{ this.singleTransaction.payment_type }}
              </span>
              <span style="font-size: 10px; font-weight: 400">
                &#8358;{{ Number(this.singleTransaction.total).toLocaleString() }}.00
              </span>
            </div>
            <p
              class="text-center mt-4"
              style="font-size: 10px; font-weight: 400"
            >
              Thank You
            </p>
          </div>
        </div>
      </div>
    </div> -->
  </Layout>
</template>
