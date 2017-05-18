<template>
  <div class="view-login container">
    <h3>Note? Wiki? Both!</h3>
    <template v-for="(item,index) in items">
      <v-input class="view-input" :opts="item.opts" v-model="item.value" :index="index" @keyup="keyup" @changeStatus="changeStatus"></v-input>
    </template>
    <v-button @click="submitLogin" :type="'primary'" icon="arrow-circle-right" :disabled="formStatus">登录</v-button>
  </div>
</template>
<script>
  import VInput from '../components/Form/Input';
  import VButton from '../components/Form/Button';
  export default{
    name: 'Login',
    data(){
      return {
        items: [
          {
            opts: {name: 'name', type: 'text', title: '用户名', validate: {type: 'require', message: '请输入用户名'}},
            value: '',
            status: false
          },
          {
            opts: {name: 'pwd', type: 'password', title: '密码', validate: {type: 'require', message: '请输入密码'}},
            value: '',
            status: false
          },
        ],
        formStatus: false
      }
    },
    components: {
      VInput, VButton
    },
    mounted() {
      this.$store.commit('exit');
    },
    methods: {
      submitLogin(e){
        this.$store.dispatch('login', {
          uname: this.items[0].value,
          pwd: this.items[1].value
        }).then((response) => {
          if (1 == response.status) {
            console.log(response);
          } else {
            this.$alert(response.message);
          }
        }).catch((error)=>{
            console.log(error);
        });
      },
      changeStatus(val, index){
        this.items[index].status=val;
      },
      keyup(){
        for (let i = 0; i < this.items.length; i++) {
          if (!this.items[i].status) {
            this.formStatus = false;
            return;
          }
        }
        this.formStatus = true;
      }
    },
  }
</script>
<style scope lang="scss">
  .view-login {
    max-width: 320px;
    width: 100%;
    margin: 15% auto;
    border: 1px solid #CDCDCD;
    background-color: #EBEBEB;
    border-radius: 3%;
    padding: 10px;
    .v-input {
      margin-top: 15px;
    }
    .btn-login {
      margin-top: 15px;
    }
  }
</style>
