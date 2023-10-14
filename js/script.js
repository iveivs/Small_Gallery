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
    // document.body.style.overflow = 'hidden'
}

function closeModal() {
    modal.classList.toggle('show')
    // document.body.style.overflow = ''
}

addBtn.addEventListener('click', openModal)
modalCloseBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        closeModal()
    }
})
// localStorage.clear()


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

function getNoteTemplate(city, urlImg) {
    return `
    <div class="gallery__item">
        <div class="gallery__img-box">
            <img class="gallery__img" src='${urlImg}' alt="">
        </div>
        <div class="gallery__descr">
            <div class="gallery__title">${city}</div>
            <div class="gallery__like">
                <i data-heart class="icon-heart-empty"></i>
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
                getNoteTemplate(key, fromKey.url)
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
        
    }
})
// localStorage.clear()
