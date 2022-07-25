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
      title: 'Order',
      items: [
        {
          text: 'Dashboard',
          href: '/dashboard',
        },
        {
          text: 'Order',
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
            <h4 class="card-title">Add Customer</h4>
            <div class="row">
              <div class="col-12">
                <form class="" role="form">
                  <div class="row">
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="First Name"
                        label-for="First Name"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="First Name"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Last Name"
                        label-for="Last Name"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Last Name"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Other Name"
                        label-for="Other Name"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Other Name"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Email"
                        label-for="Email"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Email"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Phone Number"
                        label-for="Phone Number"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Phone Number"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button variant="primary" class="btn btn-block"
                        >Create Customer</b-button
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
