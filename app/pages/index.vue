<script setup lang="ts">
//devicemotion/ mousehover
const animationFinished = ref(false);

function handleMouseOver(event: MouseEvent) {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = 1 - (event.clientY / window.innerHeight) * 2;

  document.body.style.setProperty("--mouse-x", x.toString());
  document.body.style.setProperty("--mouse-y", y.toString());
}
function handleAnimationEnd(event: AnimationEvent) {
  console.log(event);
  if (event.animationName.startsWith("img-start-zoom")) {
    console.log(1234);
    animationFinished.value = true;
  }
}

onMounted(() => {
  document.body.addEventListener("mouseover", handleMouseOver);

  // window.addEventListener("devicemotion" (e: Event)=>{})
});

onUnmounted(() => {
  document.body.removeEventListener("mouseover", handleMouseOver);
});
</script>

<template>
  <NuxtImg
    src="/bg.png"
    alt="Mountains and forests with two cabins"
    class="hero__img"
    :class="{ 'mouse-effect': animationFinished }"
    format="webp"
    width="3000"
    height="2000"
    quality="80"
    sizes="sm:100vw md:100vw lg:100vw"
    loading="eager"
    fit="cover"
    placeholder
    @mouseover="handleMouseOver"
    @animationend="handleAnimationEnd"
  />
  <div class="home" @mouseover="handleMouseOver">
    <h1 class="home__title">Welcome to paradise.</h1>
    <NuxtLink class="btn --xl home__btn" to="/cabins">
      <span>Explore luxury cabins</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  padding-top: var(--space-16);
}
.home__title {
  color: var(--text);
  font-size: clamp(
    var(--text-6xl),
    calc(5vw + var(--text-xl)),
    var(--text-10xl)
  );
  filter: drop-shadow(0 0 5px var(--bg));
}
.hero__img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  animation: img-start-zoom forwards var(--animation-lg);
}
.hero__img.mouse-effect {
  transition: transform var(--animation-sm) ease-out;
  transform: translate(
      calc(var(--mouse-x, 0) * -30px),
      calc(var(--mouse-y, 0) * 30px)
    )
    scale(calc(1 + max(abs(var(--mouse-x, 0)), abs(var(--mouse-y, 0))) * 0.2)) !important;
}
.home__btn {
  overflow: hidden;
}
.home__btn span {
  display: block;
  transition: all var(--transition-md);
}
.home__btn:hover span {
  scale: 1.05;
}
@keyframes img-start-zoom {
  from {
    scale: 1.3;
    opacity: 0.8;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
</style>
