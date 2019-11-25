<template>
    <div class="box_getPassWordTwo">
        <input type="password" placeholder="请输入新密码" v-model="password" @blur="checkPassWord"/>
        <span>{{passwordMsg?passwordMsg:''}}</span>
        <input type="password" placeholder="请重新输入新密码" @blur="checkPassWordAgain" v-model="passwordAgain"/>
        <span>{{passwordAgainMsg?passwordAgainMsg:''}}</span>
        <div class="reset" @click="reset">重置密码</div>
        <p class="login" @click="login">去登录</p>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex'
    import {resetPassWord} from '@/api/index'
      import {setCookie} from '@/api/cookie'
    import md5 from 'js-md5'
    export default({
        data(){
            return{
                passwordAgain:'',
                password:'',
                passwordMsg:'',
                passwordAgainMsg:''
            }
        },
        created() {
            this.changeSteps(2)
        },
        methods:{
            ...mapMutations(['changeSteps']),
            login(){
                this.$router.go(-2)
            },
            checkPassWord(){
                if( this.password=='' ){
                    this.$set(this,'passwordMsg','输入新密码')
                }else if( !/^([0-9]|[a-zA-Z]){6,18}$/.test(this.password) ){
                    this.$set(this,'passwordMsg','密码长度为6-18位')
                }else{
                    this.$set(this,'passwordMsg','')
                }
            },
            checkPassWordAgain(){
                if(this.passwordAgain==''&&this.password==''){
                    this.$set(this,'passwordMsg','输入新密码')
                }else if( this.password!=this.passwordAgain ){
                    this.$set(this,'passwordAgainMsg','两次密码不一致')
                }else{
                    this.$set(this,'passwordAgainMsg','')
                }
            },
            reset(){
                if(this.password==''&&this.passwordAgain==''){
                    this.$set(this,'passwordMsg','输入新密码')
                }else if( !/^([0-9]|[a-zA-Z]){6,18}$/.test(this.password)){
                    this.$set(this,'passwordMsg','密码长度为6-18位')
                }else if(this.password!=this.passwordAgain){
                    this.$set(this,'passwordAgainMsg','两次密码不一致')
                }else{
                    resetPassWord({'validateCode':window.sessionStorage.getItem('code'),'phone':window.sessionStorage.getItem('phone'),'newPassword':md5(this.password)}).then(res=>{
                        if( res.data.errno==200 ){
                            setCookie('token','1',{expires:-1,path:"/"})
                            this.$router.push({'path':'/GetPassWord/GetPassWordThree'})
                        }else{
                            this.$router.go(-1) 
                        }
                    }).catch()
                }
            }
        }
    })
</script>
<style lang="scss" scoped>
    .box_getPassWordTwo{
        display: flex;
        flex-direction: column;
        margin-top: 84px;
        span{
            display: inline-block;
            height: 36px;
            padding: 12px 0;
            font-size:12px;
            font-family:PingFangSC-Regular;
            color:rgba(255,89,33,1);
            line-height: 12px;
        }
        input{
            width:329px;
            height:44px;
            border-radius:2px;
            border:1px solid rgba(189,189,189,1);
            padding: 11px 0 11px 14px;
            font-size:14px;
            color:#333;
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
        div{
            width: 329px;
            height: 44px;
            text-align: center;
            line-height: 42px;
            font-size:18px;
            font-family:PingFangSC-Medium;
            color:rgba(255,255,255,1);
            background: #f39926;
            border-radius: 26px;
            margin-top: 8px;
            cursor: pointer;
        }
        p{
            width: 100%;
            text-align: center;
            margin-top: 20px;
            color: #f39926;
            cursor: pointer;
            font-size: 14px;
        }
    }
     
</style>
