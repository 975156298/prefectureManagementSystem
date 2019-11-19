<!--
 参数说明:
         params: Object 查询框的参数。
         pageAlign: String 分页是在左边（left 或者 flex-start)、中间（center）、右边（right 或者 flex-end）。默认：center
         layout: String total（显示总数）, sizes（显示每页多少条的下拉框）, prev（显示上一页）, pager, next（显示下一页）, jumper（显示跳转输入框）。默认：'total, sizes, prev, pager, next, jumper'
         pageSizeArr: Array 分页大小下拉框。默认： [10, 20, 30, 40]
         border: Boolean 表格是否显示边框。默认： false
         columns: Array 表格的列参数。对象可选值。fixed、align、label、prop、width、min-width、sortable、formatter、format。
                  fixed: String, Boolean。 true, left, right。固定在那侧。true代表左侧。
                  align: String left/center/right。默认left。
                  label: String 显示的标题
                  prop: String 对应列内容的字段名
                  sortable: String custom。代表后端排序
                  formatter: 用来格式化内容. Function(row, column, cellValue, index)
                  format: type params
                         type: String 目前支持 date 使用的类型函数。
                         params: Array 函数需要的参数
         selection: Boolean 是否显示多选框 通过绑定 selectionChange 获取勾选的值。默认： false
         defaultSort: Object 默认排序规则。默认值：{}。{prop: 'prop', order: '排序规则。可选值：ascending, descending'}
         getList: Function 查询的接口。通过计算属性进行引入。

-->

<template>
  <div class="h-table" ref="hTable">
    <div ref="search">
      <slot name="search"></slot>
    </div>
    <el-table
      :data="tableData"
      :border="border"
      :height="tableHeight"
      v-loading="loading"
      style="width: 100%"
      :default-sort="defaultSort"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    >
      <el-table-column v-if="selection" type="selection"></el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index + 'columns'"
        :fixed="item.fixed || false"
        :align="item.align || 'left'"
        :label="item.label"
        :prop="item.prop || ''"
        :min-width="item.minWidth || ''"
        :width="item.width || ''"
        :sortable="item.sortable || false"
      >
        <template slot-scope="{row}">
          <slot v-if="item.slot" :name="item.slot" :value="row"></slot>
          <div v-else>{{ formatValue(item, row) }}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="h-page" :style="{'justify-content': hPageAlign}">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-sizes="pageSizeArr"
        :page-size.sync="pageSize"
        :layout="layout"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { DateFormat } from './index'

  export default {
    name: 'HTable',
    data() {
      return {
        tableHeight: 0,
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        hPageAlign: 'center',
        searchParams: {}
      }
    },
    props: {
      // 用于查询框传递参数，方便接口查询
      params: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 分页是在左边（left 或者 flex-start)、中间（center）、右边（right 或者 flex-end）
      pageAlign: {
        type: String,
        default: 'center'
      },
      // 分页的layout 用于显示那些功能组件
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      // 分页大小下拉框
      pageSizeArr: {
        type: Array,
        default: () => {
          return [10, 20, 30, 40]
        }
      },
      // 是否显示边框，默认不显示
      border: {
        type: Boolean,
        default: false
      },
      // 表格的列参数。对象可选值。fixed、align、label、prop、width、min-width、format。
      columns: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 是否显示多选框 通过绑定 selectionChange 获取勾选的值
      selection: {
        type: Boolean,
        default: false
      },
      // 默认排序规则
      defaultSort: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 查询的接口。通过计算属性进行引入。
      getList: {
        type: Function
      }
    },
    mounted() {
      this.setSearchParams()
      this.submit()
      this.$nextTick(() => {
        this.setTableHeight()
      })
      window.addEventListener('resize', this.setTableHeight)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setTableHeight)
    },
    methods: {
      setSearchParams() {
        this.searchParams = {
          ...this.params,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.columns.forEach(item => {
          if (item.sortable) {
            this.searchParams[item.prop] = this.defaultSort.prop === item.prop ? this.defaultSort.order ? this.defaultSort.order : 'ascending' : null
          }
        })
      },
      setTableHeight() {
        if (window.getComputedStyle(this.$refs.hTable)) {
          const height = parseInt(window.getComputedStyle(this.$refs.hTable).height)
          const searchHeight = parseInt(window.getComputedStyle(this.$refs.search).height)
          this.tableHeight = height - searchHeight - 70
        }
      },
      submit() {
        this.loading = true
        this.pageNum = 1
        this.setSearchParams()
        this.getData()
      },
      getData() {
        this.getList(this.searchParams).then(response => {
          this.tableData = response.data.items
          this.total = response.data.total
          this.loading = false
        })
      },
      handleCurrentChange(num) {
        this.searchParams.pageNum = num
        this.loading = true
        this.getData()
      },
      handleSizeChange(pageSize) {
        this.searchParams.pageNum = this.pageNum = 1
        this.searchParams.pageSize = pageSize
        this.loading = true
        this.getData()
      },
      selectionChange(data) {
        this.$emit('selectionChange', data)
      },
      sortChange(column, prop, order) {
        this.columns.forEach(item => {
          if (item.sortable) {
            this.searchParams[item.prop] = null
          }
        })
        this.searchParams[column.prop] = column.order
      },
      formatValue(item, data) {
        const value = data[item.prop]
        if (item.format && item.format.type === 'date') {
          return DateFormat(value, ...item.format.params || [])
        }
        return value
      }
    },
    watch: {
      pageAlign: {
        handler(val) {
          if (val === 'left') {
            this.hPageAlign = 'flex-start'
            return
          }
          if (val === 'right') {
            this.hPageAlign = 'flex-end'
            return
          }
          this.hPageAlign = val
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .h-table {
    height: 100%;
  }
  .h-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
  }
</style>
