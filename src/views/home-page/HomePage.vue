<template>
  <sketch-layout>
    <tips-bar slot="top" :xzqdm="this.xzqdm" :mj="this.mj" />
    <basics-query :queryResult="this.queryResult" slot="middle" />
    <advanced-query :queryResult="this.queryResult" slot="bottom" />
  </sketch-layout>
</template>

<script lang="ts" src="./HomePage.ts"></script>

<style lang="scss" scoped>
@import "./HomePage.scss";
</style>

