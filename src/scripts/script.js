window.onload = () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTaskForm = document.getElementById("new-task-form")
    
    newTaskForm.addEventListener("submit",e=>{
        e.preventDefault()

        const task = {
            newTask: e.target.elements.newTask.value,
            category: e.target.elements.category.value,
            done: false
        }

        todos.push(task);

        localStorage.setItem("todos", JSON.stringify(todos));

        e.target.reset()

        displayTasks()
    })

    displayTasks()
}

const displayTasks = () => {
    const todoList = document.getElementById('list');
	todoList.innerHTML = "";

    todos.forEach(todo => {
        //creamos componentes de las tareas a insertar
        const todoItem = document.createElement('li');
        const input = document.createElement('input');
        const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

        //insertamos clases, estilos, etc
        input.type = "checkbox";
        input.checked = todo.done;
        if(todo.category == "home"){
            content.classList.add('home-todo')
        }else if(todo.category == "business"){
            content.classList.add('business-todo')
        }else{
            content.classList.add('studies-todo')
        }

        actions.classList.add('actions');

        //Contenido
        content.innerHTML = `<input type="text" value="${todo.newTask}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(input);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);

        input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			displayTasks()
            
		})

        edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				newTask.content = e.target.value;
                input.setAttribute('readonly', true);
				localStorage.setItem('todos', JSON.stringify(todos));
				displayTasks();
			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			displayTasks();
		})

    });
}