const Modal = {
    open (){
        //Abrir modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
        }
}
    

// const transactions = [
//     {
//         id: 1,
//         description: 'Luz',
//         amount: -50000,
//         date: '23/01/2021'
//     },
//     {
//         id: 2,
//         description: 'Criação Website',
//         amount: 500000,
//         date: '23/01/2021'
//     },
//     {
//         id: 3,
//         description: 'Internet',
//         amount: -20000,
//         date: '23/01/2021'
//     },
// ]

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    
    set(){
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),
    add(transaction){
        Transaction.all.push(transaction)
        console.log(Transaction.all)
        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total(){
        return Transaction.incomes()+Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        const amount = Utils.formatCurrency(transaction.amount)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Botão de remover">
                </td>
        `
        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value

    },

    formatAmount(value){
        value = value * 100
        return Math.round(value)
    },

    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}


const Form = {
    //Pegando os dados inseridos no formulário através do Query Selector e do id dos campos
    description:document.querySelector('input#description'),
    amount:document.querySelector('input#amount'),
    date:document.querySelector('input#date'),
    
    getValues(){
        return{
            description:Form.description.value,
            amount:Form.amount.value,
            date:Form.date.value
        }
    },


    validateFields() {
        const { description, amount, date } = Form.getValues()
        //Validando se os campos são vazios através da função trim, que corta os espaços em branco, e dos comparadores de igualdade ===
        if(description.trim() === "" 
            || amount.trim() === "" 
            || date.trim() === ""){
                throw new Error("Um dos campos está vazio")
            }
        console.log(description)
    },
    formatValues(){
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        
        return{
            description,
            amount,
            date
        }
    },
    clearFields(){
        Form.description.value=""
        Form.amount.value=""
        Form.date.value=""

    },
    submit(event) {    
        event.preventDefault()

        try {
            //Validar se os campos estão preenchidos
            Form.validateFields()
            //Formatar os dados dos campos
            const transaction = Form.formatValues()
            //Salvar os dados do formulário
            Transaction.add(transaction)
            //Limpar campos do formulário
            Form.clearFields()
            //Fechar o Modal
            Modal.close()
        } catch (error) {
            
        }
    }
}


const App = {
    init() {
        Transaction.all.forEach(function(transaction, index) {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance()
        
        Storage.set(Transaction.all)
        
    },

    reload() {
        DOM.clearTransactions()
        App.init()

    },


}

App.init()






