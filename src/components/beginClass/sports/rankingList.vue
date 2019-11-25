<template>
  <div class="box_rankingList">
    <div class="redpaper-num-rankinglist-title">
      红包分数榜
    </div>
    <div
      class="rankinglist-top"
      :key="index"
      v-for="(item,index) in detail.maxIntegralStu"
    >
      <div class="rankinglist-top-icon">
        <img
          src="../../../assets/image/model.png"
          alt="logo"
          class="rankinglist-top-icon"
        >
      </div>
      <div class="rankinglist-top-text">
        <div class="rankinglist-top-text-1">
          <span class="top-student-name">{{ item.name }}</span>抢得红包积分<span class="top-redpaper-num">{{ item.integrals[0].value }}</span>
        </div>
        <div class="rankinglist-top-text-2">
          {{ item.classes[0].name }}
        </div>
      </div>
    </div>
    <div class="class-list">
      <div>
        <ul>
          <li
            :key="indexs"
            v-for="(items,indexs) in detail.classes"
          >
            <div class="class-title">
              {{ items.name }}
            </div>
            <div class="class-student-list">
              <ol>
                <li
                  :key="index"
                  v-for="(item,index) in items.students"
                >
                  {{ index+1 }}.<span class="student-name">{{ item.name }}</span><span class="redpaper-num">{{ item.integrals[0].value }}</span>分
                </li>
              </ol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="send">
      <p>
        <button @click="endSports(1)">
          返回
        </button>
      </p>
    </div>
  </div>  
</template>
<script>
import {mapMutations, mapState} from "vuex";
export default({
  data(){
    return{
      detail:""
    };
  },
  computed:{
    ...mapState(["sportsMsg"])
  },
  mounted() {
    if(this.$store.state.sportsMsg.classes){
      this.$store.state.loading = false;
      this.detail = this.$store.state.sportsMsg;
    }
  },
  watch:{
    sportsMsg:function(){
      this.detail = this.$store.state.sportsMsg;
      this.$store.state.loading = false;
    }
  },
  created() {
    this.$store.state.sportsClassMsg = [];
    this.$store.state.loading = true;
    setTimeout(()=>{
      if( this.$store.state.loading == true ){
        this.$store.state.loading = false;
      }
    },5000);
    // setTimeout(()=>{
    //     this.changeLoading(false)
    //     getMoneyDetailList({'questionId':window.localStorage.getItem('moneyQuestionId')}).then(res=>{
    //         if( res.data.errno == 200 ){
    //             this.$set(this,'detail',res.data.data)
    //         }
    //     }).catch()
    // },5000)
  },
  methods:{
    ...mapMutations(["changeLoading","changeSports"]),
    endSports(){
      this.changeSports(1);
      this.$store.state.sportsMsg = [];
    }
  }
});
</script>
<style lang="scss" scoped>
    .box_rankingList{
        display: flex;
        flex-direction: column;
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
        button:hover{
            background: #006ACC;
        }
        .rankinglist-top{
            display: flex;
        }
        .rankinglist-top-icon{
            padding:21px 17px;
        }
        .rankinglist-top-icon img{
            width: 80px;
            height: 80px;
            padding: 0;
        }
        .rankinglist-top-text-1{
            margin:26px 0px 15px 0px;
            height:33px;
            line-height:33px;
            font-size:16px;
            font-family:PingFangSC-Medium;
            color:rgba(51,51,51,1);
        }
        .rankinglist-top-text-2{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
        }
        .top-student-name{
            width:74px;
            height:33px;
            font-size:24px;
            font-family:PingFangSC-Medium;
            color:#FF5921;
            line-height:33px;
            padding-right:10px;
        }
        .top-redpaper-num{
            font-size:24px;
            font-family:PingFangSC-Medium;
            color:#FF5921;
            padding-left:10px;
        }
        .redpaper-num-rankinglist-title{
            height:28px;
            font-size:20px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            line-height:28px;
            text-align:center;
        }
        .rankinglist-top{
            width:912px;
            height:122px;
            background:rgba(255,255,255,1);
            box-shadow:0px 3px 16px 0px rgba(222,222,222,0.8);
            border-radius:4px;
            margin:20px 0px 0px 0px;
        }
        .class-list{
            width:912px;
            padding-bottom:40px;
            background:rgba(246,248,252,1);
            margin-top:30px;
        }
        .class-list>div>ul>li{
           margin:20px 0px 0px 20px;
           width:873px;
           background:rgba(255,255,255,1);
           box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
           border-radius:4px;
           padding:20px 20px 20px 28px;
        }
        .class-list>div>ul>li .class-title{
            font-size:24px;
            font-family:PingFangSC-Medium;
            color:rgba(51,51,51,1);
        }
        .class-student-list ol{
             display: flex;
             margin-top:18px;
        }
        .class-student-list ol li{
             font-size:18px;
             margin-right:30px;
             font-family:PingFangSC-Regular;
        }
        .class-student-list ol .student-name{
             color:RGBA(51, 51, 51, 1);
             
        }
        .class-student-list ol .redpaper-num{
             color:RGBA(237, 128, 40, 1);
             margin:0px 5px 0px 8px;
        }
        
        
       
        .end-button{
            padding:10px 30px;
            text-align: center;
            background:#f39926;
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:30px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            margin:0px auto;
            margin-top:40px;
        }
    }
</style>
