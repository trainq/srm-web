<template>
  <svg class="svg-class" :class="className">
    <use :href="'#icon-' + iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    className: {
      type: String,
      default: ""
    },
    iconName: {
      type: String,
      default: ""
    }
  },
  setup() {
    const req = require.context('@/icons', true, /\.svg$/);
    const requireAll = requireContext => {
      return requireContext.keys().map(requireContext);
    };
    requireAll(req);
  }
}
</script>

<style scoped>

</style>
