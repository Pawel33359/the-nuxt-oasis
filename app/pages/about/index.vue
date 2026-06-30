<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "About",
});

const { data } = await useFetch("/api/about");
const cabinsCount = computed(() => data.value?.cabinsCount ?? 0);
</script>

<template>
  <div class="about">
    <h1>Welcome to The Wild Oasis</h1>
    <div class="about-item">
      <div class="about-item__block">
        <h2 class="about-item__title">Luxurious cabins are waiting for you!</h2>
        <p>
          Where nature&apos;s beauty and comfortable living blend seamlessly.
          Hidden away in the heart of the Italian Dolomites, this is your
          paradise away from home. But it&apos;s not just about the luxury
          cabins. It&apos;s about the experience of reconnecting with nature and
          enjoying simple pleasures with family.
        </p>
        <p>
          Our {{ cabinsCount }} luxury cabins provide a cozy base, but the real
          freedom and peace you&apos;ll find in the surrounding mountains.
          Wander through lush forests, breathe in the fresh air, and watch the
          stars twinkle above from the warmth of a campfire or your hot tub.
        </p>
        <p>
          This is where memorable moments are made, surrounded by nature&apos;s
          splendor. It&apos;s a place to slow down, relax, and feel the joy of
          being together in a beautiful setting.
        </p>
      </div>

      <NuxtImg
        src="/about-1.jpg"
        class="about-item__img"
        alt="Family sitting around a fire pit in front of cabin"
        format="webp"
        width="2000"
        height="2000"
        quality="80"
        sizes="sm:420px md:420px lg:420px"
        loading="eager"
        fit="cover"
        placeholder
      />
    </div>

    <div class="about-item">
      <div class="about-item__block">
        <h2 class="about-item__title">Managed by our family since 1962</h2>
        <p>
          Since 1962, The Wild Oasis has been a cherished family-run retreat.
          Started by our grandparents, this haven has been nurtured with love
          and care, passing down through our family as a testament to our
          dedication to creating a warm, welcoming environment.
        </p>
        <p>
          Over the years, we&apos;ve maintained the essence of The Wild Oasis,
          blending the timeless beauty of the mountains with the personal touch
          only a family business can offer. Here, you&apos;re not just a guest;
          you&apos;re part of our extended family. So join us at The Wild Oasis
          soon, where tradition meets tranquility, and every visit is like
          coming home.
        </p>

        <div>
          <NuxtLink class="btn --medium about__btn" to="/cabins">
            Explore our luxury cabins
          </NuxtLink>
        </div>
      </div>

      <NuxtImg
        src="about-2.jpg"
        class="about-item__img"
        alt="Family that manages The Wild Oasis"
        format="webp"
        width="2000"
        height="2000"
        quality="80"
        sizes="sm:420px md:420px lg:420px"
        loading="eager"
        fit="cover"
        placeholder
      />
    </div>
  </div>
</template>

<style scoped>
.about-item {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 420px);
  align-items: center;
  gap: var(--space-10);
}

.about-item__title {
  padding-bottom: var(--space-4);
}
.about-item__block {
  font-size: var(--text-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.about-item__img {
  grid-column: 2 / 3;
  border-radius: var(--radius-lg);
}

.about-item {
  --animation-delay: 0s;
  animation: slide-to var(--animation-md) forwards;
}
.about-item:nth-child(2n) {
  /*for animation */
  opacity: 0.2;
  transform: translateX(50%);
}
.about-item:nth-child(2n + 1) {
  grid-template-columns: minmax(auto, 420px) 1fr;
  /*for animation */
  opacity: 0.2;
  transform: translateX(-50%);
}
.about-item:nth-child(2n + 1) .about-item__img {
  grid-column: 1 / 2;
  grid-row: 1/2;
}

@supports (width: calc(sibling-index() * 1px)) {
  .about-item {
    --animation-delay: calc((sibling-index() - 2) * 100ms);
    animation-delay: var(--animation-delay) !important;
  }
}
</style>
