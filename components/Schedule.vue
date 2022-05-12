<template>
  <div class="schedule-wrapper">
    <h2 class="title">Графік роботи</h2>
    <div class="schedule-header">
      <div class="schedule-switcher">
        <button class="switch warehouse-switch"
                :class="{active: switcherValue === 'warehouse'}"
                @click="switcherValue = 'warehouse'"
        >Відділення
        </button>
        <button class="switch poshtomats-switch"
                :class="{active: switcherValue === 'poshtomat'}"
                @click="switcherValue = 'poshtomat'"
        >Поштомати
        </button>
      </div>
      <div class="selects-wrapper">
        <NpAutocomplete class="select"
                        v-model="citySearchValue"
                        :items="cityItems"
                        label="Оберіть місто"
                        @selectHandler="citySelectedHandler"
                        @clearClick="clearClickHandler"
        />
        <NpAutocomplete class="select"
                        v-model="warehouseSelectValue"
                        :items="filteredWarehouses"
                        :label="warehouseSelectLabel"
                        @selectHandler="warehouseSelectHandler"
                        :min-length="0"
                        :disabled="!warehouses.length"
        />
      </div>
    </div>
    <div class="table">
      <div class="table-head" v-if="!noSearchYet && !isMobile">
        <div class="td name">
          Відділення
        </div>
        <div class="td schedule">
          Графік роботи
        </div>
        <div class="td type">
          Тип відділення
        </div>
        <div class="td input">
          Відправлення
        </div>
        <div class="td output">
          Отримання
        </div>
        <div class="td map">
          <span>До мапи</span>
        </div>
      </div>
      <div class="table-body desktop" v-if="!isMobile">
        <div v-for="warehouse in filteredWarehouses"
             class="table-row">
          <div class="td name">
            {{ warehouse.Description }}
          </div>
          <div class="td schedule">
            <span class="mobile-label">
              Графік роботи
            </span>
            <span v-html="calculateSchedule(warehouse)"></span>
          </div>
          <div class="td type">
            <span class="mobile-label">
              Тип відділення
            </span>
            <span v-html="calculateType(warehouse)"></span>
          </div>
          <div class="td input">
            <span class="mobile-label">
              Відправлення
            </span>
            <span v-html="calculateAvailable(warehouse)"></span>
          </div>
          <div class="td output">
            <span class="mobile-label">
              Отримання
            </span>
            <span>
              <p class="available active">
                Доступно
              </p>
            </span>
          </div>
          <div class="td map">
            <a :href="`https://maps.google.com/?q=${warehouse.Latitude},${warehouse.Longitude}`" target="_blank">Показати
              на мапі</a>
          </div>
        </div>
      </div>
      <div class="table-body mobile" v-if="isMobile">
        <div ref="swiper" v-swiper="swiperOption" @slideChange="slideChange">
          <div class="swiper-wrapper">
            <div v-for="page in warehousesForMobile" class="swiper-slide">
              <div v-for="warehouse in page">
                <div class="td name">
                  {{ warehouse.Description }}
                </div>
                <div class="td schedule">
            <span class="mobile-label">
              Графік роботи
            </span>
                  <span v-html="calculateSchedule(warehouse)"></span>
                </div>
                <div class="td type">
            <span class="mobile-label">
              Тип відділення
            </span>
                  <span v-html="calculateType(warehouse)"></span>
                </div>
                <div class="td input">
            <span class="mobile-label">
              Відправлення
            </span>
                  <span v-html="calculateAvailable(warehouse)"></span>
                </div>
                <div class="td output">
            <span class="mobile-label">
              Отримання
            </span>
                  <span>
              <p class="available active">
                Доступно
              </p>
            </span>
                </div>
                <div class="td map">
                  <a :href="`https://maps.google.com/?q=${warehouse.Latitude},${warehouse.Longitude}`" target="_blank">Показати
                    на мапі</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isMobile && !noSearchYet && warehousesForMobile.length > 1" class="mobile-pagination-wrapper">
          <div class="prev-button" :class="{disabled: this.currentSwiperPage === 1}" @click="prevSlide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.631 5.44724C17.1053 4.98973 17.1043 4.22957 16.6286 3.77339V3.77339C16.1783 3.34153 15.4672 3.34271 15.0184 3.77606L7.24556 11.2802C6.83817 11.6735 6.83834 12.3263 7.24593 12.7194L15.0276 20.2246C15.4763 20.6573 16.187 20.6573 16.6356 20.2246V20.2246C17.1079 19.7691 17.1079 19.0127 16.6356 18.5573L9.83676 12L16.631 5.44724Z"
                fill="#202124" fill-opacity="0.87"/>
            </svg>
          </div>
          <div class="value-wrapper">
            <span><b>{{ this.currentSwiperPage }}</b></span> з {{ warehousesForMobile.length }}
          </div>
          <div class="next-button" :class="{disabled: this.currentSwiperPage === this.warehousesForMobile.length}" @click="nextSlide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.36436 18.5573C6.89213 19.0127 6.89213 19.7691 7.36436 20.2246C7.81304 20.6573 8.52372 20.6573 8.9724 20.2246L16.7537 12.7198C17.1614 12.3265 17.1614 11.6735 16.7537 11.2802L8.9724 3.77545C8.52372 3.34272 7.81304 3.34272 7.36436 3.77545C6.89213 4.2309 6.89213 4.98729 7.36436 5.44274L14.1632 12L7.36436 18.5573Z"
                fill="#202124" fill-opacity="0.87"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="helper-wrapper" v-if="noSearchYet">
      <div class="info-wrapper">
        <svg class="arrow" width="35" height="93" viewBox="0 0 35 93" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.2199 92.2098C34.0364 92.35 34.8119 91.8018 34.9521 90.9853C35.0923 90.1688 34.5441 89.3933 33.7276 89.2531L33.2199 92.2098ZM15.3443 1.33452C14.9768 0.59209 14.077 0.28817 13.3345 0.655704L1.23583 6.64499C0.493392 7.01252 0.189474 7.91233 0.557006 8.65477C0.924539 9.3972 1.82434 9.70112 2.56678 9.33359L13.3212 4.00978L18.645 14.7642C19.0125 15.5066 19.9123 15.8105 20.6548 15.443C21.3972 15.0755 21.7011 14.1757 21.3336 13.4332L15.3443 1.33452ZM7.63935 66.1891L6.26863 66.7983L7.63935 66.1891ZM33.4737 90.7315C33.7276 89.2531 33.7284 89.2532 33.7291 89.2534C33.7293 89.2534 33.73 89.2535 33.7303 89.2536C33.731 89.2537 33.7314 89.2538 33.7316 89.2538C33.732 89.2539 33.7314 89.2538 33.7299 89.2535C33.7268 89.2529 33.7199 89.2517 33.7093 89.2496C33.6881 89.2456 33.6519 89.2384 33.6015 89.2277C33.5007 89.2063 33.3429 89.1707 33.1337 89.1169C32.7153 89.0094 32.0916 88.8296 31.306 88.5466C29.7346 87.9805 27.5184 87.0025 25.0024 85.3658C19.9829 82.1007 13.7233 76.1848 9.01007 65.5799L6.26863 66.7983C11.2298 77.9611 17.8874 84.3164 23.3665 87.8805C26.0998 89.6585 28.5282 90.7346 30.2892 91.369C31.1698 91.6862 31.8841 91.8933 32.3872 92.0225C32.6388 92.0872 32.8377 92.1324 32.9783 92.1623C33.0486 92.1772 33.1044 92.1883 33.1449 92.196C33.1651 92.1999 33.1815 92.203 33.1941 92.2052C33.2004 92.2064 33.2056 92.2073 33.21 92.2081C33.2121 92.2085 33.214 92.2088 33.2157 92.2091C33.2165 92.2092 33.2176 92.2094 33.218 92.2095C33.219 92.2097 33.2199 92.2098 33.4737 90.7315ZM9.01007 65.5799C6.96822 60.9856 6.27438 54.7897 6.4604 47.9375C6.64559 41.1156 7.69711 33.7933 9.02718 27.0397C10.3561 20.2919 11.9562 14.1461 13.2248 9.68565C13.8589 7.45646 14.4094 5.6507 14.8008 4.40414C14.9965 3.78091 15.1523 3.29761 15.2589 2.97123C15.3121 2.80805 15.3531 2.6841 15.3805 2.60152C15.3943 2.56023 15.4046 2.52928 15.4114 2.50894C15.4148 2.49877 15.4173 2.49124 15.419 2.48641C15.4198 2.484 15.4204 2.48225 15.4207 2.48118C15.4209 2.48064 15.421 2.48035 15.4211 2.48008C15.4211 2.47996 15.4211 2.48 14 2C12.5789 1.52 12.5787 1.52039 12.5786 1.52094C12.5784 1.52135 12.5782 1.52208 12.5779 1.5229C12.5773 1.52454 12.5766 1.52687 12.5756 1.52986C12.5735 1.53585 12.5706 1.54453 12.5668 1.55588C12.5592 1.57856 12.5481 1.61188 12.5336 1.65559C12.5045 1.74298 12.4619 1.87189 12.407 2.04017C12.2971 2.37671 12.1378 2.87083 11.9385 3.50547C11.5401 4.77466 10.9816 6.60656 10.3393 8.86495C9.05521 13.3797 7.43301 19.6089 6.08372 26.46C4.73556 33.3055 3.65288 40.8064 3.4615 47.8561C3.27095 54.8755 3.95818 61.5997 6.26863 66.7983L9.01007 65.5799Z"
            fill="white"/>
        </svg>
        <p class="text">
          Обери місто та номер відділення/поштомату, щоб побачити актуальний графік роботи
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import NpAutocomplete from "./ui/NpAutocomplete";
import _ from 'lodash';

const warehousesTypes = {
  warehouse: ['841339c7-591a-42e2-8233-7a0a00f0ed6f', '9a68df70-0267-42a8-bb5c-37f427e36ee4'],
  poshtomat: ['f9316480-5f2d-425d-bc2c-ac7cd29decf0', '95dc212d-479c-4ffb-a8ab-8c1b9073d0bc']
}
export default {
  name: 'Schedule',
  components: {
    NpAutocomplete
  },
  props: {
    isMobile: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      switcherValue: 'warehouse',
      citySearchValue: '',
      cityItems: [],
      selectedCity: null,
      warehouses: [],
      warehouseSelectValue: '',
      selectedWarehouse: null,
      noSearchYet: true,
      swiperOption: {
        slidesPerView: 1,
      },
      currentSwiperPage: 1
    }
  },
  computed: {
    filteredWarehouses() {
      return this.warehouses.filter(item => {
        return (warehousesTypes[this.switcherValue].includes(item.TypeOfWarehouse) &&
          item.Description.toUpperCase().includes(this.warehouseSelectValue.toUpperCase()))
      })
    },
    warehouseSelectLabel() {
      return this.switcherValue === 'poshtomat' ? 'Оберіть поштомат' : 'Оберіть відділення'
    },
    warehousesForMobile() {
      const res = [];
      for (let i = 0; i < this.filteredWarehouses.length; i += 3) {
        const chunk = this.filteredWarehouses.slice(i, i + 3);
        res.push(chunk);
      }
      return res;
    }
  },
  methods: {
    slideChange() {
      this.currentSwiperPage = this.$refs['swiper'].swiper.activeIndex + 1
    },
    async fetchCities(keyword) {
      return await this.$axios.post('', {
        "apiKey": "f0a192955bdefd1dd4c2942624d127b5",
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": {
          "FindByString": keyword,
        }
      })
    },
    async cityInputHandler(value) {
      const response = await this.fetchCities(value);
      this.cityItems = response.data.data;
    },
    async fetchWarehouses() {
      this.noSearchYet = false;
      return await this.$axios.post('', {
        "apiKey": "f0a192955bdefd1dd4c2942624d127b5",
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
          "CityRef": this.selectedCity.Ref,
          "Language": "UA",
        }
      })
    },
    async updateWarehouses() {
      const response = await this.fetchWarehouses();
      this.warehouses = response.data.data;
    },
    citySelectedHandler(item) {
      this.selectedCity = item;
    },
    warehouseSelectHandler(value) {
      this.selectedWarehouse = value;
      this.warehouseSelectValue = value ? value.Description : '';
    },
    calculateSchedule(warehouse) {
      const schedule = warehouse.Schedule;
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const daysOfWeekTranslate = {
        Sunday: 'у неділю',
        Monday: 'у понеділок',
        Tuesday: 'у вівторок',
        Wednesday: 'в середу',
        Thursday: 'в четверг',
        Friday: 'у п\'ятницю',
        Saturday: 'в суботу',
      };
      const currentWeekDay = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
      });
      const currentHours = new Date().getHours();
      const currentMinutes = new Date().getMinutes();
      const currentTime = `${('0' + currentHours).slice(-2)}:${('0' + currentMinutes).slice(-2)}`;

      const convertTimeToMinutes = (time) => {
        const timeArray = time.split(':');
        return parseInt(timeArray[0] * 60 + timeArray[1]);
      };
      const getNextWorkingDay = (day) => {
        const dayIndex = daysOfWeek.indexOf(day);
        const arrayForLoop = [].concat(daysOfWeek.slice(dayIndex, daysOfWeek.length), daysOfWeek.slice(0, dayIndex))
        for (let i = 1; i < arrayForLoop.length; i += 1) {
          if (schedule[arrayForLoop[i]] !== '-') {
            return arrayForLoop[i]
          }
        }
        return null
      }

      if (schedule) {
        const workingHours = schedule[currentWeekDay];
        if (workingHours !== '–') {
          const workingHoursArray = workingHours.split('-');
          const startTime = workingHoursArray[0];
          const endTime = workingHoursArray[1];

          if (convertTimeToMinutes(currentTime) > convertTimeToMinutes(startTime) && convertTimeToMinutes(currentTime) < convertTimeToMinutes(endTime)) {
            return `<div><span class="green">Відкрито сьогодні</span> </br> з ${startTime} до ${endTime}</div>`;
          } else if (convertTimeToMinutes(currentTime) < convertTimeToMinutes(startTime)) {
            return `<div><span class="red">Наразі закрито</span> </br> Відкриється в ${startTime}</div>`;
          } else {
            const nextWorkingDay = getNextWorkingDay(currentWeekDay);
            if (nextWorkingDay) {
              const nextWorkingDayStartTime = schedule[nextWorkingDay].split('-')[0];
              return `<div><span class="red">Наразі закрито</span> </br> Відкриється ${daysOfWeekTranslate[nextWorkingDay]} в ${nextWorkingDayStartTime}</div>`;
            } else {
              return '-'
            }
          }
        }
      } else {
        const nextWorkingDay = getNextWorkingDay(currentWeekDay);
        if (nextWorkingDay) {
          const nextWorkingDayStartTime = schedule[nextWorkingDay].split('-')[0];
          return `<div><span class="red">Наразі закрито</span> </br> Відкриється ${daysOfWeekTranslate[nextWorkingDay]} в ${nextWorkingDayStartTime}</div>`;
        } else {
          return '-'
        }
      }
    },
    calculateType(warehouse) {
      const warehouseTypes = [
        {
          "Ref": "6f8c7162-4b72-4b0a-88e5-906948c6a92f",
          "Description": "Parcel Shop",
          "DescriptionRu": "Parcel Shop"
        },
        {
          "Ref": "841339c7-591a-42e2-8233-7a0a00f0ed6f",
          "Description": "Поштове відділення",
          "DescriptionRu": "Почтовое отделение"
        },
        {
          "Ref": "95dc212d-479c-4ffb-a8ab-8c1b9073d0bc",
          "Description": "Поштомат ПриватБанку",
          "DescriptionRu": "Почтомат приват банка"
        },
        {
          "Ref": "9a68df70-0267-42a8-bb5c-37f427e36ee4",
          "Description": "Вантажне відділення",
          "DescriptionRu": "Грузовое отделение"
        },
        {
          "Ref": "f9316480-5f2d-425d-bc2c-ac7cd29decf0",
          "Description": "Поштомат",
          "DescriptionRu": "Почтомат"
        }
      ];
      const weightMax = warehouse.TotalMaxWeightAllowed === '0' ? 'без обмежень' : `до ${warehouse.TotalMaxWeightAllowed} кг`;
      const currentWarehouseType = warehouseTypes.find(item => item.Ref === warehouse.TypeOfWarehouse);
      return `${currentWarehouseType ? currentWarehouseType.Description : ''} ${weightMax}`;
    },
    calculateAvailable(warehouse) {
      if (warehouse.DenyToSelect === '1' && warehouse.WarehouseStatus === 'Working') {
        return '<p class="available inactive"> Недоступно </p>'
      } else {
        return '<p class="available active"> Доступно </p>'
      }
    },
    clearClickHandler() {
      this.warehouseSelectValue = '';
      this.selectedWarehouse = null;
      this.cityItems = [];
      this.warehouses = [];
    },
    prevSlide() {
      this.$refs['swiper'].swiper.slidePrev()
    },
    nextSlide() {
      this.$refs['swiper'].swiper.slideNext()
    }
  },
  watch: {
    async citySearchValue(value) {
      if (value.length > 2) {
        await this.cityInputHandler(value)
      }
    },
    async selectedCity(value) {
      if (value) {
        await this.updateWarehouses();
      } else {
        this.clearClickHandler();
      }
    },
  },
}
</script>
<style scoped lang="scss">

@keyframes arrow-animation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

.schedule-wrapper {
  .title {
    color: rgba(51, 51, 47, 1);
  }

  .schedule-header {
    .schedule-switcher {
      background: #F4F4F4;
      border-radius: 8px;
      padding: 4px;
      display: flex;
      justify-content: space-between;

      .switch {
        font-size: 14px;
        color: rgba(32, 33, 36, 0.87);
        text-align: center;
        outline: none;
        background: transparent;
        transition: all .2s ease-out;
        width: 49%;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid transparent;
        padding: 0;

        &:not(.active):hover {
          border: 1px solid rgba(66, 215, 133, 1);
        }

        &.active {
          background: rgba(66, 215, 133, 1);
          color: rgba(255, 255, 255, 1);
          border: 1px solid rgba(66, 215, 133, 1);
        }
      }
    }
  }

  .table {
    .table-body {
      .td {
        display: flex;
        align-items: center;

        .available {
          margin: 0;
          position: relative;
          padding-left: 24px;

          &:before {
            content: '';
            display: block;
            width: 8px;
            height: 8px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            border-radius: 50%;
          }

          &.active {
            color: #42D785;

            &:before {
              background: #42D785;
              border: 4px solid rgb(233, 247, 239);
            }
          }

          &.inactive {
            &:before {
              background: #DA291C;
              border: 4px solid #F0A9A4;
            }
          }
        }

        &.map {
          a {
            color: #2BA2EE;
            font-size: 13px;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .helper-wrapper {
    background: rgba(187, 188, 188, 0.8);
    display: flex;
    justify-content: center;

    .info-wrapper {
      text-align: center;

      .arrow {
        animation: arrow-animation 1s linear infinite;
      }

      .text {
        color: #fff;
        margin: 0;
        font-weight: 700;
      }
    }
  }
}

@media only screen and (min-width: 1025px) {
  .schedule-wrapper {
    margin-bottom: 70px;

    .title {
      font-size: 32px;
      line-height: 32px;
      margin-bottom: 48px;
    }

    .schedule-header {
      margin-bottom: 48px;
      display: flex;

      .schedule-switcher {
        width: 406px;
        margin-right: 40px;

        .switch {
          height: 40px;
        }
      }

      .selects-wrapper {
        display: flex;
        justify-content: space-between;

        .select {
          width: 294px;

          &:first-child {
            margin-right: 40px;
          }
        }
      }
    }

    .table {
      .table-head,
      .table-body .table-row {
        display: flex;
        justify-content: space-between;
      }

      .table-head {
        border-bottom: 1px solid #E5E5E5;

        .td {
          text-align: center;
          font-size: 14px;
          line-height: 19px;
          padding-top: 16px;
          padding-bottom: 16px;
        }
      }

      .table-body .table-row {
        border-bottom: 1px solid #E5E5E5;
      }

      .table-body {
        max-height: 553px;
        overflow: auto;

        .row {
          min-height: 68px;
        }
      }

      .td {
        padding: 16px;
        box-sizing: border-box;
        color: rgba(51, 51, 47, 1);
        font-size: 13px;
        line-height: 18px;

        .mobile-label {
          display: none;
        }

        &.name {
          width: 430px;
        }

        &.schedule {
          width: 210px;
        }

        &.type {
          width: 260px;
        }

        &.input, &.output {
          width: 170px;
        }

        &.map {
          width: 180px;
        }
      }
    }

    .helper-wrapper {
      padding: 113px 0 316px;

      .info-wrapper {
        .arrow {
          margin-bottom: 24px;
        }

        .text {
          font-size: 24px;
          line-height: 34px;
          max-width: 621px;
          margin: 0 auto;
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  .schedule-wrapper {
    padding: 0 24px;
    margin-bottom: 24px;
  }

  .title {
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 16px;
  }

  .schedule-header {

    .schedule-switcher {
      margin-bottom: 32px;

      .switch {
        height: 32px;
      }
    }

    .selects-wrapper {
      margin-bottom: 24px;

      .select {
        width: 100%;
        height: 40px;

        &:first-child {
          margin-bottom: 24px;
        }
      }
    }
  }

  .table {

    .table-head {
      display: none;
    }

    .table-body {
      margin: 0 -24px;
    }

    .td {
      box-sizing: border-box;
      color: rgba(51, 51, 47, 1);
      font-size: 13px;
      line-height: 18px;
      padding: 8px 24px;
      display: flex;
      justify-content: space-between;

      & > span {
        width: 50%;
      }

      &.name {
        background: #F4F4F4;
        font-weight: 700;
      }

      &.schedule {

      }

      &.type {

      }

      &.input, &.output {

      }

      &.map {
        display: none !important;
      }
    }

    .mobile-pagination-wrapper {
      text-align: center;
      color: rgba(164, 164, 164, 1);
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 27px;

      .value-wrapper {
        margin: 0 11px;

        span {
          color: rgba(32, 33, 36, 0.87);
        }
      }

      .prev-button,
      .next-button {
        width: 24px;
        height: 24px;
      }

      .disabled {
        svg {
          path {
            fill-opacity: 0.38;
          }
        }
      }
    }
  }

  .helper-wrapper {
    .info-wrapper {
      padding: 48px 24px 111px;

      .arrow {
        margin-bottom: 16px;
      }

      .text {
        font-size: 16px;
        line-height: 22px;
        max-width: 312px;
        margin: 0 auto;
      }
    }
  }
}
</style>
<style lang="scss">
.schedule-wrapper {
  .schedule-header {
    .select {
      .v-autocomplete-input {
        outline: none;
        padding: 0 16px;
        box-sizing: border-box;
        color: rgba(32, 33, 36, 0.87);
        border: 1px solid rgba(32, 33, 36, 0.38);
        border-radius: 8px;
      }

      .v-autocomplete-list {
        box-shadow: 0 3px 5px rgba(32, 33, 36, 0.2);
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
        border-radius: 8px;
        background: #fff;

        .v-autocomplete-list-item {
          padding: 12px 8px;
          color: rgba(32, 33, 36, 0.87);
        }
      }
    }
  }

  .table {
    .td {
      &.schedule {
        .green {
          color: #42D785;
        }

        .red {
          color: rgb(201, 59, 43);
        }
      }

      .available {
        margin: 0;
        position: relative;
        padding: 8px 0 9px 24px;

        &:before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          border-radius: 50%;
        }

        &.active {
          color: #42D785;

          &:before {
            background: #42D785;
            border: 4px solid rgb(233, 247, 239);
          }
        }

        &.inactive {
          &:before {
            background: #DA291C;
            border: 4px solid #F0A9A4;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1025px) {
  .schedule-wrapper {
    .schedule-header {
      .select {
        .v-autocomplete-input {
          font-size: 16px;
          width: 294px;
          height: 48px;
        }

        .v-autocomplete-list {

          .v-autocomplete-list-item {
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
