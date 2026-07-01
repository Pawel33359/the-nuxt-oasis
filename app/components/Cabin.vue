<script setup lang="ts">
import type { Cabin } from "~/types/cabin";

const { cabin } = defineProps<{
  cabin: Cabin;
}>();
</script>

<template>
  <div class="cabin__content">
    <div class="cabin__img-wrapper">
      <NuxtImg
        :src="cabin.image"
        :alt="`Cabin ${cabin.name}`"
        quantity="80"
        format="webp"
        class="cabin__img"
        sizes="516px"
      />
    </div>

    <div class="cabin__info">
      <h1 class="cabin__title">Cabin {{ cabin.name }}</h1>

      <p class="cabin__description">
        <TextExpander :maxLength="200">
          {{ cabin.description }}
        </TextExpander>
      </p>

      <ul class="cabin__features">
        <li class="cabin__features-item">
          <Icon name="heroicons:users-20-solid" />
          <span>
            For up to
            <strong>{{ cabin.maxCapacity }}</strong> guests
          </span>
        </li>
        <li class="cabin__features-item">
          <Icon name="heroicons:map-pin-20-solid" />
          <span>
            Located in the heart of the
            <strong> Dolomites</strong> (Italy)
          </span>
        </li>
        <li class="cabin__features-item">
          <Icon name="heroicons:eye-slash-20-solid" />
          <span> Privacy <strong>100%</strong> guaranteed </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cabin__content {
  display: grid;
  grid-template-columns: 3fr 4fr;
  gap: var(--space-16);
  border: 1px solid var(--border);
  padding: var(--space-4) var(--space-8);
  margin-top: var(--space-16);
}
.cabin__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-bottom: var(--space-8);
}
.cabin__img-wrapper {
  position: relative;
}
.cabin__img {
  scale: 1.15;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: top center;
}
.cabin__description {
  padding-bottom: var(--space-4);
  font-size: var(--text-lg);
}
.cabin__title {
  position: relative;
  z-index: 1;
  margin-left: calc(-1 * min(50%, 200px));
  background: var(--bg);
  padding: var(--space-2) var(--space-4);
  text-align: start;
  color: var(--text);
}

.cabin__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
}
.cabin__features-item {
  font-size: var(--text-xl);
}
</style>
