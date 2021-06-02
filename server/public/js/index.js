const createSectionForm = document.querySelector(".createSection__formContainer form")

if(createSectionForm !== null){
    createSectionForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = this.name.value;
        const description = this.description.value;
    
        const data = {
            name,
            description
        }
    
        fetch(window.location.pathname, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            createSectionForm.parentElement.classList.remove("streched");
            const rolledContent = createSectionForm.parentElement.querySelector(".rolled__content");
            rolledContent.querySelector("h4").innerText = data;
            this.remove()
        })
        .catch(err => {
            console.log(err)
        })
    })
}


const optionBtn = document.querySelectorAll(".courseCard__options__button")

optionBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        const optionDropdown = btn.parentElement.querySelector(".courseCard__options__dropdown");

        if(optionDropdown.classList.contains("active")){
            document.querySelectorAll(".courseCard__options__dropdown").forEach(dropdown => dropdown.classList.remove("active"))
        } else{
            document.querySelectorAll(".courseCard__options__dropdown").forEach(dropdown => dropdown.classList.remove("active"))
            optionDropdown.classList.toggle("active")
        }
    })
})
