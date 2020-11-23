<template>
  <fieldset class="frm-slc-box">
    <label class="frm-lb">
      <select v-model="selected">
        <option v-for="(item, i) in items" :value="item.val" :key="item.id">{{
          item.tx
        }}</option>
      </select>
    </label>
  </fieldset>
</template>

<script>
export default {
  props: {
    items: '',
    currentVal: ''
  },
  data: function() {
    return {
      selected: ''
    };
  },
  created: function() {
    if (this.currentVal != null && this.currentVal !== '') {
      this.selected = this.currentVal;
    }
  },
  methods: {},
  watch: {
    selected: function() {
      this.$emit('change', this.selected);
    }
  },
  computed: {}
};
</script>

<style lang="scss"></style>
