<template>
  <div class="wrapper">
    <Header :activeScrollBlock="activeScrollBlock"
            @linkClick="linkClickHandler"/>
    <MainBanner/>
    <Schedule ref="schedule"
              :isMobile="isMobile"/>
    <InternationalDeliveryBanner ref="international"/>
    <Promo ref="promo"
           :isMobile="isMobile"/>
    <Donat ref="donat"/>
    <Tracking ref="tracking"/>
    <Faq ref="faq"/>
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
import Tracking from "../components/Tracking";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default {
  name: 'IndexPage',
  components: {Header, MainBanner, Schedule, InternationalDeliveryBanner, Promo, Donat, Tracking, Faq, Footer},
  data() {
    return {
      isMobile: false,
      blocksPositions: {},
      activeScrollBlock: null
    }
  },
  methods: {
    checkIsMobile() {
      this.isMobile = window.innerWidth < 1025
    },
    linkClickHandler(ref) {
      const offsetPosition = this.isMobile ? this.$refs[ref].$el.getBoundingClientRect().top - 79 : this.$refs[ref].$el.getBoundingClientRect().top;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth"
      });
    },
    calculateBlocksPosition() {
      for (let key in this.$refs) {
        const element = this.$refs[key].$el;
        const yPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const headerHeight = 79;

        this.blocksPositions[key] = {
          start: yPosition + windowHeight - headerHeight,
          end: yPosition + element.scrollHeight + windowHeight - headerHeight
        }
      }
    }
  },
  mounted() {
    this.checkIsMobile();
    this.calculateBlocksPosition();

    window.addEventListener('resize', () => {
      this.checkIsMobile();

      if (this.isMobile) {
        this.calculateBlocksPosition();
      }
    });
    window.addEventListener('scroll', () => {
      if (this.isMobile) {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const currentScroll = scrollY + windowHeight;

        this.activeScrollBlock = null;
        for (let key in this.blocksPositions) {
          if (currentScroll > this.blocksPositions[key].start && currentScroll < this.blocksPositions[key].end) {
            this.activeScrollBlock = key;
            return false
          }
        }
      }
    });
  },
}
</script>
