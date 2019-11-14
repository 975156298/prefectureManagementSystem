<template>
  <div class="user">
    <header>
      <div v-for="item in buttons" :class="{active: name === item, button: true}" :key="item" @click="changeMenu(item)">{{ item }}</div>
    </header>
    <h-table class="table" ref="hTable" :columns="columns" :getList="getData" :params="formInline" :border="true" page-align="right" selection @selectionChange="selectionChange">
      <template #search>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" placeholder="请输入姓名搜索"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formInline.region" placeholder="请选择类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="死亡方式">
            <el-select v-model="formInline.region" placeholder="请选择死亡方式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
            <el-button type="danger">删除多选</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #edit="{ value }">
        <el-link :underline="false" type="primary" style="margin-right: 10px;">编辑</el-link>
        <h-popover title="您确定删除该条数据吗？" @confirm="delData(value)"></h-popover>
      </template>
    </h-table>

  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import HPopover from "../../components/HPopover/index";

  export default {
    name: "user",
    components: {HPopover},
    data() {
      return {
        buttons: ['阳寿未尽', '孤魂野鬼', '转世投胎', '已删除'],
        name: '阳寿未尽',
        formInline: {
          user: '',
          region: ''
        },
        columns: [
          { label: 'ID', prop: 'id', align: 'center' },
          { label: '姓名', prop: 'author', align: 'center' },
          { label: '寿命', prop: 'pageviews', align: 'center'},
          { label: '类型', prop: 'pageviews', align: 'center'},
          { label: '死亡方式', prop: 'pageviews', align: 'center'},
          { label: '操作', prop: 'operation', slot: 'edit', align: 'center' }
        ],
        visible: false
      }
    },
    computed: {
      getData() {
        return getList
      }
    },
    methods: {
      changeMenu(name) {
        this.name = name
      },
      selectionChange(data) {
        console.log(data, '11111111')
      },
      delData(data) {
        console.log(data, 'del')
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
