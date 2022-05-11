<template>
  <div class="promo-wrapper">
    <h2 class="title">Акційні пропозиції від магазинів партнерів:</h2>
    <div class="swiper">
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
        <div v-show="isMobile ? banners.length > 1 : banners.length > 3" class="swiper-pagination"></div>
      </div>
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
  props: {
    isMobile: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      banners: [
        {
          image: require('~/assets/images/carousel-images/comfy.png'),
          text: 'Доставка у Поштомат всього за 1 гривню, для всіх замовлень від 499 грн.',
          url: 'https://cutt.ly/Comfy_lending_postpmat\n',
          key: 1,
        },
        {
          image: require('~/assets/images/carousel-images/apteka911.jpeg'),
          text: 'Замовляй ліки з Аптеки 911, послуги доставки всього 35 гривень',
          url: 'https://m.apteka911.ua/ua',
          key: 2,
        },
        {
          image: require('~/assets/images/carousel-images/intertop.png'),
          text: 'Безкоштовна доставка у відділення та поштомат <b>до 31.05.22</b>',
          url: 'https://cutt.ly/intertop_lending_postpmat',
          key: 3
        },
        {
          image: require('~/assets/images/carousel-images/epicenter.jpg'),
          text: 'Обирай доставку Новою поштою – вигравай один з 20 сертифікатів на 500 грн',
          url: 'https://epicentrk.ua/ua/actions/pokupayte-lyubye-tovary-na-epicentrk-ua-s-dostavkoy-novoy-pochty.html',
          key: 4
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
          1025: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          640: {
            slidesPerView: 1,
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

    .swiper {
      max-width: 1298px;
      margin: 0 auto;

      .swiper-wrapper {
        padding: 20px 0 40px;

        &.centered {
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }

        .swiper-slide {
          padding: 40px;
          box-sizing: border-box;
          height: auto;
          transform: scale(0.96);

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
}

@media only screen and (max-width: 1024px) {
  .promo-wrapper {
    padding: 48px 24px 40px;

    .title {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 24px;
    }

    .swiper-wrapper {
      margin: 0 -10px;
      padding: 20px 10px 40px;

      .swiper-slide {
        padding: 24px;
        box-sizing: border-box;
        height: auto;
        transform: scale(0.95);

        .image-wrapper {
          margin-bottom: 16px;
        }

        .text {
          font-size: 16px;
          line-height: 23px;
        }
      }
    }

    .swiper-pagination {
      bottom: 0px;
    }
  }
}
</style>
