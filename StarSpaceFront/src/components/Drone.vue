<template>
  <section class="page-container">
    <!-- 左侧可折叠目录 -->
    <aside class="sidebar">
      <div class="menu-title" @click="toggleMenu1">
        <span>无人机三维建模</span>
        <span class="arrow" :class="{ open: isOpen1 }">▸</span>
      </div>
      <ul v-show="isOpen1" class="menu-list">
        <li
          v-for="(modeling, index) in modelingAreas"
          :key="index"
          :class="{ active: selectedModeling === modeling }"
          @click="selectModeling(modeling)"
        >
          {{ modeling }}
        </li>
      </ul>

      <div class="menu-title" @click="toggleMenu2">
        <span>土地利用分布图</span>
        <span class="arrow" :class="{ open: isOpen2 }">▸</span>
      </div>
      <ul v-show="isOpen2" class="menu-list">
        <li
          v-for="(landUse, index) in landUseAreas"
          :key="index"
          :class="{ active: selectedLandUse === landUse }"
          @click="selectLandUse(landUse)"
        >
          {{ landUse }}
        </li>
      </ul>
    </aside>

    <!-- 右侧内容展示区域 -->
    <main class="content">
      <div v-if="selectedModeling || selectedLandUse" class="image-wrapper">
        <img :src="imageUrl" :alt="imageAlt" class="vegetation-image" @click="toggleFullscreen" />
      </div>

      <div v-if="isFullscreen" class="fullscreen-wrapper" @click="toggleFullscreen">
        <img :src="imageUrl" :alt="imageAlt" class="fullscreen-image" />
      </div>
    </main>
  </section>
</template>

<script>
// 动态导入图片
const images = import.meta.glob('../Picture/*.png', { eager: true, as: 'url' });

export default {
  name: 'DroneInspection',
  data() {
    return {
      // 无人机三维建模部分
      modelingAreas: ['南溪河部分三维建模'],
      // 土地利用分布图部分
      landUseAreas: ['南溪河土地利用现状'],
      
      selectedModeling: '南溪河部分三维建模', // 默认选中第一个建模区域
      selectedLandUse: null,
      
      isOpen1: true, // 默认打开第一个折叠目录
      isOpen2: false,
      isFullscreen: false, // 全屏状态
    };
  },
  computed: {
    imageUrl() {
      if (!this.selectedModeling && !this.selectedLandUse) return '';
      
      let fileName = '';
      if (this.selectedModeling === '南溪河部分三维建模') {
        fileName = 'nanxihe_3d_modeling.png'; // 假设文件名是 nanxihe_3d_modeling.png
      } else if (this.selectedLandUse === '南溪河土地利用现状') {
        fileName = 'nanxihe_land_use.png'; // 假设文件名是 nanxihe_land_use.png
      }
      return images[`../Picture/${fileName}`] || '';
    },
    imageAlt() {
      return this.selectedModeling || this.selectedLandUse || '图片展示';
    },
  },
  methods: {
    toggleMenu1() {
      this.isOpen1 = !this.isOpen1;
    },
    toggleMenu2() {
      this.isOpen2 = !this.isOpen2;
    },
    selectModeling(modeling) {
      this.selectedModeling = modeling;
      this.selectedLandUse = null;
    },
    selectLandUse(landUse) {
      this.selectedLandUse = landUse;
      this.selectedModeling = null;
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

/* 左侧目录 */
.sidebar {
  width: 200px;
  flex-shrink: 0;
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
  margin-bottom: 10px;
}

.arrow {
  display: inline-block;
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

/* 右侧展示区域 */
.content {
  flex: 1;
  display: flex;
  justify-content: flex-end; /* 图片右对齐 */
  align-items: flex-start; /* 垂直顶部对齐 */
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

/* 图片展示区域 */
.image-wrapper {
  width: 100%;
  max-width: 1200px;
  max-height: 700px;
  display: flex;
  justify-content: flex-end; /* 图片右对齐 */
  align-items: center;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-left: 400px; /* 距离左侧200px */

}

/* 图片样式 */
.vegetation-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  cursor: pointer; /* 添加手型光标 */
}

/* 全屏样式 */
.fullscreen-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 4px;
}

.placeholder {
  color: #999;
  font-size: 16px;
  text-align: center;
  margin-top: 100px;
}
</style>
