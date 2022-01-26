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
                setTimeout(() => {
                    this.getResult()
                }, 1000)
                return true
            }
        },

        getResult () {
            this.end = true

            const secondPlayer = this.user2.name ? this.user2.name : 'компьютер'
            this.result = 'Победил' + (this.currentCell === 'X' ? this.user1.name  :  secondPlayer)
        },

        checkSideDiagonal() {
            const arr = []
            for(let i = this.field.size - 1; i < Math.pow(this.field.size, 2) - this.field.size + 1; i += this.field.size - 1 ) {
                arr.push(this.moves[i])
                }
                if (arr.reduce((a, b) => (a === b) ? a : NaN)) {
                    this.end = true
                    setTimeout(() => {
                        this.getResult()
                    }, 500)
                    return true
                }
        },

        checkHorizontal() {
            const arr = []
            for (let i = 0; i < Math.pow(this.field.size, 2); i++) {
                arr.push(this.moves[i])
            }
            let subarr = []
            for (let i = 0; i < Math.ceil(Math.pow(this.field.size, 2)/this.field.size); i++){
                subarr[i] = arr.slice((i*this.field.size), (i*this.field.size) + this.field.size);
            }
            for (let i = 0; i < subarr.length; i++) {
                if (subarr[i].reduce((a, b) => (a === b) ? a : NaN)) {
                    setTimeout(() => {
                        this.getResult()
                    }, 500)
                    return true
                }
            }
        },

        checkVertical() {
            const arr = []
            for (let i = 0; i < Math.pow(this.field.size, 2); i++) {
                arr.push(this.moves[i])
            }
            let subarr = []
            for (let i = 0; i < Math.ceil(Math.pow(this.field.size, 2)/this.field.size); i++){
                subarr[i] = arr.slice((i*this.field.size), (i*this.field.size) + this.field.size)
            }
            subarr = subarr[0].map((col, i) => subarr.map(row => row[i]))
            for (let i = 0; i < subarr.length; i++) {
                if (subarr[i].reduce((a, b) => (a === b) ? a : NaN)) {
                    setTimeout(() => {
                        this.getResult()
                    }, 500)
                    return true
                }
            }
        },

        playWithComputer(i) {
            this.currentCell = this.current ?  'X' : '0'
            
            if (this.current && !this.moves[i]) {
                this.moves[i] = this.currentCell
                this.checkWinner()
                if(this.checkWinner()) {
                    return
                }
                this.current = this.current ?  0 : 1
                this.currentCell = this.current ?  'X' : '0'
                
            }
            if (!this.current) {
                console.log(this.current)
                let index = 0
                while(true) {
                for (let i = 0; i < Math.pow(this.field.size, 2); i++) {
                    index = Math.floor(Math.random() * Math.pow(this.field.size, 2))
                    if (!this.moves[index]) {
                        console.log(this.moves[index])
                        this.moves[index] = this.currentCell
                        this.checkWinner()
                        this.current = this.current ?  0 : 1
                            return    
                    }
                     
                } 
            }
            }
            
        },

        playWithPerson(i) {
            this.currentCell = this.current ?  'X' : '0'
            if (!this.moves[i]) {
                this.moves[i] = this.currentCell
                this.current = this.current ?  0 : 1
            }
        },

        checkWinner() {
           this.checkMainDiagonal()
           this.checkSideDiagonal()
           this.checkHorizontal()
           this.checkVertical()
           if (this.checkMainDiagonal() || this.checkSideDiagonal() || this.checkHorizontal() || this.checkVertical()) return true
           if (!this.result && this.moves.filter(move => move !== undefined).length === Math.pow(this.field.size, 2)) {
               this.result = 'Ничья'
               this.end = true
           }
        },

        addSecondPlayer() {
            this.addName(this.user2, this.name2)
        },

        move(i) {
                if (!this.single) {
                    this.playWithPerson(i)
                    this.checkWinner()
                } else {
                    this.playWithComputer(i)
                }
        }

    }
}).mount('#app')


