<template>
  <el-dropdown @command="handleCommand" size="medium">
    <span class="el-dropdown-link">
      <i class="sfont system-zuixiaohua"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="d in list"
          :key="d.size"
          :command="d.size"
          :disabled=" elementSize === d.size "
        >
          {{ d.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>puted, unref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const elementSize = computed(() => store.state.app.elementSize)
    const list = [
      { size: 'default', name: '默认' },
      { size: 'medium', name: '中' },
      { size: 'small', name: '小' },
      { size: 'mini', name: '迷你' },
    ]
    const { fullPath } = unref(route)
    return {
      list,
      elementSize,
      fullPath
    }
  },
  methods: {
    handleCommand(command) {
      this.$store.commit('app/stateChange', {
        name: 'elementSize',
        value: command
      })
      this.setElementSize()
    },
    setElementSize() {
      this.$ELEMENT.size = this.elementSize
      this.$router.replace({
        path: "/redirect" + this.fullPath
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>