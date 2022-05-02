const mask = {
    cep(value){
        return value
        .replace(/\D/g,'')
        .replace(/(\d{5})(\d{1})/, '$1-$2')
        //    \d+?$ Significa "Quantos números encontrar depois da primeira condição (-\d{3}) até o final da String"
        .replace(/(-\d{3})\d+?$/,'$1')
    }
}

const $cep = document.querySelector('[name=cep]')


document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js
    console.log($cep)
    $input.addEventListener('input', (e) => {
        e.target.value = mask.cep(e.target.value)
    },false);
})

function aplicarMascara(){
    const field = $input.dataset.js
    $input.addEventListener('input', (e) => {
        e.target.value = mask.cep(e.target.value)
    },false);
}




