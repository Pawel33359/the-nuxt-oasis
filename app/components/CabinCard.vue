<script setup lang="ts">
import type { Cabin } from "~/types/cabin";

const props = defineProps<{ cabin: Cabin; index: number }>();

const index = props.index;
const { id, name, maxCapacity, regularPrice, discount, image } = props.cabin;

console.log(id, name, maxCapacity, regularPrice, discount, image);
</script>

<template>
  <div class="cabin-card">
    <!-- <div className="flex-1 relative"> -->
    <NuxtImg
      :load="index > 1 ? 'lazy' : 'eager'"
      :src="image"
      :alt="`Cabin ${name}`"
      class="cabin-card__img"
    />
    <!-- </div> -->

    <div class="cabin-card__content">
      <div class="cabin-card__info">
        <h3 class="cabin-card__title">Cabin {{ name }}</h3>

        <div class="cabin-card__guests">
          <Icon name="heroicons:users-20-solid" />
          <p>
            For up to <span>{{ maxCapacity }}</span> guests
          </p>
        </div>

        <p class="cabin-card__price">
          <template v-if="discount > 0">
            <span class="cabin-card__price-current">
              ${{ regularPrice - discount }}
            </span>
            <span class="cabin-card__price-regular">${{ regularPrice }} </span>
          </template>
          <span v-else class="cabin-card__price-current"
            >${{ regularPrice }}</span
          >
          <span class="cabin-card__price-nights"> / night</span>
        </p>
      </div>

      <!-- <div class="bg-primary-950 border-t border-t-primary-800 text-right"> -->
      <NuxtLink :to="`/cabins/${id}`" class="cabin-card__link --link-underline">
        <span> Details & reservation &rarr; </span>
      </NuxtLink>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
.cabin-card {
  display: grid;
  grid-template-columns: minmax(auto, clamp(100px, 15vw, 250px)) 1fr;
  border: 1px solid var(--border);
  /* gap: var(--space-4); */
}
.cabin-card__content {
  display: flex;
  flex-direction: column;
}
.cabin-card__guests {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-lg);
}
.cabin-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border);
}
.cabin-card__price {
  align-self: end;
}
.cabin-card__price-current {
  font-size: var(--text-4xl);
}
.cabin-card__price-regular {
  color: var(--text-muted);
  text-decoration: line-through;
  margin-left: 5px;
}
.cabin-card__price-regular,
.cabin-card__price-nights {
  font-size: var(--text-sm);
}
.cabin-card__img {
  height: 100%;
}

.cabin-card__link {
  padding: var(--space-4);

  align-self: flex-end;
  min-width: 50%;
  border-left: 1px solid var(--border);
  height: 100%;
  display: flex;
  align-items: center;
}

/* ANIMATION */
.cabin-card {
  --animation-delay: 0s;
  --start-translate: 30%;
  animation: slide-to var(--animation-md) forwards;
}
.cabin-card:nth-child(2n) {
  transform: translateX(var(--start-translate));
  opacity: 0.2;
}
.cabin-card:nth-child(2n + 1) {
  transform: translateX(calc(-1 * var(--start-translate)));
  opacity: 0.2;
}
@supports (width: calc(sibling-index() * 1px)) {
  .cabin-card {
    --animation-delay: calc((sibling-index() - 2) * 50ms);
    animation-delay: var(--animation-delay) !important;
  }
}
</style>
