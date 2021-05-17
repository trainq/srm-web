<template>
  <div id="Home">
    <Header></Header>
    <Nav></Nav>
    <Main></Main>
  </div>
</template>

<script>
import {ref} from "vue";
import Header from "@/components/layout/Header";
import Nav from "@/components/layout/Nav";
import Main from "@/components/layout/Main";

export default {
  name: "Home",
  components: {Main, Nav, Header},
  setup() {
    const nickname = ref("")
    return {
      nickname
    }
  },
}
</script>

<style lang="scss" scoped>
#Home {
}
</style>
