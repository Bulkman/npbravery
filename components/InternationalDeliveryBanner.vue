<template>
  <div class="international-delivery-wrapper">
    <img class="image" src="../assets/images/postman.jpg"/>
    <div class="info-wrapper">
      <h2 class="title">
        Міжнародна доставка Нової пошти дозволяє відправляти та отримувати документи, вантажі та посилки з усього світу
        в Україну та навпаки
      </h2>
      <div class="proposals-list">
        <div class="item">
          <h3 class="proposal-title">Послуга «Речі з дому за кордон»</h3>
          <p class="proposal-text">Українцям, які тимчасово через війну виїхали за межі України до країн Європи, Нова
            пошта надає можливість
            відправляти речі персонального вжитку за кордон</p>
        </div>
        <div class="item">
          <h3 class="proposal-title">Послуга «Глобальна доставка»</h3>
          <p class="proposal-text">Для доставки документів, відправлень та вантажів у більшість країн світу </p>
        </div>
        <div class="item">
          <h3 class="proposal-title">Нова пошта Шоппінг</h3>
          <p class="proposal-text">Купуйте в найпопулярніших інтернет-магазинах світу, отримуйте в Україні разом <span
            class="nowrap">з <a
            href="https://npshopping.com/"
            target="_blank">Нова
            пошта Шоппінг</a></span></p>
        </div>
      </div>
      <a href="https://novaposhta.ua/international_delivery/uslugi_md" target="_blank" class="more-button">
        <span>
          Дивитись всі
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.29462 2.70538C4.90534 3.09466 4.905 3.72569 5.29385 4.11538L9.17 8L5.29385 11.8846C4.905 12.2743 4.90534 12.9053 5.29462 13.2946C5.68419 13.6842 6.31581 13.6842 6.70538 13.2946L11.2929 8.70711C11.6834 8.31658 11.6834 7.68342 11.2929 7.29289L6.70539 2.70538C6.31581 2.31581 5.68419 2.31581 5.29462 2.70538Z"
            fill="white"/>
        </svg>
        </span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InternationalDeliveryBanner'
}
</script>
<style scoped lang="scss">
.international-delivery-wrapper {
  background: rgba(220, 238, 240, 1);

  .info-wrapper {
    .title {
      color: rgba(51, 51, 47, 1);
      font-weight: 700;
      margin-top: 0;
    }

    .proposals-list {
      .item {
        .proposal-title {
          color: rgba(51, 51, 47, 1);
          font-size: 18px;
          font-weight: 700;
          margin-top: 0;
        }

        .proposal-text {
          color: rgba(51, 51, 47, 1);
          font-weight: 400;
          font-size: 16px;

          a {
            color: rgb(82, 160, 232);
            text-decoration: none;
          }
        }
      }
    }

    .more-button {
      background: rgba(218, 41, 28, 1);
      border: 1px solid rgba(218, 41, 28, 1);
      box-sizing: border-box;
      color: #fff;
      border-radius: 8px;
      display: inline-block;
      text-decoration: none;
      font-size: 16px;

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-left: 12px;
          position: relative;
          top: 1px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1025px) {
  .international-delivery-wrapper {
    display: flex;
    padding: 70px 71px 70px 57px;
    justify-content: center;
    margin-bottom: 70px;

    .image {
      margin-right: 5.6%;
      display: block;
      width: 33%;
      max-width: 512px;
      margin-bottom: - 70px;
      align-self: end;
    }

    .info-wrapper {
      width: 53%;
      max-width: 779px;

      .title {
        font-size: 32px;
        line-height: 42px;
        margin-bottom: 48px;
      }

      .proposals-list {
        .item {
          .proposal-title {
            line-height: 21px;
            margin-bottom: 16px;
          }

          .proposal-text {
            line-height: 22px;
            margin-bottom: 48px;
          }
        }
      }

      .more-button {
        padding: 14px 106px 14px 90px;
        transition: all .2s linear;

        svg {
          path {
            transition: all .2s linear;
          }
        }

        &:hover {
          background: transparent;
          color: rgba(32, 33, 36, 0.87);

          svg {
            path {
              fill: rgba(32, 33, 36, 0.87);
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  .international-delivery-wrapper {
    padding: 48px 24px;

    .image {
      display: none;
    }

    .info-wrapper {

      .title {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 24px;
      }

      .proposals-list {
        .item {
          .proposal-title {
            font-size: 16px;
            line-height: 19px;
            margin-bottom: 8px;
          }

          .proposal-text {
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 24px;
          }
        }
      }

      .more-button {
        padding: 14px;
        max-width: 312px;
        width: 100%;
        margin: 0 auto;
        display: block;
      }
    }
  }
}
</style>
