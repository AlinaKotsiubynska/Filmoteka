import arrowTmp from '../templates/arrowUp.hbs';
const utillsRoot = document.getElementById('utills');


const arrowHTML = arrowTmp();
utillsRoot.insertAdjacentHTML('beforeend', arrowHTML);
const upBtn = document.getElementById('arrow-up');
const target = document.querySelector("header");


upBtn.addEventListener('click', scrollToTop)

function scrollToTop() {
  window.scrollTo({top: 0})
}


function callback(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      upBtn.classList.add('showBtn')
    } else {
      upBtn.classList.remove('showBtn')
    }
  });
}

let observer = new IntersectionObserver(callback);
observer.observe(target);