/*let todolist=[ //it is an array that containes objects
    {
        text:"Learn HTML",
        uniqueno:1,
    },
    {
        text:"Learn CSS",
        uniqueno:2
    },
    {
        text:"Learn JAVASCRIPT",
        uniqueno:3
    },
    {
        text:"Learn REACT",
        uniqueno:4
    }
]  idhi manam nrml ga aa kindha tasks add cheyadaniki first rasam ee code
  tarvta user input ichi add chestam kadha so ee object value inkokati istham 
  anduke ee variable delete chesestam nenu teliyadaniki ila comment pettesa*/
function getTodoListFromLs(){
    let x=localStorage.getItem("todolist");
    let y=JSON.parse(x);
    if (y === null){
        return [];
    }
    else{
        return y;
    }
}
let todolist=getTodoListFromLs();

let savebutton=document.getElementById("savebutton");
savebutton.onclick=function(){
    localStorage.setItem("todolist",JSON.stringify(todolist));
    
};

function onTodoClick(checkboxid,labelid,todoid){
    let checkboxElement = document.getElementById(checkboxid);
    let labelElement = document.getElementById(labelid);
    /*if(checkboxElement.checked===true){    //okavela checkbox tick ayyi unte 
        labelElement.classList.add("checked");
    }
    else{
        labelElement.classList.remove("checked");//tick avvakunda unte
    } intha rayakunda kindha rasinatu rastam*/
    labelElement.classList.toggle("checked");//idhentante first checked ane class apply ayyi undho ledho chustadi apply ayyi unte remove chestadi or lekapothe apply chestadi

    let todoobjectindex=todolist.findIndex(function(eachtodo){
        let eachtodoid="todo"+eachtodo.uniqueno;
        if(eachtodoid===todoid){
            return true;
        }
        else{
            return false;
        }
    });
    let todoobject=todolist[todoobjectindex];
    if(todoobject.checked===true){ //idhi enduku raasam ante ls lo save cheyadaniki
        todoobject.checked=false;
    }
    else{
        todoobject.checked=true;
    }
}

function ondeletetodo(todoid){
    let todoElement=document.getElementById(todoid);
    todoItemsContainer.removeChild(todoElement);
    let deleteElementIndex=todolist.findIndex(function(eachtodo){
        let eachtodoid="todo"+eachtodo.uniqueno;
        if(eachtodoid===todoid){
            return true;
        }
        else{
            return false;
        }
    });
    todolist.splice(deleteElementIndex,1);
}

function addingtodo(){  
    let todoscount=todolist.length;
    todoscount=todoscount+1;
    let inputtext=document.getElementById("todoUserInput");
    let p=inputtext.value;
    if(p===""){
        alert("Enter Valid Text");
        return; // okavela empty aithe aa paina text display chesi function nunchi exit aipo ani chepadaniki return vadutunam
    }
    let todonew={
        text:p,
        uniqueno:todoscount,
        checked:false
    };
    todolist.push(todonew);
    createandappendtodo(todonew);
    inputtext.value=" ";
}
function createandappendtodo(todo){   // ikkada todo ane oka object teeskunam nrml ga prathi sari ye lang lo ayina em chestam oka function paina raasi daniki obj bracket lo petti kindha aa function lo direct ga aa value istam alane ikkada kuda chesam
    let todoid="todo"+todo.uniqueno;
    let a = document.createElement("li");
    a.id=todoid;
    a.classList.add("todo-item-container","d-flex","flex-row");
    todoItemsContainer.appendChild(a);
    let b = document.createElement("input");
    b.type="checkbox";
    let checkboxid="checked"+todo.uniqueno;//ikkada checked + ani enduku rasam ante just id anedhi unique ga undadaniki
    let labelid="label"+todo.uniqueno; //endukante ikkada kuda todo.uniqueno vaada kadha so rendu unique ga undadaniki ikkada label + ani vaada
    b.id=checkboxid;//ikkada "" petti rayakunda nrml ga rasam i think its because it is an obj
    b.classList.add("checkbox-input");
    b.onclick=function(){
        onTodoClick(checkboxid,labelid,todoid);
    };

    b.checked=todo.checked; //ikkada todo checked ayyi unte checkbox checked avvali ani refresh ayina
    
    a.appendChild(b);
    let c = document.createElement("div");
    c.classList.add("d-flex","flex-row","label-container");
    a.appendChild(c);
    let d = document.createElement("label");
    d.id=labelid;
    d.setAttribute("for",checkboxid);//same here "" indulo rayaledhu
    d.classList.add("checkbox-label");
    d.textContent=todo.text;

    //kindha ala enduku rasamante checked anedhi ls lo true ani chupinchina execution context lo refresh chesthe checked ayyi undatledhu
    //so ls nunchi todo.checked anedhi techukuni execution context lo petukovadaniki al rasam
    if (todo.checked===true){ //refresh ayina aa text cut ainatu kanipinchadaniki 
        d.classList.add("checked");
    }

    c.appendChild(d);
    let e = document.createElement("div");
    e.classList.add("delete-icon-container");
    c.appendChild(e);
    let f = document.createElement("img");
    f.setAttribute("src","file:///C:/Users/ASUS/Downloads/trash3.svg");
    f.classList.add("delete-icon");
    f.onclick=function(){
        ondeletetodo(todoid);
    }
    e.appendChild(f);
    let addd=document.getElementById("addbutton");
    addd.onclick=function(){
        addingtodo();
    }
};
/*createandappendtodo(todolist[0]); 
createandappendtodo(todolist[1]);
createandappendtodo(todolist[2]); ila inni sarlu rayakunda for..of loop use chestam */

for(let todo of todolist){
    createandappendtodo(todo);
}
