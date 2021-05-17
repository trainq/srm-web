<template>
  <div id="header-wrap">
    <div class="pull-left">
      <svg-icon icon-name="menu" class="head-icon"></svg-icon>
    </div>

    <div class="pull-right">
      <div class="pull-left">
        <p>{{ nickname }}</p>
      </div>
      <div class="pull-left">
        <svg-icon icon-name="exit" class="head-icon" @click="doLogout"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
import {ref} from "vue";
import router from "@/router";

export default {
  name: "Header",
  components: {SvgIcon},
  setup() {
    const nickname = ref(localStorage.getItem("username"))
    const doLogout = ()=>{
      localStorage.removeItem("token");
      router.push({
        path:'/login'
      })
    }
    return {
      nickname,
      doLogout
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/config";

#header-wrap {
  position: fixed;
  top: 0;
  left: $navWidth;
  right: 0;
  height: $headerHeight;
  background-color: white;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
}

.head-icon {
  font-size: 25px;
  margin: 0 35px;
}
</style>
