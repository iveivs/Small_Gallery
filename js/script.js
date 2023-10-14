const addBtn = document.querySelector('.add-box')
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('[data-close]');
const btn = document.querySelector('.btn')
const inputValue1 = document.getElementById('input1')
const inputValue2 = document.getElementById('input2')
const boxForRender = document.querySelector('.gallery__item-container')
const userInputArr = []

function openModal(){
    modal.classList.toggle('show')
}

function closeModal() {
    modal.classList.toggle('show')
}

addBtn.addEventListener('click', openModal)
modalCloseBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        closeModal()
    }
})

function setLocalStorage() {
    // localStorage.clear()
    // рабоочий вариант через строку
    // let tempString1 = inputValue1.value
    // let tempString2 = inputValue2.value
    // localStorage.setItem(tempString2, tempString1)
    // - - - - - - - - - - - - -
    
    // Вариант через объект
    let tempString2 = inputValue2.value
    const objToLocStor = {
        url: inputValue1.value,
        like: false
    }
    localStorage.setItem(tempString2, JSON.stringify(objToLocStor))

}

btn.addEventListener('click', (e) => {
    if(inputValue1.value.length === 0) {
        return
    }
    e.preventDefault();
    setLocalStorage()
    renderCard()

    inputValue1.value = ''
    inputValue2.value = ''
    closeModal()
})

function renderCard() {
    boxForRender.insertAdjacentHTML(
        'beforeend', 
        getNoteTemplate(inputValue2.value, inputValue1.value)
    )
}

function getNoteTemplate(city, urlImg, flag) {
    return `
    <div class="gallery__item">
        <div class="gallery__img-box">
            <img class="gallery__img" src='${urlImg}' alt="">
        </div>
        <div class="gallery__descr">
            <div class="gallery__title">${city}</div>
            <div class="gallery__like">
                <i data-heart ${!flag ? 'class="icon-heart-empty"': 'class="icon-heart"'}></i>
            </div>
        </div>
    </div>
`
    
    
}
function startRender() {
    if(localStorage.length >= 1) {
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i)
            let value = localStorage.getItem(key)
            let fromKey = JSON.parse(value)

            boxForRender.insertAdjacentHTML(
                'beforeend', 
                getNoteTemplate(key, fromKey.url, fromKey.like)
            )
            
        }
    }
}
startRender()

const like = document.querySelectorAll('i')

// like.forEach((elem) => {
//     elem.addEventListener('click', (e) => {
//         elem.classList.toggle('icon-heart')
//         // console.log(elem);
//         // console.log(e.target);
//     })
// })

const body = document.querySelector('body')
body.addEventListener('click', (e) => {
    
    if(e.target.getAttribute('data-heart') == '') {
        e.target.classList.toggle('icon-heart')
        // получаем родителя кликаемого элемента, и его значение, для того чтоб найти в localstorage 
        let temp = e.target.parentElement.previousElementSibling.textContent
        console.log(temp);
        let getTemp = localStorage.getItem(`${temp}`)
        let changeTemp = JSON.parse(getTemp)

        if(changeTemp.like == false) {
            console.log('test1');
            changeTemp.like = true
        } else if(changeTemp.like == true) {
            console.log('test2');
            changeTemp.like = false
        }
        
        console.log(getTemp);
        console.log(changeTemp);
    }
})
// localStorage.clear()
