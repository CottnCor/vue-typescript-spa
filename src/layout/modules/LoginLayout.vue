<template>
    <div class="content">
        <slot name="content"></slot>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class LoginLayout extends Vue {}
export default LoginLayout;
</script>

<style lang='scss' scoped>
.content {
    width: 100%;
    height: 100vh;
    display: flex;
}
</style>