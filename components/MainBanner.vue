<template>
  <div class="main-banner-wrapper">
    <div v-swiper="swiperOption">
      <div class="swiper-wrapper">
        <a v-for="banner in banners"
           :key="banner.key"
           class="swiper-slide"
           :href="banner.url"
           target="_blank">
          <div class="image-wrapper">
            <img :src="banner.image"/>
          </div>
        </a>
      </div>
      <div v-if="banners.length > 1" class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import {directive} from "vue-awesome-swiper";
export default {
  name: 'MainBanner',
  data() {
    return {
      banners: [
        {
          image: require('~/assets/images/main-banner/banner-1.jpg'),
          url: 'https://novaposhta.ua/tarify_md?utm_source=site&utm_medium=referral&utm_campaign=npu_website_20220422_20220522_rechi_za_kordon',
          key: 1,
        },
        {
          image: require('~/assets/images/main-banner/banner-2.jpg'),
          url: 'https://novaposhta.ua/valiza/#rec341828599',
          key: 2,
        },
        {
          image: require('~/assets/images/main-banner/banner-3.jpg'),
          url: 'https://novaposhta.ua/poshtomat/street/',
          key: 3,
        },
      ],
      swiperOption: {
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    }
  }
}
</script>
<style scoped lang="scss">
.main-banner-wrapper {
  .swiper-wrapper {
    img {
      display: block;
      width: 100%;
    }
  }
}

@media only screen and (min-width: 1025px) {
  .main-banner-wrapper {
    margin-bottom: 78px;
  }
}

@media only screen and (max-width: 1024px) {
  .main-banner-wrapper {
    margin-bottom: 48px;
  }
}
</style>
