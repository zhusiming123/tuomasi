<template>
  <div class="preLessonTab">
    <div class="preLessonbox">
      <PreLessonDetail type="0" />
    </div>
    <span
      class="preLessonTab-back"
      @click="back"
    >返回</span>
  </div>
</template>
<script>
import PreLessonDetail from "./preLessonDetail.vue";
export default {
  components:{PreLessonDetail},
  methods:{
    back(){
      this.$store.state.tabnum = 5;
    }
  },
  created(){
    window.scrollTo(0,0);
  }
};
</script>
<style lang="scss" scoped>
    .preLessonTab{
        display: flex;
        flex-direction: column;
        align-items: center;
        &-back{
            border-radius:30px;
            border:2px solid rgba(0,133,255,1);
            padding: 8px 43px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(0,133,255,1);
            line-height:40px;
            margin-top: 40px;
            cursor: pointer;
        }
        .preLessonbox{
            background: #F6F8FC;
            padding: 20px;
            width: 100%;
        }
    }
        
</style>
