<template>
    <div class="login">
        
        <!-- <Modal v-model="modal" @on-ok='ok' @on-cancel='cancel'  title="温馨提示：">
            <div style="font-size:14px;font-weight:bold">是否进入灰度版本？</div>
        </Modal> -->
        <div class="login_left">
            <div class="login_left_top"></div>
            <div class="login_left_center"></div>
        </div>
        <div class="login_middle">
            <div class="login_top">
                <div class="top_box">
                    <img src="../assets/img/logo.png" alt="logo">
                </div>
            </div>
            <div class="login_center">
                <div class="center_box">
                    <div></div>
                    <div class="login_box">
                        <p>登录校果双师</p>
                        <span class="remind" v-show="remindStatus"><Icon type="close-circled" size="24"></Icon>{{errMsg}}</span>
                        <span class="input_title">用户名</span>
                        <input type="text" placeholder="输入用户名" v-model="phoneNumber"/>
                        <span class="input_title">密码</span>
                        <input type="password" placeholder="输入密码" v-model="passWord" @keyup.enter="LoginTo"/>
                        <span class="input_title" v-show="codeStatus">验证码</span>
                        <div class="code_msg" v-if="codeStatus">
                            <input type="text" v-model="codeNumber"/>
                            <img class="code_img" @click="refreshCode" :src="codeImage+'/jiaowu/user/unauth/brace/login/getValidateCode?time='+time" alt="验证码"/>
                        </div>
                        <div class="msg">
                            <div class="get_pw" @click="checkSave">
                                <span class="checkbox"><Icon v-show="checkType" color="#4A90E2" type="checkmark"></Icon></span>
                                <span>7天免登录</span>
                            </div>
                            <p class="forget" @click="forgetPassWord">忘记密码?</p>
                        </div>
                        <div class="button" @click="LoginTo" name="Loyon">登录</div>
                    </div>
                </div>
            </div>
            <div class="login_bottom">备案号：京ICP备16052324号-3</div>
        </div>
        <div class="login_right">
            <div class="login_right_top"></div>
            <div class="login_right_center"></div>
        </div>
    </div>

</template>
<script>
    import {Login,getPersonMsg,gray} from './../api/index'
    import {codeImage} from '@/api/axios'
    import md5 from 'js-md5'
    import {mapMutations } from "vuex"
    import {setCookie} from '@/api/cookie'
    import pac from './../../package.json'

    export default{
        data(){
            return{
                checkType:false,
                remindStatus:false,
                codeStatus:false,
                errNumber:0,
                phoneNumber:'',
                passWord:'',
                codeNumber:'',
                time:'',
                errMsg:'',
                codeImage:codeImage,
                modal:false
            }
        },
        components:{},
        beforeCreate(){},
        created(){
            if(setCookie('token')=='null'||!setCookie('token')||setCookie('token')==null){
            }else{
                this.$router.push({'path':'/Topic'})
            }
            this.$set(this,'time',new Date().getTime()+JSON.stringify(Math.random()))
            if(window.localStorage.getItem('checkType')){
                this.$set(this,'checkType',eval(window.localStorage.getItem('checkType')))
            }
        },
        methods:{
            // ok(){
            //     if(window.location.pathname!='/gray/'){
            //         window.location.href = window.location.origin+'/gray'
            //     }else{
            //         this.$router.push({'path':'Topic','query':{'tabType':2}})
            //     }
            // },
            // cancel(){
            //     if(window.location.pathname!='/gray/'){
            //         this.$router.push({'path':'Topic','query':{'tabType':2}})
            //     }else{
            //          window.location.href = window.location.origin
            //     }
            // },
            ...mapMutations(['changeContent']),
            //切换7天免登录
            checkSave(){
                this.$set(this,'checkType',!this.checkType)
            },
            //忘记密码
            forgetPassWord(){
                this.$router.push({'path':'/GetPassWord'})
            },
            //验证码刷新时间戳
            refreshCode(){
                this.$set(this,'time',new Date().getTime()+JSON.stringify(Math.random()))
            },
            //登录正则
            LoginTo(){
                if( !this.phoneNumber.replace(/^\s+|\s+$/g, '') ){
                    this.$set(this,'remindStatus',true)
                    this.$set(this,'errMsg','请输入用户名')
                }else if(!this.passWord.replace(/^\s+|\s+$/g, '')){
                    this.$set(this,'remindStatus',true)
                    this.$set(this,'errMsg','请输入密码')
                }else{
                    if( this.errNumber>=2 ){
                        if( !this.codeNumber.replace(/^\s+|\s+$/g,'') ){
                            this.$set(this,'remindStatus',true)
                            this.$set(this,'errMsg','请输入验证码')
                        }else{
                            this.sendLoginMsg()
                        }
                    }else{
                        this.sendLoginMsg()
                    }
                }
            },
            //发送登录信息
            sendLoginMsg(){
                const json = {'type':0,'userName':this.phoneNumber,'validate':this.codeNumber,'passWord':md5(this.passWord),'time':this.time}
                Login(json).then(res=>{
                    if( res.data.errno==200 ){
                        window.localStorage.setItem('avatar',res.data.data.head)
                        window.localStorage.setItem('name',res.data.data.name)
                        window.localStorage.setItem('checkType',this.checkType)
                        window.localStorage.setItem('userId',res.data.data.userId)
                        window.localStorage.setItem('tenantKey',res.data.data.tenantKey)
                        setCookie('token',res.headers.authorization,{expires:24*60*7,path:"/"})
                        this.changeContent(1)
                        this.$router.push({'path':'Topic','query':{'tabType':2}})
                        // gray({}).then((res)=>{
                        //     if( res.data.code==1 ){
                        //         this.modal = true
                        //     }else{
                        //         if(window.location.pathname!='/gray/'){
                        //             this.$router.push({'path':'Topic','query':{'tabType':2}})
                        //         }else{
                        //             window.location.href = window.location.origin
                        //         }
                        //     }
                        // })
                    }else{
                        this.$set(this,'remindStatus',true)
                        this.$set(this,'errMsg',res.data.error)
                        if( res.data.num>2 ){
                            this.$set(this,'errNumber',res.data.num)
                            this.$set(this,'codeStatus',true)
                            this.$set(this,'codeNumber','')
                            this.$set(this,'time',new Date().getTime()+JSON.stringify(Math.random()))
                        }
                    }
                }).catch(res=>{
                })
            }
        },
        mounted(){}
    }
</script>
<style scoped lang='scss'>
    .login{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        font-family:PingFangSC-Medium;
        .login_left{
            flex-shrink: 1;
            flex-grow: 1;
            .login_left_top{
                height: 80px;
            }
            .login_left_center{
                height: 640px;
                background: #1684e6;
            }
        }
        .button{
            width:283px;
            height:44px;
            background:#f39926;
            box-shadow:0 2px 4px 0 #f39926;
            border-radius:2px;
            font-size:18px;
            color:rgba(255,255,255,1);
            line-height: 44px;
            text-align: center;
            font-size:18px;
            font-family:PingFangSC-Medium;
            color:rgba(255,255,255,1);
            cursor: pointer;
            margin-top: 6px;
        }
        .login_right{
            flex-shrink: 1;
            flex-grow: 1;
            .login_right_top{
                height: 80px;
            }
            .login_right_center{
                height: 640px;
                background:#1684e6;
            }
        }
        .login_middle{
            flex-grow: 0;
            width: 100%;
            max-width: 1920px;
            min-width: 1200px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            .login_top{
                width: 100%;
                height: 80px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                .top_box{
                    width: 1200px;
                }
                img{
                    width: 142px;
                    height: 48px;
                }
            }
            .login_center{
                height: 640px;
                width:100%;
                background: url('./../assets/img/bg.jpg') no-repeat center center;
                background-size: auto auto;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                .center_box{
                    width: 1200px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                }
                .login_box{
                    padding: 48px;
                    background: #fff;
                    border-radius:6px;
                    display: flex;
                    flex-direction: column;
                    box-shadow:0px 10px 13px 0px rgba(40,103,165,0.35);
                    .remind{
                        width: 281px;
                        height: 41px;
                        background:rgba(254,237,236,1);
                        border-radius:2px;
                        border:1px solid rgba(241,86,50,1);
                        line-height: 41px;
                        margin-bottom: 19px;
                        font-size:14px;
                        font-family:PingFangSC-Medium;
                        color:rgba(241,86,50,1);
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        i{
                          margin: 0 5px 0 15px;
                        }
                    }
                    .code_msg{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        input{
                            width: 130px;
                            height: 44px;
                        }
                        .code_img{
                            width: 128px;
                            height: 44px;
                            display: inline-block;
                            border-radius: 2px;
                            margin-top:8px;
                            text-align: center;
                            line-height: 44px;
                            color:#fff;
                            cursor: pointer;
                        }
                    }
                    .msg{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom:10px;
                        margin-top: 10px;
                        p{
                            cursor:pointer;
                            font-size:14px;
                            color:#f39926;
                            margin-bottom: 0;
                        }
                        .get_pw{
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            font-size:14px;
                            color:rgba(189,189,189,1);
                            cursor: pointer;
                            .checkbox{
                                display: inline-block;
                                width:14px;
                                height:14px;
                                border-radius:2px;
                                border:1px solid rgba(189,189,189,1);
                                position: relative;
                                margin-right: 10px;
                                i{
                                    position: absolute;
                                    left: 1px;
                                    top:0px;
                                }
                            }
                        }
                    }
                    p{
                        font-size:24px;
                        color:rgba(51,51,51,1);
                        margin-bottom: 36px;
                    }
                    .input_title{
                        font-size:18px;
                        color:rgba(51,51,51,1);
                    }
                    input{
                        width:283px;
                        height:44px;
                        border-radius:2px;
                        border:1px solid rgba(189,189,189,1);
                        margin:8px 0 18px 0;
                        font-size: 14px;
                        padding-left: 14px;
                    }
                }
            }
            .login_bottom{
                margin-top: 14px;
                text-align: center;
                color:#f39926;
                font-size:14px;
            }
        }
        
    }
    button{
        margin-top:30px;
        cursor: pointer;
        outline: none;
    }
</style>
