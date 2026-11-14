<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ReadingProgressBar from './components/ReadingProgressBar.vue'
import ReaderControls from './components/ReaderControls.vue'
import MermaidZoom from './components/MermaidZoom.vue'
import MobileBottomNav from './components/MobileBottomNav.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <ReadingProgressBar />
    </template>
    <template #doc-before>
      <ReaderControls />
    </template>
    <template #layout-bottom>
      <MermaidZoom />
      <MobileBottomNav />
    </template>
  </Layout>
</template>
