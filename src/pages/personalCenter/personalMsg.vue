<template>
    <div class="content">
        <div class="top">
            <div>
                <div>
                    <p class="module"></p>
                    <h1>个人信息</h1>
                </div>
                <ul>
                    
                    <li>
                        <p>姓 名：</p>
                        <span>{{msg.name}}</span>
                    </li>
                    <li>
                        <p>性 别：</p>
                        <span>{{msg.sex==0?'男':'女'}}</span>
                    </li>
                    <li>
                        <p>教授科目：</p>
                        <b v-for="item in msg.subjectsTag" key="index">{{item.name}}</b>
                    </li>
                    <li>
                        <p>教授年级：</p>
                        <b v-for="item in msg.gradesTag"  key="index">{{item.name}}</b>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom">
            <div>
                <div class="title">
                    <p class="module"></p>
                    <h1>个人简介</h1>
                </div>
                <div id="default" v-if="defaultType">
                    <img src="./../../assets/image/null.png" alt=""/>
                    <span>暂无个人简介内容~</span>
                </div>
                <div class="resourse">
                    <div class="step">
                    </div>
                    <div class="list">
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPersonMsg} from '@/api/index'
    export default{
        data(){
            return{
                msg:{},
                defaultType:false
            }
        },
        methods:{
            //获取个人信息详情
            getMsg(){
                getPersonMsg().then(res=>{
                    if( res.data.errno==200 ){
                        res.data.data.grade = res.data.data.grade.split(',')
                        res.data.data.subjects = res.data.data.subjects.split(',')
                        this.$set(this,'msg',res.data.data)
                        if( res.data.data.synopsis!='' ){
                            this.$set(this,'defaultType',false)
                            document.getElementsByClassName('list')[0].children[0].innerHTML = res.data.data.synopsis
                        }else{
                            this.$set(this,'defaultType',true)
                        }
                    }
                }).catch()
            }
        },  
        created(){
            this.getMsg()
        }
    }
</script>
<style lang="scss" scoped>
    .content{
        padding-top:20px;
        .module{
            width: 5px;
            height: 25px;
            background: #f39926;
            margin-right: 22px;
        }
        h1{
            font-size:20px;
            font-family:PingFangSC-Medium;
            color:#f39926;
        }
        #default{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 108px;
            span{
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(126,139,154,1);
            }
        }
        ul{
            margin-left: 27px;
            li{
                display: flex;
                flex-direction: row;
                margin-top:18px;
                p{
                    width: 95px;
                    justify-content: space-between;
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    color:rgba(126,139,154,1);
                }
                span{
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    color:rgba(51,51,51,1);
                }
                b{
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    color:rgba(51,51,51,1);
                    padding: 2px 10px;
                    background: #F6F8FC;
                    border-radius:2px;
                    margin-right: 12px;
                    font-weight: normal;
                }
            }
        }
        .top{
            div{
                div{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
            }
        }
        .bottom{
            margin-top: 30px;
           div{
                div{
                    display: flex;
                    flex-direction: row;
                }
                .title{
                    margin-bottom: 30px;
                }
                .resourse{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .step{
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }
                    .line{
                        height: 100%;
                        width: 1px;
                        background: #f39926;
                    }
                    .circle{
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: #4DAAFF;
                        box-shadow:0px 2px 4px 0px rgba(164,196,236,0.7);
                    }
                }
                .list{
                    display: flex;
                    flex-direction: column;
                    padding:0 20px;
                    width: 100%;
                    div{
                        width:100%;
                        display: flex;
                        flex-direction: column;
                        padding: 20px 24px;
                        box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
                        margin-bottom: 20px;
                        overflow: hidden;
                        p{
                            font-size:16px;
                            font-family:PingFangSC-Regular;
                            color:rgba(126,139,154,1);
                        }
                        span{
                            font-size:18px;
                            font-family:PingFangSC-Regular;
                            color:rgba(51,51,51,1);
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
