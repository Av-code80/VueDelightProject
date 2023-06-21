<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
// ui components:
import { NSelect } from "naive-ui";

interface stringQueries {
  name: string;
  code: string;
}

// emits:
const emit = defineEmits(["select"]);

const input = ref("");

const { result, loading } = useQuery(
  gql`
    query getCountries {
      countries {
        name(lang: "fr")
        code
      }
    }
  `,
  { fetchPolicy: "cache-and-network" }
);

const handleSelect = (value: string): void => {
  emit("select", value);
};

const options = computed(() => {
  if (result.value) {
    return result.value?.countries.map(({ name, code }: stringQueries) => ({
      label: name,
      value: code,
    }));
  }
});
</script>

<template>
  <NSelect
    v-model:value="input"
    :options="options ?? []"
    :loading="loading"
    @update:value="handleSelect"
    filterable
  />
</template>
