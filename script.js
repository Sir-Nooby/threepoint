//Welcome to the Javascript, I hate web3 :D

current_digit = 3
best_score = 0
site_state = "started"

fetch("Contents/pi.txt")
    .then(response => response.text())
    .then(data  => {
        pi = data
        console.log("File content loaded! (1/3)")
    })


digit = document.getElementById("user_input")


digit.addEventListener("input", (event) => {
    const user_digit = event.target.value;
    if (user_digit == pi[current_digit]) {
        event.target.value = "";
        document.getElementById("past_digit1").textContent = String(pi[current_digit-3])
        document.getElementById("past_digit2").textContent = String(pi[current_digit-2])
        document.getElementById("past_digit3").textContent = String(pi[current_digit-1])
        document.getElementById("past_digit4").textContent = String(pi[current_digit])
        document.getElementById("score").textContent = current_digit-1;
        current_digit += 1;
    } else {
        document.getElementById("score").textContent = "X"
    }
})