<template>
  <div class="preLessonDetail">
    <div class="preLessonDetail-content">
      <div class="preLessonDetail-content-header">
        <span>{{ type==1?'':this.msg.index>=10?this.msg.index:'0'+this.msg.index }}</span>
        <p>{{ this.msg.questionInfoList.type_info.name }}题</p>
      </div>
      <div
        class="preLessonDetail-content-title"
        v-html="this.msg.questionInfoList.title"
      />
      <div class="preLessonDetail-content-option">
        <p
          :key="index"
          v-for="(item,index) in this.msg.questionInfoList.choices"
        >
          <span>{{ item.choice }}</span>:&nbsp;<span v-html="item.content" />
        </p>
      </div>
      <div class="preLessonDetail-content-answer">
        正确答案: <span
          :key="index"
          v-for="(items,index) in this.msg.questionInfoList.answer"
        >{{ items }}&nbsp;</span>
      </div>
      <div
        class="preLessonDetail-content-resolve"
        v-if="detailType"
      >
        <p>解析：</p>
        <span v-html="this.msg.questionInfoList.remark" />
      </div>
      <div
        class="preLessonDetail-audio"
        v-if="detailType&&this.msg.questionInfoList.remarkOfAudio.audio_url&&type==1"
      >
        <audio controls>
          <source
            :src="this.msg.questionInfoList.remarkOfAudio.audio_url"
            type="audio/ogg"
          >
        </audio>
      </div>
    </div>
    <div
      class="preLessonDetail-audio"
      v-if="detailType&&this.msg.questionInfoList.remarkOfAudio.audio_url&&type==0"
    >
      <audio controls>
        <source
          :src="this.msg.questionInfoList.remarkOfAudio.audio_url"
          type="audio/ogg"
        >
      </audio>
    </div>
    <span
      v-if="type==1"
      :class="detailType?'preLessonDetail-checkDetailDown':'preLessonDetail-checkDetailUp'"
      @click="checkDetail" 
    />
  </div>
</template>
<script>
export default {
  props:["type"],
  data(){
    return{
      detailType:true
    };
  },
  computed:{
    msg:function(){
      return this.$store.state.prepareLessonDetail;
    }
  },
  methods:{
    checkDetail(){
      this.detailType = !this.detailType;
    }
  },
  mounted(){},
  created(){
    if(this.type==1){
      this.detailType = false;
    }else{
      this.detailType = true;
    }
  }
};
</script>
<style lang="scss" scoped>
    .preLessonDetail{
        display: inline-block;
        width: 100%;
        &-checkDetailUp{
            display: inline-block;
            width: 60px;
            height: 20px;
            margin-left: 540px;
            background: url('./../../assets/image/up.png') no-repeat;
            background-position: center center;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            cursor: pointer;
        }
        &-checkDetailDown{
            display: inline-block;
            width: 60px;
            height: 20px;
            margin-left: 540px;
            background: url('./../../assets/image/to.png') no-repeat;
            background-position: center center;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            cursor: pointer;
        }
        &-content{
            padding: 0 20px 40px 20px;
            background: #fff;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px;
            &-header{
                display: flex;
                flex-direction: row;
                span{
                    display: block;
                    width: 48px;
                    height: 49px;
                    background: url('./../../assets/image/Rectangle-16.png') no-repeat;
                    background-size: 48px 49px;
                    margin:0 10px 0 0;
                    text-align: center;
                    line-height: 43px;
                    color: #fff;
                    font-size: 18px;
                    margin-top: -5px;
                }
                p{
                    margin-top: 12px;
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(126,139,154,1);
                }
            }
            &-title{
                margin: 24px 0 30px 0;
                font-size:24px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                // text-overflow: -o-ellipsis-lastline;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // display: -webkit-box;
                // -webkit-line-clamp: 2;
                // line-clamp: 2;
                // -webkit-box-orient: vertical;
            }
            &-option{
                p{
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(126,139,154,1);
                    margin-bottom: 18px;
                    display: flex;
                    flex-direction: row;
                    span{
                        height: 25px;
                    }
                }
            }
            &-answer{
                margin-top: 10px;
                display: inline-block;
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                border-bottom: 1px solid #E6E6E6;
                span{
                    color: #f39926;
                }
            }
            &-resolve{
                margin-top: 30px;
                p{
                    font-size:20px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                }
                span{
                    margin-top: 20px;
                    display: block;
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
        }
        &-audio{
            margin-top: 20px;
        }
    }
</style>
