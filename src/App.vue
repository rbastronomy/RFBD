<script setup lang="ts">
import { useScroll } from "@/composables/useScroll";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Hero from "@/features/home/Hero.vue";
import About from "@/features/home/About.vue";
import Contact from "@/features/home/Contact.vue";
import Projects from "@/features/projects/Projects.vue";
import ProjectDetail from "@/features/projects/ProjectDetail.vue";
import BootScreen from "@/components/BootScreen.vue";

useScroll();
</script>

<template>
  <Header />

  <main>
    <Hero />
    <About />
    <Projects />
    <Contact />
  </main>

  <Footer />

  <ProjectDetail />

  <BootScreen />
</template>
