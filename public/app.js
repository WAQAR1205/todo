const firebaseConfig = {
    apiKey: "AIzaSyD6ZWTjFkejGf0NG4LWwzUoOljVmlDmhMQ",
    authDomain: "waqar-ecf9f.firebaseapp.com",
    projectId: "waqar-ecf9f",
    storageBucket: "waqar-ecf9f.appspot.com",
    messagingSenderId: "824347832210",
    appId: "1:824347832210:web:1b5db569043e6a080d1b4b",
    measurementId: "G-HMRXDCQHQN"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
// ul ko variable mein puit kar dia
var list = document.getElementById("list")

 app.database().ref('todos').on('child_added' , function(data){
    // li creation link with to-do 
    var li = document.createElement('li')
    var text = document.createTextNode(data.val().todo)
    li.setAttribute("id" , "li-list")
    // li mein value jaye gi task ki
    li.appendChild(text)
    // for edit button, value , id, function decrealation and enter this button in li list
    var edit = document.createElement("button")
    var Etext = document.createTextNode("EDIT")
    edit.setAttribute("id" , data.val().key)
    edit.setAttribute("class" , "edit")
    edit.setAttribute("onclick" , "edit(this)")
    li.appendChild(edit)
    edit.appendChild(Etext)

    // for del button, value , id, function decrealation and enter this button in li list
    var del = document.createElement("button")
    var deltext = document.createTextNode("DELETE")
    del.setAttribute("id" , data.val().key)
    del.setAttribute("class" , "btn")
    del.setAttribute("onclick" , "delItem(this)")

    // delelte button ko li ke sath lagane ke liye
    li.appendChild(del)
    del.appendChild(deltext)
        
    // ul mein jaty hue aur next task ke liye jaga khali karty hue
    list.appendChild(li)

 })
// add iten ka function
function add(){
        
    // input field ki value 
    var todo = document.getElementById("todo")
    var db = app.database().ref('todos');
    var key = db.push().key;
    var todos = {
        todo: todo.value,
        key:key
    }
    db.child(key).set(todos)

    
    todo.value = ""
}
// DELETE ALL
function delet(){
    app.database().ref('todos').remove()
    list.innerHTML=""
}

// for del li
function delItem(e){
    // console.log(e.id)
    app.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

// for edit li
function edit(e){
    var upto = e.parentNode.firstChild.nodeValue;
    var update = prompt("UPDATE " , upto)
    var edit = {
        value : update,
        key: e.id
    }
    app.database().ref('todos').child(e.id).set(edit)
    e.parentNode.firstChild.nodeValue = update;
}