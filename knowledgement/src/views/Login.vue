<template>
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">知识库系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="signIn" style="width: 100%">登录</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="signUp" style="width: 100%">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
    export default{
        data(){
            return {
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                checked: true,
                loginForm: {
                    username: '',
                    password: ''
                },
                loading: false
            }
        },
        methods: {
            signIn: function () {
                var _this = this;
                this.loading = true;
                let fd = new FormData();
                fd.append("username",this.loginForm.username);
                fd.append("password",this.loginForm.password);
                this.$axios.post('/login', fd, {headers:
                        { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(resp=> {
                    _this.loading = false;

                    if (resp && resp.status == 200) {
                        let data =resp.headers["token"]
                        console.log(data)
                       this.$store.commit('set_token', data)
                        if (this.$store.state.token) {
                            this.$router.push('/home')
                        }
                    else {
                            this.$router.replace('/login')
                        }
                    } else {
                        alert('账号或密码错误');
                        console.log(error);
                    }
                })
            },
            signUp: function(){
                this.$router.push('/register')
            }
        }
    }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
