<template>
    <div class="mask" v-if="showType">
        <div class="toast_box">
            <p class="close" @click="makeSure"></p>
            <p class="title">确定结束本次课程吗？</p>
            <div>
                <span class="cancel" @click="cancel">结束上课</span>
                <span class="makesure" @click="makeSure">继续上课</span>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            showType:false
        }
    },
    methods:{
        cancel(){
            this.showType = false
            this.$emit('callback')
        },
        makeSure(){
            this.showType = !this.showType
        }
    },
    created(){

    }
}
</script>
<style lang="scss" scoped>
    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.3);
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        z-index: 1000000;
    }
    .toast_box{
        width: 520px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 58px 40px 40px 40px;
        background: #fff;
        border-radius:6px;
        position: fixed;
        left: center;
        top: 50%;
        margin-top: -200px;
        box-shadow:0px 8px 22px 0px rgba(143,143,143,0.5);
         .close{
            position: absolute;
            right: 0;
            top: 0;
            width: 44px;
            height: 44px;
            background: url('./../../assets/image/close1.png') no-repeat;
            background-position: center center;
            cursor: pointer;
        }
        .close:hover{
             position: absolute;
            right: 0;
            top: 0;
            width: 44px;
            height: 44px;
            background: url('./../../assets/image/close.png') no-repeat;
            background-position: center center;
            cursor: pointer;
        }
        .title{
            text-align: center;
            font-size:26px;
            font-family:PingFangSC-Medium;
            color:rgba(51,51,51,1);
        }
        .remind{
            text-align: left;
            font-size:26px;
            font-family:PingFangSC-Medium;
            color:rgba(51,51,51,1);
        }
        .course{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            margin-top:30px;
        }
        .lesson{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
            margin-top: 18px;
        }
        .time{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
            margin-top: 18px;
        }
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            margin-top: 36px;
            span{
                width: 210px;
                height: 48px;
                text-align: center;
                line-height: 48px;
                border-radius:24px;
                cursor: pointer;
            }
            .cancel{
                border:2px solid rgba(230,230,230,1);
                color:rgba(51,51,51,1);
            }
            .cancel:hover{
                border:2px solid rgba(0,133,255,1);
            }
            .makesure{
                background:#f39926;
                color:#fff;
            }
            .sure{
                width: 100%;
                background:#f39926;
                color:#fff;
            }
            .sure:hover{
                background: #006ACC
            }
            .makesure:hover{
                background: #006ACC
            }
        }
    }
</style>

