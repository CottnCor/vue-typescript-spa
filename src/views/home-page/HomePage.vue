<template>
  <sketch-layout>
    <mapbox slot="full" @onLoaded="onMapLoaded" />
    <map-draw-tools v-if="this.map" slot="top" @onLoaded="onDrawToolLoaded" :map="this.map" />
    <simple-tab-card slot="left" />
    <compare-tab-card slot="bottom" />
  </sketch-layout>
</template>

<script lang="ts" src="./HomePage.ts"></script>

<style lang="scss" scoped>
@import './HomePage.scss';
</style>

