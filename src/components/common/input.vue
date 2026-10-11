<template>
  <label class="label">
    <span class="requiredSymbol" :class="{ hidden: !props.isRequired }">*</span>
    <span>{{ props.title }}：</span>
    <p class="control has-icon has-icon-right">
      <input
        class="input"
        :class="{ 'is-danger': isDanger }"
        :type="props.type || 'text'"
        :placeholder="props.placeholder || ''"
        v-model="props.value"
        @input="clearDanger"
        @blur="validate"
      >
      <i v-show="isDanger" class="fa fa-warning"></i>
    </p>
    <span :class="{ hidden: !isDanger }" class="help is-danger">
      {{ dangerMessage }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'v-input',
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  computed: {
    // Danger states, driven by the parent's shared `props.isDanger`:
    //   0 = valid     1 = format error     2 = required but empty
    isDanger () {
      return this.props.isDanger !== 0
    },

    dangerMessage () {
      if (this.props.isDanger === 2) return this.props.title + '不能为空'
      if (this.props.isDanger === 1) return this.props.title + '格式不正确'
      return ''
    }
  },

  methods: {
    clearDanger () {
      this.props.isDanger = 0
    },

    validate () {
      const value = this.props.value
      const { isRequired, reg } = this.props

      if (isRequired && !value.trim()) {
        this.props.isDanger = 2
        return
      }
      if (reg && value && !reg.test(value)) {
        this.props.isDanger = 1
        return
      }
      this.props.isDanger = 0
    }
  }
}
</script>

<style scoped>
.label {
  margin: 1rem 0 0.5rem 0;
  font-size: 0.6rem;
  line-height: 1.68rem;
}

.label span {
  line-height: 1.68rem;
  font-size: 0.6rem;
}

.control.has-icon .fa {
  top: 0.6rem;
}

.hidden {
  visibility: hidden;
}

.help {
  margin-top: 0 !important;
  font-weight: 300;
}
</style>
