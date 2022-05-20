<template>
  <div class="autocomplete" v-click-outside="outsideClickHandler">
    <div class="input-wrapper" :class="{active: !isEmpty || (isFocused && isEmpty), disabled}">
      <label class="label" v-if="label">{{ label }}</label>
      <input class="input"
             type="search"
             :value="lazySearch"
             @input="inputHandler"
             @focus="focusHandler"
             :disabled="disabled"
      >
      <div class="arrow-wrapper">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.78902 11.3617L11.3139 14.1815C11.6941 14.6062 12.3083 14.6062 12.6885 14.1815L15.2134 11.3617C15.8275 10.6758 15.3889 9.5 14.5212 9.5H9.47143C8.6038 9.5 8.17486 10.6758 8.78902 11.3617Z"
            fill="#202124" fill-opacity="0.54"/>
        </svg>
      </div>
      <button v-if="!isEmpty" @click="clearSearchValue" class="clear-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM16.3 16.3C15.91 16.69 15.28 16.69 14.89 16.3L12 13.41L9.11 16.3C8.72 16.69 8.09 16.69 7.7 16.3C7.31 15.91 7.31 15.28 7.7 14.89L10.59 12L7.7 9.11C7.31 8.72 7.31 8.09 7.7 7.7C8.09 7.31 8.72 7.31 9.11 7.7L12 10.59L14.89 7.7C15.28 7.31 15.91 7.31 16.3 7.7C16.69 8.09 16.69 8.72 16.3 9.11L13.41 12L16.3 14.89C16.68 15.27 16.68 15.91 16.3 16.3Z"
            fill="#202124" fill-opacity="0.54"/>
        </svg>
      </button>
    </div>
    <div v-if="isAutocompleteListVisible"
         class="autocomplete-list">
      <div v-for="item in items"
           :key="item.Ref"
           @click="selectHandler(item)"
           class="autocomplete-list-item">
        <span>
          {{ getItemText(item) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  name: 'NpAutocomplete',
  props: {
    value: {
      default: ''
    },
    items: {
      required: true,
      type: Array
    },
    itemText: {
      required: false,
      type: String,
      default: 'Description'
    },
    itemValue: {
      required: false,
      type: String
    },
    label: {
      required: false,
      type: String,
      default: ''
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      lazySearch: this.value,
      selectedItem: null,
      isFocused: false,
    }
  },
  computed: {
    isEmpty() {
      return !this.lazySearch.length
    },
    isAutocompleteListVisible() {
      return this.isFocused && this.items.length
    }
  },
  methods: {
    getItemText(item) {
      return item[this.itemText]
    },
    inputHandler(e) {
      const value = e.target.value;
      this.lazySearch = value;
      this.$emit('input', value);
    },
    selectHandler(item) {
      this.selectedItem = item;
      this.lazySearch = item[this.itemText];
      this.$emit('selectHandler', this.itemValue ? this.selectedItem[this.itemValue] : this.selectedItem);
      this.isFocused = false;
    },
    focusHandler() {
      this.isFocused = true;
    },
    clearSearchValue() {
      this.lazySearch = '';
      this.$emit('selectHandler', null);
      this.$emit('clearClick')
    },
    outsideClickHandler() {
      console.log('test')
      console.log('test2')
      this.isFocused = false;
      if (!this.selectedItem) {
        this.clearSearchValue();
      }
    }
  },
  watch: {
    value(value) {
      this.lazySearch = value
    }
  }
}
</script>

<style scoped lang="scss">
.autocomplete {
  width: 100%;
  height: 100%;
  position: relative;

  .input-wrapper {
    height: 100%;

    .label {
      position: absolute;
      font-size: 16px;
      line-height: 24px;
      color: rgba(32, 33, 36, 0.6);
      top: 1px;
      bottom: 1px;
      left: 16px;
      margin: auto;
      display: flex;
      align-items: center;
      pointer-events: none;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      transition: all .2s ease-out;
      background: transparent;
    }

    .input {
      border: 1px solid rgba(32, 33, 36, 0.38);
      border-radius: 8px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 12px 65px 12px 16px;
      color: rgba(32, 33, 36, 0.87);
      outline: none;
      font-size: 16px;
      font-family: 'Novaposhta';
      transition: all .2s ease-out;

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        -webkit-appearance: none;
      }
    }

    .arrow-wrapper {
      position: absolute;
      width: 24px;
      height: 24px;
      top: 0;
      bottom: 0;
      right: 16px;
      margin: auto;
      pointer-events: none;
      transition: all .2s ease-out;
      transform: rotate(0);

      svg {
        path {
          transition: all .2s ease-out;
        }
      }
    }

    .clear-button {
      border: none;
      outline: none;
      cursor: pointer;
      background: transparent;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      padding: 0;
      margin: auto;
      border-radius: 50%;
    }

    &.active {
      .label {
        font-size: 12px;
        background: 16px;
        top: -46px;
        left: 16px;
        background: #fff;
        height: 16px;
        width: unset;
        padding: 0 5px;
      }

      .input {
        border-color: #42D785;
      }

      .arrow-wrapper {
        transform: rotate(180deg);

        svg {
          path {
            fill: #42D785;
          }
        }
      }
    }
  }

  .autocomplete-list {
    position: absolute;
    background: #fff;
    padding: 8px;
    box-shadow: 0 3px 5px rgba(32, 33, 36, 0.2);
    border-radius: 8px;
    margin-top: 4px;
    box-sizing: border-box;
    width: 100%;
    overflow: auto;
    max-height: 208px;
    z-index: 10;

    span {
      color: rgba(32, 33, 36, 0.87);
      padding: 12px 8px;
      font-size: 16px;
      line-height: 24px;
      cursor: pointer;
      display: block;
    }
  }
}
</style>
