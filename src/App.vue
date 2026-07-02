<script setup lang="ts">
import { useScroll } from "@/composables/useScroll";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Hero from "@/features/home/Hero.vue";
import ValueTabs from "@/features/home/ValueTabs.vue";
import Process from "@/features/home/Process.vue";
import Showcase from "@/features/projects/Showcase.vue";
import TechGravity from "@/features/home/TechGravity.vue";
import Globe from "@/features/home/Globe.vue";
import Stats from "@/features/home/Stats.vue";
import Contact from "@/features/home/Contact.vue";
import Newsletter from "@/features/home/Newsletter.vue";
import Faq from "@/features/home/Faq.vue";
import ProjectDetail from "@/features/projects/ProjectDetail.vue";

useScroll();
</script>

<template>
  <Header />

  <main>
    <Hero />
    <ValueTabs />
    <Process />
    <Showcase />
    <TechGravity />
    <Globe />
    <Stats />
    <Faq />
    <Contact />
    <Newsletter />
  </main>

  <Footer />

  <ProjectDetail />
</template>
