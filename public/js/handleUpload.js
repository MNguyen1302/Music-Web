const fileUpload = document.querySelector('#file-upload');
const imagePreview = document.querySelector('#image-preview');
function previewImage(e) {
    let fileReader = new FileReader();

    fileReader.onload = function() {
        imagePreview.src = fileReader.result;
    }
    fileReader.readAsDataURL(e.target.files[0])
}

fileUpload.onchange = function(e) {
    previewImage(e);
}