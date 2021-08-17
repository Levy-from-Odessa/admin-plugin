<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <h1 class="p-3" style="color: white; font-style: italic">MSpoint</h1>
        </div>

        <!-- burger -->
        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>


      <div class="d-flex">

        <LanguageSwitcher />


        <b-button @click="logoutHandler" variant="outline-light">
            <a
              class="text-danger"
            >
              <i
                class="bx bx-power-off font-size-16 align-middle me-1 text-danger"
              ></i>
              {{ ("logout") }}
            </a>
        </b-button>
        <!-- settings -->
        <!-- <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="toggleRightSidebar"
          >
            <i class="bx bx-cog bx-spin toggle-right"></i>
          </button>
        </div> -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex' 
import LanguageSwitcher from './Lang'

/**
 * Nav-bar Component
 */
export default {
  name: 'FtthNavBar',
  components:{
    LanguageSwitcher
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutHandler(){
      this.logout()
      this.$router.push({name: 'login'})
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
  },
};
</script>
