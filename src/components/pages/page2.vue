<template>
  <div class="form">
    <div class="top">
      发布寻人
    </div>

    <div class="info">
      <v-input :props="userName" ref="userName" v-focus-next-on-enter="'userAge'"></v-input>

      <v-radio :props="userSex"></v-radio>

      <v-input :props="userAge" ref="userAge" v-focus-next-on-enter="'submit'"></v-input>

      <input v-on:click="changeRoute('/page3')" class="btn btn-primary bottomBtn" type="button" ref="submit" value="发布">
    </div>

    <v-toast :visible="showToast" :message="'发布成功'" :className="''" :position="'middle'" :iconClass="'fa fa-check'">
    </v-toast>
  </div>
</template>

<script>
import Input from '@/components/common/input'
import Toast from '@/components/common/toast'
import Radio from '@/components/common/radio'
import bus from '@/utils/bus'

export default {
  name: 'page2',
  data: () => ({
    userName: {
      title: '姓名',
      value: '',
      isDanger: 0,
      reg: /^([a-zA-Z0-9\u4e00-\u9fa5·]{1,10})$/,
      isRequired: true,
      placeholder: '姓名'
    },

    userAge: {
      title: '年龄',
      value: '',
      isDanger: 0,
      reg: /^(\d{1,2})$/,
      isRequired: false,
      placeholder: '年龄'
    },

    userSex: {
      title: '性别',
      isDanger: 0,
      options: [
        { label: '男', value: 'male', disabled: false },
        { label: '女', value: 'female', disabled: false }
      ],
      value: '',
      isRequired: true
    },

    showToast: false
  }),

  components: {
    'v-input': Input,
    'v-toast': Toast,
    'v-radio': Radio
  },

  methods: {
    // Validate a single field. 0 = valid, 1 = format error, 2 = empty required.
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

    // Route to the next step once every required field is valid.
    changeRoute (path) {
      const allForm = [this.userName, this.userSex, this.userAge]
      if (!allForm.every(field => this.validateField(field))) return

      const params = {
        name: this.userName.value,
        sex: this.userSex.value,
        age: this.userAge.value
      }

      this.showToast = true
      const self = this
      setTimeout(() => {
        self.showToast = false
        self.$router.push({ path })
        setTimeout(() => bus.$emit('page2', params), 200)
      }, 600)
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
  margin: 2rem auto;
  text-align: center;
  font-size: 1rem;
  color: #108ee9;
}

.info {
  width: 90%;
  margin: 2rem auto 0.43rem auto;
}
</style>
