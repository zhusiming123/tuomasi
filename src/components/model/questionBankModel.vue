<template>
    <div class="mask" v-show="masktype">
       <div class="box_questionBankModel">
           <p class="title">题库题目使用详情</p>
           <ul>
               <li class="top">
                   <span>题号</span>
                   <span>正确</span>
               </li>
               <li v-for="(item,index) in arr" :class="index%2==0?'double':'single'">
                    <span>第 {{index+1}} 题</span>
                   <span>{{item.category==0?'练习题':'班级PK'}}</span>
               </li>
           </ul>
           <p class="btn" @click="check">关 闭</p>
       </div>
    </div>
</template>
<script>
export default {
    props:['list'],
    data(){
        return{
            masktype:false,
            arr:[]
        }
    },
    methods:{
        check(){
            this.masktype = !this.masktype
        }
    },
    created(){
        this.list.questionList.forEach(item => {
            if(item.category){
                this.arr.push(item)
            }
        });
    }
}   
</script>
<style lang="scss" scoped>
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        z-index: 1000000;
        background:rgba(0,0,0,0.3);
        .box_questionBankModel{
            background: #fff;
            width:412px;
            background:rgba(255,255,255,1);
            box-shadow:0px 8px 22px 0px rgba(143,143,143,0.5);
            border-radius:4px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title{
                font-size:26px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                margin-top: 40px;
            }
            .btn{
                width:331px;
                height:48px;
                background:rgba(0,133,255,1);
                box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                border-radius:24px;
                line-height: 48px;
                font-size:18px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                cursor: pointer;
                margin-bottom: 40px;
                margin-top: 30px;
            }
            .btn:hover{
                background: #006ACC!important;
            }
            ul{
                width: 100%;
                margin-top: 40px;
                height: 300px;
                overflow: auto;
                overflow-x: hidden; 
                li{
                    width:330px;
                     height: 50px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-left: 41px;
                    span{
                        width: 50%;
                        text-align: center;
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height: 50px;
                    }
                }
                .double{
                    background:rgba(246,249,255,1);
                }
                .single{
                    background:#fff;
                }
                .top{
                    span{
                        font-size:18px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(126,139,154,1);
                    }
                }
            }
        }
    }
</style>
