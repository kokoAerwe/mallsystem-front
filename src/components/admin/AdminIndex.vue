<template>
  <div id="admin-index">
    <!-- 导航栏开始 -->
    <div class="header">
      <el-menu :default-active="activeIndex2" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/admin/index/user">User Management</el-menu-item>
<!--        <el-submenu index="2">-->
<!--          <template slot="title">我的工作台</template>-->
<!--          <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--          <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--          <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--          <el-submenu index="2-4">-->
<!--            <template slot="title">选项4</template>-->
<!--            <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--            <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--            <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-submenu>-->
        <el-menu-item index="/admin/index/goods">Commodity Management</el-menu-item>
        <el-menu-item index="/admin/index/tag">Label Management</el-menu-item>
        <el-menu-item index="/admin/index/address">Address Management</el-menu-item>
        <el-menu-item index="/admin/index/vip">VIP Management</el-menu-item>
      </el-menu>
    </div>
    <!-- 导航栏结束 -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'AdminIndex',
  created() {

  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}

</script>
<style>
</style>
