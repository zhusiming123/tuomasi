<template>
    <div class="box_getPassWordOne">
        <form id="user_login" action="">
            <input class="phone" placeholder="请输入已注册用户手机号" type="number" v-model="phone" @blur="checkPhone"/>
            <span>{{phoneErrorMsg?phoneErrorMsg:''}}</span>
            <div class="center">
                <input class="code" placeholder="请输入手机验证码" type="number" v-model="code" @blur="checkCode"/>
                <p :class="sendType?'sendCode':''" @click="getCode">{{sendType?time+'s':'获取手机验证码'}}</p>
            </div>
            <span>{{codeErrorMsg?codeErrorMsg:''}}</span>
            <div class="next" @click="next">下一步</div>
            <p class="login" @click="login">去登录</p>
        </form>
    </div>
</template>
<script>
    import {sendCode,checkCode,checkPhone} from '@/api/index'
    import {mapMutations} from 'vuex'
    export default({
        data(){
            return{
                nextType:false,
                time:60,
                sendType:false,
                phone:'',
                code:'',
                phoneErrorMsg:'',
                codeErrorMsg:''
            }
        },
        methods:{
            ...mapMutations(['changeSteps']),
            //返回登录
            login(){
                this.$router.go(-1)
            },
            //验证手机号
            checkPhone(){
                if(!this.phone.replace(/^\s+|\s+$/g, '')){
                    this.$set(this,'phoneErrorMsg','请输入手机号')
                    this.$set(this,'nextType',false)
                }else if(!/^1[3|4|5|6|7|8][0-9]{9}$/.test(this.phone.replace(/^\s+|\s+$/g, ''))){
                    this.$set(this,'phoneErrorMsg','请输入正确的手机号')
                    this.$set(this,'nextType',false)
                }else{
                    this.$set(this,'phoneErrorMsg','')
                    this.$set(this,'nextType',true)
                    // checkPhone({'phone':this.phone}).then(res=>{
                    //     if(res.data.errno==200){
                    //         this.$set(this,'phoneErrorMsg','')
                    //         this.$set(this,'nextType',true)
                    //     }else{
                    //         this.$set(this,'nextType',false)
                    //         this.$set(this,'phoneErrorMsg','未匹配的手机号')
                    //     }
                    // }).catch()
                }
            },
            next(){
                if( this.nextType ){
                    checkCode({'phone':this.phone,'validateCode':this.code}).then(res=>{
                        if( res.data.errno==200 ){
                            window.sessionStorage.setItem('phone',this.phone)
                            window.sessionStorage.setItem('code',this.code)
                            this.$router.push({'path':'/GetPassWord/GetPassWordTwo','query':{}})
                        }else{
                            this.$set(this,'codeErrorMsg',res.data.error)
                        }
                    }).catch()
                }
            },
            //验证验证码
            checkCode(){ 
                if( this.code.length!=4 ){
                    this.$set(this,'codeErrorMsg','请输入4位验证码')
                    this.$set(this,'nextType',false)
                }else{
                    this.$set(this,'nextType',true)
                    this.$set(this,'codeErrorMsg','')
                }
            },
            //获取验证码
            getCode(){
                if(!this.phone.replace(/^\s+|\s+$/g, '')){
                    this.$set(this,'phoneErrorMsg','请输入手机号')
                    this.$set(this,'nextType',false)
                }else if(!/^1[3|4|5|6|7|8][0-9]{9}$/.test(this.phone.replace(/^\s+|\s+$/g, ''))){
                    this.$set(this,'phoneErrorMsg','请输入正确的手机号')
                    this.$set(this,'nextType',false)
                }else{
                    // checkPhone({'phone':this.phone}).then(res=>{
                    //     if(res.data.errno==200){
                    //         this.$set(this,'phoneErrorMsg','')
                    //         this.$set(this,'nextType',true)
                            //获取验证码
                            if( !this.sendType ){
                                this.$set(this,'sendType',true)
                                sendCode({'phone':this.phone}).then(res=>{
                                    if( res.data.errno!=200 ){
                                        this.$set(this,'sendType',false)
                                        if(res.data.errno==1006){
                                            this.$set(this,'codeErrorMsg','输入的手机有误')
                                        }if(res.data.errno==1007){
                                             this.$set(this,'codeErrorMsg','距离上次发送不足60s，请勿重复操作')
                                        }
                                    }else{
                                        this.countDown()
                                    }
                                }).catch()
                            }
                    //     }else{
                    //         this.$set(this,'nextType',false)
                    //         this.$set(this,'phoneErrorMsg','未匹配的手机号')
                    //     }
                    // }).catch()
                }
                if(this.nextType){
                    
                }
                
            },
            //获取验证码倒计时
            countDown:function(){
                const Time = setInterval(()=>{
                    this.$set(this,'time',this.time-1)
                    if( this.time<1 ){
                        clearInterval(Time)
                        this.$set(this,'time',60)
                        this.$set(this,'sendType',false)
                    }
                },1000)
            }
        },
        created() {
            this.changeSteps(1)
        },
    })
</script>
<style lang="scss" scoped>
    .box_getPassWordOne{
        margin-top: 84px;
        form{
            display: flex;
            flex-direction: column;
        }
        span{
            display: inline-block;
            height: 36px;
            padding: 12px 0;
            font-size:12px;
            font-family:PingFangSC-Regular;
            color:rgba(255,89,33,1);
            line-height: 12px;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type="number"]{
            -moz-appearance: textfield;
        }
        input::-webkit-input-placeholder {
            font-size:14px;
            font-family:PingFangSC-Medium;
            color:rgba(189,189,189,1);
        }
        input:-moz-placeholder {
            font-size:14px;
            font-family:PingFangSC-Medium;
            color:rgba(189,189,189,1);
        }
        input:-ms-input-placeholder {
            font-size:14px;
            font-family:PingFangSC-Medium;
            color:rgba(189,189,189,1);
        }
        input{
            border-radius:2px;
            border:1px solid rgba(189,189,189,1);
            color: #333;
        }
        .phone{
            border:1rpx solid #BDBDBD;
            width: 329px;
            height: 44px;
            font-size:14px;
            font-family:PingFangSC-Medium;
            padding: 11px 0 11px 14px;
            box-sizing: border-box;
        }
        .center{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            input{
                border:1rpx solid #BDBDBD;
                width: 179px;
                height: 44px;
                font-size:14px;
                font-family:PingFangSC-Medium;
                padding: 11px 0 11px 14px;
                box-sizing: border-box;
            }
            p{
                width: 139px;
                height: 44px;
                text-align: center;
                line-height: 42px;
                border:1px solid #f39926;
                font-size:14px;
                font-family:PingFangSC-Medium;
                color:#f39926;
                border-radius:2px;
                cursor: pointer;
            }
            .sendCode{
                border:1px solid rgba(191,191,191,1);
                font-size:14px;
                font-family:PingFangSC-Medium;
                color:rgba(191,191,191,1);
            }
        }
        .next{
            width:329px;
            height:44px;
            background:#f39926;
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:26px;
            text-align: center;
            line-height: 44px;
            color: #fff;
            font-size:18px;
            font-family:PingFangSC-Medium;
            margin-top: 8px;
            cursor: pointer;
        }
        .login{
            width: 100%;
            text-align: center;
            margin-top: 20px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:#f39926;
            cursor: pointer;
        }
    }
</style>
