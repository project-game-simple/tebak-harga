<template>
    <div class="container w-25 mt-5 border border-light shadow">
        <h4 class="text-secondary">List User in Room: {{room.name}}</h4>
        <p>Room Master: <span class="bg-warning p-1 rounded">{{admin}}</span></p>
        <h6>Players: </h6>
        <ul class="list-group">
            <li class="list-group-item" v-for="(user, i) in room.Users" :key="i">{{ i+1 }}. {{user.name}}</li>
        </ul>
        <div class="mt-3 d-flex justify-content-around mb-3">
            <a  
                type="button" class="btn btn-primary text-light" @click="play"
                v-if="this.$store.state.nickname === admin && room.Users.length > 1"
                >Start</a>
            <a type="button" class="btn btn-danger text-light" @click="leaveRoom">leave</a>
        </div>

    </div>
</template>

<script>
import socket from '../config/socket';

export default {
    name: 'Lobby',
    data() {
        return {
            room: {},
            admin: '',
        };
    },
    methods: {
        leaveRoom(){
            let payload = {
                roomId: this.room.id,
                nickname: this.$store.state.nickname,
            };
            socket.emit('leave-room', payload);
        },
        play() {
            socket.emit('start-game', this.room.id)
            this.$router.push(`/play/${this.room.id}`);
        }
    },
    created() {
        socket.on('room-detail', data => {
            this.room = data;
            this.admin = data.admin;
        })
        socket.on('start-game', () => {
            // console.log('terima emit dr server')
            this.$router.push(`/play/${this.room.id}`);
        })
    },
}
</script>