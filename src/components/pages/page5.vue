<template>
  <div class="upload">
    <div class="info">
      <div class="card">
        <div class="text-line">
          <span class="text">寻人启事</span>
          <div class="line"></div>
        </div>
        <div class="upload-img">
          <img v-bind:src="userData.img_url" alt="寻人">
        </div>
        <textarea v-model="userData.desc" disabled="true"></textarea>
        <router-link to="/page1">
          <div class="btn btn-primary">我也要发布寻人</div>
          <p class="copyright">由 Quick Form H5 生成</p>
        </router-link>
      </div>
      <div class="text-line">
        <span class="text">帮他转发</span>
        <div class="line"></div>
      </div>
      <div class="share" @click="share">
        <div>
          <i class="fa fa-qq"></i>
          <i class="fa fa-wechat"></i>
          <i class="fa fa-safari"></i>
        </div>
        <div>
          <p>QQ好友</p>
          <p>微信好友</p>
          <p>浏览器</p>
        </div>
      </div>
    </div>
    <div class="tippop" v-show="showTippop" @click="tippop">
      <img :src="tipImage" alt="分享提示">
    </div>
  </div>
</template>

<script>
import Share from '@/utils/share'
import { publishGet } from '@/services/api'
import defaultAvatar from '@/assets/avator.jpg'
import tipImage from '@/assets/tipop.png'

export default {
  name: 'page5',

  data: () => ({
    showTippop: false,
    tipImage,
    userData: {
      desc: '',
      img_url: defaultAvatar
    }
  }),

  created () {
    const id = this.$route.params.id
    if (!id) return

    publishGet(id).then(record => {
      if (!record) return
      this.userData = record
      this.userData.img_url = record.img_url || defaultAvatar
      this.userData.desc = record.desc || this.buildDesc(record)
    }).catch(err => {
      console.error(err)
    })
  },

  methods: {
    buildDesc (data) {
      const sex = data.sex === 'male' ? '男' : '女'
      const age = data.age ? data.age + '岁，' : ''
      return data.name + '，' + sex + '，' + age +
        '在本次事件中失去联系，有知情者请联系：' +
        data.publish_name + '（电话:' + data.publish_phone + '）。望转发，万分感谢！'
    },

    // Share via the native sheet when available, else show the manual tip.
    share () {
      Share.share({
        title: '寻人启事',
        text: this.userData.desc || '',
        url: location.href
      }).then(shared => {
        if (!shared) this.tippop()
      })
    },

    tippop () {
      this.showTippop = !this.showTippop
    }
  }
}
</script>

<style scoped>
.upload {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.info {
  width: 90%;
  margin: 0.43rem auto;
}

.card {
  margin: 1.42rem 0.216rem;
  padding: .49rem .72rem;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, .1);
}

.card .text {
  background-color: #f7f7f7;
  color: #108ee9;
}

.upload-img {
  margin: 1rem 0 1rem 0;
  height: 3.84rem;
  overflow: hidden;
}

.upload-img img {
  display: block;
  margin: 0 auto;
  width: 3.09rem;
  height: 3.84rem;
}

.upload-img input {
  width: 3.09rem;
  height: 3.84rem;
  z-index: 999;
  opacity: 0;
  top: -3.84rem;
  left: 50%;
  margin-left: -1.5045rem;
  position: relative;
}

textarea {
  display: block;
  width: 100%;
  height: 4.5rem;
  margin: .49rem 0;
  background-color: #f7f7f7;
  overflow-y: auto;
  font-size: 0.64rem;
  line-height: 1rem;
  outline: 0;
  border: none;
}

.btn {
  margin: 0.6rem auto;
  overflow: hidden;
}

.copyright {
  margin-top: 0.57rem;
  text-align: center;
  color: #363636;
  font-size: 0.64rem;
}

.text-line {
  text-align: center;
}

.text {
  font-size: 0.74rem;
  position: relative;
  font-weight: 600;
  top: 0.5rem;
  background: #fff;
  padding: 0.5rem;
  color: #363636;
}

.line {
  height: 1px;
  border-bottom: 2px solid #ddd;
}

.share {
  margin: 1rem 0;
}

.share div {
  display: flex;
}

.fa {
  flex: 1;
  color: #363636;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  margin: 0.2rem 0;
}

.share div p {
  flex: 1;
  text-align: center;
  line-height: 0.6rem;
  padding: 0;
  margin: 0.2rem 0;
}

.tippop {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 3000;
  background-color: rgba(0, 0, 0, 0.75);
}

.tippop img {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  max-width: 100%;
  width: 10.72rem;
  height: 3.4rem;
}
</style>
