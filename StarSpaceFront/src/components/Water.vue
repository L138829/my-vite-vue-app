<template>
  <section class="page-container">
    <!-- 左侧可折叠菜单 -->
    <aside class="sidebar">
      <div class="menu-title" @click="toggleMenu">
        <span>水华遥感</span>
        <span class="arrow" :class="{ open: isOpen }">▸</span>
      </div>
      <ul v-show="isOpen" class="menu-list">
        <li
          v-for="(river, i) in rivers"
          :key="i"
          :class="{ active: selectedRiver === river }"
          @click="selectRiver(river)"
        >{{ river }}</li>
      </ul>

      <div class="menu-title" @click="toggleMenu2">
        <span>反演指标</span>
        <span class="arrow" :class="{ open: isOpen2 }">▸</span>
      </div>
      <ul v-show="isOpen2" class="menu-list">
        <li
          v-for="(ind, i) in inversionIndicators"
          :key="i"
          :class="{ active: selectedIndicator === ind }"
          @click="selectIndicator(ind)"
        >{{ ind }}</li>
      </ul>
    </aside>

    <!-- 右侧内容区 -->
    <main class="content">
      <!-- 光谱原始数据表格 -->
      <div v-if="selectedIndicator === '光谱原始数据'" class="table-wrapper" style="width: 800px; margin-left: 200px;">
        <el-table
          :data="paginatedData"
          stripe
          style="width: 800px;"
        >
          <el-table-column prop="index" label="序号" width="80" />
          <el-table-column prop="spectData" label="光谱原始数据">
            <template #default="{ row }">
              <div class="ellipsis">{{ row.spectData }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template #default="{ row }">
              <el-button
                type="text"
                @click="openFullData(row.spectData)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          v-model:current-page="currentPage"
          :total="rawData.length"
          @current-change="handlePageChange"
          style="width: 800px; text-align: right; margin-top: 10px;"
        />
      </div>

      <!-- 河流/其它指标图片 -->
      <div v-else-if="selectedRiver" class="image-wrapper">
        <img :src="imageUrl" :alt="imageAlt" class="river-image" @click="toggleFullscreen" />
      </div>
      <div v-else-if="selectedIndicator" class="image-wrapper">
        <img :src="imageUrl" :alt="imageAlt" class="indicator-image" @click="toggleFullscreen" />
      </div>

      <!-- 未选择提示 -->
      <div v-else class="placeholder">
        请在左侧选择一个河流或反演指标
      </div>

      <!-- 全屏查看图片 -->
      <div v-if="isFullscreen" class="fullscreen-wrapper" @click="toggleFullscreen">
        <img :src="imageUrl" :alt="imageAlt" class="fullscreen-image" />
      </div>

      <!-- 全屏查看原始数据 -->
      <div v-if="isDataFullScreen" class="data-overlay" @click="closeFullData">
        <pre class="full-text">{{ fullDataText }}</pre>
      </div>
    </main>
  </section>
</template>

<script>
import { ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
import { data as spectralList } from '../data/data.js'

const images = import.meta.glob('../Picture/*.png', {
  eager: true,
  query: '?url',
  import: 'default'
})

const riverImageMap = {
  '大宁河': 'daninghe.png',
  '龙溪河': 'longxihe.png',
  '酉水河': 'youshuihe.png',
  '澎溪河': 'pengxihe.png'
}

const indicatorImageMap = {
  '叶绿素a': '叶绿素a.png',
  '浊度': '浊度.png',
  '有色溶解性有机物': '有色溶解性有机物.png',
  '水面温度': '水面温度.png',
  '透明度': '透明度.png',
  '藻蓝蛋白': '藻蓝蛋白.png',
  '营养状态指数': '营养状态指数.png',
  '化学需氧量': '化学需氧量.png',
  '总有机碳': '总有机碳.png',
  '溶解氧': '溶解氧.png'
}

export default {
  name: 'Water',
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
    ElButton
  },
  data() {
    return {
      rivers: ['大宁河','龙溪河','酉水河','澎溪河'],
      inversionIndicators: [
        '叶绿素a','浊度','有色溶解性有机物','水面温度',
        '透明度','藻蓝蛋白','营养状态指数','化学需氧量',
        '总有机碳','溶解氧','光谱原始数据'
      ],
      selectedRiver: '大宁河',
      selectedIndicator: null,
      isOpen: true,
      isOpen2: false,
      isFullscreen: false,

      rawData: [],
      currentPage: 1,
      pageSize: 10,
      tableHeight: 400,

      // 文本全屏展示
      isDataFullScreen: false,
      fullDataText: ''
    }
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.rawData.slice(start, start + this.pageSize)
    },
    imageUrl() {
      if (this.selectedIndicator && this.selectedIndicator !== '光谱原始数据') {
        const f = indicatorImageMap[this.selectedIndicator]
        return images[`../Picture/${f}`] || ''
      }
      if (this.selectedRiver) {
        const f = riverImageMap[this.selectedRiver]
        return images[`../Picture/${f}`] || ''
      }
      return ''
    },
    imageAlt() {
      return this.selectedIndicator || this.selectedRiver || ''
    }
  },
  methods: {
    toggleMenu()     { this.isOpen = !this.isOpen },
    toggleMenu2()    { this.isOpen2 = !this.isOpen2 },
    selectRiver(r)   {
      this.selectedRiver = r
      this.selectedIndicator = null
      this.isFullscreen = false
    },
    selectIndicator(ind) {
      this.selectedIndicator = ind
      this.selectedRiver = null
      this.isFullscreen = false
      if (ind === '光谱原始数据') {
        this.rawData = spectralList.map((it, i) => ({
          index: i + 1,
          spectData: it.raw_spec_text
        }))
        this.currentPage = 1
      }
    },
    handlePageChange(page) { this.currentPage = page },
    openFullData(text) {
      this.fullDataText = text
      this.isDataFullScreen = true
    },
    closeFullData() {
      this.isDataFullScreen = false
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 200px;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  box-sizing: border-box;
}
.menu-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}
.arrow {
  transition: transform .2s;
}
.arrow.open {
  transform: rotate(90deg);
}
.menu-list {
  list-style: none;
  margin: 8px 0;
  padding: 0;
}
.menu-list li {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color .2s;
}
.menu-list li:hover {
  background-color: #f5f5f5;
}
.menu-list li.active {
  background-color: #409EFF;
  color: #fff;
}

.content {
  flex: 1;
  padding: 20px;
  position: relative;
}
.table-wrapper {
  width: 800px;
  margin-left: 200px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 全屏文本覆盖 */
.data-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
/* 替换原来的 .full-text 样式 */
.full-text {
  white-space: pre-wrap;    /* 换行 */
  word-break: break-all;    /* 长词语也能换行 */
  overflow-y: auto;         /* 只允许纵向滚动 */
  overflow-x: hidden;       /* 禁止横向滚动 */
  padding: 20px;
  background: #fff;
  max-height: 90vh;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}


.image-wrapper {
  width: calc(100% - 200px);
  margin-left: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.river-image, .indicator-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.placeholder {
  color: #999;
  font-size: 16px;
  text-align: center;
  margin-top: 100px;
}
.fullscreen-wrapper {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
</style>
