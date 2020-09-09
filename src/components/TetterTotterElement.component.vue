<template>
  <div class="tetter-totter-element" :class="[elem.type, `${elem.id}-elem`]" :style="getStyles" ref="element">
    <div class="weight">
      {{elem.weight}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true
    },
    side: {
        type: Boolean
    },
    top: {
        type: Number
    }
  },
  computed: {
    getStyles() {
      const leftOffset = this.side ? 50 + this.elem.offset * 10 : 50 - this.elem.offset * 10;
      const topOffset = this.top || -this.elem.height - (this.elem.top ? this.elem.top : 0);
      const elemStyles = this.elem.type !== 'triangle' ?
          {
              height: `${this.roundUp(this.elem.height)}px`,
              width: `${this.roundUp(this.elem.height)}px`,
              lineHeight: `${this.roundUp(this.elem.height)}px`
          }
          :
          {
              borderWidth: `0 ${this.roundUp(this.elem.height)}px ${this.roundUp(this.elem.height)}px ${this.roundUp(this.elem.height)}px`,
              lineHeight: `${this.roundUp(this.elem.height * 1.2)}px`
          };
      return {
          top: `${topOffset}px`,
          left: `${leftOffset}%`,
          ...elemStyles
      }
    }
  },
  methods: {
    roundUp(number) {
      return Math.round(number * 100) / 100
    },
    getElemCoord() {
        const domElement = this.$refs.element;
        return domElement.getBoundingClientRect();
    }
  }
}
</script>

<style scoped lang="scss">
.tetter-totter-element{
  position: absolute;
  width: 20px;
  height: 20px;
  text-align: center;
  &.circle {
    background-color: #29b6f6;
    border-radius: 50%;
  }
  &.triangle {
    width: 0;
    height: 0;
    line-height: 4rem;
    border-style: solid;
    border-color: transparent transparent #ffca28 transparent
  }

  &.rectangle {
    background-color: #ef5350;
  }
}

</style>