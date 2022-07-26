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
            <h4 class="card-title">Add Attire</h4>
            <div class="row">
              <div class="col-12">
                <form class="" role="form">
                  <div class="row">
                    <div class="col-md-6">
                      <b-form-group
                        id="example text"
                        label="Attire Title"
                        label-for="Attire Title"
                      >
                        <b-form-input
                          for="text"
                          value=""
                          placeholder="Attire Title"
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
                          />
                          <label class="custom-file-label" for="customFile"
                            >Choose file</label
                          >
                        </div>
                      </b-form-group>
                    </div>
                    <div class="col-md-12 mt-2">
                      <b-button variant="primary" class="btn btn-block"
                        >Create Attire</b-button
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
