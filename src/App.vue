<template>
  <div id="app">
    <transition v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
      <router-view class="page"></router-view>
    </transition>
  </div>
</template>


<script>
  import Animate from '@/utils/animate';
  export default {
    name: 'app',
    data() {
      return {}
    },

    //各种动画方式: 使用Animate.adapter（安卓兼容模式）
    //methods: Animate.pullUp
    //methods: Animate.scale
    //methods: Animate.rotate
    //methods: Animate.adapter('custom')
    //methods: Animate.adapter('custom')
    methods: Animate.adapter('scale')
  };
</script>

<style>
  .page {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
