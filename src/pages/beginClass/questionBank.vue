<template>
  <div>
    <QuestionList v-if="questionBankType==1" />
    <QuestionDetail v-if="questionBankType==2" />
    <PKrankList v-if="questionBankType==3" />
    <PKloading v-if="questionBankType==4" />
    <ThreeCount v-if="questionBankType==5" />
    <CountSingleProject v-if="questionBankType==6" />
    <practiseClassList v-if="questionBankType==7" />
  </div>
</template>
<script>
import QuestionList from "@/components/beginClass/questionBank/questionList.vue"; 
import QuestionDetail from "@/components/beginClass/questionBank/questionDetail.vue"; 
//pk
import PKrankList from "@/components/beginClass/sports/PKrankList";
import PKloading from "@/components/beginClass/sports/PKloading";
import ThreeCount from "@/components/beginClass/sports/threeCount";
//习题
import CountSingleProject from "@/components/beginClass/Practise/countSingleProject";
import practiseClassList from "@/components/beginClass/Practise/practiseClassList";
import {mapState,mapMutations} from "vuex";
export default {
  data(){
    return{
            
    };
  },
  computed:{
    ...mapState(["questionBankType"])
  },
  methods:{
    ...mapMutations(["changeTabNum"])
  },
  created(){
    this.changeTabNum(5);
  },
  components:{QuestionList,QuestionDetail,PKrankList,PKloading,ThreeCount,CountSingleProject,practiseClassList}
};
</script>
<style lang="scss" scoped>

</style>
