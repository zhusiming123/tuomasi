<template>
    <div class="content">
        <div class="top">
            <div>
                <div>
                    <p class="module"></p>
                    <h1>修改密码</h1>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div style="margin-top:29px;" :class="oldPassWordType?'checked':''">
                <p>输入旧密码</p>
                <i>
                    <input type="password" placeholder="" v-model="oldPassWord" @blur="chackOldPassWord"/>
                    <b :class="oldPassWordState==1?'input_true':oldPassWordState==2?'input_false':''"></b>
                </i>
                <span>{{oldPassWordErr}}</span>
            </div>
            <div :class="newPasswordType?'checked':''">
                <p>输入新密码</p>
                <i>
                    <input type="password" placeholder="" v-model="newPassword" @blur="checkNewPassword"/>
                    <b :class="newPasswordState==1?'input_true':newPasswordState==2?'input_false':''"></b>
                </i>
                <span>{{newPasswordErr}}</span>
            </div>
            <div :class="againPassWordType?'checked':''">
                <p>确认新密码</p>
                <i>
                    <input type="password" placeholder="" v-model="againPassWord" @blur="checkAgainPassWord"/>
                    <b :class="againPassWordState==1?'input_true':againPassWordState==2?'input_false':''"></b>
                </i>
                <span>{{againPassWordErr}}</span>
            </div>
            <div class="btn" @click="addMsg">提交</div>
        </div>
    </div>
</template>

<script>
import {checkPassWord,changePassWord} from '@/api/index'
import {setCookie} from '@/api/cookie'
import md5 from 'js-md5'
export default {
    data(){
        return{
            oldPassWord:'',
            newPassword:'',
            againPassWord:'',
            oldPassWordType:false,
            newPasswordType:false,
            againPassWordType:false,
            oldPassWordErr:'密码至少由6-18位个字符组成',
            newPasswordErr:'密码至少由6-18位个字符组成',
            againPassWordErr:'请再次输入密码',
            oldPassWordState:'',
            newPasswordState:'',
            againPassWordState:'',
        }
    },
    methods:{
        chackOldPassWord(){
            if( !this.oldPassWord ){
                this.$set(this,'oldPassWordErr','请输入旧密码')
                this.$set(this,'oldPassWordType',true)
                this.$set(this,'oldPassWordState',2)
            }else if(!/^([0-9]|[a-zA-Z]){6,18}$/.test(this.oldPassWord)){
                this.$set(this,'oldPassWordErr','密码长度为6-18位')
                this.$set(this,'oldPassWordType',true)
                this.$set(this,'oldPassWordState',2)
            }else{
                checkPassWord( {'oldPassword':md5(this.oldPassWord)} ).then(res=>{
                    if( res.data.errno==200 ){
                        this.$set(this,'oldPassWordErr','')
                        this.$set(this,'oldPassWordType',false)
                        this.$set(this,'oldPassWordState',1)
                    }else{
                        this.$set(this,'oldPassWordErr',res.data.error)
                        this.$set(this,'oldPassWordType',true)
                        this.$set(this,'oldPassWordState',2)
                    }
                }).catch()
            }
        },
        checkNewPassword(){
            if( !this.newPassword ){
                this.$set(this,'newPasswordErr','输入新密码')
                this.$set(this,'newPasswordType',true)
                this.$set(this,'newPasswordState',2)
            }else if(!/^([0-9]|[a-zA-Z]){6,18}$/.test(this.newPassword)){
                this.$set(this,'newPasswordErr','密码长度为6-18位')
                this.$set(this,'newPasswordType',true)
                this.$set(this,'newPasswordState',2)
            }else{
                this.$set(this,'newPasswordType',false)
                this.$set(this,'newPasswordState',1)
                this.$set(this,'newPasswordErr','')
            }
        },
        checkAgainPassWord(){
            if( !this.againPassWord ){
                this.$set(this,'againPassWordErr','输入确认密码')
                this.$set(this,'againPassWordType',true)
                this.$set(this,'againPassWordState',2)
            }else if(!/^([0-9]|[a-zA-Z]){6,18}$/.test(this.againPassWord)){
                this.$set(this,'againPassWordErr','密码长度为6-18位')
                this.$set(this,'againPassWordType',true)
                this.$set(this,'againPassWordState',2)
            }else if(this.againPassWord!=this.newPassword){
                this.$set(this,'againPassWordErr','两次密码不一致')
                this.$set(this,'againPassWordType',true)
                this.$set(this,'againPassWordState',2)
            }else{
                this.$set(this,'againPassWordType',false)
                this.$set(this,'againPassWordState',1)
                this.$set(this,'againPassWordErr','')
            }
        },
        addMsg(){
            if( !this.againPassWord&&!this.newPassword&&!this.oldPassWord ){
                this.$set(this,'oldPassWordErr','请输入旧密码')
                this.$set(this,'oldPassWordType',true)
                this.$set(this,'oldPassWordState',2)
                this.$set(this,'newPasswordErr','输入新密码')
                this.$set(this,'newPasswordType',true)
                this.$set(this,'newPasswordState',2)
                this.$set(this,'againPassWordErr','输入确认密码')
                this.$set(this,'againPassWordType',true)
                this.$set(this,'againPassWordState',2)
            }else if(!this.againPassWord){
                this.$set(this,'againPassWordErr','输入确认密码')
                this.$set(this,'againPassWordType',true)
                this.$set(this,'againPassWordState',2)
            }else if(!/^([0-9]|[a-zA-Z]){6,18}$/.test(this.newPassword)){
                this.$set(this,'newPasswordErr','密码长度为6-18位')
                this.$set(this,'newPasswordType',true)
                this.$set(this,'newPasswordState',2)
            }else if(this.againPassWord!=this.newPassword){
                this.$set(this,'againPassWordErr','两次密码不一致')
                this.$set(this,'againPassWordType',true)
                this.$set(this,'againPassWordState',2)
            }else{
                changePassWord({'oldPassword':md5(this.oldPassWord),'newPassword':md5(this.newPassword)}).then(res=>{
                    if(res.data.errno==200){
                         setCookie('token','',{expires:-1,path:"/"})
                         setTimeout(()=>{
                              this.$router.push({'path':'/'})
                         },0)
                    }
                }).catch()
            }
        }
    }
}
</script>

<style scoped lang='scss'>
    .content{
        padding-top:20px;
        
        .module{
            width: 5px;
            height: 25px;
            background: #f39926;
            margin-right: 22px;
        }
        .top{
            div{
                div{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    h1{
                        font-size:20px;
                        font-family:PingFangSC-Medium;
                        color:rgba(51,51,51,1);
                    }
                }
            }
        }
        .bottom{
            display: flex;
            flex-direction: column;
            align-items: center;
            div{
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                i{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                    b{
                        position: absolute;
                        right: -30px;
                        top:12px;
                        display: none;
                    }
                    .input_true{
                        width: 20px;
                        height: 20px;
                        margin-left: 10px;
                        background: url('./../../assets/image/input_true.png') no-repeat;
                        background-size: 20px 20px;
                        background-position: center center;
                        display: inline-block;
                    }
                    .input_false{
                        width: 20px;
                        height: 20px;
                        margin-left: 10px;
                        background: url('./../../assets/image/input_false.png') no-repeat;
                        background-size: 20px 20px;
                        background-position: center center;
                        display: inline-block;
                    }
                }
            }
            p{
                font-size:18px;
                font-family:PingFangSC-Regular;
                color:rgba(51,51,51,1);
                margin-bottom: 10px;
            }
            input{
                border-radius:2px;
                border:1px solid rgba(189,189,189,1);
                width:283px;
                height: 42px;
                padding: 11px 0 14px 13px;
                font-size:14px;
                font-family:PingFangSC-Medium;
                color:rgba(51,51,51,1);
            }

            .checked span{
                color: #FF5921;
            }
            .checked input{
                border:1px solid rgba(255,89,33,1);
            }
            span{
                font-size:12px;
                font-family:PingFangSC-Regular;
                color:rgba(189,189,189,1);
                margin-top: 12px;
            }
            .btn{
                background:#f39926;
                box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                text-align: center;
                line-height: 44px;
                width: 283px;
                height: 44px;
                color:#fff;
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:rgba(255,255,255,1);
                cursor: pointer;
                border-radius: 26px;
                margin-top: 40px;
            }
        }
    }
</style>
