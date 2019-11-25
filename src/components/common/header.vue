<template>
    <div class="box_center_header">
        <div class="top">
            <img src="@/assets/image/logo.png" alt="logo" @click="indexTo"/>
            <p>
                <span :class="checkType==1?'active':''" @click="check(2)">
                    <span>授课</span>
                    <span class="row"></span>
                </span>
                <span :class="checkType==2?'active':''" @click="check(1)">
                    <span>备课</span>
                    <span class="row"></span>
                </span>
            </p>
        </div>
        <div class="right" @click="changeClass">
            <img :src="avatar" alt="avatar"/>
            <span class="name">{{name}}</span>
            <span class="icon"></span>
            <div>
                <ul>
                    <span class="point"></span>
                    <li :class="tabType==1?'checked':''" @click="checkTab(1)">
                        <p :class="tabType==1?'person_check':'person'"></p>
                        <span>个人中心</span>
                    </li>
                    <li :class="tabType==2?'checked':''" @click="checkTab(2)">
                        <p :class="tabType==2?'outlogin_check':'outlogin'"></p>
                        <span @click="outLogin">退出</span>
                    </li>
                </ul>
            </div>
            
        </div>
        
    </div>
</template>
<script>
    import {setCookie} from '@/api/cookie'
    export default({
        data(){
            return{
                classType:false,
                tabType:'',
                personImgUrl:'',
                outLoginImgUrl:'@/assets/image/outlogin.png',
                avatar:'',
                name:'',
                checkType:2
            }
        },
        created() {
            if( this.$route.path=='/Topic' ){
                 this.$set(this,'checkType',2)
                 window.localStorage.setItem('tabNum',2)
            }else{
                if(window.localStorage.getItem('tabNum')){
                    this.$set(this,'checkType',window.localStorage.getItem('tabNum'))
                }
            }
            this.$set(this,'avatar',window.localStorage.getItem('avatar'))
            this.$set(this,'name',window.localStorage.getItem('name'))
        },
        beforeDestroy(){},
        methods:{
            changeClass(){
                this.$set(this,'classType',!this.classType)
            },
            indexTo(){
                this.$router.push({'path':'/Topic'})
            },
            outLogin(){
                setCookie('token','1',{expires:-1,path:"/"})
                window.localStorage.setItem('tabNum',1)
                window.localStorage.setItem('name','')
                window.localStorage.setItem('avatar','')
                window.localStorage.setItem('userId','')
                this.$router.push({'path':'/'})  
            },
            personalTo(){
                this.$router.push({'path':'/Topic/personal'})
            },
            checkTab(num){
                this.$set(this,'classType',false)
                this.$set(this,'tabType',num)
                if( num==1 ){
                    this.personalTo()
                }else{
                    this.outLogin()
                }
            },
            check(num){
                this.$set(this,'checkType',num)
                window.localStorage.setItem('tabNum',num)
                if( num==2 ){
                    this.$router.push({'path':'/Topic'})
                }else{
                    this.$router.push({'path':'/Topic/course'})
                }
            }
        }
        
    })
</script>
<style lang="scss" scoped>
    .box_center_header{
        flex-grow: 0;
        padding: 0 10px;
        width: 100%;
        height: 80px;
        background:#f39926;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .top{
           display: flex;
           flex-direction: row;
           align-items:flex-end;
            span{
                font-size:20px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
            }
            p{
                margin-left: 76px;
                width: 124px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                span{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .row{
                        width: 40px;
                        height: 3px;
                        background: #fff;
                        margin-top: 6px;
                    }
                }
                .active{
                    span{
                        color:white;
                    }
                    .row{
                        display: none;
                    }
                }
            }   
        }
        ul{
            // display: none;
            position: absolute;
            right: 0px;
            top: 95px;
            min-width: 123px;
            background: #fff;
            z-index: 1000000;
            box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
            border-radius:2px;
            padding: 5px 0;
            .point{
                display: inline-block;
                width:15px;
                height: 11px;
                position: absolute;
                top: -11px;
                left: 55px;
                background: url('./../../assets/image/point.png') no-repeat;
            }
            li{
                padding: 15px 15px 19px 15px;
                display: flex;
                flex-direction: row;
                align-items: center;
                color:#333;
                cursor: pointer;
                p{
                    width: 16px;
                    height: 18px;
                }
                .person{
                    background: url('./../../assets/image/person.png') no-repeat;
                    background-size: 16px 18px;
                }
                .outlogin{
                    background: url('./../../assets/image/outlogin.png') no-repeat;
                    background-size: 16px 18px;
                }
                span{
                    font-size:16px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    margin-left: 10px;
                }
                .person_check{
                    background: url('./../../assets/image/person_check.png') no-repeat;
                    background-size: 16px 18px;
                }
                .outlogin_eheck{
                    background: url('./../../assets/image/outlogin_check.png') no-repeat;
                    background-size: 16px 18px;
                }
            }
            li:hover{
                background: #F3F8FF;
                color: #f39926;
                .person{
                    background: url('./../../assets/image/person_check.png') no-repeat;
                    background-size: 16px 18px;
                }
                .outlogin{
                    background: url('./../../assets/image/outlogin_check.png') no-repeat;
                    background-size: 16px 18px;
                }
            }
            .checked{
                background: #F3F8FF;
                color: #f39926;
            }
        }
        img{
            width: 134px;
            height: 44px;
            cursor: pointer;
        }
        p{
            cursor: pointer;
            font-size:16px;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            line-height:22px;
        }
        // .right:hover ul{
        //     display: block;
        // }
        // ul:hover{
        //     display: block;
        // }
        .right:hover .icon{
             width: 27px;
            height: 15px;
            background: url('./../../assets/image/top.png') no-repeat;
            background-size: 17px 15px;
            background-position: center center;
         }
        .right{
            display: flex;
            flex-direction: row;
            align-items: center;
            div{
                display: bolck;
                position: absolute;
                right: 5px;
                top: 0px;
                width: 130px;
                height: 80px;
                z-index: 1000000;
                overflow: hidden;
                transition:height 0.2s ease;
            }
            div:hover{
               height: 223px;
            }
            cursor: pointer;
            img{
                width: 40px;
                height: 40px;
                margin-right: 10px;
                border-radius: 50%;
            }
            .name{
                font-size:14px;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1);
            }
            .icon{
                width: 27px;
                height: 15px;
                background: url('./../../assets/image/down.png') no-repeat;
                background-size: 7px 5px;
                background-position: center center;
            }
        }
    }
</style>
