<template>
  <label class="label">
    <span class="requiredSymbol" :class="{'hidden': !props.isRequired}">*</span>
    <span>{{props.title}}：</span>
    <p class="cell" >
      <label v-for="option in props.options" :key="option.value" @click="clearDanger()">
        <span class="radio">
          <input
            class="input"
            type="radio"
            v-model="props.value"
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="core"></span>
        </span>
        <span v-text="option.label || option"></span>
      </label>
    </p>
    <span :class="{'hidden': props.isDanger != 2}" class="help is-danger"><i class="fa fa-warning"></i>  {{props.title}}{{ '不能为空' }}</span>
  </label>
</template>

<script>
export default {
  name: 'radio',
  props: {
    props:{
      title: String,
      isDanger: 0,
      options: {
        type: Array,
        required: true
      },
      value: String,
      isRequired: Boolean,
    }
  },
  methods: {
    clearDanger: function(){
      this.props.isDanger = 0
    },
  },
};
</script>

<style scoped>
.label {
  margin: 1rem 0;
  font-size: 0.6rem;
  line-height: 1.68rem;
}

.cell {
  flex: 1;
  margin: 0 0.6rem;
  display: flex;
}

.cell label {
  flex: 1;
  text-align: left;
  font-weight: normal;
}

.input {
  display: none;
}

.input:checked+.core {
  background-color: #26a2ff;
  border-color: #26a2ff;
}

.input:checked+.core::after {
  background-color: #fff;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.input[disabled]+.core {
  background-color: #d9d9d9;
  border-color: #ccc;
}

.core {
  box-sizing: border-box;
  display: inline-block;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid #ccc;
  position: relative;
  margin: 0.54rem 0.3rem;
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: middle;
}

.core::after {
  content: "";
  border-radius: 100%;
  top: 50%;
  left: 50%;
  position: absolute;
  margin-left: -0.15rem;
  margin-top: -0.15rem;
  width: 0.3rem;
  height: 0.3rem;
  -webkit-transition: -webkit-transform .2s;
  transition: -webkit-transform .2s;
  transition: transform .2s;
  transition: transform .2s, -webkit-transform .2s;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.hidden {
  visibility: hidden;
}
.help {
  margin-top: 0!important;
  font-weight: 300;
}
.fa {
  color: #dbdbdb;
}
</style>