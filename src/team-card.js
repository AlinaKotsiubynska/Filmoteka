const cards = document.querySelectorAll('.team-list-card');

for (let i = 0; i < cards.length; i++){
    const card = cards[i];
    card.addEventListener('click', toRotate)
}

function toRotate(evt) {
    const cardFront = this.querySelector('.front')
    const cardBack = this.querySelector('.back')

    if (evt.target.classList.contains('front') || evt.target.tagName === 'IMG') {
        cardFront.style.transform = 'perspective(600px) rotateY(-180deg)'
        cardBack.style.transform = 'perspective(600px) rotateY(0deg)'
    } else if (evt.target.classList.contains('back') || evt.target.tagName === 'IMG') {
        cardFront.style.transform = 'perspective(600px) rotateY(0deg)'
        cardBack.style.transform = 'perspective(600px) rotateY(180deg)'
    }
    return;
}
