<template>
  <section class="page-container">
    <!-- 左侧可折叠目录 -->
    <aside class="sidebar">
      <div class="menu-title" @click="toggleMenu1">
        <span>遥感地区区位图</span>
        <span class="arrow" :class="{ open: isOpen1 }">▸</span>
      </div>
      <ul v-show="isOpen1" class="menu-list">
        <li
          v-for="(region, index) in regions"
          :key="index"
          :class="{ active: selectedRegion === region }"
          @click="selectRegion(region)"
        >
          {{ region }}
        </li>
      </ul>

      <div class="menu-title" @click="toggleMenu2">
        <span>植被覆盖度反演</span>
        <span class="arrow" :class="{ open: isOpen2 }">▸</span>
      </div>
      <ul v-show="isOpen2" class="menu-list">
        <li
          v-for="(cover, index) in covers"
          :key="index"
          :class="{ active: selectedCover === cover }"
          @click="selectCover(cover)"
        >
          {{ cover }}
        </li>
      </ul>

      <div class="menu-title" @click="toggleMenu3">
        <span>植被分布反演</span>
        <span class="arrow" :class="{ open: isOpen3 }">▸</span>
      </div>
      <ul v-show="isOpen3" class="menu-list">
        <li
          v-for="(distribution, index) in distributions"
          :key="index"
          :class="{ active: selectedDistribution === distribution }"
          @click="selectDistribution(distribution)"
        >
          {{ distribution }}
        </li>
      </ul>

      <ul v-show="isOpen4" class="menu-list">
        <li
          v-for="(indicator, index) in indicators"
          :key="index"
          :class="{ active: selectedIndicator === indicator }"
          @click="selectIndicator(indicator)"
        >
          {{ indicator }}
        </li>
      </ul>

      <div class="menu-title" @click="toggleMenu5">
        <span>植物冠层数据</span>
        <span class="arrow" :class="{ open: isOpen5 }">▸</span>
      </div>
      <ul v-show="isOpen5" class="menu-list">
        <li
          v-for="(canopy, index) in canopyIndicators"
          :key="index"
          :class="{ active: selectedCanopy === canopy }"
          @click="selectCanopy(canopy)"
        >
          {{ canopy }}
        </li>
      </ul>
    </aside>

    <!-- 右侧内容展示区域 -->
    <main class="content">
      <div v-if="selectedRegion || selectedCover || selectedDistribution || selectedIndicator || selectedCanopy" class="image-wrapper">
        <img :src="imageUrl" :alt="imageAlt" class="vegetation-image" @click="toggleFullscreen" />
      </div>

      <!-- 全屏显示区域 -->
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
  name: 'Vegetation',
  data() {
    return {
      // 遥感地区区位图
      regions: ['合川区二郎镇', '合川区古楼镇', '合川区燕窝镇', '合川区新学乡'],
      // 植被覆盖度反演结果
      covers: ['九龙坡区'],
      // 植被分布反演结果
      distributions: ['缙云山'],
      // 植被相关指标
      indicators: [], // 移除植被指标
      // 植物冠层相关数据
      canopyIndicators: ['植被冠层叶绿素相对含量','植物冠层含水量', '光合有效辐射'],
      
      selectedRegion: '合川区二郎镇', // 默认选中第一个地区
      selectedCover: null,
      selectedDistribution: null,
      selectedIndicator: null,
      selectedCanopy: null,
      
      isOpen1: true, // 默认打开第一个折叠目录
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false,

      isFullscreen: false, // 全屏状态
    };
  },
  computed: {
    imageUrl() {
      if (!this.selectedRegion && !this.selectedCover && !this.selectedDistribution && !this.selectedIndicator && !this.selectedCanopy) return '';
      
      let fileName = '';
      if (this.selectedRegion === '合川区二郎镇') {
        fileName = 'erlz_land.png';
      } else if (this.selectedRegion === '合川区古楼镇') {
        fileName = 'glz_land.png';
      } else if (this.selectedRegion === '合川区燕窝镇') {
        fileName = 'ywz_land.png';
      } else if (this.selectedRegion === '合川区新学乡') {
        fileName = 'xxz_land.png';
      } else if (this.selectedCover === '九龙坡区') {
        fileName = 'jlz_coverage.png';
      } else if (this.selectedDistribution === '缙云山') {
        fileName = 'jys_coverage.png';
      } else if (this.selectedCanopy=== '植被冠层叶绿素相对含量') {
        fileName = 'zbgc_yls.png';
      } else if (this.selectedIndicator === '植被光合有效辐射') {
        fileName = 'zbgh_yxfs.png';
      } else if (this.selectedCanopy === '植物冠层含水量') {
        fileName = 'zwgc_selectedCanopy.png'; // 图片文件
      } else if (this.selectedCanopy === '光合有效辐射') {
        fileName = 'ghfs_selectedCanopy.png'; // 图片文件
      }
      return images[`../Picture/${fileName}`] || '';
    },
    imageAlt() {
      return this.selectedRegion || this.selectedCover || this.selectedDistribution || this.selectedIndicator || this.selectedCanopy || '图片展示';
    },
  },
  methods: {
    toggleMenu1() {
      this.isOpen1 = !this.isOpen1;
    },
    toggleMenu2() {
      this.isOpen2 = !this.isOpen2;
    },
    toggleMenu3() {
      this.isOpen3 = !this.isOpen3;
    },
    toggleMenu4() {
      this.isOpen4 = !this.isOpen4;
    },
    toggleMenu5() {
      this.isOpen5 = !this.isOpen5;
    },
    selectRegion(region) {
      this.selectedRegion = region;
      this.selectedCover = null;
      this.selectedDistribution = null;
      this.selectedIndicator = null;
      this.selectedCanopy = null;
    },
    selectCover(cover) {
      this.selectedCover = cover;
      this.selectedRegion = null;
      this.selectedDistribution = null;
      this.selectedIndicator = null;
      this.selectedCanopy = null;
    },
    selectDistribution(distribution) {
      this.selectedDistribution = distribution;
      this.selectedRegion = null;
      this.selectedCover = null;
      this.selectedIndicator = null;
      this.selectedCanopy = null;
    },
    selectCanopy(canopy) {
      this.selectedCanopy = canopy;
      this.selectedRegion = null;
      this.selectedCover = null;
      this.selectedDistribution = null;
      this.selectedIndicator = null;
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
  cursor: pointer; /* 鼠标悬停变成手型 */
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
  z-index: 1000;
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
