<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

export default {
  page: {
    title: "Forms Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Order",
      items: [
        {
          text: "Dashboard",
          href: "/dashboard",
        },
        {
          text: "Order",
          active: true,
        },
      ],
      status: "not_accepted",
      checkCustom: "not_accepted",
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
            <h4 class="card-title">Add Order</h4>
            <div class="row">
              <div class="col-12">
                <form class="" role="form">
                  <div class="row">
                    <div class="col-md-8">
                      <b-form-group
                        id="example text"
                        label="Order ID"
                        label-for="Order ID"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Order ID"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-4 mt-3" style="align-self: center">
                      <b-button variant="primary" class="btn btn-block"
                        >Generate ID</b-button
                      >
                    </div>
                    <div class="col-md-4">
                      <b-form-group
                        id="example text"
                        label="Order Name"
                        label-for="Order Name"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Order Name"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-8">
                      <b-form-group
                        id="example text"
                        label="Order Description"
                        label-for="Order Description"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Order Description"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button variant="primary" class="btn btn-block"
                        >Create Order</b-button
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
