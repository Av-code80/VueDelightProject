<script setup lang="ts">
import { ref } from 'vue'
// ui components:
import { NSpace, NLayout } from 'naive-ui'
// components:
import CountrySelect from './components/CountrySelect.vue'
import CountryDetails from './components/CountryDetails.vue'

const selectedCountryCode = ref('')

const handleSelect = (val: string): void => {
  selectedCountryCode.value = val
}
</script>

<template>
  <NSpace vertical size="large">
    <NLayout content-style="padding: 24px">
      <CountrySelect @select="handleSelect" />
    </NLayout>
    <NLayout content-style="padding: 24px">
      <CountryDetails :code="selectedCountryCode" />
    </NLayout>
  </NSpace>
</template>
