<template>
    <div class="box">
        <div class="content_list">
            <div class="select">
                <span>{{msg.name}}</span>
                <div class="time">
                    <p>{{msg.startTime}} 至 {{msg.endTime}}</p>
                    <span @click='goBack'>返回上一页</span>
                </div>
            </div>
            <div class="content_list_box" v-for="item in lessonList">
                <div class="list">
                    <p class="list_title"><span></span>第{{item.number}}讲：{{item.name}}</p>
                    <div class="list_time">
                        <span>{{item.state==1?item.realStartTime.split(' ')[0]:item.startTime.split(' ')[0]}}  {{item.state==1?item.realStartTime.split(' ')[1]:item.startTime.split(' ')[1]}}-{{item.state==1?item.realEndTime.split(' ')[1]:item.endTime.split(' ')[1]}}</span>
                    </div>
                </div>
                <div :class="item.state==0?'nodetail':'detail'" @click='item.state?openDetail(item.id,msg.name,item.name,item.state,item.startTime,item.endTime,item.realStartTime,item.realEndTime):""'>{{item.state==0?'暂无报告':'学情报告'}}</div>
            </div>
        </div>
        <div class="box_center_page" v-show="totalPage>1">
            <Page :total="total" :page-size='5' @on-change='checkPage' show-elevator></Page>     
        </div>
    </div>
</template>
<script>
    import {getCourseList} from './../api/index.js'
    export default{
        data(){
            return{
                lessonList:[],
                num:1,
                id:'',
                totalPage:0,
                total:0,
                msg:{}
            }
        },
        methods:{
            getList(id){
                const json = {'courseId':this.id,"pageSize":5,'pageNum':this.num}
                getCourseList(json).then(res=>{
                    if( res.data.errno==200 ){
                        this.$set(this,'totalPage',res.data.data.totalPage)
                        this.$set(this,'total',res.data.data.total)
                        this.$set(this,'lessonList',res.data.data.lessonList)
                    }else{
                        
                    }
                }).catch(res=>{

                })
            },
            checkPage(num){
                this.$set(this,'num',num)
                this.getList()
            },
            goBack(){
                this.$router.go(-1)
            },
            openDetail(id,courseName,lessonName,state,startTime,endTime,realStartTime,realEndTime){
                window.localStorage.setItem('tabNum',2)
                let routeData = this.$router.resolve({path:'/openBox', query: {'lessonId':id,'courseName':courseName,'lessonName':lessonName,'state':state,'startTime':startTime,'endTime':endTime,'realStartTime':realStartTime,'realEndTime':realEndTime}});
                window.open(routeData.href, '_blank');
            }
        },
        created(){
            this.$set(this,'id',this.$route.query.id)
            this.$set(this,'msg',this.$route.query)
            this.getList(this.id)
        },
        mounted(){}
    }
</script>
<style lang="scss" scoped>
    .box{
        display: flex;
        flex-direction: column;
    }
     .content_list{
        padding-top: 0px;
        .select{
            margin-top:40px;
            font-size:16px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
            line-height:22px;
            span{
                font-size:22px;
                font-family:PingFangSC-Semibold;
                color:rgba(51,51,51,1);
                line-height:25px;
            }
            .time{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 12px;
                span{
                    font-size:16px;
                    font-family:PingFangSC-Regular;
                    color:#f39926;
                    line-height:22px;
                    cursor: pointer;
                }
                span:hover{
                     color:#f39926;
                }
            }
        }
        
        .content_list_box:hover{
            box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
        }
        .content_list_box{
            padding: 20px 20px 20px 0;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px 4px 4px 0px;
        }
        .list{
            .list_title{
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:rgba(51,51,51,1);
                margin-bottom: 16px;
                padding: 0 23px;
                position: relative;
                span{
                    position: absolute;
                    left: 0;
                    display: inline-block;
                    height: 24px;
                    width: 4px;
                    top:0;
                    background:#f39926;
                }
            }
            .list_time{
                font-size:16px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0 23px;
            }
        }
        .detail{
            padding: 8px 20px;
            background:#f39926;
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:18px;
            color:#fff;
            font-size: 14px;
            cursor: pointer;
        }
        .detail:hover{
            background: #006ACC;
        }
        .nodetail{
            padding: 8px 20px;
            background:#BFBFBF;
            border-radius:18px;
            color:#fff;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .title{
        font-size:18px;
        font-family:PingFangSC-Semibold;
        color:rgba(51,51,51,1);
        span{
            color:#ED8028;
        }
    }
     .box_center_page{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:27px 0;
    }
</style>
