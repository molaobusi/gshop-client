<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginType}" @click="loginType=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginType}"  @click="loginType=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginType}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!checkPhone" class="get_verification"
                      :class="{check_phone: checkPhone}" @click.prevent="getCode">
                {{computedTime ? `已发送(${computedTime}s)` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginType}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="showPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="showPwd ? 'right' : ''"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                     @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-zuojiantou"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="isAlert" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/alertTip/AlertTip'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api/index'
  export default {
    name: 'Login',
    components: {
      AlertTip
    },
    data() {
      return {
        loginType: true, // true: 表示短信登录方式； false: 表示用户名/密码登录方式
        computedTime: 0, // 倒计时时间，单位秒
        showPwd: false, // 是否明文显示密码
        phone: '', // 手机号
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图形验证码
        isAlert: false, // 是否弹出自定义的Alert警告框
        alertText: 'xxx' // 警告框内容
      }
    },
    computed: {
      checkPhone() {
        return /^1\d{10}$/.test(this.phone) && this.computedTime === 0
      }
    },
    methods: {
      // 异步获取验证码接口
      async getCode() {
        // 启动倒计时
        if (!this.computedTime) {
          this.computedTime = 30
          this.intervalId = setInterval(() => {
            this.computedTime--
            if (this.computedTime <= 0) {
              clearInterval(this.intervalId)
            }
          }, 1000)

          // 发送ajax请求(获取验证码接口)
          const result = await reqSendCode(this.phone)
          if (result.code === 1) {
            this.showAlert(result.msg)
            if (this.computedTime) {
              this.computedTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }
      },
      // 登录接口
      async login() {
        let result
        // 前端表单验证
        if (this.loginType) { // 短信登录方式
          const {phone, code} = this
          // 手机号格式不正确
          if (!(/^1\d{10}$/.test(this.phone))) {
            this.showAlert('手机号格式不正确')
            return
          } else if (!(/^\d{6}$/.test(code))) {
            this.showAlert('验证码必须为6位数字')
            return
          }
          result = await reqSmsLogin(phone, code)
        } else { // 用户名/密码登录方式
          const {name, pwd, captcha} = this
          // 用户名不能为空
          if (!name) {
            this.showAlert('用户名不能为空')
            return
          } else if (pwd.length < 6 || pwd.length > 20) {
            this.showAlert('密码必须是6到20位')
            return
          } else if (!captcha) {
            this.showAlert('图形验证码不能为空')
            return
          }
          result = await reqPwdLogin({name, pwd, captcha})
        }

        if (result.code === 0) {
          this.$store.dispatch('saveUserInfo', result.data)
          this.$router.replace('/person')
        } else {
          this.getCaptcha()
          this.showAlert(result.msg)
        }

        if (this.computedTime) {
          this.computedTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      },
      // 显示警告框方法
      showAlert(alertText) {
        this.isAlert = true
        this.alertText = alertText
      },
      // 关闭警告框方法
      closeTip() {
        this.isAlert = false
        this.alertText = ''
      },
      // 获取图形验证码方法
      getCaptcha() {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.check_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(26px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
