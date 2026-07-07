<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const route = useRoute();
const cabinId = computed(() => route.params.cabinId as string);

const {
  data: cabin,
  pending,
  error,
} = await useFetch(() => `/api/cabins/${cabinId.value}`, {
  watch: [cabinId],
});

useSeoMeta({
  title: cabin.value?.name ? `${cabin.value.name} | The Nuxt Oasis` : "Cabin",
});
</script>

<template>
  <div class="cabin">
    <Cabin :cabin="cabin" />
    <div class="cabin__reserve">
      <h2>Reserve {{ cabin.name }} today. Pay on arrival.</h2>
      <Reservation :cabin="cabin" />
    </div>
    <!-- <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div> -->
  </div>
</template>

<style scoped>
.cabin {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}
.cabin__reserve h2 {
  padding-bottom: var(--space-8);
}
</style>
