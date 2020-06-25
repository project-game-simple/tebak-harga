<template>
  <div class="home">
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh !important;">
      <div class="form-group border border-light rounded shadow p-5">
        <label>Please input nickname</label>
        <input class="form-control" type="text" placeholder="nickname" v-model="nickname">
        <button class="btn btn-info mt-2" @click="setNickname">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        nickname: '',
      };
    },
    methods: {
      setNickname() {
        localStorage.nickname = this.nickname
        this.$store.dispatch('setNickname', this.nickname)
      },
    },
};
</script>
