<template>
  <div id="app">
    <!-- 全局固定顶部导航 -->
    <header class="nav-bar">
      <div class="nav-title">长江上游重点流域星空地一体化遥感综合监测平台</div>
      <nav class="nav-links">
        <router-link to="/"      active-class="active">首页</router-link>
        <router-link to="/water" active-class="active">水质遥感</router-link>
        <router-link to="/vegetation" active-class="active">植被遥感</router-link>
        <router-link to="/drone" active-class="active">无人机遥感</router-link>
      </nav>
    </header>

    <!-- 路由内容 -->
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 防止内容被导航遮挡 */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 全局导航样式 */
.nav-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px;
  background-color: #409EFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-title {
  flex: 1;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-align: left;
}

.nav-links {
  display: flex;
  color: #fff;
  gap: 24px;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  line-height: 60px;
}

.nav-links .active {
  border-bottom: 2px solid #fff;
}

/* 主体内容区，推开导航栏高度 */
main {
  margin-top: 60px;
  padding: 20px;
}
</style>
