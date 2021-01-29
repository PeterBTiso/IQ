// Top Buttons
function dataBtn() {
  var element = document.getElementById("hideData");
  element.classList.toggle("mystyle");
}
function marksBtn() {
  var element = document.getElementById("hideMarks");
  element.classList.toggle("mystyle");
}
function assesBtn() {
  var element = document.getElementById("hideAssesments");
  element.classList.toggle("mystyle");
}
function eventsBtn() {
  var element = document.getElementById("hideEvents");
  element.classList.toggle("mystyle");
}
function rosterBtn() {
  var element = document.getElementById("hideRoster");
  element.classList.toggle("mystyle");
}
function vacaBtn() {
  var element = document.getElementById("hideNews");
  element.classList.toggle("mystyle");
}
function newsBtn() {
  var element = document.getElementById("hideNews");
  element.classList.toggle("mystyle");
}

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
  document.querySelector("#hideAssesments").addEventListener("click", function myFunction() {
    var x = document.querySelector("#assesmentsContainer") ;
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


// Grade buttons to display data
document.querySelector("#g1").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr1") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  })
  document.querySelector("#g2").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr2") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g3").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr3") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g4").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr4") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g5").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr5") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g6").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr6") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g7").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr7") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g8").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr8") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g9").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr9") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g10").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr10") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g11").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr11") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 
  document.querySelector("#g12").addEventListener("click", function myFunction() {
    var x = document.querySelector("#gr12") ;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }) 

  var handlersAdded = [];
  var hideGrades = function(){
    document.querySelectorAll('.gradeContainer').forEach(div => {
      div.classList.add('invisible');
  })};
  var hideTables = function(parentId){
    document.querySelectorAll(`#${parentId} .marks_table`).forEach(div => {
      div.classList.add('invisible');
  })};
  var removeInvisible = function(selector){
    document.querySelector(selector).classList.remove('invisible');
  }

  // this is to hide and show the students marks 
  document.querySelectorAll(".GradeBtn").forEach(btn =>{
    btn.addEventListener("click", function myFunction() {
      removeInvisible(`.${btn.id.replace('btn', '')}`);
  
      hideTables(document.querySelector(`.${btn.id.replace('btn', '')} .student_marks`).id);
  
      document.querySelectorAll(".student_marks > button").forEach(btn => {
        var parentId = btn.parentElement.id;
  
        if(!handlersAdded.includes(`${parentId}_${btn.name}`)){
          handlersAdded.push(`${parentId}_${btn.name}`);
  
          btn.addEventListener("click", () => {
            hideTables(parentId);
            removeInvisible(`.${btn.name.replace('btn', 'tbl')}`);
          })
        }
      })
    })
  }) 

// this is to hide and show the subjects on the marks dropdown
// let studentsSubjects = document.querySelectorAll("div");
// // console.log(studentsSubjects)
// for(let i = 0 ; i <= studentsSubjects.length() ; i++ ){
//   if(studentsSubjects.classList.contains(`n${i}`))
//   document.querySelector(`n${i}`).toggle().display();
//   console.log(i)
// }
  


  // document.querySelector(".engBtn").addEventListener("click", function myFunction() {
  //   var x = document.querySelector(".english") ;
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // })  
