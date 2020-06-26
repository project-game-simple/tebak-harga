<template>
    <div>
        <h4>List User in {{room.name}}</h4>
        <p>Admin: {{admin}}</p>
        <div class="container">
            <ul>
                <li v-for="user in room.Users" :key="user.id">{{user.name}}</li>
            </ul>
        </div>
        <button v-if="this.$store.state.nickname === admin">Start</button>
        <button @click="leaveRoom">leave</button>
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
        }
    },
    created() {
        socket.on('room-detail', data => {
            this.room = data;
            this.admin = data.admin;
        })
    },
}
</script>