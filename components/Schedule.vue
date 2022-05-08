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
                        :items="cityItems"
                        label="Оберіть місто"
                        @inputHandler="cityInputHandler"
                        @selectHandler="citySelectedHandler"
        />
        <NpAutocomplete class="select"
                        :items="filteredWarehouses"
                        :label="warehouseSelectLabel"
                        @inputHandler="warehouseInputHandler"
                        @selectHandler="warehouseSelectHandler"
                        :min-length="0"
                        :disabled="!warehouses.length"
        />
      </div>
    </div>
    <div class="table">
      <div class="table-head">
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
      <div class="table-body">
        <div v-for="warehouse in filteredWarehouses"
             class="table-row">
          <div class="td name">
            {{ warehouse.Description }}
          </div>
          <div class="td schedule" v-html="calculateSchedule(warehouse)"></div>
          <div class="td type">
            {{ calculateType(warehouse) }}
          </div>
          <div class="td input" v-html="calculateAvailable(warehouse)"></div>
          <div class="td output">
            <p class="available active">
              Доступно
            </p>
          </div>
          <div class="td map">
            <a :href="`https://maps.google.com/?q=${warehouse.Latitude},${warehouse.Longitude}`" target="_blank">Показати
              на мапі</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NpAutocomplete from "./ui/NpAutocomplete";

const warehousesTypes = {
  warehouse: ['841339c7-591a-42e2-8233-7a0a00f0ed6f', '9a68df70-0267-42a8-bb5c-37f427e36ee4'],
  poshtomat: ['f9316480-5f2d-425d-bc2c-ac7cd29decf0', '95dc212d-479c-4ffb-a8ab-8c1b9073d0bc']
}

export default {
  name: 'Schedule',
  components: {
    NpAutocomplete
  },
  data() {
    return {
      switcherValue: 'warehouse',
      cityItems: [],
      selectedCity: null,
      warehouses: [],
      warehouseSelectValue: '',
      selectedWarehouse: null
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
    }
  },
  methods: {
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
    warehouseInputHandler(value) {
      this.warehouseSelectValue = value;
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
    }
  },
  watch: {
    async selectedCity(value) {
      if (value) {
        await this.updateWarehouses()
      } else {
        this.warehouseSelectValue = '';
        this.selectedWarehouse = null;
        this.cityItems = [];
      }
    }
  }
}
</script>
<style scoped lang="scss">
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
        padding: 10px 0;
        width: 49%;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid transparent;

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
