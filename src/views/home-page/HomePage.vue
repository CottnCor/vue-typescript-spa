<template>
  <sketch-layout>
    <mapbox slot="full" @onLoaded="onMapLoaded" />
    <!-- <map-draw-tools slot="top" v-if="this.map" @onLoaded="onDrawToolLoaded" :map="this.map" :label="this.fuck" /> -->
    <map-draw-tools slot="top" @onLoaded="onDrawToolLoaded" :label="this.fuck" />
  </sketch-layout>
</template>

<script lang="ts" src="./HomePage.ts"></script>

<style lang="scss" scoped>
@import './HomePage.scss';
</style>

