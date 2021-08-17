<template>
    <b-dropdown variant="white" right toggle-class="header-item">
        <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
            {{ text }}
        </template>

        <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :class="{ active: lan === entry.language }"
        >
            <img
                :src="`${entry.flag}`"
                alt="user-image"
                class="me-1"
                height="12"
            />
            <span class="align-middle">{{ entry.title }}</span>
        </b-dropdown-item>
    </b-dropdown>

</template>

<script>
import i18n from "@/i18n";
export default {
  name: 'FtthLanguageSwitcher',
  props:{
    languages:{
      type: Array,
      default: () =>[
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
      ] 
    }
  },
  data() {
    return {
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
    };
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  methods: {
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      i18n.locale = locale;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>