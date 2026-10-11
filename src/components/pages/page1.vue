<template>
  <div class="hello">
    <div class="title">
      <h3>Quick Form H5</h3>
      <p>一个支持突发事件的移动端快速表单模板</p>
    </div>
    <div class="btns">
      <router-link to="/page2">
        <div class="btn btn-primary">快速上手</div>
      </router-link>
      <div class="btn btn-dashed">
        <a href="https://github.com/NathanBoy/quick-form-h5" target="_blank">项目源码</a>
      </div>
      <div class="tip">
        点击"快速上手"代表同意
        <router-link to="/page0">
          <span class="tips">《Quick Form H5 使用说明》</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page1',
  data () {
    return {}
  }
}
</script>

<style scoped>
.hello {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.title {
  margin: 6rem auto 0;
  text-align: center;
}

.title h3 {
  font-size: 1.8rem;
  color: #108ee9;
}

.title p {
  font-size: 0.7rem;
}

.btns {
  margin-top: 3rem;
  width: 100%;
}

.btns .btn {
  margin: 0 auto .4rem auto;
}

.btns .btn a {
  color: inherit;
  text-decoration: none;
  display: block;
}

.tip {
  margin-top: 0.3rem;
  text-align: center;
  line-height: 1rem;
  font-size: 0.45rem;
  z-index: 999;
  position: relative;
  height: 1rem;
}

.tips {
  color: #108ee9;
  text-decoration: underline;
}
</style>
