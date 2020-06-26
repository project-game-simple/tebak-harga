<template>
  <div class="home">
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh !important;">
      <div class="form-group border border-light rounded shadow p-5">
        <label>Please input nickname</label>
        <input class="form-control" type="text" placeholder="nickname" v-model="nickname" required>
        <router-link to="/lobby" v-if="nickname">
          <button class="btn btn-info mt-2" @click="setNickname">Submit</button>
        </router-link>
      </div>
       <div class="mt-3 " v-if="isExist">
          <div class="alert alert-danger alert-dismissible fade show mb-0 p-0" role="alert">
              <small class="text-dark" >Nickname already exist</small>
              <button type="button" class="close p-0" data-dismiss="alert" aria-label="Close"
                  @click="isExist = false"
              >
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket';

  export default {
    name: 'Home',
    data() {
      return {
        nickname: '',
        isExist: false
      };
    },
    methods: {
      setNickname() {

        if(this.$store.state.players.some(el => el.nickname === this.nickname)) {
          this.isExist = true
        } else {
          localStorage.nickname = this.nickname
          this.$store.dispatch('setNickname', this.nickname)
          socket.emit('login', this.nickname)
        }
      },
    },
};
</script>
