<template>
  <sketch-layout>
    <mapbox slot="full" @onLoaded="onMapLoaded" />
    <map-draw-tools slot="top" @onLoaded="onDrawToolLoaded" :map="this.map" :xzqdm="this.xzqdm" />
    <simple-tab-card :queryResult="this.queryResult" slot="middle" />
    <compare-tab-card :queryResult="this.queryResult" slot="bottom" />
  </sketch-layout>
</template>

<script lang="ts" src="./HomePage.ts"></script>

<style lang="scss" scoped>
@import './HomePage.scss';
</style>

