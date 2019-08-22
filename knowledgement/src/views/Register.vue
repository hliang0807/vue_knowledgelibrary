<template>
  <el-form :model="signUpForm" :rules="rules" label-position="left"
           label-width="80px" v-loading="loading">
    <div  class="signUp-container" >
    <h3 class="signUp_title">知识库系统用户注册</h3>
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="signUpForm.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item  label="邮箱" prop="email">
      <el-input v-model="signUpForm.email"  auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="signUpForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="signUpForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="signUpForm.sex" placeholder="">
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="women"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="管理权限" prop="role">
      <el-select v-model="signUpForm.role" placeholder="">
        <el-option label="用户" value="user"></el-option>
        <el-option label="管理员" value="admin"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="signUp" style="width: 100%">注册</el-button>
    </el-form-item>
    </div>
  </el-form>
</template>


<script>
    export default{
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.signUpForm.password !== '') {
                        this.$refs.signUpForm.validateField('password');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.signUpForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, validator: validatePass, trigger: 'blur'}],
                    checkPass: [{required: true, validator: validatePass2,  trigger: 'blur'}],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
                    sex:[{required: true, message: '请选择性别', trigger: 'blur'}],
                    role:[{required: true, message: '请选择管理权限', trigger: 'blur'}]
                },
                checked: true,
                signUpForm: {
                    username: '',
                    password: '',
                    checkPass: '',
                    email: '',
                    sex: '',
                    role: ''
                },
                loading: false
            }
        },
        methods: {
            signUp: function(){
                // this.$router.push('/')
                var _this = this;
                this.loading = true;
                let fd = new FormData();
                fd.append("username",this.signUpForm.username);
                fd.append("password",this.signUpForm.password);
                fd.append("email",this.signUpForm.email);
                fd.append("sex",this.signUpForm.sex);
                fd.append("role",this.signUpForm.role);

                this.$axios.post('/register',fd, {headers:
                        { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(resp=> {
                    _this.loading = false;
                    if (resp && resp.status == 200) {
                        _this.$router.push('/login')
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .signUp-container{
    border-radius: 20px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .signUp_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
