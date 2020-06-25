<template>
    <div>
    
        <div class="modal fade" id="ModalComplete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <iframe src="https://giphy.com/embed/xT0xezQGU5xCDJuCPe" width="480" height="217" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        <h5 class="mt-2 text-dark">
                            Congratulations You win!
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="toLobby">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalComplete',
        methods: {
            toLobby() {
                this.$router.push('/lobby')
            }
        }
    }
</script>
