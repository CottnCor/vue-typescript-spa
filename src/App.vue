<template>
    <div id="app">
        <basic-layout>
            <keep-alive slot="body">
                <transition name="slide-fade">
                    <router-view v-if="this.$route.meta.keepAlive" />
                </transition>
            </keep-alive>
            <transition slot="body" name="slide-fade">
                <router-view v-if="!this.$route.meta.keepAlive" />
            </transition>
        </basic-layout>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { BasicLayout } from '@/layout';
@Component({
    components: {
        BasicLayout
    }
})
export default class App extends Vue {}
</script>

<style lang='scss' scope>
#app {
    width: 100%;
}
</style>