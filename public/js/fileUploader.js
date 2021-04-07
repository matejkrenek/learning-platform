const uploadFields = document.querySelectorAll(".uploadPreview__field");

uploadFields.forEach(field => {
    const fieldInput = field.querySelector("input[type='file']");

    fieldInput.addEventListener("change", (e) => {
        handleShowPreview(e)    
    })
})

function handleShowPreview(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file)

    reader.onload = () => {
        const url = reader.result;
        console.log(document.querySelector(".uploadPreview__field--ghost"))
        
    }

    reader.onerror = () => {
        console.log(reader.error)
    }
}