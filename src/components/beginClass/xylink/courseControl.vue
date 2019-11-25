<template>
    <div>
        <Card>
            <!--按钮操作部分-->
            <div class="main">
                <div class="main-left">
                    <Button type="primary" size="small" :disabled="isBeginTeaching" @click="beginTeaching">开始教学</Button>
                    <Button type="warning" size="small" :disabled="isEndTeaching" @click="endTeaching">结束教学</Button>
                    <Button type="warning" size="small" :disabled="isResetTeaching" @click="resetTeaching">重置教学计划</Button>
                    <Button type="warning" size="small" @click="allDisconnect">一键断开（{{disConnectNum}}）</Button>
                    <Button type="primary" size="small" @click="allConnect">一键连接（{{ connectNum }}）</Button>
                    <Button type="warning" size="small" @click="classroomOnlyListenSpeaker">教室仅听主讲麦</Button>
                </div>
                <div class="main-right">
                    <Input v-model="inputDeviceId" size="small" placeholder="请输入设备ID" clearable class="main-input"></Input>
                    <Button type="primary" size="small" @click="addDevice">添加</Button>
                </div>
            </div>
        </Card>
        <!--表格部分-->
        <div class="footer">
                <Table border :columns="columns" :data="courseControlList" height="500"></Table>
            </div>
        <!--编辑dialog-->
        <Modal
                v-model="isShowEditDialog"
                title="编辑"
                :closable="false"
                :mask-closable="false"
                @on-ok="handleConfirmEiit"
                @on-cancel="handleCancelEdit">
            <Form :model="editForm" :label-width="80">
                <FormItem label="教室">
                    <Select v-model="editForm.classRoom" placeholder="请选择教室" @on-change="handleChangeRoomEdit">
                        <Option v-for="item in editClassRoomList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Spin size="large" fix v-if="fullscreenLoading"></Spin>
    </div>
</template>

<script>
  import courseControlAPi from '@/api/courseControl'
  import VolumeSlidar from './VolumeSlider'
  import { debounce } from '@/utils/debounce'
  export default {
    name: 'courseControl',
    components: {
      VolumeSlidar
    },
    data () {
      return {
        // loading状态
        fullscreenLoading: false,
        // 课程状态
        scheduleStatus: '',
        // 开始教学按钮是否禁用
        isBeginTeaching: true,
        // 结束教学按钮是否禁用
        isEndTeaching: true,
        // 重置教学计划按钮是否禁用
        isResetTeaching: true,
        // 一键断开显示数目
        disConnectNum: 0,
        // 一键连接显示数目
        connectNum: 0,
        // 设备Id输入
        inputDeviceId: '',
        // 表格表头
        columns:[
          {
            title:'机构',
            key: 'tenant_name'
          },
          {
            title: '设备ID',
            key: 'application_id'
          },
          {
            title: '版本号',
            key: 'client_version'
          },
          {
            title: '教室名称',
            key: 'room_name',
            render:(h,params)=>{
              return h('p',{
                props:{
                  title: params.row.room_name
                }
              },params.row.room_name)
            }
          },
          {
            title: '类型',
            render:(h,params)=>{
              return h('div',{},this.checkClassRoomType(params.row))
            }
          },
          {
            title: '通信状态',
            render:(h,params)=>{
              return h('div',{},params.row.application_status==='on'?'已连接':'未连接')
            }
          },
          {
            title:'应用状态',
            key: 'application_state'
          },
          {
            title: '基础会控',
            render:(h,params)=>{
              return h('div',[
                h('Tooltip',{
                  props:{
                    content: '连接',
                    placement: 'top'
                  }
                },[
                    h('i',{
                      style:{
                        color: '#5daf34'
                      },
                      class: 'iconfont icon-connect icon-size',
                      on:{
                        click: ()=>{
                          this.oneConnect(params.row)
                        }
                      }
                    })
                ]),
                h('Tooltip',{
                  props:{
                    content: '断开',
                    placement: 'top'
                  }
                },[
                  h('i',{
                    style:{
                      color: '#dd6161'
                    },
                    class: 'iconfont icon-disconnect icon-size',
                    on:{
                      click: ()=>{
                        this.oneDisConnect(params.row)
                      }
                    }
                  })
                ]),
                h('Tooltip',{
                  props:{
                    content: '开关麦克风',
                    placement: 'top'
                  },
                  style:{
                    display:(params.row.link&&params.row.room_type!=='studio')?'inline-block':'none'
                  }
                },[
                  h('i',{
                    style:{
                      color: params.row.mic_is_connect ? '#5daf34': '#dd6161'
                    },
                    class: 'iconfont icon-maikefeng icon-size',
                    on:{
                      click: ()=>{
                        this.switchMic(params.row)
                      }
                    }
                  })
                ]),
                h('Tooltip',{
                  props:{
                    content: '切换幕布',
                    placement: 'top'
                  }
                },[
                  h('i',{
                    style:{
                      display: (params.row.room_type==='studio')?'inline-block':'none'
                    },
                    class: 'iconfont icon-icon-pingmuqiehuan icon-size',
                    on:{
                      click: ()=>{
                        this.switchScreen(params.row)
                      }
                    }
                  })
                ]),
                h('Tooltip',{
                  props:{
                    content: '置顶',
                    placement: 'top'
                  },
                  style:{
                    display: params.row.link?'inline-block':'none'
                  }
                },[
                  h('i',{
                    style:{
                      display: (params.row.room_type!=='studio')?'inline-block':'none'
                    },
                    class: 'iconfont icon-zhiding icon-size',
                    on:{
                      click: ()=>{
                        this.screenTop(params.row)
                      }
                    }
                  })
                ]),
              ])
            }
          },
          {
            title:'音量控制',
            minWidth: 150,
            render: (h,params)=>{
              return h('div',{
                style:{
                  display: params.row.link?'block':'none'
                }
              },[
                  h('Progress',{
                    props:{
                      percent:Math.round(params.row.application_mic_volume/65535*100)
                    }
                  }),
                  h(VolumeSlidar,{
                  props:{
                    isDisabled: this.isVolumeSlidar
                  },
                  on:{
                    'volumeChange':(item)=>{
                      this.changeVolume(item,params.row)
                    }
                  }
                })
              ])
            }
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div',{
                style:{
                  display:params.row.have_room?'inline-block':'none'
                }
              },[
                h('Icon', {
                  props: {
                    type: 'edit',
                    size:'16'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params.row)
                    }
                  }
                }, '编辑'),
                h('Icon', {
                  props: {
                    type: 'trash-a',
                    size: '18'
                  },
                  style:{
                    display:params.row.room_type==='classroom'?'inline-block':'none'
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.index,params.row,this.courseControlList)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        // 课表控制表格list
        courseControlList: [],
        // 音量是够可以控制
        isVolumeSlidar: false,
        // 轮询控制器
        loopControl: null,
        // 编辑dialog显示隐藏
        isShowEditDialog: false,
        // 编辑form
        editForm: {
          classRoom: ''
        },
        // 编辑教室下拉
        editClassRoomList: [],
        // 编辑暂存数据
        editTempIdAndRoomType: {},
        // scheduleId
        scheduleId: window.localStorage.getItem('scheduleId'),
        // tenantKey
        tenantKey: window.localStorage.getItem('tenantKey')
      }
    },
    mounted () {
      this.query()
    },
    destroyed () {
      clearInterval(this.loopControl)
      this.loopControl = null
    },
    methods: {
      // 第一次进入查询
      query () {
        const postData = {
          'schedule_id': this.scheduleId
        }
        courseControlAPi.loopQueryscheduleApi(postData, true).then(res => {
          if (res.status_code === 200) {
            if (res.data.live_room_data !== null) {
              res.data.live_room_data.room_name = res.data.live_room_data.live_room_name
              this.courseControlList.push(res.data.live_room_data)
            }
            if (res.data.room_datas.length !== 0) {
              this.courseControlList.push(...res.data.room_datas)
            }
            if (res.data.no_room_datas.length !== 0) {
              this.courseControlList.push(...res.data.no_room_datas)
            }
            this.disConnectNum = res.data.schedule.links
            this.connectNum = res.data.schedule.break_links
            this.scheduleStatus = res.data.schedule.schedule_status
            if (res.data.schedule.schedule_status === 'notopenclass') {
              this.isBeginTeaching = false
              this.isEndTeaching = true
              this.isResetTeaching = true
              this.isVolumeSlidar = true
            }
            if (res.data.schedule.schedule_status === 'teaching') {
              this.isBeginTeaching = true
              this.isEndTeaching = false
              this.isResetTeaching = true
              this.isVolumeSlidar = false
            }
            if (res.data.schedule.schedule_status === 'finished') {
              this.isBeginTeaching = true
              this.isEndTeaching = true
              this.isResetTeaching = false
              this.isVolumeSlidar = true
            }
            this.fullscreenLoading = false
            this.loopQueryschedule()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 会控页面轮询数据
      loopQueryschedule (wait = 3000) {
        if (this.loopControl) {
          clearInterval(this.loopControl)
        }
        if (!document.querySelector('.main')) {
          return false
        }
        this.loopControl = setInterval(() => {
          courseControlAPi.loopQueryscheduleApi({ 'schedule_id': this.scheduleId }, true).then(res => {
            if (res.status_code === 200) {
              this.courseControlList = []
              if (res.data.live_room_data !== null) {
                res.data.live_room_data.room_name = res.data.live_room_data.live_room_name
                this.courseControlList.push(res.data.live_room_data)
              }
              if (res.data.room_datas.length !== 0) {
                this.courseControlList.push(...res.data.room_datas)
              }
              if (res.data.no_room_datas.length !== 0) {
                this.courseControlList.push(...res.data.no_room_datas)
              }
              this.disConnectNum = res.data.schedule.links
              this.connectNum = res.data.schedule.break_links
              this.scheduleStatus = res.data.schedule.schedule_status
              if (res.data.schedule.schedule_status === 'notopenclass') {
                this.isBeginTeaching = false
                this.isEndTeaching = true
                this.isResetTeaching = true
                this.isVolumeSlidar = true
              }
              if (res.data.schedule.schedule_status === 'teaching') {
                this.isBeginTeaching = true
                this.isEndTeaching = false
                this.isResetTeaching = true
                this.isVolumeSlidar = false
              }
              if (res.data.schedule.schedule_status === 'finished') {
                this.isBeginTeaching = true
                this.isEndTeaching = true
                this.isResetTeaching = false
                this.isVolumeSlidar = true
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }, wait)
      },
      // 开始教学
      beginTeaching () {
        const postData = {
          'schedule_id': this.scheduleId
        }
        courseControlAPi.beginTeachingApi(postData).then(res => {
          if (res.status_code === 200) {
            this.isBeginTeaching = true
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 结束教学
      endTeaching () {
        const postData = {
          'schedule_id': this.scheduleId
        }
        courseControlAPi.endTeachingApi(postData).then(res => {
          if (res.status_code === 200) {
            this.isEndTeaching = true
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 重置教学计划
      resetTeaching () {
        const postData = {
          'schedule_id': this.scheduleId
        }
        courseControlAPi.resetTeachingApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 一键断开
      allDisconnect () {
        if (!this.checkScheduleStatus()) {
          return false
        }
        const postData = {
          'scheduleId': this.scheduleId
        }
        courseControlAPi.allDisconnectApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 一键连接
      allConnect () {
        if (!this.checkScheduleStatus()) {
          return false
        }
        if (this.scheduleStatus === 'finished') {
          this.$Message.error('课程已结束')
          return false
        }
        const postData = {
          'scheduleId': this.scheduleId
        }
        courseControlAPi.allConnectApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 教室仅听主讲麦
      classroomOnlyListenSpeaker () {
        if (!this.checkScheduleStatus()) {
          return false
        }
        if (this.scheduleStatus === 'finished') {
          this.$Message.error('课程已结束')
          return false
        }
        const postData = {
          'applicationId': this.courseControlList[0].application_id,
          'command': 5
        }
        courseControlAPi.classroomOnlyListenSpeakerApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 添加设备(添加临时班级）
      addDevice () {
        if (!this.checkScheduleStatus()) {
          return false
        }
        const postData = {
          'application_id': this.inputDeviceId,
          'schedule_id': this.scheduleId
        }
        courseControlAPi.addDeviceApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
            this.inputDeviceId = ''
          } else {
            this.$Message.error(res.message)
          }
        })
      },
      // 设置教室状态
      checkClassRoomType: function (row) {
        if (row.room_type === 'studio' && !row.is_temp) {
          return '老师端'
        } else if (row.room_type === 'classroom' && !row.is_temp) {
          return '学生端'
        } else {
          return '临时教室'
        }
      },
      // 单个连接
      oneConnect (row) {
        if (!this.checkScheduleStatus()) {
          return false
        }
        const postData = {
          'scheduleId': this.scheduleId,
          'applicationId': row.application_id
        }
        courseControlAPi.oneConnectApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 单个断开
      oneDisConnect (row) {
        if (!this.checkScheduleStatus()) {
          return false
        }
        const postData = {
          'scheduleId': this.scheduleId,
          'applicationId': row.application_id
        }
        courseControlAPi.oneDisConnectApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 切换麦克风
      switchMic (row) {
        if (!this.checkScheduleStatus()) {
          return false
        }
        // const postData = {
        //   'applicationId': row.application_id,
        //   'state': row.application_mic_is_open ? 0 : 1
        // }
        // courseControlAPi.switchMicApi(postData).then(res => {
        //   if (res.status_code === 200) {
        //     this.$message.success('操作成功')
        //   } else {
        //     this.$message.error(res.message)
        //   }
        // }).catch(err => {
        //   console.log(err)
        // })
        const postData = {
          'applicationId': row.application_id,
          'command': row.mic_is_connect ? 2 : 1
        }
        courseControlAPi.classroomOnlyListenSpeakerApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 切换幕布
      switchScreen (row) {
        if (!this.checkScheduleStatus()) {
          return false
        }
        const postData = {
          'applicationId': row.application_id
        }
        courseControlAPi.switchScreenApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 置顶
      screenTop (row) {
        if (!this.checkScheduleStatus()) {
          return false
        }
        const postData = {
          'application_id': row.application_id,
          'schedule_id': this.scheduleId
        }
        courseControlAPi.screenTopApi(postData).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 音量改变
      changeVolume (item, row) {
        if (!this.checkScheduleStatus()) {
          return false
        }
        debounce(func, 50, false)()
        const that = this
        function func () {
          const postData = {
            'applicationId': row.application_id,
            'volumeSize': Math.round(item / 100 * 65535)
          }
          courseControlAPi.changeVolumeApi(postData).then(res => {
            if (res.status_code === 200) {
              that.$Message.success('操作成功')
            } else {
              that.$Message.error(res.message)
            }
          })
        }
      },
      // 编辑
      handleEdit (row) {
        if (this.scheduleStatus === 'finished') {
          this.$Message.error('课程已结束')
          return false
        }
        this.editTempIdAndRoomType = {}
        const postData = {
          'id': row.id,
          'room_type': row.room_type
        }
        this.editTempIdAndRoomType = {
          'id': row.id,
          'roomType': row.room_type,
          'roomId': row.room_id
        }
        courseControlAPi.queryRoomByEditApi(postData).then(res => {
          if (res.status_code === 200) {
            this.editClassRoomList = res.data
            this.editForm.classRoom = row.room_name
            this.isShowEditDialog = true
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 编辑下拉教室改变方法
      handleChangeRoomEdit (item) {
        this.editTempIdAndRoomType.roomId = item
      },
      // 编辑取消方法
      handleCancelEdit () {
        this.isShowEditDialog = false
      },
      // 编辑确定方法
      handleConfirmEiit () {
        const postData = {
          'schedule_id': this.scheduleId,
          'id': this.editTempIdAndRoomType.id,
          'room_id': this.editTempIdAndRoomType.roomId,
          'room_type': this.editTempIdAndRoomType.roomType
        }
        courseControlAPi.confirmEditApi(postData, true).then(res => {
          if (res.status_code === 200) {
            this.$Message.success('操作成功')
            this.isShowEditDialog = false
          } else {
            this.$Message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 删除
      handleDelete (index, row, courseControlList) {
        if (this.scheduleStatus === 'finished') {
          this.$Message.error('课程已结束')
        } else {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>是否删除课表中的该成员</p>',
            onOk: () => {
              const postData = {
                'schedule_id': this.scheduleId,
                'id': row.id
              }
              courseControlAPi.deleteClassRoomApi(postData).then(res => {
                courseControlList.splice(index, 1)
                this.$Message.success('操作成功')
              }).catch(err => {
                console.log(err)
              })
            },
            onCancel: () => {
              this.$Message.info('已取消删除')
            }
          })
          //this.$confirm('是否删除课表中的该成员?', '提示', {
          //  confirmButtonText: '确定',
          //  cancelButtonText: '取消',
          //  type: 'warning'
          //}).then(() => {
          //  const postData = {
          //    'schedule_id': this.scheduleId,
          //    'id': row.id
          //  }
          //  courseControlAPi.deleteClassRoomApi(postData).then(res => {
          //    courseControlList.splice(index, 1)
          //    this.$Message.success('操作成功')
          //  }).catch(err => {
          //    console.log(err)
          //  })
          //}).catch(() => {
          //  this.$Message.info('已取消删除')
          //})
        }
      },
      checkScheduleStatus () {
        let flag = true
        if (this.scheduleStatus === 'notopenclass') {
          this.$Message.error('课程未开始')
          flag = false
        }
        if (this.scheduleStatus === 'finished') {
          this.$Message.error('课程已结束')
          flag = false
        }
        return flag
      }
    }
  }
</script>

<style scoped>
    .header-title{
        display:inline-block;
        padding:2px 20px 2px 0px;
        border-right:1px solid #000;
    }
    .main{
        padding:10px 0px;
    }
    .main-left ,.main-right{
        display: inline-block;
    }
    .main-left Button{
        margin-right:5px;
    }
    .main-right{
        float: right;
    }
    .main-input{
        width:200px;
        margin:0px 10px;
    }
    .footer{
        padding:10px 0px;
    }
    .el-table{
        border-radius:10px;
    }
    .icon-size{
        font-size:1.5em;
        margin-right:10px;
        cursor: pointer;
    }
    @media only screen and (max-width: 1186px){
        .main-left{
            width:100%;
        }
        .main-right{
            float: none;
            margin-top:10px;
        }
        .main-input{
            margin-left:0px;
        }
    }
    .line-two{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;  /*控制多行的行数*/
        -webkit-box-orient: vertical;
        max-height:79px;
    }
    .header-course-name{
        padding-left:10px;
    }
</style>
<style>
    .el-table .cell{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;  /*控制多行的行数*/
        -webkit-box-orient: vertical;
    }
</style>
