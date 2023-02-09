<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <!-- 手机号 和 验证码 -->
      <div class="content">
        <label>手机号:</label>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone"> -->
        <!-- 需要用到正则表达式，如果忘了就滚回去学, 最外层的两个斜杠没有意义，就是把表达式包起来 -->
        <input placeholder="请输入你的手机号" 
          v-model="phone"
          name="phone" 
          v-validate="{required: true, regex: /^1\d{10}$/}"
          :class="{invalid: errors.has('phone')}"
        >
        <button style="width: 90px; height: 38px;" @click="getPhoneCode">获取验证码</button>
        <!-- <span class="error-msg">错误提示信息</span> -->
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input placeholder="请输入验证码" v-model="code"
          name="code" 
          v-validate="{required: true, regex: /^\d{6}$/}"
          :class="{invalid: errors.has('code')}"
        >
        <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <!-- 密码 和 确认密码 -->
      <div class="content">
        <label>登录密码:</label>
        <input 
          type="password"
          placeholder="请输入你的登录密码" 
          v-model="firstPassword"
          name="firstPassword" 
          v-validate="{required: true, regex: /^[0-9a-zA-Z]{8,20}$/}"
          :class="{invalid: errors.has('firstPassword')}"  
        >
        <span class="error-msg">{{ errors.first("firstPassword") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="lastPassword"
          name="lastPassword" 
          v-validate="{required: true, isSame: firstPassword}"
          :class="{invalid: errors.has('lastPassword')}"  
        >
        <span class="error-msg">{{ errors.first("lastPassword") }}</span>
      </div>
      <!-- 协议 -->
      <div class="controls">
        <input
          name="agree" 
          type="checkbox" 
          v-model="agree"
          v-validate="{required: true, 'agree': true,}"
          :class="{invalid: errors.has('agree')}"  
          @click="cahngeAgree"
        >
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagesRegister',

  data() { // 收集表单数据
    return {
      phone: '',
      //通过接口去获取验证码，因为人家的成本问题，不会发真正的验证码。（但这事本来就是后端做的，不是前端的事）
      code: '',
      firstPassword: '',
      lastPassword: '',
      agree: false,
    }
  },

  computed: {

  },

  methods: {
    cahngeAgree() {
      // this.agree == true ? false : true //XXXX
      if (this.agree == true) {
        this.agree = false
      } else {
        this.agree = true
      }
      console.log("agree:", this.agree);
    },

    //获取验证码
    async getPhoneCode() {
      // 获取验证码，必须要随便输入一个手机号才能接收到验证码（返回data）
      // this.$store.dispatch("getPhoneCode", this.phone)
      // console.log("仓库", this.$store.UserStore);  //OK
      if (this.phone != '') {
        try {
          await this.$store.dispatch("getPhoneCode", this.phone)
          console.log("getPhoneCode的返回值为成功。。这里应该有方法，但是，没有。hiahiahiahia！！！！");
        } catch (error) {
          alert(error.message)  // 失败执行本条
        }
      } else {
        alert('请输入手机号。')
      }
    },
    //注册
    async userRegister() {
      const success = await this.$validator.validateAll()  // 所有的验证都通过了,。完成后，返回一个布尔值
      // console.log(success); // 布尔值，都通过返回true,
      //表单验证后，重写:
      if (success) {
        // 解构出参数：
        const { phone, code, firstPassword, lastPassword, agree } = this;
        // 有 phone && code 且 firstPassword == lastPassword 且 agree == true 才执行派发action // 
        console.log("参数：", phone, code, firstPassword);
        let password = firstPassword;
        //--能用if就用if，这玩意起码好理解，没bug。那一大长串的 且 搞得我头大，感觉写的对，跑起来有错误
        if (phone && code && firstPassword == lastPassword && agree == true) {
          try {
            await this.$store.dispatch("FinishUserRegister", { phone, code, password })  // OK
            this.$router.push('/Login')
          } catch (error) {
            alert(error.message)  // 失败执行本条
          }
        } 
      }
    }
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>