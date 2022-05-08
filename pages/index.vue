<template>
  <div class="wrapper">
    <Header/>
    <MainBanner/>
    <Schedule/>
    <InternationalDeliveryBanner/>
    <Promo/>
    <Donat/>
    <Tracking/>
    <Faq/>
    <Footer/>
  </div>
</template>

<script>
import Header from "../components/Header";
import MainBanner from "../components/MainBanner";
import Schedule from "../components/Schedule";
import InternationalDeliveryBanner from "../components/InternationalDeliveryBanner";
import Promo from "../components/Promo";
import Donat from "../components/Donat";
import Tracking from  "../components/Tracking";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default {
  name: 'IndexPage',
  components: {Header, MainBanner, Schedule, InternationalDeliveryBanner, Promo, Donat, Tracking, Faq, Footer},
}
</script>
