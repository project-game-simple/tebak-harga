<template>
    <div class="container mt-5">
        <div>
            <h2 class="text-secondary text-center">Hi, {{ $store.state.nickname }}</h2>
            <p class="text-center">Queen Fox Flash Sale! Guess the price and get the item!</p>
        </div>
        <div class="d-flex justify-content-center align-items-center" style="height: 50vh !important;">
            <router-link to="/play">
                <button class="btn btn-info">Play !</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Lobby',
    }
</script>
