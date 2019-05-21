<template>
    <div class="wapper">
        <slot name="content"></slot>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class BlankLayout extends Vue {}
export default BlankLayout;
</script>

<style lang='scss' scoped>
.wapper {
    width: 100%;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    background: map-get($default, grey_2);
}
</style>