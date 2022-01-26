
Vue.createApp({
    data: () => ({
        size: '',
        current: 1,
        single: true,
        field: {},
        name1: '',
        name2: '',
        user2: {role: 0},
        user1: {role: 1},
        currentCell: '',
        moves: [],
        result: '',
        end: false
    }),

    methods: {
        choiceSize() {
            if (this.size > 0 && this.size <= 6) {
                this.field.size = +this.size
                this.size = ''
            }
        },

        start () {
            this.end = false
            this.result = ''
            this.moves = []
            this.current = 1
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
                this.getResult()
            }
        },

        getResult () {
            setTimeout(() => {
                const secondPlayer = this.user2.name ? this.user2.name : 'компьютер'
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa    ' + this.current)
                this.result = this.currentCell === 'X' ? this.user1.name  :  secondPlayer
                this.end = true
            }, 1000)

        },

        checkSideDiagonal() {
            const arr = []
            for(let i = this.field.size - 1; i < Math.pow(this.field.size, 2) - this.field.size + 1; i += this.field.size - 1 ) {
                arr.push(this.moves[i])
                }
                if (arr.reduce((a, b) => (a === b) ? a : NaN)) {
                    this.end = true
                    this.getResult()
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
                subarr[i] = arr.slice((i*this.field.size), (i*this.field.size) + this.field.size);
            }
            for (let i = 0; i < subarr.length; i++) {
                if (subarr[i].reduce((a, b) => (a === b) ? a : NaN)) {
                    this.getResult()
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
                    this.getResult()
                }
            }
        },

        checkWinner() {
           this.checkMainDiagonal()
           this.checkSideDiagonal()
           this.checkHorizontal()
           this.checkVertical()
        },

        addSecondPlayer() {
            this.addName(this.user2, this.name2)
        },

        move(i) {
            console.log('Длина ' + this.moves.length)
            if (this.moves.length === Math.pow(this.field.size, 2) && !this.result) {
                this.result = 'Ничья'
                this.end = true
            }
            console.log(this.current)
                if (!this.single) {
                    this.currentCell = this.current ?  'X' : '0'
                    if (!this.moves[i]) {
                        this.moves[i] = this.currentCell
                        this.current = this.current ?  0 : 1
                    }
                } else {
                    this.currentCell = 'X'
                    this.current = 1
                    if (!this.moves[i]) {
                        if (this.current) {
                            this.moves[i] = this.currentCell
                            this.checkWinner()
                        }
                            this.current = 0
                            let index = 0
                            this.currentCell = '0'
                            for (let i = 0; i < Math.pow(this.field.size, 2); i++) {
                                index = Math.floor(Math.random() * Math.pow(this.field.size, 2))
                                if (!this.moves[index]) {
                                    this.moves[index] = this.currentCell
                                    this.checkWinner()
                                    this.currentCell = 'X'
                                    break
                                }
                            }
                            console.log(this.current)



                    }
                    this.current = 1
                }
        }

    }
}).mount('#app')


