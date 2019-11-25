<template>
    <div class="box_tab_prepare">
        <div class="header">
            <p>{{courseName}}-<span>{{lessonName}}</span></p>
            <span>{{startTime.split(' ')[0]}} 至 {{endTime.split(' ')[0]}}</span>
        </div>
        <ul>
            <li :class="tabnum==1?'active':''" @click="check(1)">课件</li>
            <li :class="tabnum==2?'active':''" @click="check(2)">讲义</li>
            <li v-if="preClassTest" :class="tabnum==3?'active':''" @click="check(3)">课前测</li>
            <li v-if="midTermTest" :class="tabnum==7?'active':''" @click="check(7)">期中测</li>
            <li v-if="endTermTest" :class="tabnum==8?'active':''" @click="check(8)">期末测</li>
            <li :class="tabnum==4?'active':''" @click="check(4)">教案</li>
            <li :class="tabnum==5||tabnum==6?'active':''" @click="check(5)">题库题目</li>
        </ul>
        <div class="content">
            <div class="content_all">
               <CourseWare v-if="tabnum==1||tabnum==2||tabnum==3||tabnum==4||tabnum==7||tabnum==8"/>
               <QuestionBankDetail v-if="tabnum==6"/>
               <QuestionBankList v-if="tabnum==5"/>
            </div>
        </div>
    </div>
</template>
<script>

import CourseWare from '@/components/prepareLesson/courseWare'
import QuestionBankDetail from '@/components/prepareLesson/questionBankDetail'
import QuestionBankList from '@/components/prepareLesson/questionBankList'

import {mapMutations}  from 'vuex'
export default({
    data(){
        return{
            courseName:'',
            lessonId:'',
            lessonName:'',
            startTime:'',
            endTime:''
        }
    },
    computed: {
        tabnum:function(){
            return this.$store.state.tabnum
        },
        endTermTest:function(){
            return this.$store.state.endTermTest
        },
        midTermTest:function(){
            return this.$store.state.midTermTest
        },
        preClassTest:function(){
            return this.$store.state.preClassTest
        }
    },
    components:{CourseWare,QuestionBankDetail,QuestionBankList},
    methods:{
        ...mapMutations(['changeTeacheDocument']),
        check(num){
            this.$store.state.tabnum = num
            this.changeTeacheDocument(num)
        }
    },
    created() {
        this.$set(this,'courseName',window.sessionStorage.getItem('courseName'))
        this.$set(this,'lessonName',window.sessionStorage.getItem('lessonName'))
        this.$set(this,'startTime',window.sessionStorage.getItem('startTime'))
        this.$set(this,'endTime',window.sessionStorage.getItem('endTime'))
        this.$set(this,'lessonId',window.sessionStorage.getItem('lessonId'))
    },
    beforeDestroy(){
        this.$store.state.prepareLessonNum = 1
    },
})
</script>
<style lang="scss" scoped>
    .box_tab_prepare{
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        .header{
            display: flex;
            flex-direction: column;
            margin-top: 30px;
            p{
                font-size:22px;
                font-family:PingFangSC-Semibold;
                margin-bottom: 12px;
                color:rgba(51,51,51,1);
                span{
                    font-size:18px;
                    color:rgba(51,51,51,1);
                }
            }
            span{
                font-size:16px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(126,139,154,1);
            }
        }
        ul{
            display: flex;
            flex-direction: row;
            margin-top: 18px;
            z-index: 100;
            li{
                font-size:20px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
                padding: 10px 24px;
                border:1px solid rgba(230,230,230,1);
                margin-right: 6px;
                box-sizing: border-box;
                cursor: pointer;
                font-weight: bold;
            }
            .active{
                border: 1px solid #fff;
                background: #fff;
                box-shadow:-3px -6px 16px 0px rgba(205,212,225,0.5);
                color:#f39926;
                font-weight: bold;
            }
        }
        .content{
            z-index: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: -1px;
            margin-bottom: 60px;
            .content_all{
                overflow: hidden;
                width: 1160px;
                min-height: 595px;
                display: inline-block;
                padding: 30px 26px 40px 30px;
                box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
                border-top: 1px solid #e6e6e6;
                background: #fff;
            }
        }
    }
</style>
