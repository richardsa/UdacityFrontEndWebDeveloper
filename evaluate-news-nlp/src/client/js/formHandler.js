function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
    let fetchURL = 'http://localhost:8080/test?url=' + formText;
    console.log(fetchURL);
    fetch(fetchURL)
    .then(res => res.json())
    .then(function(res) {
        let resultsDiv = document.getElementById('results');
        // model/language
        resultsDiv.append(`Model: ${res.model}`);
        resultsDiv.append(`Agreement: ${res.agreement}`);
    })
}

export { handleSubmit }
