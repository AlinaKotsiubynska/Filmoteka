import Render from './classRender.js';

const watchBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');

if (localStorage.getItem('id')) {
  watchBtn.addEventListener('click', onWatchBtnClick);
  queueBtn.addEventListener('click', onQueueBtnClick);
  watchBtn.disabled = false;
  queueBtn.disabled = false;
} else {
  watchBtn.disabled = true;
  queueBtn.disabled = true;
}

function onWatchBtnClick(e) {
  Render.renderWatched();
}
function onQueueBtnClick() {
  Render.renderQueue();
}
