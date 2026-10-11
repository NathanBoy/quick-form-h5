<template>
  <div class="about">
    <p class="title">Quick Form H5 使用说明</p>
    <p>这是一个开源的移动端快速表单 H5 模板，帮你用最快速度上线一个应急发布类页面：登记信息、上传照片、生成可分享的详情页。</p>
    <p>项目基于 Vue 2 + Webpack 构建，自带一套可复用的表单校验组件，并内置了本地 mock，无需后端即可完整跑通发布流程。</p>
    <p>想接入自己的后端？在 <span class="code">src/config.js</span> 里把 <span class="code">useMock</span> 改为 <span class="code">false</span> 并填写接口地址即可。</p>
    <router-link to="/page1">
      <div class="btn btn-primary btn-close">关闭</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'page0'
}
</script>

<style scoped>
.about {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: auto;
}

.title {
  text-align: center;
  margin: 2rem auto;
  font-size: 1rem;
}

p {
  font-size: 0.60rem;
  margin: 1.49rem 1.49rem;
  line-height: 1.02rem;
  text-align: left;
}

.code {
  color: #108ee9;
  font-family: monospace;
}

.btn-close {
  margin: 2rem auto 1rem auto;
}
</style>
