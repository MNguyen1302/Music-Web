const deleteBtn = document.getElementsByClassName('btn-delete');
const deletePopup = document.getElementsByClassName('popup-delete-post');
const noBtn = document.getElementsByClassName('btn-no');
const yesBtn = document.getElementsByClassName('btn-yes');

function handlePopup() {
    let songId;

    for(let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].onclick = function() {
            let elementIndex = this.getAttribute('data-index');
            deletePopup[elementIndex].classList.toggle('show');
    
            noBtn[i].onclick = function() {
                let elementIndex = this.getAttribute('data-index');
                deletePopup[elementIndex].classList.toggle('show');
            }

            const deleteForm = document.forms['delete-form']
            yesBtn[i].onclick = function() {
                songId = this.getAttribute('data-id');
                deleteForm.action = '/admin/delete/' + songId + '?_method=DELETE';
                deleteForm.submit(); 
            }
        }
    }
}
handlePopup();
