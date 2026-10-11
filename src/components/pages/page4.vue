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
          <input type="file" accept="image/*" v-on:change="uploadEvent">
        </div>
        <textarea v-model="userData.desc" v-on:blur="uploadDesc"></textarea>
        <div class="hr">点击可修改内容! 描述中增加年龄、体型等会提高找到的几率。</div>
        <div class="upload-btn">
          <div class="btn btn-primary">上传照片</div>
          <input type="file" accept="image/*" v-on:change="uploadEvent">
        </div>
        <router-link to="/page1">
          <p class="copyright">由 Quick Form H5 生成</p>
        </router-link>
      </div>
      <div class="text-line">
        <span class="text">转发到</span>
        <div class="line"></div>
      </div>
      <div class="share" @click="tippop">
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

    <v-toast :visible="showSuccess" :message="'信息更改成功'" :className="''" :position="'bottom'" :iconClass="'fa fa-check'">
    </v-toast>
    <v-toast :visible="showDanger" :message="'对不起您的图片太大，无法上传！'" :className="''" :position="'bottom'" :iconClass="'fa fa-warning'">
    </v-toast>
    <v-toast :visible="showFail" :message="'上传失败，接口错误或者图片过大！'" :className="''" :position="'bottom'" :iconClass="'fa fa-remove'">
    </v-toast>
  </div>
</template>

<script>
import Toast from '@/components/common/toast'
import bus from '@/utils/bus'
import { imageUpload, publishUpdate } from '@/services/api'
import defaultAvatar from '@/assets/avator.jpg'
import tipImage from '@/assets/tipop.png'

// Keep uploaded photos reasonably small so they can be shared easily.
const MAX_SIZE = 5 * 1024 * 1024

export default {
  name: 'page4',

  data: () => ({
    showTippop: false,
    showSuccess: false,
    showDanger: false,
    showFail: false,
    tipImage,
    userData: {
      desc: '',
      img_url: defaultAvatar
    }
  }),

  components: {
    'v-toast': Toast
  },

  created () {
    bus.$on('page3', data => {
      this.userData = data
      this.userData.img_url = data.img_url || defaultAvatar
      this.userData.desc = this.buildDesc(data)
    })
  },

  methods: {
    // Build a human-readable description from the collected fields.
    buildDesc (data) {
      const sex = data.sex === 'male' ? '男' : '女'
      const age = data.age ? data.age + '岁，' : ''
      return data.name + '，' + sex + '，' + age +
        '在本次事件中失去联系，有知情者请联系：' +
        data.publish_name + '（电话:' + data.publish_phone + '）。望转发，万分感谢！'
    },

    // Validate and hand the selected file off to the API layer.
    uploadEvent (e) {
      const file = e.target.files && e.target.files[0]
      e.target.value = ''
      if (!file) return

      if (file.size > MAX_SIZE) {
        this.showDanger = true
        setTimeout(() => { this.showDanger = false }, 800)
        return
      }

      imageUpload(file).then(res => {
        this.userData.img_url = res.url || defaultAvatar
        this.uploadDesc()
      }).catch(err => {
        this.showFail = true
        setTimeout(() => { this.showFail = false }, 800)
        console.error(err)
      })
    },

    // Persist the description and image so the shareable page stays in sync.
    uploadDesc () {
      if (!this.userData.id) return
      publishUpdate({
        id: this.userData.id,
        img_url: this.userData.img_url || defaultAvatar,
        desc: this.userData.desc
      }).then(() => {
        this.showSuccess = true
        setTimeout(() => { this.showSuccess = false }, 800)
      }).catch(err => {
        console.error(err)
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
  overflow-y: scroll;
  font-size: 0.64rem;
  line-height: 1rem;
  outline: 0;
  border: none;
}

.upload-btn {
  margin: 0.6rem 0;
  height: 2rem;
  overflow: hidden;
}

.upload-btn .btn {
  margin: 0 auto;
}

.upload-btn input {
  width: 6rem;
  height: 1.7rem;
  z-index: 999;
  opacity: 0;
  top: -1.7rem;
  left: 50%;
  margin-left: -3rem;
  position: relative;
}

.hr {
  border-top: 1px solid #579f23;
  font-size: 0.469rem;
  padding: 10px;
  text-align: left;
  color: #363636;
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
