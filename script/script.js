// --------------Data----------------------------------------------------------------------------------------------------------------------------------

const addBtn = document.querySelector('.add__element')
const deleteBtn = document.querySelector('.delete__element')
const textBox = document.querySelector('.text__box')
const sortBtn = document.querySelector('.card__sort__icon')
const imgDown = document.querySelector('.down')
const imgUp = document.querySelector('.up')
let order = 'ASK'

imgDown.classList.add('visible')

// --------------Function for add event listener on all delete btns----------------------------------------------------------------------------------------------------------------------------------

function addListener(){
    const arr = document.querySelectorAll('.delete__element')
    arr.forEach(el => {
        el.addEventListener('click', e => {
            e.target.parentElement.remove()
        })
    })
}

// --------------Function for create new element----------------------------------------------------------------------------------------------------------------------------------


function createElement(){
    const wrapperDiv = document.createElement('div')
    wrapperDiv.classList.add('text__wrapper')
    textBox.append(wrapperDiv)

    const newInput = document.createElement('input')
    newInput.classList.add('text__box__area')
    wrapperDiv.append(newInput)

    const newBtnDelete = document.createElement('button')
    newBtnDelete.classList.add('delete__element')
    newBtnDelete.innerText = '×'
    wrapperDiv.append(newBtnDelete)  
    addListener()                
}

// --------------Creating new alement----------------------------------------------------------------------------------------------------------------------------------

addBtn.addEventListener('click', createElement)

// --------------Sorting elements----------------------------------------------------------------------------------------------------------------------------------

sortBtn.addEventListener('click', e => {
    if (order === 'ASK'){
    const elementsArray = document.querySelectorAll('.text__wrapper')
    let arrayForSort = Array.of(...elementsArray)
    const sorted = arrayForSort.sort((a, b) => {
        return a.querySelector('input').value.charCodeAt(0) - b.querySelector('input').value.charCodeAt(0)
    })
    textBox.innerHTML = ''
    textBox.append(...sorted)
    order = 'DASK'
    imgDown.classList.add('visible')
    imgUp.classList.remove('visible')
    }else if(order === 'DASK'){
        const elementsArray = document.querySelectorAll('.text__wrapper')
        let arrayForSort = Array.of(...elementsArray)
        const sorted = arrayForSort.sort((a, b) => {
        return b.querySelector('input').value.charCodeAt(0) - a.querySelector('input').value.charCodeAt(0)
    })
    textBox.innerHTML = ''
    textBox.append(...sorted)
    order = 'ASK'
    imgDown.classList.remove('visible')
    imgUp.classList.add('visible')
    }
})