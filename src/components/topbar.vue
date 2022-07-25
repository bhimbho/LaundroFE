<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm-dark.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="20" />
            </span>
          </a>

          <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm-light.png" alt height="40" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt height="40" />
            </span>
          </a>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn"
        >
          <i class="ri-menu-2-line align-middle"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          class="d-inline-block user-dropdown"
        >
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/avatar-2.jpg"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ml-1">{{user.username}}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <a class="dropdown-item text-danger" @click.prevent="logout()">
            <i class="ri-shut-down-line align-middle mr-1 text-danger"></i>
            Logout
          </a>
        </b-dropdown>

        <!-- <div class='dropdown d-inline-block'>
          <button
            type='button'
            class='btn header-item noti-icon right-bar-toggle waves-effect toggle-right'
            @click='toggleRightSidebar'
          >
            <i class='ri-settings-2-line toggle-right'></i>
          </button>
        </div> -->
      </div>
    </div>
  </header>
</template>
<script>
// import simplebar from 'simplebar-vue';
import i18n from '../i18n';
export default {
  data() {
    return {
      current_language: 'en',
      user: this.$store.getters.user,
    };
  },
  // components: { simplebar },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale) {
      i18n.locale = locale;
      this.current_language = i18n.locale;
    },
    logout: function () {
      this.$store.dispatch("logout");
    },
  },
  mounted() {
    console.log(this.user)
  }
};
</script>

<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
</style>
