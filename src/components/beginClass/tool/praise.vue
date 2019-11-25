<template>
  <div class="praise">
    <praiseModel
      ref="praise"
      @callback="sendPraise"
    />
    <span class="praise_title">班级表扬</span>
    <div class="praise_list">
      <div
        v-for="item in classList"
        :key="item.id"
        class="praise_list_class"
      >
        <p
          class="praise_list_class_noconect"
          v-show="!item.connectState" 
        />
        <div class="praise_list_class_mask">
          <span @click="pointTo(0,item.id)">奖励积分</span>
          <span @click="pointTo(1,item.id)">小红花奖励</span>
        </div>
        <p class="praise_list_class_title">
          <span>{{ item.name }}</span>
        </p>
        <div class="praise_list_class_bottom">
          <div class="praise_list_class_bottom_point">
            <span class="praise_list_class_bottom_point_num">{{ item.integralValue }}</span>
            <span class="praise_list_class_bottom_point_type">班级积分</span>
          </div>
          <span class="praise_list_class_bottom_column" />
          <div class="praise_list_class_bottom_flower">
            <span class="praise_list_class_bottom_flower_num">{{ item.flowerValue }}</span>
            <span class="praise_list_class_bottom_flower_type">班级小红花</span>
          </div>
        </div>
      </div>
    </div>
    <div class="send">
      <p>
        <span
          class="praise_back"
          @click="back"
        >返回</span>
      </p>
    </div>
  </div>
</template>
<script>
import praiseModel from "./../../model/praise_model.vue";
import {praiseList,sendPraise} from "@/api/xylink.js";
export default {
  data(){
    return{
      classList:[]
    };
  },
  components:{praiseModel},
  methods:{
    pointTo(num,id){
      this.$refs.praise.checkType(num,id);
    },
    back(){
      this.$router.replace({"path":"/openbox/classTab/tool"});
    },
    getPraiseList:function(){
      praiseList({"lessonId":window.localStorage.getItem("lessonId")}).then((res)=>{
        if( res.data.errno==200 ){
          this.classList = res.data.data;
        }
      });
    },
    sendPraise:function(data){
      let json = {
        "classId":[data.id],//班级id
        "lessonId": window.localStorage.getItem("lessonId"),//课次id
        "type": data.type, //0:发送积分 1:发送小红花
        "value": data.value //发送的数值
      };
      sendPraise(json).then(res=>{
        if( res.data.errno==200 ){
          this.$refs.praise.cancel();
          this.getPraiseList();
        }else{
          this.$refs.praise.cancel();
        }
      });
    }
  },
  created(){
    this.getPraiseList();
  }
};
</script>
<style lang="scss" scoped>
    .praise{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        &_title{
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-bottom: 20px;
        }
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
        &_back{
            display: inline-block;
            cursor: pointer;
            width:149px;
            height:60px;
            background:rgba(0,133,255,1);
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:30px;
            text-align: center;
            line-height: 60px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
        &_list{
            padding: 20px 20px 0 20px;
            width: 100%;
            height: 100%;
            background:rgba(246,248,252,1);
            display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           &_class:hover{
                .praise_list_class_mask{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                }
           }
            &_class{
                cursor: pointer;
                width: 425px;
                height: 196px;
                margin-bottom: 20px;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 6px 0px rgba(234,238,248,1);
                border-radius:4px;
                position: relative;
                &_noconect{
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    right: -4px;
                    top:-4px;
                    background: url('./../../../assets/xylink/noconect.png') no-repeat;
                }
                &_mask{
                    width: 425px;
                    height: 196px;
                    position: absolute;
                    left: 0;
                    top:0;
                    background:rgba(72,81,93,0.8);
                    border-radius:4px;
                    padding: 40px 0;
                    display: none;
                    span{
                        cursor: pointer;
                        display: inline-block;
                        width:186px;
                        height:48px;
                        border-radius:24px;
                        text-align: center;
                        line-height: 48px;
                        font-size:18px;
                        background: #fff;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:#f39926;
                    }
                    span:hover{
                        background:rgba(0,133,255,1);
                        box-shadow:0px 4px 6px 0px rgba(22,93,157,1);
                        color: #fff;
                    }
                }
                &_bottom{
                    padding: 13px 0 18px 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    &_point{
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        text-align: center;
                        &_type{
                            font-size:14px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(126,139,154,1);
                        }
                        &_num{
                            font-size:20px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(237,128,40,1);
                        }
                    }
                    &_column{
                        flex-grow: 0;
                        display: inline-block;
                        width:1px;
                        height: 50px;
                        background: #e6e6e6;
                    }
                    &_flower{
                        text-align: center;
                        flex-grow: 1;
                         display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        &_type{
                            font-size:14px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(126,139,154,1);
                        }
                        &_num{
                            font-size:20px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(237,128,40,1);
                        }
                    }
                }
                &_title{
                    padding: 26px 20px 22px 20px;
                    font-size:24px;
                    height: 114px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    border-bottom: 1px solid #e6e6e6;
                    span{
                         overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                }
            }
        }
    }
</style>