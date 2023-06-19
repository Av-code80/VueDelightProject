<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
// ui components:
import { NSpin, NSpace } from 'naive-ui'
// components:
import CountrySelect from './components/CountrySelect.vue'
import CountryDetails from './components/CountryDetails.vue'

// props:
const props = defineProps({
  code: String,
})

const variables = computed(() => ({
  code: props.code,
}))

const { result, loading } = useQuery(
  gql`
    query getCountryDetails($code: ID!) {
      country(code: $code) {
        name(lang: "fr")
        capital
        currencies
        languages {
          code
          name
        }
        phones
      }
    }
  `,
  variables
)
</script>

<template>
  <div class="container">
    <div v-if="!code">Please select a country</div>
    <template v-else>
      <NSpin v-if="loading" />
      <div v-else-if="result.country">
        <img :src="`https://flagsapi.com/${code}/flat/64.png`" />
        <h1>{{ result.country.name }}</h1>
        <h3>Capital:</h3>
        <ul>
          <li>
            {{ result.country.capital }}
          </li>
        </ul>
        <h3>Currencies:</h3>
        <ul>
          <li v-for="currency in result.country.currencies" :key="currency">
            {{ currency }}
          </li>
        </ul>
        <h3>Languages:</h3>
        <ul>
          <li v-for="language in result.country.languages" :key="language.code">
            {{ language.code }} - {{ language.name }}
          </li>
        </ul>
        <h3>Telephone prefixes:</h3>
        <ul>
          <li v-for="phone in result.country.phones" :key="phone">
            {{ phone }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
