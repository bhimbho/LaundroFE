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
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Transaction</h4>
            <div class="row">
              <div class="col-12">
                <form class="" role="form">
                  <div class="row">
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Title"
                        label-for="Title"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Title"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Customer Name"
                        label-for="Customer Name"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Customer Name"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Customer Email"
                        label-for="Customer Email"
                      >
                        <b-form-input
                          for="email"
                          value=""
                          placeholder="Customer Email"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Customer Phone"
                        label-for="Customer Phone"
                      >
                        <b-form-input
                          for="tel"
                          value=""
                          placeholder="Customer Phone"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Payment Type"
                        label-for="Payment Type"
                      >
                        <b-form-input
                          for="tel"
                          value=""
                          placeholder="Payment Type"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Delivery Method"
                        label-for="Delivery Method"
                      >
                        <b-form-input
                          for="tel"
                          value=""
                          placeholder="Delivery Method"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button variant="primary" class="btn btn-block"
                        >Create Transaction</b-button
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
