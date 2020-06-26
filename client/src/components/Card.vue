<template>
    <div class="d-flex flex-wrap justify-content-center mb-5">
        <div class="card shadow rounded m-3" v-if="fetchPoducts.length !== 0" style="max-width: 450px !important;">
            <img :src="fetchPoducts[0].image_url" class="card-img-top" alt="img" >
            <div class="card-body">
                <h5 class="card-title">{{ fetchPoducts[0].name }}</h5>
                <span class="badge badge-secondary pb-1">{{ fetchPoducts[0].category }}</span>
                <div class="d-flex justify-content-around mt-3">
                    <div class="shadow rounded">
                        <p class="bg-carrot pb-1 mb-0">Real Price</p>
                        <p class="card-text text-secondary pt-0 p-2" style="text-decoration: line-through;">Rp. {{ fetchPoducts[0].real_price }}</p>
                    </div>
                    <div class="shadow rounded">
                        <p class="bg-carrot pb-1 mb-0">Sale Price</p>
                        <p class="card-text text-carrot pt-0 p-2">
                            Rp. {{ fetchPoducts[0].hidden_price }}
                        </p>
                    </div>
                </div>
               
                <div class="mt-3 d-flex">
                    <input class="form-control shadow-sm" type="number" min="0" 
                        v-model="price" placeholder="guess price" ref="inputPrice" required>
                    <button 
                        class="ml-3 btn btn-primary shadow" 
                        data-toggle="modal" data-target="#ModalComplete" 
                        @click="answer(fetchPoducts[0].id)"
                    >Submit</button>
                </div>

                <div class="mt-3 " v-if="!isTrue">
                    <div class="alert alert-danger alert-dismissible fade show mb-0 p-0" role="alert">
                        <small class="text-dark" >Wrong answer!</small>
                        <button type="button" class="close p-0" data-dismiss="alert" aria-label="Close"
                            @click="isTrue = true"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <ModalComplete v-if="this.$store.state.tampil"></ModalComplete>

    </div>
</template>

<script>

    import ModalComplete from '../components/ModalComplete.vue'
    import socket from '../config/socket';
    import http from '../config/axios';
    export default {
        name: 'Card',
        data() {
            return {
                products: [],
                price: '',
                isTrue: true,
                isDone: false,
                showModal: false,
            };
        },
        components: { 
            ModalComplete
        },
        methods: {
            answer(id) {
                const product = this.products.filter(el => el.id == id)
                //kalo bener
                if (product[0].sale_price == this.price) {
                    this.price = ''
                    this.isTrue = true
                    this.products.shift()
                    this.products.length == 0 ? this.isDone = true : false
                    this.$store.dispatch('setCurrentProduct', this.products);
                    socket.emit('shift-product', this.products);
                    socket.emit('add-score', this.$store.state.nickname)
                    this.$store.dispatch('setScore', this.$store.state.nickname);
                } else {
                    this.isTrue = false
                    this.$refs.inputPrice.select()
                }
                if(this.isDone) {
                    console.log('selesai')
                    this.$store.dispatch('setTampilTrue');
                    socket.emit('show-modal-true');
                    http.get(`/rooms/${this.$route.params.id}`)
                      .then(data => {
                        socket.emit('game-over', data);
                        // console.log(data);
                        //disini show modal
                        // this.showModal = true;
                      })
                      .catch(err => console.log(err));
                }
            },
        },
        computed: {
            fetchPoducts() {
                // if (this.products.length != 0) {
                //     return this.products
                // } else if (this.isDone) {
                //     return this.products
                // }

                const datas = this.products
                this.products = []
                console.log(this.$store.state.category, ' ini cat');

                datas.forEach(el => {
                    if (el.category == this.$store.state.category) {
                        // const nf2 = new Intl.NumberFormat()
                        // const temp = nf2.format(el.real_price)

                        const nf = new Intl.NumberFormat()
                        let hidden = nf.format(el.sale_price).split('')
                        hidden[hidden.length-6] = '?'

                        el.hidden_price = hidden.join('')

                        // if(temp != NaN) el.real_price = temp
                        this.products.push(el)

                    }
                })
                return this.products
            }
        },
        created() {
            this.products = this.$store.state.products;
            this.$store.dispatch('setCategory', localStorage.category)
            socket.on('shift-product', data => {
                this.products = data;
            })
            // socket.on('result-score', data => {
            //     this.isDone = true;
            // })
            socket.on('game-over', data => {
                this.showModal = true;
                socket.emit('result-score', data)
                
                console.log(data, 'data di game-over emit')
            })
            socket.on('show-modal-true', () => {
                console.log('masuk show modal di card')
                this.showModal = true;
                this.$store.dispatch('setTampilTrue');
            })
        },
    }
</script>
