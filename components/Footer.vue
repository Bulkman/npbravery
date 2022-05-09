<template>
  <footer>
    <p>©2006–{{ currentYear }} ТОВ «Нова Пошта». Всі права захищені. Використання матеріалів даного сайту можливе тільки
      з посиланням на джерело.</p>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>
<style scoped lang="scss">
footer {
  p {
    margin: 0;
    color: rgba(51, 51, 47, 1);
  }
}

@media only screen and (min-width: 1025px) {
  footer {
    background: #F2F2F5;
    padding: 26px 20px;
    margin: 0 -20px;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
  }
}

@media only screen and (max-width: 1024px) {
  footer {
    background: #F2F2F5;
    font-size: 10px;
    line-height: 14px;
    padding: 14px 44px 14px 24px;
  }
}
</style>
