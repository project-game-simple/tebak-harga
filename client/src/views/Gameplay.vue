<template>
    <div>
        <div class="text-center mt-3">
            <h2 class="text-secondary">Goodluck, {{ $store.state.nickname }}!</h2>
        </div>
        <div class="text-center mt-5" v-if="this.$store.state.tampil">
            <div style="width:100%;height:0;padding-bottom:50%;position:relative;">
                <iframe src="https://giphy.com/embed/rfskmSvktqSoo" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>   
        </div>
        <div class="text-center mt-5">
            <button v-if="this.$store.state.tampil" type="button" class="btn btn-secondary" @click="toLobby">Back to lobby</button>
        </div>
        <div v-if="!$store.state.tampil" class="d-flex justify-content-center mt-5 text-center">
            <Card></Card>
        </div>
    </div>
</template>

<script>
    import Card from '../components/Card.vue'
    import socket from '../config/socket';

    export default {
        name: 'Gameplay',
        components: {
            Card
        },
        methods: {
            toLobby() {
                this.$router.push('/lobby')
            }
        },
        created() {
            this.$store.dispatch('getProducts')
            this.$store.dispatch('setCategory', localStorage.category)

        },
    }
</script>
