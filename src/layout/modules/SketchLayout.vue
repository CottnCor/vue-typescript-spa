<template>
    <div class="content">
        <slot name="content"></slot>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class SketchLayout extends Vue {}
export default SketchLayout;
</script>

<style lang='scss' scoped>
.content {
    width: 100%;
    display: flex;
}
</style>