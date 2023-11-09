
## vant 表单


### html 部分
```
 <van-form class="form" @submit="onSubmit">
            <van-field v-model="formObj.mobile" @focus="getMobile" type="number" maxlength="11" placeholder="请输入手机号"
                :rules="mobileRule" :error-message="errorMsg.mobile">
                <template v-slot:left-icon>
                    <i class="iconfont icon-shouji"></i>
                </template>
            </van-field>
            <van-cell-group>
                <van-field v-model="formObj.verification" maxlength="4" placeholder="请输入验证码" :rules="verificationRule">
                    <template v-slot:left-icon>
                        <i class="iconfont icon-yanzhengma"></i>
                    </template>
                </van-field>
                <div class="verifiCode_btn" @click="send" :disabled="disabled=!show">
                    <span v-show="show">获取验证码</span>
                    <span v-show="!show">{{count}} s</span>
                </div>
            </van-cell-group>
            <van-field v-model="formObj.password" type="password" placeholder="请输入密码" :rules="passWordRule">
                <template v-slot:left-icon>
                    <i class="iconfont icon-icon-mima"></i>
                </template>
            </van-field>
            <van-field v-model="formObj.secondPassword" type="password" placeholder="请再次输入密码" :rules="comfirmPWRule">
                <template v-slot:left-icon>
                    <i class="iconfont icon-icon-mima"></i>
                </template>
            </van-field>
            <div class="submit">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>


```


### js 部分

```
   new Vue({
            el: "#app",
            data() {
                // 手机号码验证
                    mobileRule: [{
                        required: true,
                        message: "请输入你的手机号",
                        trigger: "onBlur",
                    },
                    {
                        required: true,
                        pattern: /^1[3456789]\d{9}$/,
                        message: '请输入正确的手机号码',
                        trigger: "onBlur",
                    }],
                     verificationRule: [
                        {
                            required: true,
                            message: '请输入验证码',
                            trigger: "onBlur",
                        }, {
                            required: true,
                            pattern: /^\d{4}$/,
                            message: '验证码有误',
                            trigger: "onBlur",
                        }],

                    passWordRule: [{
                        required: true,
                        message: "请输入密码"
                    }],
                    comfirmPWRule: [{
                        required: true,
                        message: "请再次输入密码",
                        trigger: 'onBlur'
                    }, {
                        required: true,
                        message: "两次输入的密码不一致",
                        validator: this.comfirmPassWord,
                        trigger: 'onBlur'
                    }],
            },
      mthods:{
          // 确认密码的校验函数
               comfirmPassWord(value, rule) {
                    // value 是输入的值 , rule 是校验对象
                    // 返回false ，则显示rule对象中的message信息
                    if (value != this.formObj.password) {
                        return false
                    }

                },
      }      
            
   })

```