<template>
    <div class="box_personal">
        <div class="left">
            <img :src="avatar" alt="avatar"/>
            <p class="name">{{name}}</p>
            <ul>
                <li :class="tabType==1?'person_check':'person'" @click="change('/Topic/personal',1)" ><span>个人信息</span></li>
                <li :class="tabType==2?'password_check':'password'"  @click="change('/Topic/personal/changePassWord',2)"><span>修改密码</span></li>
            </ul>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tabType:1,
                avatar:'',
                name:''
            }
        },
        created(){
            this.$set(this,'avatar',window.localStorage.getItem('avatar'))
            this.$set(this,'name',window.localStorage.getItem('name'))
        },
        methods:{
            change(name,num){
                this.$router.replace({'path':name})
                this.$set(this,'tabType',num)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .box_personal{
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        padding: 20px 20px 60px 20px;
        flex-grow: 1;
        .left{
            width: 170px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px;
            p{
                font-size:14px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
            }
            img{
                width: 100px;
                height: 100px;
                margin-bottom: 10px;
                margin-top: 20px;
                border-radius: 50%;
            }
            ul{
                width: 100%;
                margin-top: 20px;
                li{
                    width: 100%;
                    padding: 17px 0;
                    font-size:16px;
                    font-family:PingFangSC-Medium;
                    color:rgba(51,51,51,1);
                    cursor: pointer;
                    span{
                        padding-left: 46px;
                        display: inline-block;
                        width: 100%;
                    }
                }
                .person_check{
                    background: #F3F8FF;
                }
                .password_check{
                    background: #F3F8FF;
                }
                .person span{
                    background: url('./../../assets/image/personal.png') no-repeat;
                    background-position: 20px center;
                    background-size: 16px 18px;
                }
                .password span{
                    background: url('./../../assets/image/password.png') no-repeat;
                    background-position: 20px center;
                    background-size: 16px 18px;
                }
                .person_check span{
                    background: url('./../../assets/image/personal_check.png') no-repeat;
                    background-position: 20px center;
                    background-size: 16px 18px;
                    color: #f39926;
                }
                .password_check span{
                    background: url('./../../assets/image/password_check.png') no-repeat;
                    background-position: 20px center;
                    background-size: 16px 18px;
                    color: #f39926;
                }
            }
        }
        .right{
            width: 969px;
            background: #fff;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px;
        }
    }
</style>


