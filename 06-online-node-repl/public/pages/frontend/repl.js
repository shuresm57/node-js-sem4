const replCodeOutputDiv = document.getElementById('repl-code-output');
const replInputInput = document.getElementById('repl-code-input');

replInputInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    runReplInput();
  }
});

function runReplInput () {
  const replCode = replInputInput.value;
  replInputInput.value = '';
  addInput(replCode);

  fetch('/api/repl', {
    method: 'POST',
    body: JSON.stringify({ replCode }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // descructor parameter
    .then((response) => response.json())
    .then(({ data }) => {
      if (data.error) {
        addError();
        console.log(data.error);
      } else {
        addOutputAndResult(data.output, data.result);
        console.log(data.output, data.result);
      }
    });
}

function addInput (replCode) {
  const replCodeDiv = document.createElement('div');
  replCodeDiv.textContent = `> ${replCode}`;
  replCodeDiv.classList.add('repl-code-prompt');

  replCodeOutputDiv.appendChild(replCodeDiv);

  scrollToTheBottom();
}

function addError (error) {
  const replErrorDiv = document.createElement('div');
  replErrorDiv.textContent = `> ${error}`;
  replErrorDiv.classList.add('repl-code-error');

  replCodeOutputDiv.appendChild(replErrorDiv);

  scrollToTheBottom();
}

function addOutputAndResult (output, result) {
  if (output) {
    const replOutputDiv = document.createElement('div');
    replOutputDiv.textContent = output;
    replOutputDiv.classList.add('repl-code-output');

    replCodeOutputDiv.appendChild(replOutputDiv);
  }

  const replResultDiv = document.createElement('div');
  replResultDiv.textContent = result;
  replResultDiv.classList.add('repl-code-result');

  replCodeOutputDiv.appendChild(replResultDiv);

  scrollToTheBottom();
}

function scrollToTheBottom () {
  replCodeOutputDiv.scrollTop = replCodeOutputDiv.scrollHeight;
}
