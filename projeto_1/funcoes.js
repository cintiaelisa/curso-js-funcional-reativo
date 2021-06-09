const fs = require('fs')
const path = require('path')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const arquivos = fs.readdirSync(caminho).map(arquivo => {
                return path.join(caminho, arquivo)
            })
            resolve(arquivos)
        } catch (e) {
            reject(e)
        }
    })
}

function elementosTerminadosEm(padrao){
    return function(array) {
        return array.filter(el => el.endsWith(padrao))
    }
}

function removerSimbolos(simbolos) {
    return function(array) {
        return array.map(el => {
            let textoSemSibolos = el
            simbolos.forEach(simbolo => {
                textoSemSibolos = textoSemSibolos.split(simbolo).join('')
                
            })
            return textoSemSibolos
        })
    }
}
    

function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
            resolve(conteudo.toString())
        } catch (e) {
            reject(e)
        }
    })
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function removerElementosSeVazio(array) {
    return array.filter(el => el.trim())
}

function removerElementosSeIncluir(padrao){
    return function(array) {
        return array.filter(el => !el.includes(padrao))
    }    
}

//Quando o valor não é numérico o parseInt retorna NaN
//Comparando estritamente o valor com ele mesmo, se for numérico retornará verdadeiro.
//Já um NaN comparado com ele mesmo retornará false.
//Invertendo a condição (!) retornará o esperado (somente palavras, não números)
function removerElementosApenasNumeros(array) {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num
    })
}

function mesclarElementos(array) {
    return array.join(' ')
}

function separarTextoPor(simbolo) {
    return function(texto) {
        return texto.split(simbolo)
    }
}

module.exports = {
    lerDiretorio,
    lerArquivo,
    lerArquivos,
    elementosTerminadosEm,
    removerElementosSeVazio,
    removerElementosSeIncluir,
    removerElementosApenasNumeros,
    removerSimbolos,
    mesclarElementos,
    separarTextoPor
}