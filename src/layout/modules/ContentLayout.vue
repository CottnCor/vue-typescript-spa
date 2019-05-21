<template>
    <div class="content">
        <slot name="content"></slot>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class ContentLayout extends Vue {}
export default ContentLayout;
</script>

<style lang='scss' scoped>

.content {
    margin-left: auto;
    margin-right: auto;
    min-width: map-get($breakpoint, md) - $size_18;
}

@media only screen and (min-width: map-get($breakpoint, md)) {
    .content {
        width: map-get($breakpoint, md) - $size_18;
    }
}

@media only screen and (min-width: map-get($breakpoint, lg)) {
    .content {
        width: map-get($breakpoint, lg) - $size_24;
    }
}

@media only screen and (min-width: map-get($breakpoint, xl)) {
    .content {
        width: map-get($breakpoint, xl) - $size_30;
    }
}
</style>