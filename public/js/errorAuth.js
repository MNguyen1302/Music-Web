const signinupInput = document.querySelectorAll('.signinup-input');

function isError() {
    signinupInput.forEach(item => {
        item.classList.add('error');
    })
}
isError();