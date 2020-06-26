<template>
    <div>
    
        <div class="modal fade" id="ModalComplete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <iframe src="https://giphy.com/embed/xT0xezQGU5xCDJuCPe" width="480" height="217" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        <h5 class="mt-2 text-dark">
                            Leaderboard
                        </h5>
                        <p></p>
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
import socket from '../config/socket';

    export default {
        name: 'ModalComplete',
        data() {
            return {
                winners: [],
            };
        },
        methods: {
            toLobby() {
                this.$router.push('/lobby')
            },
        },
        computed: {
            getWinners(data) {
                console.log(data, '<<<<< ini data di getWinners');
                // let winners = room.Users;
                // winners.sort((a, b) => {
                //     (b.score) - (a.score)
                // });
                // console.log(winners);
                // return winners;
                return data;
            }
        },
        created() {
            socket.on('result-score', data => {
                console.log(data, ' <<<< data masuk soket modal')
                this.winners = data.data.Users;
                console.log(this.winners);
            })
            socket.on('show-modal-true', () => {
                console.log('masuk show modal di modal')
                this.$store.dispatch('setTampilTrue');
            })
        }
    }
</script>
