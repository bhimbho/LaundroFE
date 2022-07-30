<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Attire</h4>
            <div class="row">
              <div class="col-12">
                <b-alert show variant="success" class="my-2" v-if="this.message">{{this.message}}</b-alert>
                <b-alert show variant="danger" class="my-2" v-if="this.error">Invalid User Details</b-alert>
                <form class="" role="form" method="post" enctype="multipart/form-data">
                  <div class="row">
                    <div class="col-md-6">
                      <b-form-group
                        id="example text"
                        label="Attire Title"
                        label-for="Attire Title"
                      >
                        <b-form-input
                          for="text"
                          placeholder="Attire Title" v-model="attireTitle"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-6">
                      <b-form-group
                        id="example text"
                        label="Attire Image"
                        label-for="Attire Image"
                      >
                        <div class="custom-file">
                          <input
                            id="customFile"
                            type="file"
                            class="custom-file-input"
                            ref="attireImage"
                            @change="uploadAttireImage()"
                          />
                          <label class="custom-file-label" for="customFile"
                            >Choose file</label
                          >
                        </div>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button variant="primary" class="btn btn-block" v-show="!isLoading" @click.prevent="addAttire()"
                        >Create Attire</b-button
                      >
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
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../layouts/main';
import PageHeader from '@/components/page-header';
import appConfig from '@/app.config';
import axios from "axios";
const api = process.env.VUE_APP_BASE_URL;

export default {
  page: {
    title: 'Forms Elements',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: 'Attire',
      items: [
        {
          text: 'Dashboard',
          href: '/dashboard',
        },
        {
          text: 'Attire',
          active: true,
        },
      ],
      status: 'not_accepted',
      checkCustom: 'not_accepted',
      checked: true,
      attireTitle: "",
      attireImage: null,
      message: false,
      isLoading: false,
      error: false,
    };
  },
  methods: {
    uploadAttireImage: function () {
      this.attireImage = this.$refs.attireImage.files[0];
      console.log(this.attireImage);
    },
    addAttire() {
      this.isLoading = true
      const formData = new FormData();
      formData.append("title", this.attireTitle);
      formData.append("attire_image", this.attireImage);
      
      axios.post(api + "admin/attires", formData, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then(response => {
        console.log(response)
        this.message = response.data.message
        this.isLoading = false;
      }).catch(error => {
        this.isLoading = false;
        this.error = true;
        this.attireTitle = ""
        this.attireImage = ""
        console.log(error.response.data);
      })
    }
  },
};
</script>