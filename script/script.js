// --------------Data----------------------------------------------------------------------------------------------------------------------------------

const addBtn = document.querySelector('.add__element')
const deleteBtn = document.querySelector('.delete__element')
const textBox = document.querySelector('.text__box')
const sortBtn = document.querySelector('.card__sort__icon')
const imgDown = document.querySelector('.down')
const imgUp = document.querySelector('.up')
const cross = document.querySelector('.cross')
const massege = document.querySelector('.massege')
let order = 'ASK'

// --------------Function for add event listener on all delete btns----------------------------------------------------------------------------------------------------------------------------------

function deleteEL(e){
  const arr = document.querySelectorAll('.text__wrapper')
  if (arr.length !== 1){
    e.target.parentElement.remove()
  }else{
    return
  }
}

function addListener(){
    const arr = document.querySelectorAll('.delete__element')
    arr.forEach(el => {
        el.addEventListener('click', deleteEL)
    })
}


// --------------Function for creating new element----------------------------------------------------------------------------------------------------------------------------------


function createElement(){
    const wrapperDiv = document.createElement('div')
    wrapperDiv.classList.add('text__wrapper')
    textBox.append(wrapperDiv)

    const dragIcon = document.createElement('div')
    dragIcon.classList.add('drag__icon')
    wrapperDiv.append(dragIcon)

    const newInput = document.createElement('input')
    newInput.classList.add('text__box__area')
    // newInput.classList.add('border__new')
    wrapperDiv.append(newInput)

    const newBtn = document.createElement('button')
    newBtn.classList.add('delete__element')
    wrapperDiv.append(newBtn)
    
    addListener()
    dragDrop()              
}

// --------------Creating new alement----------------------------------------------------------------------------------------------------------------------------------

addBtn.addEventListener('click', createElement)

// --------------Sorting elements----------------------------------------------------------------------------------------------------------------------------------

sortBtn.addEventListener('click', e => {
    if (order === 'ASK'){
    const elementsArray = document.querySelectorAll('.text__wrapper')
    let arrayForSort = Array.of(...elementsArray)
    const sorted = arrayForSort.sort((a, b) => {
        return a.querySelector('input').value.toLowerCase().charCodeAt(0) - b.querySelector('input').value.toLowerCase().charCodeAt(0)
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
        return b.querySelector('input').value.toLowerCase().charCodeAt(0) - a.querySelector('input').value.toLowerCase().charCodeAt(0)
    })
    textBox.innerHTML = ''
    textBox.append(...sorted)
    order = 'ASK'
    imgDown.classList.remove('visible')
    imgUp.classList.add('visible')
    }
})

// --------------drag and drop function----------------------------------------------------------------------------------------------------------------------------------

function dragDrop(){
    const tasksListElement = document.querySelector('.text__box');
    const taskElements = tasksListElement.querySelectorAll('.text__wrapper');
    
    for (const task of taskElements) {
      task.draggable = true;
    }
    
    tasksListElement.addEventListener(`dragstart`, (evt) => {
      evt.target.classList.add(`selected`);
      evt.target.querySelector('input').classList.add('selected')
    });
    
    tasksListElement.addEventListener(`dragend`, (evt) => {
      evt.target.classList.remove(`selected`);
      evt.target.querySelector('input').classList.remove('selected')
      
    });
    
    const getNextElement = (cursorPosition, currentElement) => {
      const currentElementCoord = currentElement.getBoundingClientRect();
      const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
      
      const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
      
      return nextElement;
    };

    
    
    tasksListElement.addEventListener(`dragover`, (evt) => {
      evt.preventDefault();
      const activeElement = tasksListElement.querySelector(`.selected`);
      const currentElement = evt.target;
      const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains('text__wrapper');
        
      if (!isMoveable) {
        return;
      }
      
      const nextElement = getNextElement(evt.clientY, currentElement);
      
      if (
        nextElement && 
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
      ) {
        return;
      }
            
        tasksListElement.insertBefore(activeElement, nextElement);
    });
    
}
