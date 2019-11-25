<template>
  <div class="box">
    <p class="topic">
      班级PK结果
    </p>
    <div class="content_rank">
      <div class="content_rank_left">
        <p class="title">
          前三名班级：
        </p>
        <div class="content_box">
          <div
            :key="index"
            class="list"
            :class="'div'+index"
            v-for="(item,index) in corretRateList"
            v-if="index<3"
          >
            <div class="list_left">
              <p class="name">
                {{ item.msg.klass.name }}
              </p>
              <p class="list_left_top">
                <span>正确率：<span>{{ item.msg.correctRate }}%</span></span>
                <span class="column" />
                <span>平均时长：<span>{{ item.msg.averageTime }}s</span></span>
              </p>
            </div>
            <div class="list_right">
              <span class="point">+{{ list[index].value }}</span>
              <span>积分</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content_rank_right">
        <p class="title">
          后三名班级：共{{ classCount }}个班
        </p>
        <div class="content_box">
          <div
            :key="index"
            class="content_box_list"
            v-for="(item,index) in errorRateList"
          >
            <div>
              <b>{{ item.index }}</b>
            </div>
            <div>
              <p class="name">
                {{ item.msg.klass.name }}
              </p>
              <p>
                <span>正确率：<span>{{ item.msg.correctRate }}%</span></span>
                <span class="column" />
                <span>平均时长：<span>{{ item.msg.averageTime }}s</span></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="send">
      <p>
        <button @click="back()">
          返回
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import {PKlist} from "@/api/index";
export default{
  data(){
    return{
      corretRateList:[],
      errorRateList:[],
      list:[],
      classCount:""
    };
  },
  methods:{
    ...mapMutations(["changeSports","changeQuestionBank"]),
    back(){
                
      if(this.$store.state.questionType){
        this.changeQuestionBank(1);
      }else{
        this.changeSports(2);
      }
    }
  },
  created(){
    let PKId = this.$store.state.tabIndexNum==5?window.localStorage.getItem("tikuPKsportsId"):window.localStorage.getItem("lianxiPKsportsId");
    PKlist({"questionId":PKId,"lessonId":window.localStorage.getItem("lessonId")}).then(res=>{
      this.$set(this,"list",res.data.data.questionDesc);
      this.$set(this,"classCount",res.data.data.classCount);
      let arr = [];
      res.data.data.orderClasses.forEach((item,index)=>{
        let json = {"index":index+1,"msg":item};
        arr.push(json);
      });
      let arr2 = [];
      arr.reverse().forEach((item,index)=>{
        if( index<3 ){
          arr2.push(item);
        }
      });
      this.$set(this,"corretRateList",arr.reverse());
      this.$set(this,"errorRateList",arr2.reverse());
    });
  }
};
</script>
<style lang="scss" scoped>
    .box{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        height: 100%;
        min-height: 590px;
        position: relative;
        .send{
            width:1200px;
            text-align: center;
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            margin-left:auto;
            margin-right:auto;
            p{
                width: 971px;
                padding: 20px 0;
                box-shadow:0px -3px 16px 0px rgba(205,212,225,0.5);
                background: #fff;
                margin-left: 20px;
            }
        }
        button{
            display: inline-block;
            padding: 10px 30px;
            background:#f39926;
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:60px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            outline:none;
            cursor: pointer;
        }
        .topic{
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
        }
        .name{
            width: 720px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
        }
        .content_rank{
            width: 100%;
            display: flex;
            flex-direction: column;
            .content_rank_left{
                width: 100%;
                margin-top:20px;
                padding: 20px;
                background:rgba(255,255,255,1);
                box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);  
                .title{
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    color:rgba(51,51,51,1);
                }
                .content_box{
                    margin-top: 25px;
                    .list{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        .list_right{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                            .point{
                                font-size:24px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(255,89,33,1);
                            }
                        }
                         div{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding-left: 57px;
                            margin-bottom: 16px;
                            .column{
                                width: 1px;
                                height: 20px;
                                background: #F0F0F0;
                            }
                            .list_left_top{
                                font-size:16px;
                                font-family:PingFangSC-Regular;
                                color:rgba(51,51,51,1);
                                font-size:16px;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                 span{
                                    margin-top:6px;
                                    font-size:14px;
                                    font-family:PingFangSC-Regular;
                                    color:rgba(123,139,156,1);
                                    span{
                                        color: #23BF29;
                                        font-weight: bold;
                                    }
                                }
                            }
                        }
                    }
                    .div0{
                        background: url('./../../../assets/image/first.png') no-repeat;
                        background-position:left center;
                        background-size: 48px 48px; 
                    }
                    .div1{
                        background: url('./../../../assets/image/second.png') no-repeat;
                        background-position:left center;
                        background-size: 48px 48px; 
                    }
                    .div2{
                        background: url('./../../../assets/image/third.png') no-repeat;
                        background-position:left center;
                        background-size: 48px 48px; 
                    }
                   
                }
            }
            .content_rank_right{
                width: 100%;
                margin-top:20px;
                padding: 20px;
                background:rgba(255,255,255,1);
                box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);  
                .title{
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    color:rgba(51,51,51,1);
                }
                .content_box{
                    margin-top: 25px;
                    .content_box_list{
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 16px;
                        align-items: center;
                        
                        div{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        }
                        b{
                            display: inline-block;
                            width: 48px;
                            height: 48px;
                            background: url('./../../../assets/image/icon_star.png') no-repeat;
                            background-position:center center;
                            background-size: 48px 48px; 
                            margin-right: 9px;
                            text-align: center;
                            line-height: 48px;
                            font-size:22px;
                            font-family:PingFangSC-Medium;
                            color:#FF5921;
                        }
                        p{
                            font-size:16px;
                            font-family:PingFangSC-Regular;
                            color:rgba(51,51,51,1);
                        }
                        span{
                            margin-top:6px;
                            font-size:14px;
                            font-family:PingFangSC-Regular;
                            color:rgba(123,139,156,1);
                            span{
                                color: #23BF29;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

