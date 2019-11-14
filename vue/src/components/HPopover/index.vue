<template>
  <el-popover
    :placement="placement"
    v-model="visible"
  >
    <p>{{ title }}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="confirm">确定</el-button>
    </div>
    <slot name="button">
      <el-link slot="reference" :underline="false" type="danger">删除</el-link>
    </slot>
  </el-popover>
</template>

<script>
  export default {
    name: "HPopover",
    props: {
      title: {
        type: String,
        default: ''
      },
      placement: {
        type: String,
        default: 'top'
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      cancel() {
        this.visible = false
        this.$emit('cancel')
      },
      confirm() {
        this.visible = false
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped>

</style>
