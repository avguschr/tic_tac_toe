
Vue.createApp({
    data: () => ({
        size: '',
        current: 1,
        single: true,
        field: {size: 9, show: true},
        name1: '',
        name2: '',
        user2: {},
        user1: {role: 1},
        currentCell: '',
        moves: [],
        la: []
    }),

    methods: {
        choiceSize() {
            if (this.size >= 3 && this.size <= 10) {
                this.field.size = +this.size
                this.size = ''
            }
        },

        addName(user, name) {
            if (name !== '') {
                user.name = name
                name = ''
            }
        },

        checkWinner(inx) {
            const arr = []
            for (let i = 0; i < Math.pow(this.field.size, 2); i += this.field.size.length) {
                for (let j = 0; j < Math.pow(this.field.size, 2); j++) {
                    arr.push(this.moves[i + j])
                }

            }


            console.log(arr)
        },

        addSecondPlayer() {
            this.addName(this.user2, this.name2)
            this.user2.role = 0
        },

        move(i) {
            this.currentCell = this.current ?  'X' : '0'
            if (!this.moves[i]) {
                this.moves[i] = this.currentCell
                this.current = this.current ?  0 : 1
            }
        }

    }
}).mount('#app')


