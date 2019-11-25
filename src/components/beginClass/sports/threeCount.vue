<template>
  <div>{{ num }}s</div>
</template>
<script>
import {mapMutations} from "vuex";
export default{
  data(){
    return{
      num:5,
      timer:null
    };
  },
  created(){
    this.timer = setInterval(()=>{
      if(this.num>1){
        this.num = this.num-1;
      }else{
        clearInterval(this.timer);
        if(this.$store.state.questionType){
          this.changeQuestionBank(4);
        }else{
          this.changeSports(6);
        }
      }
    },1000);
  },
  methods:{
    ...mapMutations(["changeSports","changeQuestionBank"])
  },
  destroyed(){
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
<style lang="scss" scoped>
    div{
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 100%;
        font-size: 108px;
        font-weight: bolder;
        color:#f39926;
        line-height: 621px;
    }
</style>

