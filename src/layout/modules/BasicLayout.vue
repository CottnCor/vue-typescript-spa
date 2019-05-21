<template>
  <div class="wapper">
    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class BasicLayout extends Vue {}
export default BasicLayout;
</script>

<style lang='scss' scoped>
.wapper {
    width: 100%;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    background: map-get($default, grey_2);
}

.body
{
    width: 100%;
    display: flex;
    flex: 1;
}

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