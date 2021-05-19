<template>
  <div id="main-wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style lang="scss" scoped>
@import "../../styles/config";
#main-wrap {
  position: fixed;
  left: $navWidth;
  top: $headerHeight;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
}
</style>
