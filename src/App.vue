<script setup lang="ts">
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
</script>

<template>
  <!-- First tab stop on the page. Visually hidden until focused, so keyboard
       users can jump the nav without it cluttering the design. -->
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-accent"
  >
    Skip to main content
  </a>

  <SiteHeader />

  <main id="main">
    <HeroSection />
    <ProjectsSection />
    <ExperienceSection />
    <AboutSection />
    <SkillsSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>
