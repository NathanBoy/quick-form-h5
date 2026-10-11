<template>
  <div class="form">
    <div class="top">
      <p>*请留下联系方式</p>
      <p>有任何关于 <span>{{userData.name}}</span> 的消息我们会与你联系</p>
    </div>

    <div class="info">
      <v-input :props="publishName" ref="publishName" v-focus-next-on-enter="'publishPhone'"></v-input>

      <v-input :props="publishPhone" ref="publishPhone" v-focus-next-on-enter="'submit'"></v-input>

      <input v-on:click="changeRoute('/page4')" class="btn btn-primary bottomBtn" type="button" ref="submit" value="提交">
    </div>

    <v-toast :visible="showToast" :message="'提交成功'" :className="''" :position="'middle'" :iconClass="'fa fa-check'">
    </v-toast>
  </div>
</template>

<script>
import Input from '@/components/common/input'
import Toast from '@/components/common/toast'
import bus from '@/utils/bus'
import { publishAdd } from '@/services/api'

export default {
  name: 'page3',
  data: () => ({
    publishName: {
      title: '姓名',
      value: '',
      isDanger: 0,
      reg: /^([a-zA-Z0-9\u4e00-\u9fa5·]{1,10})$/,
      isRequired: true,
      placeholder: '姓名'
    },
    publishPhone: {
      title: '电话',
      value: '',
      isDanger: 0,
      reg: /^1[3-9]\d{9}$/,
      isRequired: true,
      placeholder: '电话'
    },
    showToast: false,
    userData: {}
  }),

  components: {
    'v-input': Input,
    'v-toast': Toast
  },

  created () {
    bus.$on('page2', data => { this.userData = data })
  },

  methods: {
    validateField (field) {
      const value = field.value
      if (field.isRequired && !value.trim()) {
        field.isDanger = 2
        return false
      }
      if (field.reg && value && !field.reg.test(value)) {
        field.isDanger = 1
        return false
      }
      field.isDanger = 0
      return true
    },

    changeRoute (path) {
      const allForm = [this.publishName, this.publishPhone]
      if (!allForm.every(field => this.validateField(field))) return

      this.userData = Object.assign({}, this.userData, {
        publish_name: this.publishName.value,
        publish_phone: this.publishPhone.value
      })

      publishAdd(this.userData).then(res => {
        this.userData.id = res.id
        this.showToast = true
        const self = this
        setTimeout(() => {
          self.showToast = false
          self.$router.push({ path })
          setTimeout(() => bus.$emit('page3', self.userData), 200)
        }, 600)
      }).catch(err => {
        // Surface a real error instead of silently failing.
        alert('提交失败，请重试')
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>
.form {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.top {
  margin: 2rem 1rem;
  padding: 0 1rem;
  text-align: left;
  font-size: 0.6rem;
  color: #108ee9;
  border: 2px dashed #108ee9;
  border-radius: 0.5rem;
}

.info {
  width: 90%;
  margin: 2rem auto 0.43rem auto;
}
</style>
