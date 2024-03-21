// Constant declare.
const btnEncrypt = document.getElementById("btnEncrypt");
const btnDecrypt = document.getElementById("btnDecrypt");
const btnCopy = document.getElementById("btnCopy");
const txtInput = document.getElementById("txtInput");
const txtOutput = document.getElementById("txtOutput");
const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("modalAlert");
const modalMessage = document.getElementById("modalMessage");
const KEYS = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };

// Event Listeners.
btnEncrypt.addEventListener("click", encryptInput);
btnDecrypt.addEventListener("click", decryptInput);
btnCopy.addEventListener("click", copyOutput);
span.addEventListener("click", closeModal);

/**
 * Function to encrypt the input text.
 * @param {none}
 * @returns {none}
 */
function encryptInput() {
  let encryptValidation = [];

  // Calls for the validation.
  encryptValidation = validateInput();

  // If the input text is legit.
  if (encryptValidation[0]) {
    let encryptedTxt = "";

    // Encrypt the text by calling the processText function.
    encryptedTxt = processText(encryptValidation[1], "encrypt");

    // Show the encrypted message.
    displayResult(encryptedTxt);

    // If the input text is not legit.
  } else {
    // Alert the user of the error.
    showMessage(encryptValidation[1], "error");
  }
}

/**
 * Function to decrypt the input text.
 * @param {none}
 * @returns {none}
 */
function decryptInput() {
  let decryptValidation = [];

  // Calls for the validation.
  decryptValidation = validateInput();

  // If the input text is legit.
  if (decryptValidation[0]) {
    let decryptedTxt = "";

    // Encrypt the text by calling the processText function.
    decryptedTxt = processText(decryptValidation[1], "decrypt");

    // Show the encrypted message.
    displayResult(decryptedTxt);

    // If the input text is not legit.
  } else {
    // Alert the user of the error.
    showMessage(decryptValidation[1], "error");
  }
}

/**
 * Copy the processed message into the clipboard and reset the layout.
 * @param {none}
 * @returns {none}
 */
function copyOutput() {
  // Copy output text to the clipboard.
  navigator.clipboard.writeText(txtOutput.value);
  // Clear the output text area.
  txtOutput.value = "";
  // Set the original background image.
  txtOutput.style.backgroundImage = "url('img/output-background.png')";
  // Hide the copy button.
  btnCopy.style.display = "none";
  // Set abolute position.
  btnCopy.style.position = "absolute";
  // Clear input text area.
  txtInput.value = "";

  // Alert user of the operation.
  showMessage("Mensaje copiado al portapapeles.", "success");
}

/**
 * Takes the text area value and check if it is a value string to encrypt/decrypt
 * @param {none}
 * @returns {Array}    Array containing the result of the comparisson and the formated string.
 */
function validateInput() {
  // Pattern for the regular expression, only lowercase letters with no special characters except whitespace.
  const VALIDPATTERN = /^[a-z,\s]+$/;

  // Remove trailing white spaces.
  let txtValidation = txtInput.value.trim();

  // Return message.
  let txtResult = "Introduzca un dato válido.";

  // Validation result.
  let result = false;

  // If the input text does not have only white spaces.
  if (txtValidation !== "") {
    // Validate the input text with the regular expression.
    result = VALIDPATTERN.test((string = txtValidation));
    // If the input text is valid, return it, otherwise leave the previously set message.
    txtResult = result ? txtValidation : txtResult;

    // If the input text only have white spaces.
  } else {
    // Clear the input text area.
    txtInput.value = "";
  }

  // Return an array containing the validation result and the formatted message.
  return [result, txtResult];
}

/**
 * Takes the given text and encrypts/decrypts it according to the operation requested.
 * It uses the predefined json object to map the keys.
 * @param {String, String}    String to process, operation requested.
 * @returns {String}    Result string from the operation.
 */
function processText(txtToProcess = "", operation = "") {
  let processedText = "";

  // Copy the input text.
  processedText = txtToProcess;

  // If the requested operation was to encrypt.
  if (operation === "encrypt") {
    // Loop through the keys to replace the matching letters by the values in the object.
    for (let letter in KEYS) {
      // Replace the letter within the string.
      processedText = processedText.replaceAll(letter, KEYS[letter]);
    }

    // If the requested operation was to decrypt.
  } else {
    // Loop through the keys to replace the matching words by the keys in the object.
    for (let letter in KEYS) {
      // Create a regular expression using the value of the key.
      let reg = new RegExp(KEYS[letter], "g");

      // Replace the regular expression within the string.
      processedText = processedText.replaceAll(reg, letter);
    }
  }

  // Return the processed string.
  return processedText;
}

/**
 * Show the given message in the output text area.
 * @param {String}    String to show in the output text area.
 * @returns {none}
 */
function displayResult(txtToDisplay = "") {
  // Display the given message in the output text area.
  txtOutput.value = txtToDisplay;
  // Remove background image.
  txtOutput.style.backgroundImage = "none";
  // Show the copy button.
  btnCopy.style.display = "block";
}

/**
 * Show the given message into a modal over the window.
 * @param {String, String}    Message to display within the modal, status of the message.
 * @returns {none}
 */
function showMessage(msgToShow = "", msgStatus = "") {
  // Set the modal's message.
  modalMessage.innerHTML = msgToShow;

  // change the modal's font color to the corresponding status.
  switch (msgStatus) {
    case "success":
      modalMessage.style.color = "green";
      break;
    case "warning":
      modalMessage.style.color = "orange";
      break;
    default:
      modalMessage.style.color = "red";
  }

  // Show the modal.
  modal.style.display = "block";
}

/**
 * Close the modal when user clicks the close button.
 * @param {none}
 * @returns {none}
 */
function closeModal() {
  // Hide the modal.
  modal.style.display = "none";
}

/**
 * Close the modal when user clicks the window outside the visible area of the modal.
 * @param {none}
 * @returns {none}
 */
window.onclick = function (event) {
  // Since the modal appears all over the window, when the user click anywhere the event is triggered.
  if (event.target == modal) {
    // Hide the modal.
    modal.style.display = "none";
  }
};
