const hideOnClick = (button, close) => {
    button.addEventListener("click", () => close.remove())
}

if(document.querySelector(".alertMessage")){
    const alerts = document.querySelectorAll(".alertMessage")
    
    alerts.forEach(alert => {
        hideOnClick(alert.querySelector(".alertMessage__right"), alert)
    })
}

const moveBackOrForward = () => {
    const backBtn = document.querySelector(".btn--back")
    const forwardBtn = document.querySelector(".btn--forward")

    backBtn.addEventListener("click", () => {
        window.history.back()
    })

    forwardBtn.addEventListener("click", () => {
        window.history.forward()
    })

}

moveBackOrForward()