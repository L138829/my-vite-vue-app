<template>
  <section class="page-container">
    <!-- 左侧可折叠目录 -->
    <aside class="sidebar">
      <div class="menu-title" @click="toggleMenu">
        <span>水华遥感</span>
        <span class="arrow" :class="{ open: isOpen }">▸</span>
      </div>
      <ul v-show="isOpen" class="menu-list">
        <li
          v-for="(river, index) in rivers"
          :key="index"
          :class="{ active: selectedRiver === river }"
          @click="selectRiver(river)"
        >
          {{ river }}
        </li>
      </ul>

      <div class="menu-title" @click="toggleMenu2">
        <span>反演指标</span>
        <span class="arrow" :class="{ open: isOpen2 }">▸</span>
      </div>
      <ul v-show="isOpen2" class="menu-list">
        <li
          v-for="(indicator, index) in inversionIndicators"
          :key="index"
          :class="{ active: selectedIndicator === indicator }"
          @click="selectIndicator(indicator)"
        >
          {{ indicator }}
        </li>
      </ul>
    </aside>

    <!-- 右侧内容展示区域 -->
    <main class="content">
      <!-- 河流图片 -->
      <div v-if="selectedRiver" class="image-wrapper">
        <img
          :src="imageUrl"
          :alt="imageAlt"
          class="river-image"
          @click="toggleFullscreen"
        />
      </div>
      <!-- 指标图片 -->
      <div v-else-if="selectedIndicator" class="image-wrapper">
        <img
          :src="imageUrl"
          :alt="imageAlt"
          class="indicator-image"
          @click="toggleFullscreen"
        />
      </div>
      <!-- 未选择时提示 -->
      <div v-else class="placeholder">
        请在左侧选择一个河流或反演指标
      </div>

      <!-- 全屏展示 -->
      <div
        v-if="isFullscreen"
        class="fullscreen-wrapper"
        @click="toggleFullscreen"
      >
        <img
          :src="imageUrl"
          :alt="imageAlt"
          class="fullscreen-image"
        />
      </div>
    </main>
  </section>
</template>

<script>
// 动态导入所有图片
const images = import.meta.glob('../Picture/*.png', { eager: true, as: 'url' });

// 中英文名称到文件名的映射
const riverImageMap = {
  '大宁河': 'daninghe.png',
  '龙溪河': 'longxihe.png',
  '酉水河': 'youshuihe.png',
  '澎溪河': 'pengxihe.png',
};
const indicatorImageMap = {
  '叶绿素a': '叶绿素a.png',
  '浊度': '浊度.png',
  '有色溶解性有机物': '有色溶解性有机物.png',
  '水面温度': '水面温度.png',
  '透明度': '透明度.png',
  '藻蓝蛋白': '藻蓝蛋白.png',
  '总有机碳': '总有机碳.png',
  '营养状态指数': '营养状态指数.png',
  '化学需氧量': '化学需氧量.png',
  '溶解氧': '溶解氧.png'
};

export default {
  name: 'Water',
  data() {
    return {
      rivers: ['大宁河', '龙溪河', '酉水河', '澎溪河'],
      inversionIndicators: ['叶绿素a', '浊度', '有色溶解性有机物', '水面温度', '透明度', '藻蓝蛋白', '营养状态指数', '化学需氧量', '总有机碳', '溶解氧'],
      selectedRiver: '大宁河',     // 默认选中第一个河流
      selectedIndicator: null,
      isOpen: true,               // 河流菜单展开状态
      isOpen2: false,             // 指标菜单展开状态
      isFullscreen: false,        // 全屏状态
    };
  },
  computed: {
    // 用于 img src
    imageUrl() {
      if (this.selectedIndicator) {
        const fname = indicatorImageMap[this.selectedIndicator];
        return images[`../Picture/${fname}`] || '';
      }
      if (this.selectedRiver) {
        const fname = riverImageMap[this.selectedRiver];
        return images[`../Picture/${fname}`] || '';
      }
      return '';
    },
    // 用于 img alt
    imageAlt() {
      return this.selectedIndicator || this.selectedRiver || '';
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    toggleMenu2() {
      this.isOpen2 = !this.isOpen2;
    },
    selectRiver(river) {
      this.selectedRiver = river;
      this.selectedIndicator = null;
    },
    selectIndicator(ind) {
      this.selectedIndicator = ind;
      this.selectedRiver = null;
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  min-height: 100vh;
}
/* 左侧菜单 */
.sidebar {
  width: 200px;
  border-right: 2px solid #e0e0e0;
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
  user-select: none;
}
.arrow {
  transition: transform .2s;
}
.arrow.open {
  transform: rotate(90deg);
}
.menu-list {
  list-style: none;
  margin: 8px 0 0;
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

/* 右侧内容 */
.content {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
/* 图片容器 */
.image-wrapper {
  width: 100%;
  max-width: 1400px;
  max-height: 900px;
  display: flex;
  justify-content: flex-end; /* 右对齐 */
  align-items: center;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-left: 200px;
}
/* 图片自身 */
.river-image,
.indicator-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}
/* 未选中提示 */
.placeholder {
  color: #999;
  font-size: 16px;
  text-align: center;
  margin-top: 100px;
}

/* 全屏遮罩 */
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
  border-radius: 4px;
}
</style>
