//v1.0
import Vue from "vue";
import Router from "vue-router";

const InterError = () => import("@/components/default/interError.vue");
const NoCourse = () => import("@/components/default/noCourse.vue");
const NoLessons = () => import("@/components/default/noLessons.vue");
const Login = () => import("@/pages/login.vue");
const Openbox = () => import("@/pages/common/openBox.vue");
const Topic = () => import("@/pages/common/topic.vue");
const MyLession = () => import("@/pages/myLessons.vue");
const StuMsg = () => import("@/pages/stuMsg.vue");
const LessonDetail = () => import("@/pages/lessonDetail.vue");
const CountMsg = () => import("@/pages/countMsg.vue");
const LessonDetailCount = () => import("@/pages/lessonDetailCount.vue");
const ClassTab = () => import("@/pages/beginClass/classTab.vue");
const Practise = () => import("@/pages/beginClass/practise.vue");
const Report = () => import("@/pages/beginClass/report.vue");
const BackUplate = () => import("@/pages/beginClass/backUplate.vue");
const Sports = () => import("@/pages/beginClass/sports.vue");
const ReportList = () => import("@/pages/beginClass/reportList");

//上传
const Upload = () => import("@/upload/upload");

//v1.1
//忘记密码
const GetPassWord = () => import("@/pages/forgetPassWord/getPassWord");
const GetPassWordOne = () => import("@/pages/forgetPassWord/getPassWordOne");
const GetPassWordTwo = () => import("@/pages/forgetPassWord/getPassWordTwo");
const GetPassWordThree = () => import("@/pages/forgetPassWord/getPassWordThree");

//个人中心
const TeachLesson = () => import("@/components/common/teachLesson");
const Personal = () => import("@/components/common/personal");
const ChangePassWord = () => import("@/pages/personalCenter/changePassWord");
const PersonalMsg = () => import("@/pages/personalCenter/personalMsg");

//备课系统
const Course = () => import("@/pages/prepareLesson/course.vue");
const Lesson = () => import("@/pages/prepareLesson/lesson.vue");
const TabIndex = () => import("@/pages/prepareLesson/tabIndex.vue");

//v1.2
//磨课
const NoDiscuss = () => import("@/pages/discuss/nodiscuss.vue");
const DiscussStatus = () => import("@/pages/discuss/discussStatus.vue");
const DiscussDetail = () => import("@/pages/discuss/discussDetail.vue");

//v1.4
const questionBank = () => import("@/pages/beginClass/questionBank.vue");

//v1.5
const Tool = () => import("@/pages/beginClass/tool.vue");
const CountDown = () => import("@/components/beginClass/tool/countDown.vue");
const Praise = () => import("@/components/beginClass/tool/praise.vue");
const ToolIndex = () => import("@/components/beginClass/tool/tool_index.vue");
const CountDownLoading = () => import("@/components/beginClass/tool/countDownLoading.vue");

const Xylink = () => import("@/pages/beginClass/xylink.vue");
const XylinkEnter = () => import("@/components/beginClass/xylink/xylinkEnter.vue");
const XyControl = () => import("@/components/beginClass/xylink/xyControl.vue");
// 课程控制
const CourseControl = () => import('@/components/beginClass/xylink/courseControl.vue');
Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  },
  routes: [
    {
      path: "/",
      component: Login
    },
    {
      path: "/upload",
      component: Upload
    },
    //忘记密码
    {
      path: "/getPassWord",
      component: GetPassWord,
      children: [
        {
          path: "",
          component: GetPassWordOne
        },
        {
          path: "GetPassWordTwo",
          component: GetPassWordTwo
        },
        {
          path: "GetPassWordThree",
          component: GetPassWordThree
        }
      ]
    },
    //数据统计
    {
      path: "/openbox",
      component: Openbox,
      children: [
        {
          path: "",
          component: CountMsg
        },
        {
          path: "lessonDetailCount",
          component: LessonDetailCount
        },
        {
          path: "interError",
          component: InterError
        },
        //上课页面
        {
          path: "classTab",
          component: ClassTab,
          children: [
            {
              path: "Practise",
              component: Practise
            },
            {
              path: "backUplate",
              component: BackUplate
            },
            {
              path: "sports",
              component: Sports
            },
            {
              path: "report",
              component: Report
            },
            {
              path: "tool",
              component: Tool,
              children: [
                {
                  path: "",
                  component: ToolIndex
                },
                {
                  path: "CountDown",
                  component: CountDown
                },
                {
                  path: "Praise",
                  component: Praise
                },
                {
                  path: "CountDownLoading",
                  component: CountDownLoading
                }
              ]
            },
            {
              path: "xylink",
              component: Xylink,
              children: [
                {
                  path: "",
                  component: XylinkEnter
                },
                {
                  path: "xyControl",
                  component: CourseControl
                }
              ]
            },
            {
              path: "",
              component: questionBank
            }
          ]
        },
        {
          path: "reportList",
          component: ReportList
        }
      ]
    },
    {
      path: "/Topic",
      component: Topic,
      children: [
        {
          path: "course",
          component: Course
        },
        {
          path: "lesson",
          component: Lesson
        },
        {
          path: "tabIndex",
          component: TabIndex
        },
        {
          path: "personal",
          component: Personal,
          children: [
            {
              path: "",
              component: PersonalMsg
            },
            {
              path: "changePassWord",
              component: ChangePassWord
            }
          ]
        },
        {
          path: "",
          component: TeachLesson,
          children: [
            //授课
            {
              path: "",
              component: MyLession
            },

            {
              path: "stuMsg",
              component: StuMsg
            },
            {
              path: "lessonDetail",
              component: LessonDetail
            },
            {
              path: "noCourse",
              component: NoCourse
            },
            {
              path: "noLessons",
              component: NoLessons
            }
          ]
        },
        //磨课
        {
          path: "/noDiscuss",
          component: NoDiscuss
        },
        {
          path: "/discussStatus",
          component: DiscussStatus
        },
        {
          path: "/discussDetail",
          component: DiscussDetail
        }
      ]
    }
  ]
});
