<script>
import simplebar from 'simplebar-vue';
import { layoutComputed } from '@/store/helpers';

import MetisMenu from 'metismenujs/dist/metismenujs';

import { menuItems } from './menu';

export default {
  components: {
    simplebar,
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menuItems: menuItems,
      user: this.$store.getters.user,
    };
  },
  computed: {
    ...layoutComputed,
  },
  mounted: function () {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu('#side-menu');
    var links = document.getElementsByClassName('side-nav-link-ref');
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('mm-active');
        const parent2 = parent.parentElement.closest('ul');
        if (parent2 && parent2.id !== 'side-menu') {
          parent2.classList.add('mm-show');

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add('mm-active');
            var childAnchor = parent3.querySelector('.has-arrow');
            var childDropdown = parent3.querySelector('.has-dropdown');
            if (childAnchor) childAnchor.classList.add('mm-active');
            if (childDropdown) childDropdown.classList.add('mm-active');

            const parent4 = parent3.parentElement;
            if (parent4 && parent4.id !== 'side-menu') {
              parent4.classList.add('mm-show');
              const parent5 = parent4.parentElement;
              if (parent5 && parent5.id !== 'side-menu') {
                parent5.classList.add('mm-active');
                const childanchor = parent5.querySelector('.is-parent');
                if (childanchor && parent5.id !== 'side-menu') {
                  childanchor.classList.add('mm-active');
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    onRoutechange() {
      setTimeout(() => {
        const currentPosition =
          document.getElementsByClassName('mm-active')[0].offsetTop;
        if (currentPosition > 400)
          this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop =
            currentPosition + 200;
      }, 300);
    },
  },
  watch: {
    $route: {
      handler: 'onRoutechange',
      immediate: true,
      deep: true,
    },
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case 'dark':
              document.body.setAttribute('data-sidebar', 'dark');
              document.body.removeAttribute('data-topbar');
              document.body.removeAttribute('data-sidebar-size');
              break;
            case 'light':
              document.body.setAttribute('data-topbar', 'dark');
              document.body.removeAttribute('data-sidebar');
              document.body.removeAttribute('data-sidebar-size');
              document.body.classList.remove('vertical-collpsed');
              break;
            case 'compact':
              document.body.setAttribute('data-sidebar-size', 'small');
              document.body.setAttribute('data-sidebar', 'dark');
              document.body.classList.remove('vertical-collpsed');
              document.body.removeAttribute('data-topbar', 'dark');
              break;
            case 'icon':
              document.body.setAttribute('data-keep-enlarged', 'true');
              document.body.classList.add('vertical-collpsed');
              document.body.setAttribute('data-sidebar', 'dark');
              document.body.removeAttribute('data-topbar', 'dark');
              break;
            case 'colored':
              document.body.setAttribute('data-sidebar', 'colored');
              document.body.removeAttribute('data-keep-enlarged');
              document.body.classList.remove('vertical-collpsed');
              document.body.removeAttribute('data-sidebar-size');
              break;
            default:
              document.body.setAttribute('data-sidebar', 'dark');
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case 'boxed':
              document.body.setAttribute('data-layout-size', 'boxed');
              break;
            case 'fluid':
              document.body.setAttribute('data-layout-mode', 'fluid');
              document.body.removeAttribute('data-layout-size');
              break;
            default:
              document.body.setAttribute('data-layout-mode', 'fluid');
              break;
          }
        }
      },
    },
  },
};
</script>
<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <simplebar class="h-100" ref="currentMenu" id="my-element">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu" v-if="this.user.role == 'super-admin'">
          <li>
            <router-link :to="{ name: 'dashboard' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'services' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Services</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'customers' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Customers</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'transactions' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Transactions</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'attire' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Attire</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'booking' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Booking</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'delivery-method' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Delivery Method</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'administrator' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Administrator</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'invoice' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Invoice</span>
            </router-link>
          </li> 
        </ul>

        <ul class="metismenu list-unstyled" id="side-menu" v-if="this.user.role == 'manager'">
          <li>
            <router-link :to="{ name: 'dashboard' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'services' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Services</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'customers' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Customers</span>
            </router-link>
          </li>
          <!-- <li>
            <router-link
              :to="{ name: 'transactions' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Transactions</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'attire' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Attire</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'order' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Order</span>
            </router-link>
          </li> -->
          <li>
            <router-link
              :to="{ name: 'admin-dashboard' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Delivery Method</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'administrator' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Administrator</span>
            </router-link>
          </li>
        </ul>

        <ul class="metismenu list-unstyled" id="side-menu" v-if="this.user.role == 'frontdesk'">
          <li>
            <router-link :to="{ name: 'dashboard' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'services' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Services</span>
            </router-link>
          </li>
          <!-- <li>
            <router-link :to="{ name: 'customers' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Customers</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'transactions' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Transactions</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'attire' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Attire</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'order' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Order</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'admin-dashboard' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Delivery Method</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'administrator' }"
              class="side-nav-link-ref"
            >
              <i class="bx ri-dashboard-line"></i>
              <span>Administrator</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'invoice' }" class="side-nav-link-ref">
              <i class="bx ri-dashboard-line"></i>
              <span>Invoice</span>
            </router-link>
          </li> -->
        </ul>
      </div>
      <!-- Sidebar -->
    </simplebar>
  </div>
  <!-- Left Sidebar End -->
</template>
