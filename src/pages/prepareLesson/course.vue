<template>
    <div class="box_course">
        <div class="tags" v-if="list.length" :style="'height:'+height+'px;'" >
            <ul class="up_ul" v-show="!tagsType">
                <li v-for="(items,index) in list" >
                    <p class="title">{{items.name}}：</p>
                    <div class="list">
                        <span :class="json[items.prop]==''?'active':''" @click="selectType(items.prop,'')">全部</span>
                        <span :class="json[items.prop]==item.id?'active':''" v-for="item in items.secondLevelList" @click="selectType(items.prop,item.id)">{{item.name}}</span>
                    </div>
                </li>
            </ul>
            <ul class="to_ul" v-show="tagsType">
                <li v-for="items in list">
                    <p class="title">{{items.name}}：</p>
                    <span v-if="json[items.prop]==''">全部</span>
                    <span v-for="item in items.secondLevelList" v-if="json[items.prop]==item.id">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <span :class="tagsType?'checktags':'checktags_type'" @click="checktags"></span>
        <div class="content" v-show="!toast_no">
            <div class="content_list" :style="totalPage>1?'':'padding-bottom:40px'">
                <div class="content_list_box" v-for="item in lessonList">
                    <div class="list">
                        <p class="list_title"><span></span>{{item.ssCourse.name}}</p>
                        <div class="list_time">
                            <span>{{item.ssCourse.startTime}} 至 {{item.ssCourse.endTime}}</span>
                            <span class='column-line'></span>
                            <span>共 <span style="color:#f39926">{{item.totalLesson}}</span> 讲</span>
                        </div>
                    </div>
                    <div class="detail" @click="detailTo(item.ssCourse.id,item.ssCourse.name,item.ssCourse.startTime,item.ssCourse.endTime,item.totalLesson,item.ssCourse.outlineSubId)">课次列表</div>
                </div>
            </div>
            <div class="box_center_page" v-show="totalPage>1">
                <Page :current='pageNum' :total="lessonNumber" :page-size='5' @on-change='checkPage' show-elevator></Page>
            </div>
        </div>
        <div class="content_no" v-show="toast_no">
            <img src="../../assets/img/140-140-1.png" alt=""/>
            <p>今日暂无需要上的课程～</p>
        </div>
    </div>

</template>
<script>
    import {getTags,selectLesson} from '@/api/index'
    export default{
        data(){
            return{
                list:[],
                lessonList:[],
                totalPage:'',
                lessonNumber:0,
                height:307,
                clientHeight:'',
                tagsType:false,
                json:{},
                pageNum:'',
                toast_no:false
            }
        },
        created(){
            this.getList(1)
            //获取筛选列表
            getTags().then(res=>{
                if( res.data.errno==200 ){
                    let arr = []
                    res.data.data.tagList.forEach(item => {
                        if( item.id==1 ){
                            item.prop = 'subject'
                            arr.push(item)
                        }else if( item.id==2 ){
                            item.prop = 'grade'
                            arr.push(item)
                        }else if( item.id==15 ){
                            item.prop = 'classStyle'
                            arr.push(item)
                        }else if( item.id==3 ){
                            item.prop = 'term'
                            arr.push(item)
                        }else if(item.id==46 ){
                            item.prop = 'teachMaterial'
                            arr.push(item)
                        }else if(item.id==49){
                            item.prop = 'level'
                            arr.push(item)
                        }else if(item.id==67){
                            item.prop = 'type'
                            arr.push(item)
                        }
                    });
                    this.$set(this,'list',arr)
                    let json = {}
                    json.pageNum = 1
                    json.pageSize = 5
                    arr.forEach(item=>{
                        json[item.prop] = ''
                    })
                    this.$set(this,'json',json)
                }
            }).catch()
        },
        methods:{
            getList(num){
                this.$set(this,'pageNum',num)
                //获取班级列表
                this.json.pageNum = num
                selectLesson( this.json ).then(res=>{
                    if( res.data.errno==200 ){
                        this.$set(this,'toast_no',false)
                        this.$set(this,'lessonList',res.data.data.courseList)
                        this.$set(this,'totalPage',res.data.data.totalPage)
                        this.$set(this,'lessonNumber',res.data.data.total)
                    }else if( res.data.errno==40119 ){
                        this.$set(this,'toast_no',true)
                    }
                }).catch()
            },
            //分页
            checkPage(res){
                this.getList(res)
            },
            //选中筛选
            selectType(prop,id){
                this.json[prop] = id
                this.$set(this,'json',this.json)
                this.getList(1)
            },
            //隐藏消失
            checktags(){
                setTimeout(()=>{
                    this.$set(this,'tagsType',!this.tagsType)
                },200)
                if( !this.tagsType ){
                    document.getElementsByClassName('tags')[0].style.height = 61+'px'
                }else{
                    document.getElementsByClassName('tags')[0].style.height = 307+'px'
                }
            },
            detailTo(id,name,start,end,num,oId){
                window.localStorage.setItem('tabNum',1)
                let routeData = this.$router.resolve({path:'/Topic/lesson', query: {'id':id,'name':name,'start':start,'end':end,'num':num,'oId':oId}});
                window.open(routeData.href, '_blank');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .box_course{
        padding: 20px;
        display: flex;
        flex-direction: column;
        .checktags{
            margin-top: -4px;
            display: inline-block;
            width: 60px;
            height: 20px;
            margin-bottom: -20px;
            margin-left: 540px;
            background: url('./../../assets/image/up.png') no-repeat;
            background-position: center center;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            cursor: pointer;
        }
        .checktags_type{
            margin-top: -4px;
            display: inline-block;
            width: 60px;
            height: 20px;
            margin-bottom: -20px;
            margin-left: 540px;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            background: url('./../../assets/image/to.png') no-repeat;
             background-position: center center;
            cursor: pointer;
        }
        .tags{
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px 4px 4px 0px;
            width: 100%;
            background: #fff;
             overflow: hidden;
            transition:all 0.5s ease;
            .to_ul{
                display: flex;
                flex-wrap:wrap;
                padding: 20px;
                li{
                    display: flex;
                    flex-direction: row;
                    margin: 0 0 0 16px;
                }
                p{
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(126,139,154,1);
                }
                span{
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    padding: 0 8px;
                    background: #f39926;
                    .active{
                        background: #f39926;
                        color: #fff;
                    }
                }
            }
            .up_ul{
                width: 100%;
                background: #fff;
                padding:20px 0 0 20px;
                li{
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 20px;
                    .title{
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(126,139,154,1);
                        width: 73px;
                    }
                    div{
                        span{
                            font-size:14px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            padding: 0 8px;
                            color: #000;
                            margin-right: 20px;
                            cursor: pointer;
                        }
                        .active{
                            background: #f39926;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .content{
            margin-top: 20px;
        }
        .content_no{
            display: flex;
            flex-direction: column;
            align-items: center;
             margin-top: 100px;
            p{
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(126,139,154,1);
                margin-top: 20px;
            }
        }
         .content_list{
            padding-top: 0px;
            .select{
                font-size:16px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
                line-height:22px;
            }
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
    }
</style>
