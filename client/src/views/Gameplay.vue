<template>
    <div>
        <div class="text-center mt-3">
            <h2 class="text-secondary">Goodluck, {{ $store.state.nickname }}!</h2>
        </div>
        <div class="d-flex justify-content-center mt-5 text-center">
            <Card ref="cardss"></Card>
        </div>
    </div>
</template>

<script>
    import Card from '../components/Card.vue'

    export default {
        name: 'Gameplay',
        components: {
            Card
        },
        created() {
            this.$store.dispatch('getProducts')
            this.$store.dispatch('setCategory', localStorage.category)
        },
    }
</script>
