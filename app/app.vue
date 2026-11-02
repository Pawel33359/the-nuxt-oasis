<script setup lang="ts">
import GlobalModal from "./components/modal/GlobalModal.vue";
</script>

<template>
  <Html lang="en">
    <Head />

    <Body>
      <Toaster position="top-right" rich-colors />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <GlobalModal />
    </Body>
  </Html>
</template>
