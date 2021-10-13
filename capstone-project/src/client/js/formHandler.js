function handleSubmit(event) {
  event.preventDefault()
  // check what text was put into the form field
  let formText = document.getElementById('url').value
  console.log("::: Form Submitted :::")


  if (Client.urlValidator(formText)) {
    // replace protocol from url - not returning results if present
    // from https://stackoverflow.com/a/8206299
    formText = formText.replace(/(^\w+:|^)\/\//, '');
    let fetchURL = `http://localhost:8080/test/${formText}`;
    fetch(fetchURL)
      .then(res => res.json())
      .then(function(res) {
        displayResults(res);

      })
  } else {
    displayErrorMessage('Invalid URL. Please try again.')
  }


}

function displayResults(res) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";
  resultsDiv.classList.remove('error');

  if(res.status.code !=0){
    displayErrorMessage(`${res.status.msg}: Please try again.`)
    return;
  }
  const elements = [
    ['Model', res.model],
    ['Agreement', res.agreement],
    ['Subjectivity', res.subjectivity],
    ['Score', res.score_tag],
    ['Confidence', res.confidence],
    ['Irony', res.irony]
  ];


  elements.forEach(element => {
    const newElement = document.createElement('span');
    newElement.classList.add('results-item');
    newElement.textContent = `${element[0]}: ${element[1].toLowerCase()}`;
    resultsDiv.appendChild(newElement);
  })
}

function displayErrorMessage(message){
  const resultsDiv = document.getElementById('results');
  resultsDiv.classList.add('error');
  resultsDiv.textContent = message;
}

export {
  handleSubmit
}
