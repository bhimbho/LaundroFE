<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";
import Stat from "./widget";
import RevenueAnalytics from "./revenue";
import Transaction from './transaction';

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Stat,
    RevenueAnalytics,
    Transaction
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Nazox"
        },
        {
          text: "Dashboard",
          active: true
        }
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <Stat />
        <RevenueAnalytics />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Transaction />
      </div>
    </div>
  </Layout>
</template>