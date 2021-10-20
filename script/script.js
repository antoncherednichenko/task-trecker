const addBtn = document.querySelector('.add__element')
const deleteBtn = document.querySelector('.delete__element')
const textBox = document.querySelector('.text__box')
const sortBtn = document.querySelector('.card__sort__icon')

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

    deleteElement()                      
}

function deleteElement(){
    const btnArr = document.querySelectorAll('.delete__element')
    btnArr.forEach(element => {
        element.addEventListener('click', e => {
            e.target.parentElement.remove()
        })
    });
}

addBtn.addEventListener('click', createElement)

sortBtn.addEventListener('click', e => {
    const elementsArray = document.querySelectorAll('.text__wrapper')
    let arrayForSort = Array.of(...elementsArray)
    const sorted = arrayForSort.sort((a, b) => {
        return a.querySelector('input').value.charCodeAt(0) - b.querySelector('input').value.charCodeAt(0)
    })
    textBox.innerHTML = ''
    textBox.append(...sorted)
})