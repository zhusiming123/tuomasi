<template>
    <div class="box_getPassWordThree">
        <div class="true"><Icon color="#f39926" size='26' type="checkmark"></Icon></div>
        <p>
            <span>密码重置成功，<span>{{countDown}}</span> 秒后自动跳转至登录页面</span>
            <span>点击下方按钮直接跳转至登录页</span>
        </p>
        <div class="login" @click="login">返回登录</div>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex'
    export default{
        data(){
            return{
                countDown:3
            }
        },
        created(){
            this.changeSteps(3)
            const T = setInterval(()=>{
                if( this.countDown>1 ){
                    this.$set(this,'countDown',this.countDown-1)
                }else{
                    this.$router.go(-3)
                    clearInterval(T)
                }
                
            },1000)
        },
        methods:{
            ...mapMutations(['changeSteps']),
            login(){
                this.$router.go(-3)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .box_getPassWordThree{
        margin-top: 84px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .true{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background:rgba(241,243,249,1);
            margin-bottom: 39px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
        }
        p{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40px;
            span{
                font-size:16px;
                color: #333;
                span{
                    color: #FF5921;
                }
            }
        }
        .login{
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
    }
</style>
