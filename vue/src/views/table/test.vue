<template>
  <div class="main">
    <h-table ref="hTable" :columns="columns" :getList="getData" :params="formInline" :border="true" page-align="right" :default-sort="{prop: 'pageviews', order: 'descending'}" selection @selectionChange="selectionChange">
      <template #search>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #edit="{ value }">
        <div @click="editVal(value)">edit</div>
      </template>
    </h-table>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
	export default {
		name: 'Test',
		data() {
			return {
        formInline: {
          user: '',
          region: ''
        },
        columns: [
          { label: 'Title', prop: 'title' },
          { label: 'Author', prop: 'author', width: 110, align: 'center', sortable: 'custom' },
          { label: 'Pageviews', prop: 'pageviews', width: 180, sortable: 'custom', format: { type: 'date' }},
          { label: 'Display_time', prop: 'display_time', width: 200, slot: 'edit' }
        ]
      }
		},
    computed: {
      getData() {
        return getList
      }
    },
		methods: {
      onSubmit() {
        this.$refs.hTable.submit()
      },
      editVal(data) {
        console.log(data.pageviews, '111111111111111111111')
      },
      selectionChange(data) {
        console.log(data, 222222222222)
      }
    }
	}
</script>

<style scoped>
  .main {
    position: absolute;
    padding: 20px 20px 0;
    height: 100%;
  }
</style>
