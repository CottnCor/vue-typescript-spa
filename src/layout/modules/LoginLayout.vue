<template>
    <div class="container">
        <slot name="container"></slot>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class LoginLayout extends Vue {}
export default LoginLayout;
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    min-height: 100vh;
    display: flex;
}
</style>