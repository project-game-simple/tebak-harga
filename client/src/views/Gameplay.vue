<template>
    <div>
        <div class="text-center mt-3">
            <h2 class="text-secondary">Goodluck, {{ $store.state.nickname }}!</h2>
        </div>
        <div class="d-flex justify-content-center mt-5 text-center">
            <div class="card w-25 shadow rounded">
                <img src="https://pbs.twimg.com/media/BKzba_CCEAAGYO-.jpg" class="card-img-top" alt="img">
                <div class="card-body">
                    <h5 class="card-title">Macbeth Brighton Tom v1</h5>
                    <span class="badge badge-secondary pb-1">Sneakers</span>
                    <div class="d-flex justify-content-around mt-3">
                        <div class="shadow rounded">
                            <p class="bg-carrot pb-1 mb-0">Real Price</p>
                            <p class="card-text text-secondary pt-0 p-2" style="text-decoration: line-through;">Rp. 2.990.000</p>
                        </div>
                        <div class="shadow rounded">
                            <p class="bg-carrot pb-1 mb-0">Sale Price</p>
                            <p class="card-text text-carrot pt-0 p-2">Rp. 2.2?0.000</p>
                        </div>
                    </div>
                    <div class="mt-3 d-flex">
                        <input class="form-control shadow-sm" type="number" min="0" v-model="price" placeholder="guess price">
                        <button class="ml-3 btn btn-primary shadow">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Gameplay',
        data() {
            return {
                fashion: [],
                
            };
        },
    }
</script>
