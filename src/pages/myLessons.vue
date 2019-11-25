<template>
  <div class="box_mylesson">
    <Calender />
    <div
      class="content_list"
      :style="totalPage>1?'':'padding-bottom:40px'"
    >
      <p
        class="title"
        v-show="lessonNumber!=0"
      >
        今日待上课程 <span>{{ lessonNumber }}</span> 门
      </p>
      <div
        v-for="(items,indexs) in lessonList"
        :key="indexs"
      >
        <div
          class="list"
          v-for="(item,index) in items.course.lessonList"
          :key="index"
        >
          <p class="list_title">
            {{ items.course.name }}<span />
          </p>
          <div class="list_time">
            <span>{{ items.course.startTime }} 至 {{ items.course.endTime }}</span>
            <span class="column-line" />
            <span>共 <span style="color:#f39926">{{ items.totalLesson }}</span> 讲</span>
          </div>
          <div class="list_detail">
            <p>
              <span>第 {{ item.number }} 讲：{{ item.name }}<span
                v-if="item.tag"
                class="tag"
              >{{ item.lessonTag?item.lessonTag==1?'作文课':item.lessonTag==2?'期中测':item.lessonTag==3?'期末测':'':'' }}</span></span>
              <span class="list_only_time">{{ item.startTime.split(' ')[0] }} {{ item.startTime.split(' ')[1] }}-{{ item.endTime.split(' ')[1] }}</span>
            </p>
            <p
              :class="item.substituteState==1&&item.state==0?'list_btn_no':'list_btn'"
              @click="beginClickClass(item,items)"
            >
              {{ item.state==0?"开始上课":"学情报告" }}
            </p>
          </div>
          <img
            class="type"
            v-if="item.substituteState==1"
            src="./../assets/image/no_tea_course.png"
            alt="标签"
          >
          <img
            class="type"
            v-if="item.substituteState==2"
            src="./../assets/image/tea_course.png"
            alt="标签"
          >
        </div>
      </div>
    </div>
    <div
      class="nocourse"
      v-if="!listType"
    >
      <img
        src="../assets/img/140-140-1.png"
        alt="缺省图"
      >
      <span>今日暂无需要上的课程～</span>
    </div>
    <div
      class="box_center_page"
      v-show="totalPage>1"
      class-name="box_center_page"
    >
      <Page
        :total="lessonNumber"
        :page-size="5"
        @on-change="checkPage"
        @on-page-size-change="getPageNum"
        show-elevator
      />
    </div>
    <div
      class="mask"
      v-if="maskType==1"
    >
      <div class="toast_box">
        <p
          class="close"
          @click="cancelToast"
        />
        <p class="title">
          是否开始本节课程？
        </p>
        <p class="course">
          {{ lessonDetail.course }}
        </p>
        <p class="lesson">
          第 {{ lessonDetail.number }} 讲：{{ lessonDetail.name }}
        </p>
        <p class="time">
          {{ lessonDetail.state==2?lessonDetail.realStartTime:lessonDetail.startTime }}
        </p>
        <div>
          <span
            class="cancel"
            @click="cancel"
          >取 消</span>
          <span
            class="makesure"
            @click="makeSure"
          >开 始</span>
        </div>
      </div>
    </div>
    <div
      class="mask"
      v-if="maskType==3"
    >
      <div
        class="toast_box"
        style="height:415px"
      >
        <p
          class="close"
          @click="cancelToast" 
        />
        <p class="remind">
          开课时间未到，不能进入课堂，请在开课前30分钟进入
        </p>
        <p class="course">
          {{ lessonDetail.course }}
        </p>
        <p class="lesson">
          第 {{ lessonDetail.number }} 讲：{{ lessonDetail.name }}
        </p>
        <p class="time">
          {{ lessonDetail.state==2?lessonDetail.realStartTime:lessonDetail.startTime }}
        </p>
        <div>
          <span
            class="sure"
            @click="cancelToast"
          >确 定</span>
        </div>
      </div>
    </div>
    <div
      class="mask"
      v-if="maskType==2"
    >
      <div class="toast_box">
        <p
          class="close"
          @click="cancelToast"
        />
        <p class="title">
          你有一节未完成的课程需要处理
        </p>
        <p class="course">
          {{ lessonDetail.course }}
        </p>
        <p class="lesson">
          第 {{ lessonDetail.number }} 讲：{{ lessonDetail.name }}
        </p>
        <p class="time">
          {{ lessonDetail.realStartTime }}
        </p>
        <div>
          <span
            class="cancel"
            @click="cancel"
          >结束课程</span>
          <span
            class="makesure"
            @click="makeSure"
          >返回上课</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {beginClass,endLesson,checkLesson} from "./../api/index.js";
import { mapState,mapMutations } from "vuex";
import Calender from "@/components/common/calender";
export default{
  data(){
    return{
      num:1,
      maskType:false,
      lessonId:"",
      lessonDetail:{},
      toastType:""
    };
  },
  components:{Calender},
  mounted(){
            
  },
  computed:{
    ...mapState(["listType","lessonList","calenderTypeCheck","lessonNumber","totalPage","date"])
  },
  methods:{
    ...mapMutations(["getList"]),
    cancelToast(){
      this.$set(this,"maskType",0);
    },
    cancel(){
      this.$set(this,"maskType",0);
      if( this.lessonDetail.state==2 ){
        endLesson({"lessonId":this.lessonDetail.id}).then(res=>{
          if( res.data.errno==200 ){
            this.getList({"num":this.num,"date":this.$store.state.date});
          }
        }).catch();
      }
    },
    makeSure(){
      window.localStorage.setItem("lessonId",this.lessonDetail.id);
      window.localStorage.setItem("courseName",this.lessonDetail.course);
      window.localStorage.setItem("courseId",this.lessonDetail.courseId);
      window.localStorage.setItem("lessonName",this.lessonDetail.name);
      if( this.lessonDetail.state==0 ){
        beginClass({"lessonId":this.lessonDetail.id}).then(res=>{
          if( res.data.errno==200 ){
            this.$router.push({"path":"/openbox/classTab"});
          }else if( res.data.errno==40126 ){
            let lessonDetail = res.data.data.course.lessonList[0];
            lessonDetail.course = res.data.data.course.name;
            lessonDetail.courseId = res.data.data.course.id;
            console.log(lessonDetail.courseId);
            this.$set(this,"lessonDetail",lessonDetail);
            this.$set(this,"maskType",2);
          }else if( res.data.errno==40124 ){
            this.$set(this,"maskType",3);
          }
        }).catch();
      }else{
        this.$router.push({"path":"/openbox/classTab"});
      }
      this.$set(this,"maskType",0);
    },
    // //获取当前课程列表
    // getList(num){
    //     getLessonList({"pageSize":5,'pageNum':num}).then(res=>{
    //         if( res.data.errno==200 ){
    //             this.$set(this,'listType',false)
    //             this.$set(this,'lessonList',res.data.data.courseList)
    //             this.$set(this,'lessonNumber',res.data.data.total)
    //             this.$set(this,'totalPage',res.data.data.totalPage)
    //         }else if(res.data.errno==40119){
    //             this.$set(this,'lessonList',[])
    //             this.$set(this,'listType',true)
    //         }
    //     }).catch()
    // },
    //查询当前是否有上课课程
    check(){
      checkLesson().then(res=>{
        if( res.data.data!="" ){
          let lessonDetail = res.data.data.course.lessonList[0];
          lessonDetail.course = res.data.data.course.name;
          lessonDetail.courseId = res.data.data.course.id;
          this.$set(this,"lessonDetail",lessonDetail);
          this.$set(this,"maskType",2);
        }
      }).catch();
    },
    checkPage(res){
      this.getList({"num":res,"date":this.$store.state.date});
    },
    getPageNum(){
    },
    beginClickClass(item,items){
      if( item.state==0 ){
        if( item.substituteState!=1 ){
          item.course = items.course.name;
          item.courseId = items.course.id;
          this.$set(this,"lessonDetail",item);
          this.$set(this,"toastType",1);
          this.$set(this,"maskType",1);
        }
      }else{
        window.localStorage.setItem("tabNum",2);
        let routeData = this.$router.resolve({path:"/openBox", query: {"lessonId":item.id,"courseName":items.course.name,"lessonName":item.name,"state":item.state,"startTime":item.startTime,"endTime":item.endTime,"realStartTime":item.realStartTime,"realEndTime":item.realStartTime}});
        window.open(routeData.href, "_blank");
      }
    }
  },
  created(){
    window.localStorage.setItem("tabNum",2);
    this.check();
    let t = new Date();
    let y = t.getFullYear();
    let m = parseInt(t.getMonth()+1)>=10?parseInt(t.getMonth()+1):"0"+parseInt(t.getMonth()+1);
    let d = t.getDate()>=10?t.getDate():"0"+t.getDate();
    this.getList({"num":this.num,"date":y+"-"+m+"-"+d});
  }
};
</script>
<style lang="scss" scoped>
    .nocourse{
        display: flex;
        flex-direction:column;
        align-items: center;
        img{
            width: 200px;
            height: 200px;
            margin-top: 96px;
            margin-bottom: 20px;
        }
        span{
            font-size:20px;
            color:rgba(126,139,154,1);
            line-height:28px;
        }
        p{
            width:97px;
            height:36px;
            background:rgba(71,139,225,1);
            border-radius:18px;
            line-height: 36px;
            font-size: 14px;
            color:#fff;
            text-align: center;
            margin-top:27px;
        }
    }
    .box_mylesson{
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .box_center_page{
        .ivu-page .ivu-page-item-active {
            background-color: #f39926;
            border-color: #f39926;
        }
    }
     .content_list{
        .list:hover{
            box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
        }
        .list{
            padding: 20px 0;
            background: #fff;
            margin-top: 20px;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px 4px 4px 0px;
            position: relative;
            .type{
                position: absolute;
                right: -4px;
                top: -4px;
            }
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
                margin-bottom: 16px;
                padding: 0 23px;
                span span{
                    font-weight: bold;
                }
            }
            .list_detail{
                padding: 22px;
                background:rgba(246,248,252,1);
                margin: 0 23px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                p{
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    color:rgba(51,51,51,1);
                    display: flex;
                    flex-direction: column;
                    .list_only_time{
                        font-size:16px;
                        font-family:PingFangSC-Regular;
                        color:rgba(126,139,154,1);
                        margin-top:13px;
                    }
                    span .tag{
                        padding: 2px 10px;
                        background:linear-gradient(90deg,rgba(255,147,104,1) 0%,rgba(254,98,35,1) 100%);
                        box-shadow:0px 2px 4px 0px rgba(255,193,163,1);
                        border-radius:2px;
                        font-size:14px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        margin-left: 10px;
                    }
                }
                .list_btn{
                    padding: 8px 20px;
                    background:#f39926;
                    box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                    border-radius:18px;
                    color:#fff;
                    font-size: 14px;
                    cursor: pointer;
                }
                .list_btn_no{
                    padding: 8px 20px;
                    background:#bfbfbf;
                    border-radius:18px;
                    color:#fff;
                    font-size: 14px;
                }

                .list_btn:hover{
                     background:#f39926;
                }
            }
        }
    }
    .title{
        font-size:22px;
        font-family:PingFangSC-Semibold;
        color:rgba(51,51,51,1);
        span{
            color:#FF5921;
        }
    }
     .box_center_page{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:27px 0;
    }


    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.3);
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        z-index: 1000000;
    }
    .toast_box{
        width: 520px;
        height: 395px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 58px 40px 40px 40px;
        background: #fff;
        border-radius:6px;
        position: fixed;
        left: center;
        top: 50%;
        margin-top: -200px;
        box-shadow:0px 8px 22px 0px rgba(143,143,143,0.5);
         .close{
            position: absolute;
            right: 0;
            top: 0;
            width: 44px;
            height: 44px;
            background: url('./../assets/image/close1.png') no-repeat;
            background-position: center center;
            cursor: pointer;
        }
        .close:hover{
             position: absolute;
            right: 0;
            top: 0;
            width: 44px;
            height: 44px;
            background: url('./../assets/image/close.png') no-repeat;
            background-position: center center;
            cursor: pointer;
        }
        .title{
            text-align: center;
            font-size:26px;
            font-family:PingFangSC-Medium;
            color:rgba(51,51,51,1);
        }
        .remind{
            text-align: left;
            font-size:26px;
            font-family:PingFangSC-Medium;
            color:rgba(51,51,51,1);
        }
        .course{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            margin-top:30px;
        }
        .lesson{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
            margin-top: 18px;
        }
        .time{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
            margin-top: 18px;
        }
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            margin-top: 40px;
            span{
                width: 210px;
                height: 48px;
                text-align: center;
                line-height: 48px;
                border-radius:24px;
                cursor: pointer;
            }
            .cancel{
                border:2px solid rgba(230,230,230,1);
                color:rgba(51,51,51,1);
            }
            .cancel:hover{
                border:2px solid rgba(0,133,255,1);
            }
            .makesure{
                background:#f39926;
                color:#fff;
            }
            .sure{
                width: 100%;
                background:#f39926;
                color:#fff;
            }
            .sure:hover{
                background: #006ACC
            }
            .makesure:hover{
                background: #006ACC
            }
        }
    }

</style>
