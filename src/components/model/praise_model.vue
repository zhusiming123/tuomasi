<template>
  <div
    class="praise_model"
    v-if="praiseType"
  >
    <div class="praise_model_box">
      <p
        class="praise_model_box_img"
        @click="cancel" 
      />
      <img
        v-if="type==0"
        class="praise_model_box_point"
        src="@/assets/image/point_2.png"
      >
      <img
        v-if="type==1"
        class="praise_model_box_point"
        src="@/assets/image/flower.png"
      >
      <div class="praise_model_box_content">
        <span class="praise_model_box_content_title">{{ type==0?'此次奖励积分':'此次奖励小红花' }}</span>
        <div class="praise_model_box_content_num">
          <span
            @mousedown="down($event,2)"
            @mouseup="up($event,2)"
            @mouseout="up($event)"
            @click="reduce"
            class="praise_model_box_content_num_reduce"
          ><b /></span>
          <span class="input">{{ value }}</span>
          <!-- <input type="number" v-model="value" oninput="if(value>5)value=5;if(value<1)value=1"/> -->
          <span
            @mousedown="down($event,1)"
            @mouseup="up($event,1)"
            @mouseout="up($event)"
            @click="add"
            class="praise_model_box_content_num_add"
          ><b /></span>
        </div>
        <span
          class="praise_model_box_content_btn"
          @click="makesure"
        >确 定</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      praiseType:false,
      value:1,
      type:null,
      classid:null
    };
  },
  methods:{
    cancel(){
      this.praiseType = false;
    },
    add(){
      if(parseInt(this.value)+1>5){
        this.value=5;
      }else{
        this.value = parseInt(this.value)+1;
      }
    },
    reduce(){
      if( parseInt(this.value)-1<1){
        this.value =1;
      }else{
        this.value =parseInt(this.value)-1;
      }
    },
    checkType(num,id){
      this.value = 1;
      this.praiseType = true;
      this.type = num;
      this.classid = id;
    },
    makesure(){
      this.$emit("callback",{"value":this.value,"type":this.type,"id":this.classid});
    },
    down:function(e,num){
      if( num==1 ){
        e.currentTarget.className = e.currentTarget.className+" check";
      }else{
        e.currentTarget.className = e.currentTarget.className+" select";
      }
    },
    up:function(e){
      e.currentTarget.className = e.currentTarget.className.split(" ")[0];
    }
  }
};
</script>
<style lang="scss" scoped>
    .praise_model{
        z-index: 10000;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.3);
        text-align: center;
        &_box{
            width: 388px;
            height: 302px;
            margin-top: 264px;
            display: inline-block;
            padding: 40px;
            background: #fff;
            border-radius:6px;
            position: relative;
            &_img{
                display: inline-block;
                position: absolute;
                background: url('./../../assets/image/close1.png') no-repeat;
                background-size: 15px 15px;
                right:11px;
                top: 11px;
                cursor: pointer;
                width: 15px;
                height: 15px;
            }
            &_point{
               margin-top: -120px;
            }
            &_content{
                &_title{
                    font-size:24px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    
                }
                &_num{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding-top: 20px;
                    &_reduce{
                        display: inline-block;
                        background: #f39926;
                        width: 64px;
                        height: 56px;
                        b{
                            display: inline-block;
                            cursor: pointer;
                            width:64px;
                            height:56px;
                            border-radius:2px;
                            background: url('./../../assets/image/reduce_1.png') no-repeat;
                            background-position: center;
                            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                            border-radius:2px;
                        }
                    }
                    &_add{
                        display: inline-block;
                        background: #f39926;
                        width: 64px;
                        height: 56px;
                        b{
                            display: inline-block;
                            cursor: pointer;
                            width:64px;
                            height:56px;
                            border-radius:2px;
                            background: url('./../../assets/image/add_1.png') no-repeat;
                            background-position: center;
                            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                            border-radius:2px;
                        }
                    }
                    .check{
                        background: #006ACC;
                        b{
                            background: url('./../../assets/image/add_2.png') no-repeat;
                            background-position: center;
                        }
                    }
                    .select{
                        background: #006ACC;
                        b{
                            background: url('./../../assets/image/reduce_2.png') no-repeat;
                            background-position: center;
                        }
                    }
                    .input{
                        text-align: center;
                        width:160px;
                        height:56px;
                        background:rgba(255,255,255,1);
                        border-radius:2px;
                        border:1px solid rgba(204,210,217,1);
                        font-size:36px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(5,52,94,1);
                    }
                }
                &_btn{
                    display: inline-block;
                    width:186px;
                    height:48px;
                    border-radius:24px;
                    border:2px solid rgba(0,133,255,1);
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(0,133,255,1);
                    line-height: 44px;
                    margin-top: 30px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
