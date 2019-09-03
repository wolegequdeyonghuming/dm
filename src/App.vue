<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>我就是规则</h1>
      </el-header>

      <el-main>
        <nav>
          <router-link class="nav-link" to="/">卡查</router-link>
          <router-link class="nav-link" to="/rd">随机抽卡</router-link>
        </nav>
        <router-view/>
      </el-main>

    </el-container>
  </div>
</template>

<style scoped>
  h1{
    text-align: center;
  }
  nav{
    margin-bottom: 24px;
    text-align: center;
  }
  .nav-link{
    margin: 0 24px;
  }
</style>
