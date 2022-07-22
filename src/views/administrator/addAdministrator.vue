<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Form-element component
 */
export default {
  page: {
    title: "Forms Elements",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Forms Elements",
      items: [
        {
          text: "Forms",
          href: "/"
        },
        {
          text: "Forms Elements",
          active: true
        }
      ],
      status: "not_accepted",
      checkCustom: "not_accepted",
      checked: true
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Administrators</h4>
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
                                <b-form-input for="text" value="" placeholder="First Name"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Last Name"
                                label-for="Last Name"
                            >
                                <b-form-input for="text" value="" placeholder="Last Name"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Email Address"
                                label-for="Email Address"
                            >
                                <b-form-input for="text" value="" placeholder="Email Address"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Username"
                                label-for="Username"
                            >
                                <b-form-input for="text" value="" placeholder="Username"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Password"
                                label-for="Password"
                            >
                                <b-form-input for="text" value="" placeholder="Password"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <label for="">Roles</label>
                            <select class="form-control">
                                <option>Select</option>
                                <option>Super Admin</option>
                                <option>Manager</option>
                                <option value="">Attendant</option>
                                <option value="">Frontdesk</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <b-button variant="primary" class="btn btn-block">Add Administrator</b-button>
                        </div>
                    </div>
                </form>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>