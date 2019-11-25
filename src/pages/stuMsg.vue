<template>
    <div class="box_stuMsg">
        <div class="content_list" :style="totalPage>1?'':'padding-bottom:40px'">
            <!-- <div class="select">
                <span>时间：</span>
                <Select v-model="model1" style="border:none" placeholder='全部'>
                    <Option  v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div> -->
            <div class="content_list_box" v-for="item in lessonList">
                <div class="list">
                    <p class="list_title"><span></span>{{item.ssCourse.name}}</p>
                    <div class="list_time">
                        <span>{{item.ssCourse.startTime}}至 {{item.ssCourse.endTime}}</span>
                        <span class='column-line'></span>
                        <span>共 <span style="color:#f39926">{{item.totalLesson}}</span> 讲</span>
                        <span class='column-line'></span>
                        <span>已上 <span style="color:#f39926">{{item.finishLesson}}</span> 讲</span>
                    </div>
                </div>
                <div class="detail" @click="detailTo(item.ssCourse.id,item.ssCourse.name,item.ssCourse.startTime,item.ssCourse.endTime)">课节详情</div>
            </div>
        </div>
        <div class="box_center_page" v-show="totalPage>1">
            <Page :total="lessonNumber" :page-size='5' @on-change='checkPage' @on-page-size-change='getPageNum' show-elevator></Page>     
        </div>
    </div>
</template>
<script>
    import {getTeachList} from './../api/index.js'
    export default{
        data(){
            return{
                lessonList:[],
                num:1,
                totalPage:0,
                lessonNumber:0
            }
        },
        methods:{
            detailTo(id,name,startTime,endTime){
                this.$router.push({path:"/Topic/lessonDetail",query:{'id':id,"name":name,"startTime":startTime,"endTime":endTime}})
            },
            getList(num){
                const json = {"pageSize":5,'pageNum':num}
                getTeachList(json).then(res=>{
                    if( res.data.errno==200 ){
                        this.$set(this,'lessonList',res.data.data.courseList),
                        this.$set(this,'totalPage',res.data.data.totalPage)
                        this.$set(this,'lessonNumber',res.data.data.total)
                    }else if( res.data.errno==40119 ){
                        this.$router.push({path:'/Topic/noLessons'})
                    }
                }).catch()               
            },
            checkPage(res){
                this.getList(res)
            },
            getPageNum(res){
            }
        },
        created(){
            this.getList(this.num)
        },
        mounted(){}
    }
</script>
<style lang="scss" scoped>
    .box_stuMsg{
        display: flex;
        flex-direction: column;
    }
     .content_list{
        padding-top: 0px;
        .select{
            font-size:16px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
            line-height:22px;
        }
        // .ivu-select-visible .ivu-select-selection {
        //     border: 1px solid #57a3f3; 
        //     outline: 0;
        //     box-shadow: 0 0 0 2px #fff;
        // }
        .ivu-select{
            width: 90px;
            border:none;
            .ivu-select-selection{
                border: 1px solid #f39926!important;
            }
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
        .content_list_box:hover{
            box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
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
                span span{
                    font-weight: bold;
                }
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
            background: #f39926;
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
