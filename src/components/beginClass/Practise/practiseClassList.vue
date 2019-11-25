<template>
    <div class="box_practiseClassList">
        <div class="header">
            <span class="header_title">练习计时</span>
            <span class="demo-Circle-inner">{{time}}<span>s</span></span>
            <p v-if="countDownNum>=1" style="cursor:not-allowed">结束答题({{countDownNum}})</p>
            <p class="endQuestion" @click="endQuestion" v-if="countDownNum<1">结束答题</p>
        </div>
        <div class="content">
            <div class="content_left">
                <div class="list" v-for="item in classMsgLeft">
                    <p>{{item.name}}</p>
                    <span v-show="item.sendState==0">正在答题中…</span>
                    <div v-show="item.sendState==1">
                        <span class="fail">发送失败</span>
                        <div @click="resetSend(item.id)">重新发送</div>
                    </div>
                </div> 
            </div>
            <div class="content_right">
                <div class="list" v-for="item in classMsgRight">
                    <p>{{item.name}}</p>
                     <span v-show="item.sendState==0">正在答题中…</span>
                    <div v-show="item.sendState==1">
                        <span class="fail">发送失败</span>
                        <div @click="resetSend(item.id)">重新发送</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapMutations, mapState} from 'vuex'
    import {getMoneySendMsg,sendQuestionAgain,endSports,refuseProject} from './../../../api/index'
    export default({
        data(){
            return{
                query:{},
                time:0,
                countDownNum:5,
                classMsgLeft:[],
                classMsgRight:[],
                timer:null,
                countr:null,
                classList:[]
            }
        },
        created() {
            // this.$store.state.loading = true
            this.begin()
            this.countDown()
        },
        mounted() {
            this.getClassList()
        },
        computed:{
           
        },
        methods:{
            ...mapMutations(['changePractise','changeQuestionBank']),
            begin(){
                this.timer = setInterval(()=>{
                    this.time = this.time+1
                },1000) 
            },
            countDown(){
                this.countr = setInterval(()=>{
                    if( this.countDownNum>=1){
                        this.countDownNum = this.countDownNum-1
                    }else{
                        clearInterval(this.countr)
                    }
                },1000)
            },
            endQuestion(){
                refuseProject({'questionId':window.localStorage.getItem('questionId')}).then(res=>{
                    if( res.data.errno==200 ){
                        if(this.$store.state.questionType){
                            this.changeQuestionBank(6)
                        }else{
                            this.changePractise(2)
                        }
                    }
                }).catch()
            },
            
            //查看练习题发送成功与否
            getClassList(){
                this.classList = JSON.parse(window.sessionStorage.getItem('classList'))
                this.classList.forEach((item,index)=>{
                    if( index%2==0 ){
                        this.classMsgLeft.push(item)
                    }else{
                        this.classMsgRight.push(item)
                    }
                })
            },
            //再次发送练习
            resetSend(id){
                sendQuestionAgain({'questionId':window.localStorage.getItem('questionId'),'classId':id}).then(res=>{
                    if( res.data.errno==200 ){
                       this.classList.forEach(item=>{
                           if( item.id==id ){
                               item.sendState = 0
                           }
                       })
                    }
                }).catch()
            },
        },
        destroyed() {
            clearInterval(this.timer)
        },
    })
</script>
<style lang="scss" scoped>
    .box_practiseClassList{
        .header{
            font-size:20px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1); 
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -10px;
            padding-bottom: 38px;
            .header_title{
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
            p{
                margin-top: 20px;
                width: 253px;
                text-align: center;
                box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                border-radius:30px;
                height: 60px;
                line-height: 60px;
                background: #006ACC;
                font-size:28px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
            .endQuestion{
                cursor: pointer;
                background: #f39926;
            }
        }
        .demo-Circle-inner{
            color:#FF5921;
            font-size:52px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:73px;
            margin-top: 17px;
        }
        .content{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background:rgba(246,248,252,1);
            padding: 20px 20px 0 20px;
        }
        .content_left{
            width: 428px;
        }
        .content_right{
            width: 428px;
        }
         .list{
            width: 100%;
            height: 178px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            align-items: center;
            background: #fff;
            margin-bottom: 20px;
            padding: 45px 16px;
            text-align: center;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            p{
                font-size:16px;
                font-family:PingFangSC-Regular;
                color:rgba(51,51,51,1);
                
            }
            span{
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:#FF5921;
            }
            .fail{
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:rgba(153,153,153,1);
                margin-top: 10px;
            }
            div div{
                width:136px;
                height:37px;
                background:#FF5921;
                box-shadow:0px 2px 4px 0px rgba(255,204,171,1);
                border-radius:18px;
                font-size:14px;
                font-family:PingFangSC-Medium;
                color:rgba(255,255,255,1);
                text-align: center;
                line-height: 37px;
                margin-top: 10px;
                cursor: pointer;
            }
            div div:hover{
                background: #D65124;
                color:#FFFFFF
            }
        }
        .send{
            width:100%;
            text-align: center;
            margin-top: 40px;
        }
        button{
            display: inline-block;
            padding:10px 40px;
            background:#f39926;
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:60px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            outline:none;
            cursor: pointer;
        }
    }
</style>
