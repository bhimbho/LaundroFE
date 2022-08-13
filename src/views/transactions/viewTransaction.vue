<script>
import Layout from '../layouts/main';
import PageHeader from '@/components/page-header';
import appConfig from '@/app.config';

export default {
  page: {
    title: 'Forms Elements',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: 'Transactions',
      items: [
        {
          text: 'Dashboard',
          href: '/dashboard',
        },
        {
          text: 'Transactions',
          active: true,
        },
      ],
      status: 'not_accepted',
      checkCustom: 'not_accepted',
      checked: true,
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h1 class="card-title">User Information</h1>
                <div class="row mt-3">
                  <div class="col-md-4">
                    <h1 style="font-size: 14px">Customer Name:</h1>
                    <h3 style="font-size: 13px; font-weight: 400">
                      Jack Wilder
                    </h3>
                  </div>
                  <div class="col-md-4">
                    <h1 style="font-size: 14px">Customer Address:</h1>
                    <h3 style="font-size: 13px; font-weight: 400">
                      Havenly Street, Johannesburg
                    </h3>
                  </div>
                  <div class="col-md-4">
                    <h1 style="font-size: 14px">Customer Phone:</h1>
                    <h3 style="font-size: 13px; font-weight: 400">
                      +1-234-568
                    </h3>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4">
                <h1 class="card-title">Booking Information</h1>
                <div class="row mt-3">
                  <div class="col-md-3">
                    <h1 style="font-size: 14px">Attire Type:</h1>
                    <h3 style="font-size: 13px; font-weight: 400">Shirt</h3>
                  </div>
                  <div class="col-md-3">
                    <h1 style="font-size: 14px">Service:</h1>
                    <h3 style="font-size: 13px; font-weight: 400">Drying</h3>
                  </div>
                  <div class="col-md-3">
                    <h1 style="font-size: 14px">Service Method:</h1>
                    <h3 style="font-size: 13px; font-weight: 400">
                      Normal wear
                    </h3>
                  </div>
                  <div class="col-md-3">
                    <h1 style="font-size: 14px">Service Hours:</h1>
                    <h3 style="font-size: 13px; font-weight: 400">24</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4">
                <h1 class="card-title">Delivery Method</h1>
                <div class="row mt-2">
                  <div class="col-md-12">
                    <h3 style="font-size: 13px; font-weight: 400">
                      Home Deilvery
                    </h3>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4">
                <h1 class="card-title">Payment</h1>
                <div class="row mt-2">
                  <div class="col-md-12">
                    <h3 style="font-size: 13px; font-weight: 400">Cash</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
