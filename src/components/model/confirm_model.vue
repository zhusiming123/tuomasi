<template>
  <div
    class="confirm_model"
    v-if="modelType"
  >
    <div class="confirm_model_box">
      <p
        class="confirm_model_box_img"
        @click="cancel"
      />
      <p class="confirm_model_box_title">
        {{ title }}
      </p>
      <p class="confirm_model_box_btn">
        <span
          @click="cancel"
          class="confirm_model_box_btn_left"
        >{{ cancelTitle }}</span>
        <span
          @click="makeSure"
          class="confirm_model_box_btn_right"
        >{{ sureTitle }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      modelType:false,
      title:"",
      cancelTitle:"",
      sureTitle:""
    };
  },
  methods:{
    load:function(title,cancelTitle,sureTitle){
      this.title = title,
      this.cancelTitle = cancelTitle;
      this.sureTitle = sureTitle;
    },
    show:function(){
      this.modelType = true;
    },
    makeSure:function(){
      this.modelType = false;
      this.$emit("callback");
    },
    cancel:function(){
      this.modelType = false;
    }
  }
};
</script>
<style lang="scss" scoped>
    .confirm_model{
        z-index: 1000000;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.3);
        text-align: center;
        &_box{
            margin-top: 314px;
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
            &_img:hover{
                background: url('./../../assets/image/close.png') no-repeat;
                background-size: 15px 15px;
            }
            &_title{
                font-size:24px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:37px;
            }
            &_btn{
                margin-top: 36px;
                cursor: pointer;
                span{
                    display: inline-block;
                    border-radius:24px;
                    width: 206px;
                    height: 44px;
                    text-align: center;
                    line-height: 40px;
                }
                &_left{
                    border:2px solid rgba(230,230,230,1);
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    margin-right: 10px;
                }
                &_right{
                    border:2px solid rgba(0,133,255,1);
                    background:rgba(0,133,255,1);
                    border-radius:24px;
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:25px;
                    margin-left: 10px;
                }
                &_right:hover{
                    background: #006ACC;
                     border:2px solid #006ACC;
                }
                &_left:hover{
                    border:2px solid rgba(0,133,255,1);
                }
            }
        }
    }
</style>
