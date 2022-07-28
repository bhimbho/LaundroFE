<template>
    <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { mapActions } from "vuex"
export default {
    components: {
    Layout,
    PageHeader,
  },
  methods: {
    ...mapActions(["getAllAdministrators"]),
  },
  mounted() {
    this.getAllAdministrators();
  }
}
</script>