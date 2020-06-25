<template>
    <div class="container mt-5">
        <div>
            <h2 class="text-secondary text-center">Hi, {{ $store.state.nickname }}</h2>
            <p class="text-center">Queen Fox Flash Sale! Guess the price and get the item!</p>
        </div>
        <div style="height: 50vh !important;" 
            class="d-flex justify-content-center align-items-center flex-column " 
        >
            <h6>Please choose category</h6>
            <div class="d-flex border rounded shadow w-25 justify-content-around">
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

            <router-link to="/play" v-if="category">
                <button class="mt-5 shadow-sm btn btn-info" @click="setCategory">Play !</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Lobby',
        data() {
            return {
                category: ''
            };
        },
        methods: {
            setCategory() {
                localStorage.category = this.category
                this.$store.dispatch('setCategory', this.category)
            },
        }
    }
</script>
