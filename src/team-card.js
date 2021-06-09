const cards = document.querySelectorAll('.team-list-card');
const refModalOpen = document.querySelector('.open-modal');

for (let i = 0; i < cards.length; i++){
    const card = cards[i];
    card.addEventListener('click', toRotate)
}

function toRotate(evt) {
    const cardFront = this.querySelector('.front')
    const cardBack = this.querySelector('.back')
    const undercard = this.querySelector('.under-card')
    
    if (evt.target.classList.contains('cat-img')) {
        cardFront.style.transform = 'perspective(600px) rotateY(-180deg)'
        cardBack.style.transform = 'perspective(600px) rotateY(0deg)'

        undercard.style.opacity = '1'
        undercard.style.top = '105%'
        undercard.style.transition = 'all 0.2s linear'
        this.style.marginBottom = '100px'
        
    } else if (evt.target.classList.contains('team-photo')) {
        cardFront.style.transform = 'perspective(600px) rotateY(0deg)'
        cardBack.style.transform = 'perspective(600px) rotateY(180deg)'

        undercard.style.opacity = '0'
        undercard.style.top = '80%'
        undercard.style.transition = 'all 0.2s linear'
        this.style.marginBottom = '0px'
    }
    return;
}
