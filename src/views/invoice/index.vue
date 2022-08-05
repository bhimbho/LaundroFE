<script>
import Layout from '../layouts/main';
import PageHeader from '@/components/page-header';
import appConfig from '@/app.config';

import { tableData } from './dataAdvancedtable';

/**
 * Advanced table component
 */
export default {
  page: {
    title: 'Invoice',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      tableData: tableData,
      title: 'Invoice',
      items: [
        {
          text: 'Invoice',
          href: '/',
        },
        {
          text: 'Invoice',
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
        { key: 'position', sortable: true },
        { key: 'office', sortable: true },
        { key: 'age', sortable: true },
        { key: 'date', sortable: true },
        { key: 'salary', sortable: true },
        { key: 'action' },
      ],
    };
  },
  computed: {
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
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row justify-content-center">
      <div
        class="col-md-6"
        style="max-width: 300px; flex-basis: 300px; min-height: 450px"
      >
        <div class="card" style="height: 100%">
          <div class="card-body">
            <div class="card-image d-flex justify-content-center">
              <img
                src="@/assets/images/logo-dark.png"
                alt="Eligail Clothing Services"
                style="width: 75px; object-fit: contain"
              />
            </div>
            <p
              class="text-center mt-2 mb-0"
              style="font-size: 10px; font-weight: 400"
            >
              33 Ubi Ave 3 #7-50
            </p>
            <p
              class="text-center mt-2 mb-0"
              style="font-size: 10px; font-weight: 400"
            >
              VERTEX (TOWER A) Singapore 408664
            </p>
            <p
              class="d-flex justify-content-between text-center mt-2 mb-0"
              style="font-size: 10px; font-weight: 400"
            >
              <span> Tel: +2349060058210 </span>
              <span> Unit No: 12346789A </span>
            </p>
            <p
              class="d-flex justify-content-between text-center mt-2 mb-0"
              style="font-size: 10px; font-weight: 400"
            >
              <span> Transaction No: 12346789A </span>
              <span> Tag No: 12346789A </span>
            </p>
            <div class="d-flex justify-content-between mt-2">
              <p class="mb-0" style="font-size: 10px; font-weight: 700">
                Refund no: 34567
              </p>
              <p class="mb-0" style="font-size: 10px; font-weight: 700">
                Date: 2/4/17
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
                  style="font-size: 11px; font-weight: 600; flex-grow: 1"
                >
                  Description
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
                  style="gap: 10px"
                >
                  <div
                    class="card-table-item"
                    style="
                      font-size: 10px;
                      font-weight: 400;
                      padding-right: 13px;
                    "
                  >
                    2
                  </div>
                  <div
                    class="card-table-item"
                    style="flex-grow: 1; font-size: 10px; font-weight: 400"
                  >
                    <span>Shirts </span>
                    <span>(Starching) </span>
                    <span>24Hrs </span>
                  </div>
                  <div
                    class="card-table-item"
                    style="font-size: 10px; font-weight: 400"
                  >
                    45,000.00
                  </div>
                </div>
                <div
                  class="card-table-row mt-2 d-flex justify-content-between"
                  style="gap: 10px"
                >
                  <div
                    class="card-table-item"
                    style="
                      font-size: 10px;
                      font-weight: 400;
                      padding-right: 13px;
                    "
                  >
                    2
                  </div>
                  <div
                    class="card-table-item"
                    style="flex-grow: 1; font-size: 10px; font-weight: 400"
                  >
                    <span>Shirts </span>
                    <span>(Starching) </span>
                    <span> 24Hrs</span>
                  </div>
                  <div
                    class="card-table-item"
                    style="font-size: 10px; font-weight: 400"
                  >
                    45,000.00
                  </div>
                </div>
                <div
                  class="card-table-row mt-2 d-flex justify-content-between"
                  style="gap: 10px"
                >
                  <div
                    class="card-table-item"
                    style="
                      font-size: 10px;
                      font-weight: 400;
                      padding-right: 13px;
                    "
                  >
                    2
                  </div>
                  <div
                    class="card-table-item"
                    style="flex-grow: 1; font-size: 10px; font-weight: 400"
                  >
                    <span>Shirts </span>
                    <span>(Starching) </span>
                    <span>24Hrs</span>
                  </div>
                  <div
                    class="card-table-item"
                    style="font-size: 10px; font-weight: 400"
                  >
                    45,000.00
                  </div>
                </div>
              </div>
            </div>
            <div
              class="card-table-footer mt-4 pt-2"
              style="border-top: 1px solid #505d69"
            >
              <div
                class="card-table-amount mt-2 d-flex justify-content-between"
              >
                <span style="font-size: 10px; font-weight: 400"> Total </span>
                <span style="font-size: 10px; font-weight: 400">
                  135,000.00
                </span>
              </div>
              <div
                class="card-table-amount mt-2 d-flex justify-content-between"
              >
                <span style="font-size: 10px; font-weight: 400">
                  Paid By: Credit Card
                </span>
                <span style="font-size: 10px; font-weight: 400">
                  135,000.00
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
      </div>
    </div>
  </Layout>
</template>
