<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-form-header">
        <h1>南浔城投</h1>
        <p>南浔城投供应商管理系统</p>
      </div>
      <el-form :model="loginForm" ref="loginFormRef"
               size="medium" class="login-form" :rules="loginRules">
        <el-form-item prop="username" class="login-item">
          <el-input v-model="loginForm.username" type="text" autocomplete="off" placeholder="用户名">
            <template #prefix>
              <i class="el-icon-s-custom login-icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-item">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="密码">
            <template #prefix>
              <i class="el-icon-lock login-icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" class="login-item">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="loginForm.captcha" type="text" autocomplete="off" placeholder="验证码">
                <template #prefix>
                  <svg-icon iconName="captcha" class="login-icon"></svg-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-image :src="captchaImg" @click="getCaptcha">
                <template #placeholder>
                  <div class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </template>
                <template #error>
                  <div class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </template>
              </el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="doLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {getCaptchaApi, loginApi} from "../api/auth";
import {ElMessage} from "element-plus";
import router from "../router";
import SvgIcon from "../components/SvgIcon";

export default {
  name: "Login",
  components: {SvgIcon},
  setup() {
    const validateInput = (rule, value, callback) => {
      const pattern = new RegExp(
          "[`~!@#$^&*()=|{}':;,\\[\\].<>/?！￥…（）—【】‘；：” “。，、？]"
      );
      if (pattern.test(value)) {
        callback(new Error("请不要输入特殊字符"))
      } else {
        callback();
      }
    }
    const loginForm = reactive({
      username: "",
      password: "",
      captcha: "",
      captchaKey: "",
      platformId: 1,
    });
    const loginFormRef = ref("");
    const loginRules = reactive({
      username: [{required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 5, max: 18, message: '长度在5到18个字符', trigger: 'blur'},
        {validator: validateInput, trigger: 'blur'}],
      password: [{required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5, max: 18, message: '长度在5到18个字符', trigger: 'blur'},
        {validator: validateInput, trigger: 'blur'}],
      captcha: [{required: true, message: '请输入验证码', trigger: 'blur'},
        {min: 6, max: 6, message: '验证码为6个字符', trigger: 'blur'},
        {validator: validateInput, trigger: 'blur'}]
    })
    const captchaImg = ref("");
    const getCaptcha = () => {
      getCaptchaApi().then(response => {
        const data = response.data;
        captchaImg.value = data.src;
        loginForm.captchaKey = data.captchaKey;
      });
    }
    const doLogin = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          //loginForm.password = sha1(loginForm.password);
          loginApi(loginForm).then(response => {
            console.log(response)
            if (response.code === 500) {
              loginFormRef.value.resetFields();
              getCaptcha();
            }
            const data = response.data;
            localStorage.setItem("token", data.token)
            ElMessage.success(data.nickname + ",你好！欢迎使用供应商管理系统",)
            return router.push('/')
          })
        } else {
          return false
        }
      })
    }
    onMounted(() => {
      getCaptcha();
    })
    return {
      loginForm,
      loginFormRef,
      loginRules,
      captchaImg,
      getCaptcha,
      doLogin
    };
  },
}
;
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  height: 100vh;
  background-color: #344a5f;
}

.login-wrap {
  width: 330px;
  padding: 110px 0;
  margin: auto;

  .login-form-header {
    text-align: center;

    h1 {
      font-weight: 300;
      font-size: 30px;
      color: white;
    }

    p {
      margin: 10px 0;
      color: white;
    }
  }

  .login-form {
    .login-item {
      ::v-deep(.el-form-item__label) {
        color: white;
      }
    }

    .login-button {
      display: block;
      width: 100%;
    }
  }
}

.login-icon {
  width: 2em;
  height: 1em;
}
</style>
