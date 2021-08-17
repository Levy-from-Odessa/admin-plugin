<template>
<!-- ========== Left Sidebar Start ========== -->

<!--- Sidemenu -->
<div id="sidebar-menu">
    <!-- Left Menu Start -->
    <ul id="side-menu"  class="metismenu list-unstyled">
        <template v-for="item in navPermissions">
            <Title 
                :key="item.id"
                :item="item"
                v-if="item.isTitle" 
            />
            <li v-if="!item.isTitle && !item.isLayout" :key="item.id">

                <Link
                    :item="item"
                    v-if="!hasItems(item)" 
                />

                <Parent
                    v-if="hasItems(item)"  
                    :item="item"
                />

                <ul 
                    v-if="hasItems(item)" 
                    class="sub-menu" 
                    aria-expanded="false"
                >
                    <li 
                        v-for="(subitem, index) of item.subItems" 
                        :key="index"
                    >

                        <Link
                            :item="subitem"
                            v-if="!hasItems(subitem)" 
                        />


                        <Parent
                            v-if="hasItems(subitem)"  
                            :item="subitem"
                        />

                        <ul 
                            v-if="hasItems(subitem)" 
                            class="sub-menu mm-collapse" 
                            aria-expanded="false"
                        >
                            <li 
                                v-for="(subSubitem, index) of subitem.subItems" 
                                :key="index"
                            >
                                <Link
                                    :item="subSubitem"
                                    v-if="!hasItems(subSubitem)" 
                                />
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </template>
        {{menuItems}}
    </ul>
</div>
<!-- Sidebar -->
</template>





<script>
import { mapGetters} from 'vuex'
import pluralize from 'pluralize'

import {
  getcookiesInClient,
} from '@/utils/cookies'


// BUILDERS
import navBuilder from './navBuilder';
// import menuItems from "./menu";

// PARTS
import Title from './Parts/Title'
import Parent from './Parts/Parent'
import Link from './Parts/Link'
/**
 * Sidenav component
 */
export default {
    name: 'FtthSideNav',
    props: {
        menuItems:{
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            menuData: null,
        };
    },
    components:{
        Title,
        Parent,
        Link
    },
    mixins: [ navBuilder],
    computed:{
        ...mapGetters('auth', ['profile']),
        allowedRoutes(){
            return getcookiesInClient('routes')
        },
        navPermissions () {
            let navPermissions = []
                if (this.profile && this.profile.roles && this.menuItems) {
                    const allRoles = this.profile.roles


                    navPermissions = this.menuItems.filter((menuItem ) => {
                        // filter by links
                        if (menuItem.link) {
                            let routeName = ''
                            if (menuItem.permission) {
                                routeName = menuItem.permission

                            } else{
                                const route = menuItem.link.replace('/', '')


                                routeName = route === 'settings'
                                    ? route.toUpperCase()
                                    : pluralize(route.toUpperCase(), 1)
                            }


                            return allRoles[routeName] && allRoles[routeName].LIST
                        } else {
                            return true
                        }
                    })



                }
            return navPermissions
        }

    },
    watch: {
        navPermissions(permission){
            permission  
        },


    },
    methods: {
        /**
         * Returns true or false if given menu item has child or not
         * @param item menuItem
         */
        hasItems(item) {
            return item.subItems !== undefined ? item.subItems.length > 0 : false;
        },

        toggleMenu(event) {
            event.currentTarget.nextElementSibling.classList.toggle("mm-show");
        },

    },
};
</script>

