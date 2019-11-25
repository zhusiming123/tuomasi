<template>
    <div class="confirm_model" v-if="modelType">
        <div class="confirm_model_box">
            <p class="confirm_model_box_img" @click="cancel"></p>
            <p v-if="!errmsg" class="confirm_model_box_title">通话邀请</p>
            <div v-if="!errmsg">
                <input type="number" v-model="number" placeholder="请输终端号"/>
                <span class="confirm_model_box_tips">{{valueType}}</span>
            </div>
            <p class="confirm_model_box_null" v-if="errmsg">
                <img src="@/assets/image/null.png" alt=""/>
                <span>该终端号不存在！</span>
            </p>
            <p class="confirm_model_box_btn" @click="makeSure">{{errmsg?'确定':'邀请入会'}}</p>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            modelType:false,
            title:'',
            cancelTitle:'',
            sureTitle:'',
            errmsg:null,
            number:null,
            valueType:null
        }
    },
    methods:{
        load:function(title,cancelTitle,sureTitle){
            this.title = title
            this.cancelTitle = cancelTitle
            this.sureTitle = sureTitle
        },
        show:function(){
            this.modelType = true
        },
        makeSure:function(){
            if( this.errmsg ){
                this.modelType = false
                this.errmsg = null
            }else{
                if( this.number==null||this.number=='' ){
                    this.valueType = '终端号不能为空'
                }else{
                    this.errmsg = null
                    this.valueType = null
                    this.$emit('callback',{num:this.number})
                }
                
            }
        },
        cancel:function(){
            this.modelType = false
            this.errmsg = null
            this.valueType = null
        },
        showErr:function(errMsg){
            this.errmsg = errMsg
        }
    }
}
</script>
<style lang="scss" scoped>
    .confirm_model{
        z-index: 10000;
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
           
            div{
                margin-top: 30px;
                display: flex;
                flex-direction: column;
                align-items:flex-start;
            }
            span{
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(126,139,154,1);
            }
            .confirm_model_box_tips{
                margin-top: 12px;
                font-size:12px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,89,33,1);
            }
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
            }
            &_btn{
                width:331px;
                height:48px;
                background:rgba(0,133,255,1);
                box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                border-radius:24px;
                font-size:18px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height: 48px;
                margin-top: 16px;
                cursor: pointer;
            }
            &_null{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 18px;
                img{
                    width: 88px;
                    height: 85px;
                    margin-bottom: 15px;
                }
            }
            &_btn:hover{
                background: #006ACC;
            }
            input{
                width: 329px;
                height: 44px;
                font-size: 14px;
                padding:0 14px;
                border-radius:2px;
                border:1px solid rgba(189,189,189,1);
                
            }
            // &_btn{
            //     margin-top: 36px;
            //     cursor: pointer;
            //     span{
            //         display: inline-block;
            //         border-radius:24px;
            //         width: 206px;
            //         height: 44px;
            //         text-align: center;
            //         line-height: 44px;
            //     }
            //     &_left{
            //         border:2px solid rgba(230,230,230,1);
            //         font-size:18px;
            //         font-family:PingFangSC-Regular;
            //         font-weight:400;
            //         color:rgba(51,51,51,1);
            //         margin-right: 10px;
            //     }
            //     &_right{
            //         border:2px solid rgba(0,133,255,1);
            //         background:rgba(0,133,255,1);
            //         border-radius:24px;
            //         font-size:18px;
            //         font-family:PingFangSC-Regular;
            //         font-weight:400;
            //         color:rgba(255,255,255,1);
            //         line-height:25px;
            //         margin-left: 10px;
            //     }
            //     &_right:hover{
            //         background: #006ACC;
            //          border:2px solid #006ACC;
            //     }
            //     &_left:hover{
            //         border:2px solid rgba(0,133,255,1);
            //     }
            // }
        }
    }
</style>
