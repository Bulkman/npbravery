<template>
  <header>
    <img class="logo" src="../assets/images/logo.svg" alt="logo"/>
    <nav>
      <a class="item" href="#">Графік роботи</a>
      <a class="item" href="#">Міжнародна доставка</a>
      <a class="item" href="#">Акційні пропозиції</a>
      <a class="item" href="#">Гуманітарна пошта</a>
      <a class="item" href="#">Трекінг</a>
      <a class="item" href="#">FAQ</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
header {
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

    .logo {
      margin-right: 30px;
      width: 264px;
      display: block;
    }

    nav {
      display: flex;

      .item {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
