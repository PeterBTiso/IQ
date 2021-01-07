
document.querySelector("#hideData").addEventListener("click", function myFunction() {
    var x = document.querySelector("#studentData") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  })

  document.querySelector("#hideMarks").addEventListener("click", function myFunction() {
    var x = document.querySelector("#marksContainer") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  })

  document.querySelector("#hideEvents").addEventListener("click", function myFunction() {
    var x = document.querySelector("#eventsContainer") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  })

  document.querySelector("#hideRoster").addEventListener("click", function myFunction() {
    var x = document.querySelector("#rosterContainer") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  examsContainer