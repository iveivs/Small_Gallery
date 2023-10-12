const addBtn = document.querySelector('.add-box')
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('[data-close]');
const btn = document.querySelector('.btn')
const inputValue1 = document.getElementById('input1')
const inputValue2 = document.getElementById('input2')
const boxForRender = document.querySelector('.gallery__item-container')

function openModal(){
    modal.classList.toggle('show')
    // document.body.style.overflow = 'hidden'
}

function closeModal() {
    modal.classList.toggle('show')
    // document.body.style.overflow = ''
    // modal.delete()
}

addBtn.addEventListener('click', openModal)

modalCloseBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        closeModal()
    }
})

function setLocalStorage() {
    console.log(inputValue1.value);
    console.log(inputValue2.value);
    let tempString1 = inputValue1.value
    let tempString2 = inputValue2.value
    let stringLocalStorage = window.localStorage.setItem(tempString1, tempString2)
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    setLocalStorage()
    renderCard()
    
})

function renderCard() {
    console.log('test');
    boxForRender.insertAdjacentHTML(
        'beforeend', 
        `
        <div class="gallery__item">
            <div class="gallery__img-box">
                <img class="gallery__img" src="" alt="">
            </div>
            <div class="gallery__descr">
                <div class="gallery__title"></div>
                <div class="gallery__like">
                    <img src="" alt="">
                </div>
            </div>
        </div>
    `
    )
}
