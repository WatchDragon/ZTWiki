<template>
  <div class="form-group text-left com-input">
    <transition>
      <div class="warning" v-show="warning">
        {{warningText}}
      </div>
    </transition>
    <label v-if="opts.title" :for="opts.name">{{opts.title}}</label>
    <input class="form-control" :id="opts.name" :name="opts.name" v-if="opts.disabled" disabled @blur="blur" @input="input" @foucs="foucs"
    :placeholder="opts.placeholder" :type="opts.type" :value="value"  @keydown="keydown"  @keyup="keyup">
    <input class="form-control" :id="opts.name" :name="opts.name" v-else @blur="blur" @input="input" @foucs="foucs"
            :placeholder="opts.placeholder" :type="opts.type" :value="value" @keydown="keydown" @keyup="keyup">
  </div>
</template>
<script>
export default{
  props: {
    opts: {
      type: Object
    },
    index:{type:Number},
    value: {}
  },
  data(){
    return {
      warningText: '',
      warning: false
    }
  },
  methods: {
    _validate(e){
      let available = true;
      if (undefined != this.opts.validate) {
        switch (this.opts.validate.type) {
          case 'require':
            available = this.requireCheck();
            break;
          case 'regex':
            available = this.regexCheck();
            break;
          case 'number':
            available = this.numberCheck();
            break;
          default:
            break;
        }
      }
      this.$emit('changeStatus', available, this.index);
    },
    requireCheck(){
      if (null != this.value && '' != this.value && undefined != this.value) {
        this.warning = false;
        return true;
      }else {
        if (undefined == this.opts.validate.message)
          this.opts.validate.message = '请填写此项';
        this.warningText = this.opts.validate.message;
        this.warning = true;
        return false;
      }
    },
    numberCheck(){
      let min = undefined == this.opts.validate.min ? 0 : this.opts.validate.min;
      let max = undefined == this.opts.validate.max ? 100 : this.opts.validate.max;
      if (isNaN(this.value)) {
        if (undefined == this.opts.validate.message.NaN)
          this.opts.validate.message = '请输入一个数字';
        this.warningText = this.opts.validate.message.NaN;
        this.warning = true;
        return false;
      } else if (this.value < min || this.value > max) {
        if (undefined == this.opts.validate.message.overFlow)
          this.opts.validate.message = '请输入一个' + min + '到' + max + '之间的数字';
        this.warningText = this.opts.validate.message.overFlow;
        this.warning = true;
        return false;
      } else {
        this.warning = false;
        return true;
      }
    },
    regexCheck(){
      let regex = undefined == this.opts.validate.regex ? '/\.+/' : this.opts.validate.regex;
      if (this.value.test(regex)) {
        this.warning = false;
        return true;
      } else {
        if (undefined == this.opts.validate.message)
          this.opts.validate.message = '请输入有效的数据';
        this.warningText = this.opts.validate.message;
        this.warning = true;
        return false;
      }
    },
    blur(e){
      this._validate(e);
      this.$emit('blur', e);
    },
    input(e){
      this.$emit('input', e.target.value);
    },
    foucs(e){
      this._validate(e)
      event.target.select();
      this.$emit('foucs', e);
    },
    keydown(e){
        this._validate(e);
        this.$emit('keydown',e);
    },
    keyup(e){
      this._validate(e);
      this.$emit('keyup',e) ;
    }
  },
}
</script>
<style scoped lang="scss">
  .com-input {
    position: relative;
    .warning {
      font-size: 12px;
      padding: 5px 15px;
      border-radius: 4px;
      color: #fff;
      background: rgba(#000, .6);
      box-shadow: 1px 2px 3px rgba(#000, .1);
      position: absolute;
      bottom: 35px;
      right: 0;
    }
    .text-danger {
      margin-left: 5px;
      font-size: 12px;
      visibility: hidden;
    }
  }
</style>
