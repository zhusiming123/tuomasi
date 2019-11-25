<template>
    <div class="preLesson">
        <div class="preLesson-null" v-show="list&&list.length==0">
            <img src="@/assets/image/null.png" alt=""/>
            <span>暂无题库题～</span>
        </div>
        <div class="preLesson-content" v-show="list&&list.length!=0">
            <div class="preLesson-list" v-for="(item,index) in list">
                <div class="preLesson-list-header">
                    <div class="preLesson-list-header-left">
                        <span>{{((num-1)*5+index+1)>=10?((num-1)*5+index+1):'0'+((num-1)*5+index+1)}}</span>
                        <p>{{item.questionInfoList.type_info.name}}题</p>
                    </div>
                    <span class="preLesson-list-header-right"  @click="detailTo(item,(num-1)*5+index+1)">题目详情</span>
                </div>
                <div class="preLesson-list-content" v-html="item.questionInfoList.title"><div></div></div>
            </div>
        </div>
         <div class="preLesson-page" v-if="total>5">
            <Page :total="total" :page-size='5' :current='num' @on-change='checkPage' @on-page-size-change='' show-elevator></Page>     
        </div>
    </div>
</template>
<script>
import {getQuestionBank} from '@/api/index.js'
export default {
    data(){
        return{
            total:null,
            list:null
        }
    },
    computed:{
        num:function(){
            return this.$store.state.prepareLessonNum
        }
    },
    created(){
        this.getList(this.num)
    },
    mounted(){
       
    },
    methods:{
        detailTo(item,index){
            this.$store.state.prepareLessonDetail = item
            this.$store.state.prepareLessonDetail.index = index
            this.$store.state.tabnum = 6
        },
        getList:function(num){
            getQuestionBank({'id':window.sessionStorage.getItem('lessonId'),'pageNum':num,'pageSize':5}).then(res=>{
                this.total = res.data.data.total
                this.$set(this,'list',res.data.data.questionList)
            })
        },
        checkPage(num){
            this.$store.state.prepareLessonNum = num
            this.getList(num)
        }
    }
}
</script>
<style lang="scss" scoped>
    .preLesson{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        &-null{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            span{
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(126,139,154,1);
            }
        }
        &-page{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 27px;
        }
        &-content{
            background:rgba(246,248,252,1);
            padding: 25px 20px 5px 20px;
            min-height: 1000px;
        }
        &-list{
            background: #fff;
            margin-bottom: 25px;
            padding: 0 20px 40px 20px;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px;
            
            &-header{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                &-left{
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
                &-right{
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color: #f39926;
                    background: url('./../../assets/image/Group-7.png') no-repeat;
                    background-position: center right;
                    padding-right: 12px;
                    cursor: pointer;
                }
            }
            &-content{
                margin-top: 24px;
                font-size:24px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:33px;
                letter-spacing:2px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>
