<template>
    <div id="layout">
        <Navbar/>
        <Sidebar/>
        <div class="container" :style="{'marginLeft':marginLeft}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Sidebar from '../../components/Sidebar.vue'

export default {
    name: 'layout',
    components: {
        Navbar,
        Sidebar,
    },
    watch: {
        '$store.state.marginLeft': {
            handler: function(val, oldVal) {
                this.marginLeft = val
            }
        },
        deep: true,
        immediate: true,
    },
    data(){
        return {
            marginLeft: this.$store.state.marginLeft,
        }
    }
}
</script>

<style scoped lang="scss">
    #layout {
        height: 100%;

        .container {
            transition:margin-left .3s linear;
        }
    }
</style>
