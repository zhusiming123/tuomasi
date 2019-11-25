<template>
    <div>
        <Slider v-model="volume" @on-change="changeItemVolume" :disabled="isDisabled" v-once></Slider>
    </div>
</template>

<script>
  export default {
    name: 'VolumeSlider',
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        volume: 0
      }
    },
    methods: {
      changeItemVolume (item) {
        this.$emit('volumeChange', item)
      }
    }
  }
</script>

<style scoped>

</style>
