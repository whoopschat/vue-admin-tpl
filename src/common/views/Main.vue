
<template>
  <div id="main" :class="[{'collapsed' : $state.menuCollapse}]">
    <sidebar-menu
      width="230px"
      :menu="menu"
      :show-one-child="true"
      :collapsed="$state.menuCollapse"
      @collapse="onCollapse"
    />
    <span class="user">
      {{ $state.userName }}
      <router-link :to="{path:'/login'}">
        <el-button class="logout" @click="onLogut">退出登录</el-button>
      </router-link>
    </span>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import menu from "../datas/menu";
import { logout } from "../apis/login";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default {
  components: {
    SidebarMenu
  },
  data() {
    return {
      menu
    };
  },
  methods: {
    onLogut() {
      logout();
    },
    onCollapse(collapsed) {
      this.$state.menuCollapse = collapsed;
    }
  }
};
</script>

<style lang="less">
#main {
  padding-left: 230px;
}
#main.collapsed {
  padding-left: 50px;
}
.content {
  padding: 50px;
}
.user {
  float: right;
}
.logout {
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>

