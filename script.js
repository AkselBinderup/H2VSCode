const userInput = document.getElementById("todoText");
const alertLabel = document.getElementById("Alert");
const itemsShownInList = document.getElementById("list-items");
const addAndUpdateButton = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];
let currentIndex = null;//tracker hvilken item bliver redigeret

window.onload = function () {
    refreshTodoList();  // viser gemte todos
};

function CreateToDoItems(){
    if(userInput.value === ""){
        setAlertMessage("Skriv venligst din opgavetekst!");
        // alertLabel.innerText = "Please enter your todo text!";
        userInput.focus();
    }
    else{
        let TaskIsPresent = false;
        todo.forEach((element) => {
            if (element.item == userInput.value && currentIndex === null) {
                TaskIsPresent = true;
              }
        });
    if(TaskIsPresent){
        setAlertMessage("Denne opgave er allerede oprettet!");
        return;
    }
    else{
        setAlertMessage("Opgaven oprettet!");
    }
    
    if(currentIndex !== null){
        todo[currentIndex].item = userInput.value;
        setLocalStorage();
        refreshTodoList();
        currentIndex = null;
        addAndUpdateButton.innerText = "Add";
    }
    else{
        let li  = document.createElement("li");
        const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${userInput.value}</div><div>
                           <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />
                           <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div></div>`;
        li.innerHTML = todoItems;
        itemsShownInList.appendChild(li);

        let itemList = {item: userInput.value, status:false};
        todo.push(itemList);
        setLocalStorage();
        }       
    }
    userInput.value = "";
}

function DeleteToDoItems(element){
    let li = element.parentNode.parentNode;
    let index = todo.findIndex((item) => item.item === li.textContent.trim());
    if (index != -1){
        todo.splice(index, 1); //position index fjern 1 item
    }
    itemsShownInList.removeChild(li);

    setLocalStorage();
    setAlertMessage("Opgave slettet!");
}

function setAlertMessage(message){
    alertLabel.innerText = message;
}

function UpdateToDoItems(element){ 
    let li = element.parentNode.parentNode;
    let text = li.querySelector('div').textContent.trim();
    let index = todo.findIndex((item) => item.item === text);

    if(index !== -1){
        userInput.value = todo[index].item;
        currentIndex = index;
       addAndUpdateButton.innerText = "Update";
    }
}

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
  }

function refreshTodoList(){
itemsShownInList.innerHTML =  '';

todo.forEach((item) => {
    let li = document.createElement("li");
    //Tilføjer dynamisk et element i html som har knapper og image
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${item.item}</div><div>
            <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />
            <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div>`;
    li.innerHTML = todoItems;
    itemsShownInList.appendChild(li);
    });
}