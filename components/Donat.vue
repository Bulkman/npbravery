<template>
  <div class="donat-wrapper">
    <div class="info-wrapper">
      <h2 class="title">
        Гуманітарна пошта України
      </h2>
      <p class="text">
        Проєкт «Гуманітарна пошта України» створено як відповідь на збройну агресію Росії у 2014 році. З того часу
        проєкт став надійним логістичним плечем для волонтерського руху України. З початком повномасштабної війни у 2022
        році разом з найбільшими міжнародними донорами ми створили гуманітарні хаби, формуємо та доставляємо гуманітарні
        вантажі по всій Україні, зокрема на лінії зіткнення.
      </p>
      <div class="statistic">
        <div class="item">
          <p class="indicator">
            <span class="arrow">></span>
            <span class="value">10</span>
            <span class="unit">тис</span>
          </p>
          <p class="statistic-text">
            палет гуманітарної допомоги перевезено
          </p>
        </div>
        <div class="item">
          <p class="indicator">
            <span class="arrow">></span>
            <span class="value">500</span>
            <span class="unit">тонн</span>
          </p>
          <p class="statistic-text">
            гуманітарних вантажів перевозимо кожного дня
          </p>
        </div>
        <div class="item">
          <p class="indicator">
            <span class="arrow">></span>
            <span class="value">100</span>
          </p>
          <p class="statistic-text">
            вантажівок та автомобілей передалі на потреби ЗСУ та волонтерів
          </p>
        </div>
      </div>
      <a
        href="https://pay.fondy.eu/merchants/d3e91b7a3239c743f6720aef38a0d24fb50546fe/default/index.html?button=0a4098a3f61bafc42bce881e0f79036a815db260"
        target="_blank"
        class="more-button">
        <span>
          Донат на паливо
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.3333 2.66675H2.66666C1.92666 2.66675 1.33999 3.26008 1.33999 4.00008L1.33333 12.0001C1.33333 12.7401 1.92666 13.3334 2.66666 13.3334H13.3333C14.0733 13.3334 14.6667 12.7401 14.6667 12.0001V4.00008C14.6667 3.26008 14.0733 2.66675 13.3333 2.66675ZM13.3333 11.0001C13.3333 11.5524 12.8856 12.0001 12.3333 12.0001H3.66666C3.11438 12.0001 2.66666 11.5524 2.66666 11.0001V8.00008H13.3333V11.0001ZM13.3333 5.33341H2.66666V5.00008C2.66666 4.4478 3.11438 4.00008 3.66666 4.00008H12.3333C12.8856 4.00008 13.3333 4.4478 13.3333 5.00008V5.33341Z"
              fill="white"/>
          </svg>
        </span>
      </a>
    </div>
    <div class="image-wrapper"></div>
  </div>
</template>
<script>
export default {
  name: 'Donat'
}
</script>
<style scoped lang="scss">
.donat-wrapper {
  background: #F2E2C1;

  .info-wrapper {
    box-sizing: border-box;

    .title {
      color: rgba(51, 51, 47, 1);
      margin-top: 0;
    }

    .text {
      color: rgba(51, 51, 47, 1);
    }

    .statistic {
      .item {
        .indicator {
          display: flex;
          align-items: center;
          color: rgba(51, 51, 47, 1);
          font-weight: 700;
          margin: 0;

          .value {
            color: rgba(218, 41, 28, 1);
          }
        }

        .statistic-text {
          color: rgba(51, 51, 47, 1);
          margin: 0;
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
  .donat-wrapper {
    display: flex;
    margin-bottom: 70px;

    .info-wrapper {
      order: 2;
      width: 51%;
      padding: 70px 71px 70px 39px;

      .title {
        font-size: 32px;
        line-height: 38px;
        margin-bottom: 36px;
      }

      .text {
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 24px;
        max-width: 667px;
      }

      .statistic {
        margin-bottom: 24px;

        .item {
          &:not(:last-child) {
            margin-bottom: 24px;
          }

          .indicator {
            font-size: 18px;
            margin-bottom: 8px;

            .value {
              font-size: 32px;
              display: inline-block;
              margin: 0 8px;
            }
          }

          .statistic-text {
            font-size: 16px;
            line-height: 19px;
          }
        }
      }

      .more-button {
        padding: 14px 21px 14px 20px;
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

    .image-wrapper {
      order: 1;
      width: 49%;
      background-image: url('../assets/images/donat-desktop.jpg');
      background-size: cover;
      background-position: center;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .donat-wrapper {
    padding: 48px 24px 0;

    .info-wrapper {

      padding-bottom: 24px;

      .title {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 24px;
      }

      .text {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 24px;
      }

      .statistic {
        margin-bottom: 24px;

        .item {
          &:not(:last-child) {
            margin-bottom: 16px;
          }

          .indicator {
            font-size: 16px;
            line-height: 19px;
            margin-bottom: 4px;

            .value {
              font-size: 28px;
              line-height: 34px;
              display: inline-block;
              margin: 0 8px;
            }
          }

          .statistic-text {
            font-size: 14px;
            line-height: 17px;
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

    .image-wrapper {
      background-image: url('../assets/images/donat-desktop.jpg');
      background-size: cover;
      background-position: center;
      display: block;
      width: 100%;
      margin: 0 -24px;
      padding: 69% 24px 0;
    }
  }
}
</style>
