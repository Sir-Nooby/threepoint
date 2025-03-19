//Welcome to the Javascript, I hate web3 :D

current_digit = 2
best_score = 0
site_state = "started"

fetch("Contents/pi.txt")
    .then(response => response.text())
    .then(data  => {
        pi = data
        console.log("File content loaded! (1/3)")
    })

digit = document.getElementById("user_input")
score = document.getElementById("score")


//Settings Tracker
const settings_button = document.getElementById("settings-button")
const settings_overlay = document.getElementById("settings")
const high_contrast = document.getElementById("contrast-mode")
const save_button = document.getElementById("save")
const theme = document.getElementById("theme")

const header_options = document.querySelectorAll(".header-bar")
const input_area = document.querySelectorAll(".input_area")
const info_options = document.querySelectorAll(".info-options")
const settings_content = document.querySelectorAll(".settings-content")

const theme_value = theme.value.split(",")

settings_button.addEventListener("click", () => {
    settings_overlay.style.display = "flex"
})

high_contrast.addEventListener("change", () => {
    input_area.forEach(element => {
        element.style.textDecoration = (high_contrast.checked) ? "underline" : "none"
    })
})

//Theme Tracker
theme.addEventListener("change", () => {
    const theme_value = theme.value.split(",")
    background_color = theme_value[0]
    highlight_color = theme_value[1]
    text_color = theme_value[2]
    document.body.style.backgroundColor = background_color
    document.body.style.color = text_color
    settings_button.style.backgroundColor = high_contrast
    info_options.forEach(element => {
        element.style.backgroundColor = highlight_color
    })
    header_options.forEach(element => {
        element.style.backgroundColor = highlight_color
    })
    settings_content.forEach(element => {
        element.style.background = background_color
        element.style.border = highlight_color + " solid 6px"
    })
})

save_button.addEventListener("click", () => {
    settings_overlay.style.display = "none"
})

//Set initial style (remove later)
background_color = theme_value[0]
highlight_color = theme_value[1]
text_color = theme_value[2]
document.body.style.backgroundColor = background_color
document.body.style.color = text_color
settings_button.style.backgroundColor = background_color
info_options.forEach(element => {
    element.style.backgroundColor = highlight_color
})
header_options.forEach(element => {
    element.style.backgroundColor = highlight_color
})
settings_content.forEach(element => {
    element.style.background = background_color
    element.style.border = highlight_color + " solid 6px"
})




digit.addEventListener("input", (event) => {
    console.log(event.target.value)
    const user_digit = event.target.value;
    if (user_digit == pi[current_digit]) {
        event.target.value = ""
        document.getElementById("past_digit1").textContent = (current_digit - 3 >= 0) ? String(pi[current_digit - 3]) : ""
        document.getElementById("past_digit2").textContent = (current_digit - 2 >= 0) ? String(pi[current_digit - 2]) : ""
        document.getElementById("past_digit3").textContent = (current_digit - 1 >= 0) ? String(pi[current_digit - 1]) : ""
        document.getElementById("past_digit4").textContent = String(pi[current_digit])
        score.textContent = current_digit-1
        current_digit += 1;
    } else if (user_digit == " " && current_digit >= 3) {
        event.target.value = ""
        current_digit -= 1
        document.getElementById("past_digit1").textContent = String(pi[current_digit - 2])
        document.getElementById("past_digit2").textContent = String(pi[current_digit - 1])
        document.getElementById("past_digit3").textContent = String(pi[current_digit])
        document.getElementById("past_digit4").textContent = String(pi[current_digit+1])
        score.textContent = current_digit-1
    }
    else {
        document.getElementById("score").textContent = "X"
    }
})
