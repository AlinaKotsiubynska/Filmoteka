const bodyRef = document.body;
const checkboxRef = document.querySelector('.theme-switch__toggle');

checkboxRef.addEventListener('click', onCheckboxClick);

function onCheckboxClick(e) {
    if (e.target.checked) {

        bodyRef.classList.remove('light-theme');
        bodyRef.classList.add('dark-theme');

        localStorage.setItem('theme', 'dark-theme');
    } else {

        bodyRef.classList.remove('dark-theme');
        bodyRef.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
}
}

localStorage.getItem('theme') === null
    ? bodyRef.classList.add('light-theme')
    : bodyRef.classList.add(localStorage.getItem('theme'));

checkboxRef.checked = localStorage.getItem('theme') === 'dark-theme';