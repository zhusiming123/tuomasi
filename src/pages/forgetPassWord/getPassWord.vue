<template>
    <div class="login">
       <div class="login_top">
            <div class="top_box">
                <img src="./../../assets/image/slogen.png" alt="logo">
            </div>
        </div>
        <div class="login_middle">
            <div class="login_center">
                <div class="center_box">
                    <p class="title">忘记密码</p>
                    <Steps/>
                    <router-view></router-view>
                </div>
            </div>
            <div class="login_bottom">备案号：京ICP备16052324号-3</div>
        </div>
    </div>
</template>
<script>
    import {Login} from './../../api/index'
    import {codeImage} from '@/api/axios'
    import {mapMutations } from "vuex"
    import Steps from '@/components/common/steps.vue'
    export default({
        data(){
            return{

            }
        },
        components:{Steps}
    })
</script>
<style scoped lang='scss'>
   .login{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-family:PingFangSC-Medium;
        
        .login_top{
            width: 100%;
            height: 80px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            .top_box{
                width: 1200px;
            }
            img{
                width: 142px;
                height: 48px;
            }
        }
        .login_middle{
            flex-grow: 0;
            width: 100%;
            min-width: 1200px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .login_center{
                width:100%;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                .center_box{
                    margin-top:30px;
                    width:1200px;
                    height:690px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 0 15px 6px rgba(205,212,225,0.2);
                    border-radius:4px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .title{
                        font-size:24px;
                        font-family:PingFangSC-Medium;
                        color:rgba(51,51,51,1);
                        line-height:33px;
                        margin-top: 36px;
                    }
                }
            }
            .login_bottom{
                margin-top: 20px;
                font-size:14px;
                font-family:PingFangSC-Medium;
                color:rgba(153,153,153,1);
                line-height:20px;
                text-align: center;
            }
        }
        
    }
    button{
        margin-top:30px;
        cursor: pointer;
        outline: none;
    }
</style>
