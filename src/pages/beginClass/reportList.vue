<template>
  <div class="report-list">
    <h3 class="list-name">
      {{ className }}
    </h3>
    <div class="search-box">
      <span>选择班级：</span>
      <Select
        v-model="selectedClass"
        @on-change="changeTableData"
        style="width:150px"
      >
        <Option
          v-for="item in classList"
          :value="item.id"
          :key="item.id"
        >
          {{ item.name }}
        </Option>
      </Select>
    </div>
    <div class="data-list">
      <Table
        border
        :columns="columns"
        :data="dataList" 
      />
    </div>
  </div>
</template>

<script>
import { getClassList, getReportList } from "@/api/index";

export default {
  name: "ReportList",
  data () {
    return {
      className: localStorage.getItem("lessonName") || "",
      classList: [],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "姓名",
          key: "student",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.student.name)
            ]);
          }
        },
        {
          title: "答对次数",
          key: "rightCount"
        },
        {
          title: "答错次数",
          key: "wrongCount"
        },
        {
          title: "题目数",
          key: "practiceCount"
        },
        {
          title: "正确率",
          key: "correctRate",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.correctRate + "%")
            ]);
          }
        }
      ],
      dataList: [],
      selectedClass: ""
    };
  },
  created () {
    getClassList({lessonId: localStorage.getItem("lessonId")}).then(res => {
      if (res.data.errno === 200 && res.data.data.length > 0) {
        this.classList = res.data.data;
        this.selectedClass = this.classList[0].id;
      } else {
        this.$Message.show("获取数据异常，请稍后再试");
      }
    }).then(() => {
      getReportList({
        lessonId: localStorage.getItem("lessonId"),
        classId: this.selectedClass
      }).then(res => {
        if (res.data.errno === 200) {
          this.dataList = res.data.data.students;
          this.dataList.forEach((item) => {
            item.practiceCount = res.data.data.practiceCount;
          });
        } else {
          this.$Message.show("获取数据异常，请稍后再试");
        }
      });
    });
  },
  methods: {
    changeTableData () {
      getReportList({
        lessonId: localStorage.getItem("lessonId"),
        classId: this.selectedClass
      }).then(res => {
        if (res.data.errno === 200) {
          this.dataList = res.data.data.students;
          this.dataList.forEach((item) => {
            item.practiceCount = res.data.data.practiceCount;
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .report-list {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 25px;
    .list-name {
      margin-bottom: 10px;
      font-size: 18px;
    }
    .search-box {
      margin-bottom: 20px;
    }
  }
</style>
