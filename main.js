
Vue.createApp({
    data: () => ({
        size: '',
        current: 1,
        single: true,
        field: {size: 3, show: true},
        name1: '',
        name2: '',
        user2: {name: 'Opponent', role: 0},
        user1: {role: 1},
        currentCell: '',
        moves: [],
        result: {}
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

        checkMainDiagonal() {
            const arr = []
            const arr2 = []
            for (let i = 0; i < Math.pow(this.field.size, 2); i++) {
                arr.push(this.moves[i])
            }
            for(let i = 0; i < arr.length; i+=this.field.size + 1) {
                arr2.push(arr[i])
            }
            if (arr2.reduce((a, b) => (a === b) ? a : NaN)) {
                alert('Победа')
            }
        },

        checkSideDiagonal() {
            const arr = []
            for(let i = this.field.size - 1; i < Math.pow(this.field.size, 2) - this.field.size + 1; i += this.field.size - 1 ) {
                arr.push(this.moves[i])
                }
                if (arr.reduce((a, b) => (a === b) ? a : NaN)) {
                    alert('Победа')
                }
        },

        checkHorizontal() {
            const arr = []
            for (let i = 0; i < Math.pow(this.field.size, 2); i++) {
                arr.push(this.moves[i])
            }
            console.log(arr)
            let subarr = []
            for (let i = 0; i < Math.ceil(Math.pow(this.field.size, 2)/this.field.size); i++){
                subarr[i] = arr.slice((i*this.field.size), (i*this.field.size) + this.field.size)
            }
            for (let i = 0; i < subarr.length; i++) {
                if (subarr[i].reduce((a, b) => (a === b) ? a : NaN)) {
                    alert('Победа')
                }
            }
        },

        checkVertical() {
            const arr = []
            for (let i = 0; i < Math.pow(this.field.size, 2); i++) {
                arr.push(this.moves[i])
            }
            console.log(arr)
            let subarr = []
            for (let i = 0; i < Math.ceil(Math.pow(this.field.size, 2)/this.field.size); i++){
                subarr[i] = arr.slice((i*this.field.size), (i*this.field.size) + this.field.size)
            }
            subarr = subarr[0].map((col, i) => subarr.map(row => row[i]))
            for (let i = 0; i < subarr.length; i++) {
                if (subarr[i].reduce((a, b) => (a === b) ? a : NaN)) {
                    alert('Победа')
                }
            }
        },

        checkWinner(inx) {
           this.checkMainDiagonal()
           this.checkSideDiagonal()
           this.checkHorizontal()
           this.checkVertical()
        },

        addSecondPlayer() {
            this.addName(this.user2, this.name2)
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


