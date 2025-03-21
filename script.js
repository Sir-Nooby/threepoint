//Welcome to the Javascript, I hate web3 :D

current_digit = 2
current_mode = "endless"
best_score = 0
player_lives = 3

//Call the file
fetch("Contents/pi.txt")
    .then(response => response.text())
    .then(data => {
        pi = data
        console.log("File content loaded! (1/3)")
    })

//General UI Elements
const digit = document.getElementById("user_input")
const score = document.getElementById("score")

const instructions = document.getElementById("instructions")
const lives_display = document.getElementById("lives-display")

//Mode Tracker
const modes_button = document.getElementById("mode-button")
const modes_overlay = document.getElementById("modes")

const endless = document.getElementById("endless")
const lives = document.getElementById("lives")
const hardcore = document.getElementById("hardcore")

modes_button.addEventListener("click", () => {
    modes_overlay.style.display = "flex"
})

//Game Mode Setup
endless.addEventListener("click", () => {
    current_mode = "endless"
    modes_overlay.style.display = "none"
    lives_display.style.display = "none"
    instructions.textContent = "Type the digits inside the highlighted box. Get as many correct!"
    reset()
})

lives.addEventListener("click", () => {
    player_lives = 3
    current_mode = "lives"
    modes_overlay.style.display = "none"
    lives_display.style.display = "block"
    lives_display.textContent = "Lives: " + player_lives
    instructions.textContent = "Type the digits inside the highlighted box. You have 3 lives!"
    reset()

})

hardcore.addEventListener("click", () => {
    player_lives = 1
    current_mode = "hardcore"
    modes_overlay.style.display = "none"
    lives_display.style.display = "block"
    lives_display.textContent = "Lives: " + player_lives
    instructions.textContent = "Type the digits inside the highlighted box. Only one chance!"
    reset()
})

//Functions
function reset() {
    current_digit = 2
    score.textContent = current_digit - 2
    document.getElementById("past_digit1").textContent = ""
    document.getElementById("past_digit2").textContent = ""
    document.getElementById("past_digit3").textContent = "3"
    document.getElementById("past_digit4").textContent = "."
    document.getElementById("user_input").value = ""

    if (current_mode == "hardcore") {
        player_lives = 1
    } else if (current_mode == "lives") {
        player_lives = 3
    }
    user_input.style.background = "#ffffff"
    lives_display.textContent = "Lives: " + player_lives
    instructions.style.opacity = 1
    instructions.style.display = "block"
}

//Save and Load Settings
function saveSettings() {
    localStorage.setItem("theme", theme.value)
    localStorage.setItem("contrast-mode", high_contrast.checked)
    localStorage.setItem("color-indicators", color_indicator.checked)
}

function loadSettings() {
    const saved_theme = localStorage.getItem("theme")
    const saved_contrastmode = localStorage.getItem("contrast-mode")
    const saved_colorindicators = localStorage.getItem("color-indicators")

    if (saved_theme) {
        const loaded_theme = saved_theme.split(",")
        background_color = loaded_theme[0]
        highlight_color = loaded_theme[1]
        text_color = loaded_theme[2]
        theme_name = loaded_theme[3]
        theme.value = saved_theme
    } else {
        background_color = "#f7f7f0"
        highlight_color = "#cbc69c"
        text_color = "#000000"
        theme_name = "Beige"
    }

    if (saved_contrastmode === "true") {
        high_contrast.checked = true
        input_area.forEach(element => {
            element.style.textDecoration = "underline"
        })
    }

    if (saved_colorindicators === "true") {
        color_indicator.checked = true
    }

    document.body.style.backgroundColor = background_color
    document.body.style.color = text_color
    user_input.style.borderColor = highlight_color
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

    //Score Loading
    const savedBestScore = localStorage.getItem("best_score")
    if (savedBestScore !== null) {
        best_score = parseInt(savedBestScore)
    } else {
        best_score = 0
    }
}

//Settings Tracker

const settings_button = document.getElementById("settings-button")
const settings_overlay = document.getElementById("settings")
const save_button = document.getElementById("save")

const high_contrast = document.getElementById("contrast-mode")
const color_indicator = document.getElementById("color-indicators")

const theme = document.getElementById("theme")

const header_options = document.querySelectorAll(".header-bar")
const input_area = document.querySelectorAll(".input_area")
const info_options = document.querySelectorAll(".info-options")
const settings_content = document.querySelectorAll(".modal-content")

const theme_value = theme.value.split(",")
const user_input = document.getElementById("user_input")

//Settings Functionality
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
    user_input.style.borderColor = highlight_color

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

//Saving Settings
save_button.addEventListener("click", () => {
    settings_overlay.style.display = "none"
    saveSettings()
})

window.onload = loadSettings()

//Game Logic
const end_overlay = document.getElementById("end")

const score_display = document.getElementById("score-display")
const highscore_display = document.getElementById("highscore-display")

digit.addEventListener("input", (event) => {

    const user_digit = event.target.value;
    backspacePressed = false;

    user_input.style.background = "#ffffff"
    color_indicators = color_indicator.checked

    instructions.style.transition = "opacity 1.5s"
    instructions.style.opacity = 0
    setTimeout(() => {
        instructions.style.display = "none";
    }, 1000);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
            backspacePressed = true
        } else {
            backspacePressed = false
        }
    });

    // Input checker
    if (player_lives > 0 || current_mode == "endless") {
        if (user_digit == pi[current_digit]) { // Normal
            if (color_indicators) {
                user_input.style.background = "#a1e6a6";
            }
            event.target.value = "";
            document.getElementById("past_digit1").textContent = (current_digit - 3 >= 0) ? String(pi[current_digit - 3]) : "";
            document.getElementById("past_digit2").textContent = (current_digit - 2 >= 0) ? String(pi[current_digit - 2]) : "";
            document.getElementById("past_digit3").textContent = (current_digit - 1 >= 0) ? String(pi[current_digit - 1]) : "";
            document.getElementById("past_digit4").textContent = String(pi[current_digit]);
            score.textContent = current_digit - 1;
            current_digit += 1;
        } else if (user_digit == " " && current_digit - 1 > 3) { // Backspace
            event.target.value = "";
            current_digit -= 1;
            document.getElementById("past_digit1").textContent = String(pi[current_digit - 4]);
            document.getElementById("past_digit2").textContent = String(pi[current_digit - 3]);
            document.getElementById("past_digit3").textContent = String(pi[current_digit - 2]);
            document.getElementById("past_digit4").textContent = String(pi[current_digit - 1]);
            score.textContent = current_digit - 1;
        } else if (user_digit == "INSTINCT") { // Instinct Egg
            event.target.value = "";
            document.body.style.backgroundImage = "url('Contents/image.png')";
            document.body.style.backgroundSize = 300 + "px";
        } else { // Incorrect
            if (!backspacePressed) { // Backspace Checker
                document.getElementById("score").textContent = "X";
                user_input.style.background = "#cf8686";
                console.log("The correct input is: " + pi[current_digit]);
                player_lives -= 1;
                lives_display.textContent = "Lives: " + player_lives;
            }
        }
        // End
        if (player_lives == 0 && current_mode != "endless") {
            if (current_digit - 2 > best_score) {
                best_score = current_digit - 2;
            }
            end_overlay.style.display = "flex";
            event.target.value = ""
            score_display.textContent = "You recited " + String(current_digit - 2) + " digits of pi!";
            highscore_display.textContent = "Your best score is " + String(best_score) + " digits!";
            localStorage.setItem("best_score", best_score);
        }
    }
})
//Restart Button
const restart_button = document.getElementById("restart-button")

restart_button.addEventListener("click", () => {
    end_overlay.style.display = "none"
    reset()
})