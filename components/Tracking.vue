<template>
  <div class="tracking-wrapper">
    <div class="tracking-form">
      <h2 class="title">Трекінг</h2>
      <form>
        <input class="en-input"
               type="text"
               placeholder="Введіть номер ЕН"
               v-model="trackingNumber"
        />
        <button class="en-button"
                type="button"
                :disabled="disabled"
                @click="openTracking"
        >
          <span>
            <span>Відстежити</span>
             <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8333 9.33326H10.3067L10.12 9.15326C10.92 8.21993 11.3333 6.9466 11.1067 5.59326C10.7933 3.73993 9.24667 2.25993 7.38 2.03326C4.56 1.6866 2.18667 4.05993 2.53333 6.87993C2.76 8.74659 4.24 10.2933 6.09333 10.6066C7.44667 10.8333 8.72 10.4199 9.65333 9.61993L9.83333 9.80659V10.3333L12.6667 13.1666C12.94 13.4399 13.3867 13.4399 13.66 13.1666C13.9333 12.8933 13.9333 12.4466 13.66 12.1733L10.8333 9.33326ZM6.83333 9.33326C5.17333 9.33326 3.83333 7.99326 3.83333 6.33326C3.83333 4.67326 5.17333 3.33326 6.83333 3.33326C8.49333 3.33326 9.83333 4.67326 9.83333 6.33326C9.83333 7.99326 8.49333 9.33326 6.83333 9.33326Z"
                fill="white"/>
            </svg>
          </span>
        </button>
      </form>
      <h3 class="subtitle">Як керувати посилкою?</h3>
      <p class="text">Введіть номер посилки по Україні, щоб керувати доставкою: дізнатися статус, переадресувати або
        оплатити послуги
        доставки.</p>
    </div>
    <div class="apps-wrapper">
      <div class="info-wrapper">
        <h2 class="title">Перевіряйте статус посилки у мобільному застосунку</h2>
        <p class="text">Отримуйте миттєві повідомлення про посилки, оплачуйте послуги онлайн, створюйте посилки
          заздалегідь,
          викликайте кур'єра, розраховуйте вартість доставки, забирайте посилки з поштоматів та відділень без
          пред'явлення документів.</p>
        <div class="apps-buttons">
          <a href="https://play.google.com/store/apps/details?id=ua.novaposhtaa&hl=ru&gl=US" target="_blank">
            <img src="../assets/images/google-play-market.png"/>
          </a>
          <a href="https://apps.apple.com/ru/app/%D0%BD%D0%BE%D0%B2%D0%B0-%D0%BF%D0%BE%D1%88%D1%82%D0%B0/id545980774" target="_blank">
            <img src="../assets/images/apple-store.png"/>
          </a>
        </div>
      </div>
      <div class="qr-image-wrapper">
        <img class="qr-image" src="../assets/images/qr.svg"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tracking',
  data() {
    return {
      trackingNumber: ''
    }
  },
  computed: {
    disabled() {
      return !this.trackingNumber.length
    }
  },
  methods: {
    openTracking() {
      window.open(`https://novaposhta.ua/ru/tracking/?cargo_number=${this.trackingNumber}`, '_blank').focus();
    }
  }
}
</script>
<style scoped lang="scss">
.tracking-wrapper {
  .tracking-form {
    background: rgba(181, 227, 216, 1);

    .title {
      color: rgba(51, 51, 47, 1);
      margin-top: 0;
    }

    form {
      display: flex;

      .en-input {
        background: #fff;
        border-radius: 8px;
        border: none;
        color: rgba(32, 33, 36, 0.38);
        outline: none;
        font-size: 16px;
        padding: 16px;
        box-sizing: border-box;

        &::placeholder {
          color: rgba(32, 33, 36, 0.38);
        }
      }

      .en-button {
        background: rgba(66, 215, 133, 1);
        border: 1px solid rgba(66, 215, 133, 1);
        box-sizing: border-box;
        color: #fff;
        border-radius: 8px;
        display: inline-block;
        text-decoration: none;
        font-size: 16px;

        &:disabled {
          pointer-events: none;
        }

        & > span {
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

    .subtitle {
      color: rgba(51, 51, 47, 1);
      margin-top: 0;
      margin-bottom: 16px;
    }

    .text {
      color: #33332F;
    }
  }

  .apps-wrapper {
    background: rgba(181, 227, 216, 1);

    .title {
      margin-top: 0;
      color: #33332F;
    }

    .text {
      color: #33332F;
    }

    .apps-buttons {
      a {
        text-decoration: none;
        width: 165px;
        display: block;

        img {
          display: block;
          width: 100%;
        }
      }
    }

  }
}

@media only screen and (min-width: 1025px) {
  .tracking-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 70px;

    & > div {
      width: calc(50% - 20px);
      box-sizing: border-box;
    }

    .tracking-form {
      padding: 40px;

      .title {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 24px;
      }

      form {
        justify-content: space-between;
        margin-bottom: 62px;

        .en-input {
          width: calc(100% - 186px - 24px)
        }

        .en-button {
          padding: 18px 0;
          width: 186px;
          transition: all .2s linear;
          cursor: pointer;

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

      .subtitle {
        font-size: 22px;
        line-height: 24px;
      }

      .text {
        font-size: 14px;
        line-height: 22px;
        max-width: 518px;
      }
    }

    .apps-wrapper {
      padding: 40px 40px 47px;
      position: relative;

      .title {
        font-size: 24px;
        line-height: 29px;
        margin-bottom: 16px;
        max-width: 398px;
      }

      .text {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 46px;
        max-width: 463px;
      }

      .apps-buttons {
        display: flex;

        a {
          &:first-child {
            margin-right: 24px;
          }
        }
      }

      .qr-image-wrapper {
        width: 119px;
        height: 119px;
        position: absolute;
        top: 32px;
        right: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  .tracking-wrapper {
    .tracking-form {
      padding: 48px 24px;
      margin-bottom: 24px;

      .title {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 24px;
      }

      form {
        margin-bottom: 32px;
        position: relative;

        .en-input {
          width: 100%;
          padding-right: 55px;
        }

        .en-button {
          position: absolute;
          height: 100%;
          right: 0;
          width: 48px;

          & > span {
            .text {
              display: none;
            }

            svg {
              margin: 0;
            }
          }
        }
      }

      .subtitle {
        font-size: 20px;
        line-height: 22px;
        margin-bottom: 16px;
      }

      .text {
        font-size: 14px;
        line-height: 22px;
      }
    }

    .apps-wrapper {
      padding: 48px 24px;

      .title {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 24px;
      }

      .text {
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 24px;
      }

      .apps-buttons {
        a {
          &:first-child {
            margin-bottom: 16px;
          }
        }
      }

      .qr-image {
        display: none;
      }
    }
  }
}
</style>
