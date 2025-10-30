const input=document.getElementById('todo-input')
const addbtn=document.getElementById('add-btn')
const list =document.getElementById('todo-list')

const saved=localStorage.getItem('todos');
const todos=saved? JSON.parse(saved):[];

function saveTodos(){
    localStorage.setItem('todos',JSON.stringify(todos));

}

function createNode(todo,index){
    const li=document.createElement('li');

    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked=!!todo.completed;
    checkbox.addEventListener("change",()=>{
        todo.completed=checkbox.checked;

        textSpan.style.textDecoration=todo.completed? 'line-through': "";
         saveTodos();
    })

    //todo text
    const textSpan=document.createElement("span");
    textSpan.textContent=todo.text;
    textSpan.style.margin='0 8px';

    if(todo.completed){
        textSpan.style.textDecoration='line-through';
    }

        // Add-double to edit
        textSpan.addEventListener("dblclick",()=>{
            const newt=prompt("Edit Todo",todo.text);
            if(newt!=null){
                todo.text=newt.trim()
                textSpan.textContent=todo.text;
                saveTodos();
            }
        } )

        //delete

        const delBtn=document.createElement('button');
        delBtn.textContent="Delete";
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1);
            render();
            saveTodos();
        })
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);

        return li
}
//render whole todo
function render(){
    list.innerHTML='';

    todos.forEach((todo,index) => {
        const node=createNode(todo,index);
        console.log(node,index)
        list.appendChild(node)
    });
}

function addTodo(){
    const text=input.value.trim();

    if(!text){
        return
    }
    todos.push({text:text,completed:false});
    input.value='';
    render()
    saveTodos()
}

addbtn.addEventListener("click",addTodo);
input.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
        addTodo();
    }
})
render();