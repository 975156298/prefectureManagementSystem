<template>
  <div>
    <ul class="h-page">
      <span v-if="showTotal" class="h-page-total">共 {{total}} 条</span>
      <li
        title="上一页"
        :class="{'h-page-prev': true, 'h-page-disabled': !enablePrev}"
        @click="clickPage(currentPage, -1)">
        <a>
          <i class="el-icon-arrow-left"></i>
        </a>
      </li>
      <li
        v-for="item in pageVal"
        :key="item.pageNum"
        :title="item.pageNum"
        :class="{'h-page-item': true, 'h-page-item-active': item.active}"
        @click="clickPage(item.pageNum)">
        <a>{{item.pageNum}}</a>
      </li>
      <li title="下一页" :class="{'h-page-prev': true, 'h-page-disabled': !enableNext}" @click="clickPage(currentPage, 1)">
        <a>
          <i class="el-icon-arrow-right"></i>
        </a>
      </li>
      <el-select v-model="pageSizeVal" style="width:100px" @change="pageSizeChange">
        <el-option v-for="item in savePageSizeOpts" :value="item.value" :key="item.value">{{ item.label }}</el-option>
      </el-select>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'HPage',
        data() {
            return {
                pageVal: [{ pageNum: 1, active: true }],
                currentPage: 1,
                maxPage: 0,
                pageSize: 10,
                pageSizeVal: '10条/页',
                enablePrev: false,
                enableNext: false,
                savePageSizeOpts: []
            }
        },
        props: {
            defaultPageSize: {
                type: Number,
                default: 10
            },
            current: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            showTotal: {
                type: Boolean,
                default: true
            },
            pageSizeOpts: {
                type: Array,
                default: () => {
                    return [10, 20, 30, 40]
                }
            }
        },
        mounted() {
            this.selectData()
        },
        methods: {
            // -1 代表上一页。 1 代表下一页
            clickPage(page, state = 0) {
                if (state < 0) {
                    page--
                    page = page > 0 ? page : 1
                    if (!this.enablePrev) {
                        return
                    }
                }
                if (state > 0) {
                    page++
                    page = page < this.maxPage ? page : this.maxPage
                    if (!this.enableNext) {
                        return
                    }
                }
                this.currentPage = page
                this.enablePrev = page > 1
                this.enableNext = page < this.maxPage
                this.generatePage()
                for (let i = 0; i < this.pageVal.length; i++) {
                    if (page === this.pageVal[i].pageNum) {
                        this.pageVal[i].active = true
                    } else {
                        this.pageVal[i].active = false
                    }
                }
                this.$emit('on-change', page)
            },
            generatePage(num = 10, activePage = this.currentPage) {
                this.pageVal = []
                const leftNum = Math.ceil(num / 2)
                const rightNum = num - leftNum
                let startVal = activePage - leftNum > 0 ? activePage - leftNum : 1
                let endVal = rightNum + activePage < this.maxPage ? rightNum + activePage : this.maxPage
                if (activePage - leftNum <= 0) {
                    startVal = 1
                    endVal = num
                }
                if (rightNum + activePage > this.maxPage) {
                    startVal = this.maxPage - num + 1 > 0 ? this.maxPage - num + 1 : 1
                    endVal = this.maxPage
                }
                if (activePage - leftNum <= 0 && this.maxPage < num) {
                    startVal = 1
                    endVal = this.maxPage
                }
                for (let i = 0; i < num; i++) {
                    const json = {
                        pageNum: i + startVal,
                        active: false
                    }
                    if (i + startVal === activePage) {
                        json.active = true
                    }
                    if (json.pageNum <= endVal) {
                        this.pageVal.push(json)
                    }
                }
            },
            pageSizeChange(val) {
                this.pageSize = val
                this.pageSizeVal = val + '条/页'
                this.currentPage = 1
                this.maxPage = Math.ceil(this.total / this.pageSize) || 1
                this.generatePage()
                this.enablePrev = this.currentPage > 1
                this.enableNext = this.currentPage < this.maxPage
                this.$emit('on-page-size-change', val)
            },
            selectData() {
                this.savePageSizeOpts = []
                this.pageSizeOpts.forEach((item) => {
                    const val = {
                        label: item + '条/页',
                        value: item
                    }
                    this.savePageSizeOpts.push(val)
                })
            }
        },
        watch: {
            current: {
                handler(val) {
                    this.currentPage = val
                },
                immediate: true
            },
            total: {
                handler(val) {
                    this.maxPage = Math.ceil(val / this.pageSize) || 1
                    this.generatePage()
                    this.enablePrev = this.currentPage > 1
                    this.enableNext = this.currentPage < this.maxPage
                },
                immediate: true
            },
            defaultPageSize: {
                handler(val) {
                    this.pageSize = val
                    this.pageSizeVal = val + '条/页'
                },
                immediate: true
            }
        }
    }
</script>

<style lang="scss" scoped>
  ul, li {
    list-style: none;
  }

  .h-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .h-page-prev {
    margin-right: 4px;
  }

  .h-page-prev, .h-page-next {
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    list-style: none;
    text-align: center;
    cursor: pointer;
    color: #666;
    font-family: Arial;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    transition: all .2s ease-in-out;
    font-size: 12px;
    padding: 0 6px;
  }

  .h-page-item {
    display: inline-block;
    vertical-align: middle;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 4px;
    text-align: center;
    list-style: none;
    background-color: #fff;
    user-select: none;
    cursor: pointer;
    font-family: Arial;
    font-weight: 500;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    transition: border .2s ease-in-out, color .2s ease-in-out;
    font-size: 12px;
  }

  .h-page-item a {
    color: #333;
  }

  .h-page-prev:hover, .h-page-next:hover, .h-page-item:hover {
    border-color: #2d8cf0;
  }

  .h-page-item-active {
    background-color: #397cbf;
    border-color: #397cbf;
  }

  .h-page-item-active:hover a, .h-page-item-active a {
    color: #fff;
  }

  .h-page-disabled {
    cursor: not-allowed;
    border-color: #ccc !important;
  }

  .h-page-disabled a {
    color: #ccc !important;
  }

  .h-page-total {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    font-size: 12px;
  }
</style>
