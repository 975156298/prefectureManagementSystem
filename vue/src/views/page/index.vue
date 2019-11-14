<template>
  <div>
    <h-page :total="total" ></h-page>
  </div>
</template>

<script>
    import HPage from '../../components/HPage/index'
    export default {
        name: 'Page',
        components: { HPage },
        data() {
            return {
                total: 168
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
