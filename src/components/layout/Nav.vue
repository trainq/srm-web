<template>
  <div id="nav-wrap">
    <el-menu background-color="transparent" text-color="#ffffff" active-text-color="#00BFFF" router
             :collapse="isCollapse">
      <template v-for="item in routes">
        <el-submenu v-if="item.type===0" :key="item.id" :index="item.id.toString()">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
            <template #title>
              <i :class="subItem.icon"></i>
              <span>{{ subItem.name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.type===1" :key="item.id" :index="item.path">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "Nav",
  setup() {
    const routes = reactive([{
      id: 0,
      name: '控制台',
      path: '/console',
      icon: 'el-icon-location',
      type: 1
    }, {
      id: 1,
      name: '系统管理',
      icon: 'el-icon-setting',
      type: 0,
      children: [{
        id: 2,
        name: '用户管理',
        path: '/user',
        icon: 'el-icon-user',
        type: 1,
      }]
    }, {
      id: 3,
      name: '系统管理2',
      icon: 'el-icon-setting',
      type: 0,
      children: [{
        id: 4,
        name: '角色管理',
        path: '/role',
        icon: 'el-icon-user',
        type: 1,
      }]
    }]);

    const isCollapse = ref(false)
    return {
      routes,
      isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/config";

#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navWidth;
  height: 100vh;
  background-color: #344a5f;
}
</style>
