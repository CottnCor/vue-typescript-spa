<template>
    <div class="container">
        <slot name="container"></slot>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class ContentLayout extends Vue {}
export default ContentLayout;
</script>

<style lang='scss' scoped>

.container {
    margin-left: auto;
    margin-right: auto;
    min-width: map-get($breakpoint, md) - $size_18;
}

@media only screen and (min-width: map-get($breakpoint, md)) {
    .container {
        width: map-get($breakpoint, md) - $size_18;
    }
}

@media only screen and (min-width: map-get($breakpoint, lg)) {
    .container {
        width: map-get($breakpoint, lg) - $size_24;
    }
}

@media only screen and (min-width: map-get($breakpoint, xl)) {
    .container {
        width: map-get($breakpoint, xl) - $size_30;
    }
}
</style>