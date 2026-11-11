<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ReadingProgressBar from './components/ReadingProgressBar.vue'
import MermaidZoom from './components/MermaidZoom.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <ReadingProgressBar />
    </template>
    <template #layout-bottom>
      <MermaidZoom />
    </template>
  </Layout>
</template>
