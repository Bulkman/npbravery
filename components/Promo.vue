<template>
  <div class="promo-wrapper">
    <h2 class="title">Акційні пропозиції від магазинів партнерів:</h2>
    <div v-swiper="swiperOption">
      <div class="swiper-wrapper" :class="{centered: banners.length < 4}">
        <a v-for="banner in banners"
           :key="banner.key"
           class="swiper-slide"
           :href="banner.url"
           target="_blank">
          <div class="image-wrapper">
            <img :src="banner.image"/>
          </div>
          <p class="text" v-html="banner.text"></p>
        </a>
      </div>
      <div v-if="banners.length > 3" class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import {directive} from "vue-awesome-swiper";

export default {
  name: 'Promo',
  directives: {
    swiper: directive,
  },
  data() {
    return {
      banners: [
        {
          image: require('~/assets/images/carousel-images/carousel-1.jpg'),
          text: '<b>Безкоштовна доставка,</b> для всіх замовлень від 500 грн',
          url: 'https://www.moyo.ua/',
          key: 1,
        },
        {
          image: require('~/assets/images/carousel-images/carousel-2.jpg'),
          text: '<b>Доставка в поштомат всього 39</b> грн або безкоштовно для замовлень від 599 грн',
          url: 'https://makeup.com.ua/',
          key: 2,
        },
        {
          image: require('~/assets/images/carousel-images/carousel-3.jpg'),
          text: 'Безкоштовна доставка у відділення та поштомат <b>до 30.04.22</b>',
          url: 'https://intertop.ua/deals/6256/?utm_source=novaposhta&utm_medium=referral',
          key: 3
        },
        {
          image: require('~/assets/images/carousel-images/carousel-3.jpg'),
          text: 'Безкоштовна доставка у відділення та поштомат <b>до 30.04.22</b>',
          url: 'https://intertop.ua/deals/6256/?utm_source=novaposhta&utm_medium=referral',
          key: 4
        },
        {
          image: require('~/assets/images/carousel-images/carousel-3.jpg'),
          text: 'Безкоштовна доставка у відділення та поштомат <b>до 30.04.22</b>',
          url: 'https://intertop.ua/deals/6256/?utm_source=novaposhta&utm_medium=referral',
          key: 5
        },
      ],
      swiperOption: {
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            allowTouchMove: false
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
    };
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.promo-wrapper {
  background: rgba(182, 184, 220, 1);

  .title {
    color: rgba(51, 51, 47, 1);
    margin-top: 0;
  }

  .swiper-wrapper {
    padding: 10px 0;

    .swiper-slide {
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
      text-decoration: none;

      .image-wrapper {
        img {
          display: block;
          width: 100%;
        }
      }

      .text {
        color: rgba(51, 51, 47, 1);
        text-align: center;
        margin: 0;
      }
    }
  }

}

@media only screen and (min-width: 1025px) {
  .promo-wrapper {
    padding: 70px 0 40px;
    margin-bottom: 70px;

    .title {
      margin-bottom: 20px;
      padding: 0 40px;
      font-size: 32px;
      line-height: 38px;
    }

    .swiper-wrapper {
      padding: 20px 111px 50px;

      &.centered {
        display: flex;
        justify-content: center;
        padding: 20px 0;
      }

      .swiper-slide {
        max-width: 406px;
        width: 32%;
        padding: 40px;
        box-sizing: border-box;
        height: auto;
        transition: transform .15s ease-out;
        transform: scale(1);

        &:hover {
          transform: scale(1.05);
        }

        &:last-child {
          margin-right: 0 !important;
        }

        .image-wrapper {
          margin-bottom: 24px;
        }

        .text {
          font-size: 18px;
          line-height: 25px;
        }
      }
    }

    .swiper-pagination {
      bottom: 0;
    }
  }
}

@media only screen and (max-width: 1024px) {

}
</style>
