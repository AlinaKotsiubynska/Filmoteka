const errorMessageRef = document.querySelector('.search-error');

function onFetchError() {
  errorMessageRef.textContent = 'Search result not successful. Enter the correct movie name';
  errorMessageRef.classList.remove('.visually-hidden');
};

function removeNotification() {
  errorMessageRef.textContent = '';
  errorMessageRef.classList.add('.visually-hidden');
}
export { onFetchError, removeNotification };



