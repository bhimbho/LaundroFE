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
                <b-alert show variant="success" class="my-2" v-if="this.message">{{this.message}}</b-alert>
                <b-alert show variant="danger" class="my-2" v-if="this.error">Invalid User Details</b-alert>
                <form class="" role="form" >
                    <div class="row">
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="First Name"
                                label-for="First Name"
                            >
                                <b-form-input for="text" placeholder="First Name" v-model="firstName"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Last Name"
                                label-for="Last Name"
                            >
                                <b-form-input for="text" placeholder="Last Name" v-model="lastName"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Email Address"
                                label-for="Email Address"
                            >
                                <b-form-input type="email" for="text" placeholder="Email Address" v-model="email"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Username"
                                label-for="Username"
                            >
                                <b-form-input for="text" placeholder="Username" v-model="username"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Password"
                                label-for="Password"
                            >
                                <b-form-input for="text" placeholder="Password" v-model="password"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                id="example text"
                                label="Confirm Password"
                                label-for="Confirm Password"
                            >
                                <b-form-input for="text" placeholder="Confirm Password" v-model="confirmPassword"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <label for="">Roles</label>
                            <select class="form-control" v-model="role">
                                <option>Select</option>
                                <option value="super-admin">Super Admin</option>
                            </select>
                        </div>
                        <div class="col-md-12 mt-4">
                            <b-button variant="primary" class="btn btn-block" v-show="!isLoading" @click="addAdministrator()">Add Administrator</b-button>
                            <b-button v-show="isLoading" variant="primary"
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
<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from "axios";
const api = process.env.VUE_APP_BASE_URL;

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
      checked: true,

      firstName: "",
      lastName: "",
      email: "",
      role: "",
      username: "",
      password: "",
      confirmPassword: "",
      message: false,
      isLoading: false,
      error: false,
    };
  },
  methods: {
    // add administrator 
    addAdministrator: async function() {
      this.isLoading = true;
      await axios.post(api + "admin/register", {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        role: this.role,
        username: this.username,
        password: this.password,
        password_confirmation: this.confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        }
      }).then((response) => {
        this.message = response.data.message
        this.isLoading = false;
        this.resetForm();
        console.log(response);
      }).catch(error => {
        this.isLoading = false;
        this.error = true;
        console.log(error.response.data);
      }) 
    },
    // reset form 
    resetForm() {
      this.firstName = ""
      this.lastName = ""
      this.email = ""
      this.role = ""
      this.username = ""
      this.password = ""
      this.confirmPassword = ""
    }
  }
};
</script>