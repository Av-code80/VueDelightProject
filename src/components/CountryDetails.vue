<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
// ui components:
import { NSpin } from "naive-ui";
// props:
const props = defineProps({
  code: String,
});

const variables = computed(() => ({
  code: props.code,
}));

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
);
</script>

<template id="country-details">
  <div class="container">
    <div class="code" v-if="!code">Please select a country</div>
    <template v-else>
      <NSpin v-if="loading" />
      <div class="result" v-else-if="result.country">
        <div>
          <img :src="`https://flagsapi.com/${code}/flat/64.png`" />
        </div>
        <h1 class="h1">{{ result.country.name }}</h1>
        <h3 class="h3">Capital:</h3>
        <ul>
          <li class="li-capital">
            {{ result.country.capital }}
          </li>
        </ul>
        <h3>Currencies:</h3>
        <ul>
          <li
            class="li-currencies"
            v-for="currency in result.country.currencies"
            :key="currency"
          >
            {{ currency }}
          </li>
        </ul>
        <h3>Languages:</h3>
        <ul>
          <li
            class="languages"
            v-for="language in result.country.languages"
            :key="language.code"
          >
            {{ language.code }} - {{ language.name }}
          </li>
        </ul>
        <h3>Telephone prefixes:</h3>
        <ul>
          <li
            class="li-phones"
            v-for="phone in result.country.phones"
            :key="phone"
          >
            {{ phone }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style scoped>
img{display:block; margin-left: auto; margin-right: auto;width: 50%;}
.container {display: flex;align-items: center;justify-content: center;}
.code {background-color: #f2b807;padding: 6px;text-align: center;color: #3d8e78;border-radius: 4px;}
.h1 {color: #e42342; text-align: center;}
.li-capital {background-color: #f2b807;text-align: center;color: #fff;border-radius: 4px;}
.languages {background-color: #4db097;text-align: center;color: #fff; margin-bottom: 4px;border-radius: 4px;}
.li-currencies {background-color: #b31271;margin-bottom: 4px;text-align: center;color: #fff;border-radius: 4px;}
.li-phones {
  background-color: #010101;margin-bottom: 4px;text-align: center;color: #fff;border-radius: 4px;}
</style>
