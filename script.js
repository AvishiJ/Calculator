// Initialize an empty string to store the user input
let inputString = ''

// Initialize the variable to store the current memory value to zero
let memoryValue = 0

// Select the input field
const inputField = document.querySelector('input')

// Select all the calculator buttons on the page
const calculatorButtons = document.querySelectorAll('button')

// Select the body element
const bodyElement = document.body

const parentBox = document.querySelector('.parent')

function generateRandomGradient () {
  // Generate random colors
  const color1 = getRandomColor()
  const color2 = getRandomColor()

  // Generate a random angle between 0 and 360 degrees
  const angle = Math.floor(Math.random() * 360)

  // Create the linear gradient string
  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`

  // return generated linear gradient
  return gradient
}

function getRandomColor () {
  // Generate a random hexadecimal color code
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  color += '80' // so that background is never a solid boring one color and a gradient always
  return color
}

// Function to change the background color
function changeBackgroundColor () {
  bodyElement.style.background = generateRandomGradient()
  parentBox.classList.add('box-highlight')

  // to add a button press effect to parent container
  setTimeout(() => {
    parentBox.classList.remove('box-highlight')
  }, 200)
}

// Add an event listener to each button
calculatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent

    switch (buttonValue) {
      case '=':
        // Check if the inputString is not empty and contains a valid expression
        if (inputString) {
          try {
            // Replace percentage symbol (%) with '/100' before evaluation
            inputString = inputString.replace(/%/g, '/100')

            // Evaluate the user input as a mathematical expression using eval
            const result = eval(inputString)

            // Display the result in the input field
            inputField.value = result

            // Update the inputString with the result for further calculations
            inputString = result.toString()

            // Change the background color here
            changeBackgroundColor()
          } catch (error) {
            // Handle invalid expressions
            navigator.vibrate(200)
            inputField.value = 'Error'
            inputString = ''
          }
        }
        break
      case 'C':
        // Clear the inputString and reset the input field
        inputString = ''
        inputField.value = inputString
        break
      case 'M+':
        // Add the current input value to the memory value
        memoryValue += parseFloat(inputString) ?? 0
        inputString = ''
        break
      case 'M-':
        // Subtract the current input value from the memory value
        memoryValue -= parseFloat(inputString) ?? 0
        inputString = ''
        break
      default:
        // Append the clicked button's value to the input string
        if (buttonValue === '%') {
          // If it's a percentage, divide the current input value by 100
          inputString = (parseFloat(inputString) / 100).toString()
        } else {
          inputString += buttonValue
        }

        // Display the updated input string in the input field
        inputField.value = inputString
        break
    }
  })
})
