$(document).ready(function() {
    let todo = JSON.parse(localStorage.getItem("todo-list")) || [];
    let currentIndex = null;
    //currentindex tjekker om der er et valgt element.

    window.CreateToDoItems = CreateToDoItems;
    window.CompletedToDoItems = CompletedToDoItems;
    
    refreshTodoList();

    $("#AddUpdateClick").click(function () {
        CreateToDoItems();
    });

    function CreateToDoItems() { 
        const userInput = $("#todoText").val(); //henter user input
    
        if(userInput === ""){
            setAlertMessage("Skriv venligst din opgavetekst!");
            $("#todoText").focus(); //sætter fokus på tekstboks
        }
        else{

            //tjekker om opgave eksisterer allerede
            let TaskIsPresent = false;
            $.each(todo, function (index, element) { 
                 if(element.item === userInput && currentIndex === null){ 
                    TaskIsPresent = true;
                 }
            });
    
            if(TaskIsPresent){
                setAlertMessage("Opgaven findes allerede!");
                return;
            }
            else{
                setAlertMessage("Opgaven oprettet!");
            }
            
            //opdaterer opgave hvis den bliver redigeret:
            if(currentIndex !== null){
                todo[currentIndex].item = userInput;
                setLocalStorage();
                refreshTodoList();
                currentIndex = null;
                $("#AddUpdateClick").text("Add");
            }
            else{
                //laver ny todo item:
                const li = $("<li></li>");
                const todoItems =  `<input type="checkbox" class="complete-task" onclick="CompletedToDoItems(this)" ${todo.status ? "checked" : ""}/>
                                   <div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)" style="${todo.status ? "text-decoration: line-through;" : ""}">
                                   ${userInput}</div>
                                   <div>
                                       <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />
                                       <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" />
                                   </div>`;
                li.html(todoItems);
                $("#list-items").append(li); //tilføjer todo item til listen
                //TODO ændr til den anden container
                todo.push({ item: userInput, status: false});
                setLocalStorage();
            }
        }
    }

    function CompletedToDoItems(element) {
        const li = $(element).closest("li");
        const itemText = li.find("div").first().text().trim();

        let index = -1;
        $.each(todo, function (i, item) {
            if (item.item === itemText) {
                index = i;
                return false;  
            }
        });

        if (index !== -1) {
            //Ændrer status på komplette elementer
            todo[index].status = !todo[index].status;
            li.find("div").first().css("text-decoration", todo[index].status ? "line-through" : "none");
            setLocalStorage();
        }
    }

    window.DeleteToDoItems = function(element){
        
        const li = $(element).closest("li");
        const itemText = li.find("div").first().text().trim();

        let index = -1;
        $.each(todo, function (i, item) {
            if (item.item === itemText) {
                index = i;
                return false;
            }
        });
            
        if (index !== -1) {
            todo.splice(index, 1);  
        }

        li.remove();
        setLocalStorage();
        setAlertMessage("Opgave slettet!");
        
    }

    window.UpdateToDoItems = function(element){
        const li = $(element).closest("li");
        const itemText = li.find("div").first().text().trim();
        
        let index = -1;
        $.each(todo, function (i, item) {
            if (item.item === itemText) {
                index = i;
                return false; 
            }
        });
            if(index !== -1){
            $("#todoText").val(todo[index].item); //sætter teksten i inputfeltet
            currentIndex = index;
            $("#AddUpdateClick").text("Update"); //ændrerknaptekst til update
        }
    }    
    
    function setAlertMessage(message) {
        $("#Alert").text(message);
      }
    
    
      function setLocalStorage(){
        localStorage.setItem("todo-list", JSON.stringify(todo));
    }
    
    function refreshTodoList() { 
        $("#list-item").empty(); //clearer listen.
        
        $.each(todo, function (index, item) {
            const li = $("<li></li>");
            const todoItems = `<input type="checkbox" class="complete-task" onclick="CompletedToDoItems(this)" ${item.status ? "checked" : ""}/>
                               <div title="Hit Double Click and Complete" style="${item.status ? "text-decoration: line-through;" : ""}">
                               ${item.item}</div>
                               <div>
                                   <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />
                                   <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" />
                               </div>`;
            li.html(todoItems);
            $("#list-items").append(li);
          });
     }
    console.log("jQuery is working!");
  });