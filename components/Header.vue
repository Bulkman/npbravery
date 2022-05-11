<template>
  <header :class="{'mobile-menu-active': mobileMenuActive}">
    <button class="hamburger-button" @click="mobileMenuActive=true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17ZM3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12ZM4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H4Z"
          fill="#33332F"/>
      </svg>
    </button>
    <button class="close-mobile-nav-button" @click="mobileMenuActive=false">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.295 7.115C18.6844 6.72564 18.6844 6.09436 18.295 5.705C17.9056 5.31564 17.2744 5.31564 16.885 5.705L12 10.59L7.115 5.705C6.72564 5.31564 6.09436 5.31564 5.705 5.705C5.31564 6.09436 5.31564 6.72564 5.705 7.115L10.59 12L5.705 16.885C5.31564 17.2744 5.31564 17.9056 5.705 18.295C6.09436 18.6844 6.72564 18.6844 7.115 18.295L12 13.41L16.885 18.295C17.2744 18.6844 17.9056 18.6844 18.295 18.295C18.6844 17.9056 18.6844 17.2744 18.295 16.885L13.41 12L18.295 7.115Z"
          fill="#33332F"/>
      </svg>
    </button>
    <img class="logo" src="../assets/images/logo.svg" alt="logo"/>
    <nav>
      <span v-for="item in nav"
            :key="item.id"
            class="item"
            :class="{active: item.id === activeScrollBlock}"
            @click="clickHandler(item.id)">
        {{ item.text }}
      </span>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    activeScrollBlock: {
      default: null
    }
  },
  data() {
    return {
      mobileMenuActive: false,
      nav: [
        {
          text: 'Графік роботи',
          id: 'schedule',
        },
        {
          text: 'Міжнародна доставка',
          id: 'international'
        },
        {
          text: 'Акційні пропозиції',
          id: 'promo'
        },
        {
          text: 'Гуманітарна пошта',
          id: 'donat'
        },
        {
          text: 'Трекінг',
          id: 'tracking'
        },
        {
          text: 'FAQ',
          id: 'faq'
        },
      ]
    }
  },
  methods: {
    clickHandler(id) {
      this.$emit('linkClick', id);
      this.mobileMenuActive = false;
    }
  },
}
</script>

<style scoped lang="scss">
header {
  .logo {
    display: block;
  }

  nav {
    .item {
      color: rgba(32, 33, 36, 0.87);
      font-size: 16px;
      line-height: 16px;
      text-decoration: none;
    }
  }
}

@media only screen and (min-width: 1025px) {
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0 32px;

    .hamburger-button {
      display: none;
    }

    .close-mobile-nav-button {
      display: none;
    }

    .logo {
      margin-right: 30px;
      width: 264px;
    }

    nav {
      display: flex;

      .item {
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 10;
    padding: 0 27px;
    display: flex;
    align-items: center;
    height: 79px;
    box-sizing: border-box;

    .hamburger-button {
      position: absolute;
      border: none;
      outline: none;
      background: transparent;
      width: 24px;
      height: 24px;
      padding: 0;
      z-index: 11;
      transform: translateX(0);
      transition: all .2s ease-out;
      opacity: 1;
      visibility: visible;
    }

    .logo {
      width: 173px;
      margin: auto;
      position: absolute;
      left: calc(50% - 88px);
      z-index: 11;
      transition: all .2s ease-out;
    }

    .close-mobile-nav-button {
      position: absolute;
      border: none;
      outline: none;
      background: transparent;
      width: 24px;
      height: 24px;
      padding: 0;
      right: 24px;
      z-index: 11;
      transform: translateX(100%);
      transition: all .2s ease-out;
      opacity: 0;
      visibility: hidden;
    }

    nav {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 10;
      background: #fff;
      top: 0;
      left: 0;
      padding: 96px 0 0;
      transition: all .2s ease-out;
      transform: translateX(100%);

      .item {
        display: block;
        padding: 24px;
        position: relative;

        &.active {
          &:before {
            content: '';
            position: absolute;
            width: 5px;
            height: 100%;
            left: 0;
            top: 0;
            border-radius: 0 3px 3px 0;
            background: #DA291C;
          }
        }
      }
    }

    &.mobile-menu-active {
      .hamburger-button {
        transform: translateX(-100%);
        opacity: 0;
        visibility: hidden;
      }

      .close-mobile-nav-button {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      nav {
        transform: translateX(0);
      }

      .logo {
        left: 24px;
      }
    }
  }
}
</style>
