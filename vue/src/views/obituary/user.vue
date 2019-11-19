<template>
  <div class="user">
    <header>
      <div v-for="item in buttons" :class="{active: selectBtn === item.value, button: true}" :key="item.value" @click="changeMenu(item)">
        {{ item.label }}
      </div>
    </header>
    <h-table class="table" ref="hTable" :columns="columns" :getList="getData" :params="formInline" :border="true"
             page-align="right" selection @selectionChange="selectionChange">
      <template #search>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="请输入姓名搜索"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formInline.type" placeholder="请选择类型">
              <el-option v-for="item in speciesType" :label="item.label" :value="item.value"
                         :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="死亡方式">
            <el-select v-model="formInline.mode" placeholder="请选择死亡方式">
              <el-option v-for="item in deathMode" :label="item.label" :value="item.value"
                         :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">搜索</el-button>

            <el-popover
              placement="top"
              width="240"
              v-model="popoverVisible">
              <p>您确定删除所选的所有数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="delMultipleData">确定</el-button>
              </div>
              <el-button slot="reference" type="danger">删除多选</el-button>
            </el-popover>
          </el-form-item>
        </el-form>
      </template>
      <template #operation="{ value }">
        <el-link :underline="false" type="primary" style="margin-right: 10px;">编辑</el-link>
        <h-popover title="您确定删除该条数据吗？" @confirm="delData(value)"></h-popover>
      </template>
    </h-table>

  </div>
</template>

<script>
  import {getList, delData, delMultipleData} from '@/api/obituary'
  import {getConfig} from '@/api/common'
  import HPopover from "../../components/HPopover/index";

  export default {
    name: "user",
    components: {HPopover},
    data() {
      return {
        buttons: [
          {label: '阳寿未尽', value: 'unfinishedLife'},
          {label: '孤魂野鬼', value: 'ghost'},
          {label: '转世投胎', value: 'reincarnation'},
          {label: '已删除', value: 'deleted'}
        ],
        selectBtn: 'unfinishedLife',
        formInline: {
          name: '',
          type: '',
          mode: ''
        },
        columns: [],
        columnsList: {
          unfinishedLife: [
            {label: 'ID', prop: 'id', align: 'center'},
            {label: '姓名', prop: 'name', align: 'center'},
            {label: '出生日期', prop: 'createTime', align: 'center'},
            {label: '寿命', prop: 'life', align: 'center'},
            {label: '勾魂日期', prop: 'deathTime', align: 'center'},
            {label: '类型', prop: 'type', align: 'center'},
            {label: '死亡方式', prop: 'deathMode', align: 'center'},
            {label: '操作', prop: 'operation', slot: 'operation', align: 'center'}
          ],
          ghost: [
            {label: 'ID', prop: 'id', align: 'center'},
            {label: '姓名', prop: 'name', align: 'center'},
            {label: '勾魂日期', prop: 'createTime', align: 'center'},
            {label: '寿命', prop: 'life', align: 'center'},
            // {label: '勾魂日期', prop: 'deathTime', align: 'center'},
            {label: '类型', prop: 'type', align: 'center'},
            {label: '死亡方式', prop: 'deathMode', align: 'center'},
            {label: '操作', prop: 'operation', slot: 'operation', align: 'center'}
          ],
          reincarnation: [
            {label: 'ID', prop: 'id', align: 'center'},
            {label: '姓名', prop: 'name', align: 'center'},
            {label: '勾魂日期', prop: 'createTime', align: 'center'},
            {label: '寿命', prop: 'life', align: 'center'},
            {label: '投胎日期', prop: 'deathTime', align: 'center'},
            {label: '类型', prop: 'type', align: 'center'},
            {label: '死亡方式', prop: 'deathMode', align: 'center'},
            {label: '操作', prop: 'operation', slot: 'operation', align: 'center'}
          ],
          deleted: [
            {label: 'ID', prop: 'id', align: 'center'},
            {label: '姓名', prop: 'name', align: 'center'},
            {label: '寿命', prop: 'life', align: 'center'},
            {label: '类型', prop: 'type', align: 'center'},
            {label: '死亡方式', prop: 'deathMode', align: 'center'},
            {label: '操作', prop: 'operation', slot: 'operation', align: 'center'}
          ]
        },
        visible: false,
        popoverVisible: false,
        speciesType: [],
        deathMode: [],
        selectionId: []
      }
    },
    computed: {
      getData() {
        return getList
      }
    },
    created() {
      getConfig({config: ['speciesType', 'deathMode']}).then(res => {
        console.log(res)
        this.speciesType = res.data.items.speciesType
        this.deathMode = res.data.items.deathMode
      })
    },
    mounted() {
      this.columns = this.columnsList[this.selectBtn]
    },
    methods: {
      changeMenu(item) {
        this.selectBtn = item.value
        this.columns = this.columnsList[this.selectBtn]
      },
      selectionChange(data) {
        this.selectionId = data.map(item => {
          return item.id
        })
      },
      search() {
        this.$refs.hTable.submit()
      },
      delData(data) {
        delData(data.id).then(res => {
          this.$refs.hTable.getData()
          this.$message({
            message: data.name + '这条数据删除成功！',
            type: 'success'
          })
        })
      },
      delMultipleData() {
        this.popoverVisible = false
        if (this.selectionId.length > 0) {
          delMultipleData({id: this.selectionId}).then(res => {
            this.$refs.hTable.getData()
            this.$message({
              message: '所选数据全部删除成功！',
              type: 'success'
            })
          })
        } else {
          this.$message({
            message: '请勾选需要删除的数据。',
            type: 'warning'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    padding: 20px 20px 0;
    height: 100%;

    header {
      display: flex;
      margin-bottom: 20px;

      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 40px;
        border-bottom: 2px solid #fff;
        cursor: pointer;
      }

      .active, .button:hover {
        color: #2d8cf0;
        border-bottom-color: #2d8cf0;
      }
    }

    .table {
      height: calc(100% - 60px)
    }
  }
</style>
