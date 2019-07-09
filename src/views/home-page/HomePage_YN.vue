<template>
  <sketch-layout-yn>
    <tips-bar slot="top" :xzqdm="this.xzqdm" :mj="this.mj" />
    <advanced-query-yn :queryResult="this.queryResult" slot="middle" />
  </sketch-layout-yn>
</template>

<script lang="ts" src="./HomePage_YN.ts"></script>

<style lang="scss" scoped>
@import "./HomePage.scss";
</style>

