function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    console.log("::: Form Submitted :::")
    if (Client.urlValidator(formText)){
      formText = formText.split('://')[1];
      let fetchURL = 'http://localhost:8080/test?url=' + formText;
      console.log(fetchURL);
      fetch(fetchURL)
      .then(res => res.json())
      .then(function(res) {
          displayResults(res);

      })
    } else {
      console.log('invalid url');
    }


}

function displayResults(res){
  const elements = [['Model', res.model], ['Agreement', res.agreement], ['Subjectivity', res.subjectivity], ['Score', res.score_tag], ['Confidence', res.confidence]];
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";
  elements.forEach(element => {
    const newElement = document.createElement('span');
    newElement.classList.add('results-item');
    newElement.textContent = `${element[0]}: ${element[1].toLowerCase()}`;
    resultsDiv.appendChild(newElement);
  })
}


export { handleSubmit }
