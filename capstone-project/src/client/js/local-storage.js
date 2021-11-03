const tripDetailContainer =  document.getElementById('entryHolder');
/* modified from https://stackoverflow.com/questions/48239869/how-to-store-a-complete-div-in-localstorage */
function setTrip() {
if (localStorage) {
    var key = "trip-info" ;
    var tripDetailContainerStringified = JSON.stringify(tripDetailContainer);
    localStorage.setItem(key, tripDetailContainer.outerHTML);
  }
else {
    console.log("Error: you don't have localStorage!");
  }
}

/* modified from https://stackoverflow.com/questions/16010827/html5-localstorage-checking-if-a-key-exists */
function getTrip(){
  if (localStorage.getItem("trip-info") !== null) {
    tripDetailContainer.outerHTML = localStorage["trip-info"]
  } else {
    return false;
  }
}

window.addEventListener('load', getTrip);



export {
  setTrip,
  getTrip
}