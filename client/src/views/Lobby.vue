<template>
    <div class="container mt-5" >
        <div>
            <h2 class="text-secondary text-center">Hi, {{ $store.state.nickname }}</h2>
            <p class="text-center">Queen Fox Flash Sale! Guess the price and get the item!</p>
        </div>
        <div class="row d-flex justify-content-between" style="height: 70vh !important;">
            
            <div class="col-7  border border-light rounded shadow p-2">
                <h5 class="text-center text-secondary">List Room</h5>
                <div class="row row-cols-1 row-cols-md-4">
                    <div class="col mb-4"  v-for="room in rooms" :key="room.id">
                        
                        <div class="card shadow" style="max-width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">{{room.name}}</h5>
                                <button class="btn btn-primary" @click="joinRoom(room.id)">Join</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-4 p-2 border border-light rounded shadow" style="height: 250px !important;">
                <div class=" d-flex flex-column justify-content-center">
                    <h5 class="text-secondary text-center">Create Room</h5>
                    
                    <input class="form-control my-2" type="text" placeholder="Room Name" v-model="roomName">

                    <div class="d-flex border rounded shadow justify-content-around">
                        <div class="d-flex align-items-center">
                            <input id="f" type="radio" v-model="category" value="fashion">
                            <label for="f" class="m-0 ml-1"> Fashion</label>
                        </div>
                        <div class="d-flex align-items-center">
                            <input id="s" type="radio" v-model="category" value="sneakers">
                            <label for="s" class="m-0 ml-1"> Sneakers</label>
                        </div>
                        <div class="d-flex align-items-center">
                            <input id="e" type="radio" v-model="category" value="electronic">
                            <label for="e" class="m-0 ml-1">Electronics</label>
                        </div>
                    </div>
                    <a type="button" :class="category && roomName ? '' : 'disabled'" class="btn btn-success my-2" @click="createRoom">Create Room</a>

                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import socket from '../config/socket';

    export default {
        name: 'Lobby',
        data() {
            return {
                category: '',
                roomName: '',
            };
        },
        methods: {
            setCategory() {
                localStorage.category = this.category
                this.$store.dispatch('setCategory', this.category)
            },
            createRoom() {
                let payload = {
                    admin: this.$store.state.nickname,
                    roomName: this.roomName,
                };
                socket.emit('create-room', payload);
                this.roomName = '';
            },
            joinRoom(id) {
                localStorage.category = this.category
                this.$store.dispatch('setCategory', this.category)
                let payload = {
                    id: id,
                    nickname: this.$store.state.nickname,
                };
                socket.emit('join-room', payload);
                this.$router.push(`/lobby/${id}`);
            },
        },
        created() {
          socket.on('get-rooms', (data) => {
            this.$store.dispatch('setRoom', data);
          });
          socket.on('updated-room', (data) => {
            this.$store.dispatch('setRoom', data);
          });
        },
        computed: {
            rooms() {
                return this.$store.state.rooms;
            },
        }
    }
</script>
