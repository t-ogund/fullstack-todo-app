const todoItem = document.querySelectorAll('.todo-item');
const deleteButton = document.querySelectorAll('.delete-button');
const activeButton = document.querySelector('#active-button');
const completedButton = document.querySelector('#completed-button');
const allButton = document.querySelector('#all-button');
const clearButton = document.querySelector('#clear-button');
const dayNightToggle = document.querySelector('#day-night-toggle');
const dayMode = document.querySelector('#day-mode');
const nightMode = document.querySelector('#night-mode');
const backgroundBanner = document.querySelector('.background-banner');
const html = document.querySelector('html');
const newTodo = document.querySelector('#new-todo');
const todoContainer = document.querySelectorAll('.todo-container');
const footer = document.querySelector("footer");
const itemsLeftCounter = document.querySelector('h6');
const buttonContainer = document.querySelector('#button-container');
const submit = document.querySelector('#submit');

dayNightToggle.addEventListener('click', () => {
    dayMode.classList.toggle('hide');
    nightMode.classList.toggle('show');
    fetch('/mode', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            mode: Array.from(dayMode.classList).includes('hide')
        })
    })
    if (Array.from(dayMode.classList).includes('hide')) {
        backgroundBanner.classList.remove('day-background-banner');
        backgroundBanner.classList.add('night-background-banner');
        html.style.backgroundColor = '#171823';
        newTodo.style.backgroundColor = '#25273D';
        buttonContainer.style.backgroundColor = '#25273D';
        submit.style.backgroundColor = '#25273D';
        todoContainer.forEach(todo => {
            todo.style.backgroundColor = '#25273D';
        })
        todoItem.forEach(todo => {
            todo.style.color = '#C8CBE7';
        })
        footer.style.backgroundColor = '#25273D';
        allButton.style.backgroundColor = '#25273D';
        activeButton.style.backgroundColor = '#25273D';
        completedButton.style.backgroundColor = '#25273D';
        clearButton.style.backgroundColor = '#25273D';
        allButton.style.color = '#C8CBE7';
        activeButton.style.color = '#C8CBE7';
        completedButton.style.color = '#C8CBE7';
        clearButton.style.color = '#C8CBE7';
        itemsLeftCounter.style.color = '#C8CBE7';
    } else {
        backgroundBanner.classList.add('day-background-banner');
        backgroundBanner.classList.remove('night-background-banner');
        html.style.backgroundColor = '#ffffff';
        newTodo.style.backgroundColor = '#ffffff';
        buttonContainer.style.backgroundColor = '#ffffff';
        submit.style.backgroundColor = '#ffffff';
        footer.style.backgroundColor = '#ffffff';
        allButton.style.backgroundColor = '#ffffff';
        activeButton.style.backgroundColor = '#ffffff';
        completedButton.style.backgroundColor = '#ffffff';
        clearButton.style.backgroundColor = '#ffffff';
        itemsLeftCounter.style.color = '#ffffff';
        allButton.style.color = '#000000';
        activeButton.style.color = '#000000';
        completedButton.style.color = '#000000';
        clearButton.style.color = '#000000';
        itemsLeftCounter.style.color = '#000000';
        todoContainer.forEach(todo => {
            todo.style.backgroundColor = '#ffffff';
        })
        todoItem.forEach(todo => {
            if (Array.from(todo.classList).includes('completed')) {
                todo.style.color = 'gray';
            } else {
                todo.style.color = '#000000';
            }
        })
    }
})

todoItem.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('completed')
        const classArray = Array.from(item.classList)
        const id = item.getAttribute('data-id');
        fetch('/completed-status', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                completed: classArray.includes('completed'),
                id
            })
        }).then(res => {
            if (res.ok) return res.json()
        }).then(() => {
            window.location.reload();
        })
    })
})

deleteButton.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        fetch('/delete', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id
            })
        }).then(res => {
            if (res.ok) return res.json()
        }).then(window.location.reload(true))
    })
})

activeButton.addEventListener('click', () => {
    allButton.classList.remove('highlight');
    completedButton.classList.remove('highlight');
    activeButton.classList.add('highlight');
    todoItem.forEach(item => {
        const classArray = Array.from(item.classList);
        if (classArray.includes('completed')) {
            item.classList.add('hide');
            item.parentElement.classList.add('hide')
        } else {
            item.classList.remove('hide');
            item.parentElement.classList.remove('hide')
        }
    })
})

completedButton.addEventListener('click', () => {
    activeButton.classList.remove('highlight');
    allButton.classList.remove('highlight');
    completedButton.classList.add('highlight');
    todoItem.forEach(item => {
        const classArray = Array.from(item.classList);
        if (classArray.includes('completed') === false) {
            item.classList.add('hide');
            item.parentElement.classList.add('hide')
        } else {
            item.classList.remove('hide');
            item.parentElement.classList.remove('hide')
        }
    })
})

allButton.addEventListener('click', () => {
    activeButton.classList.remove('highlight');
    completedButton.classList.remove('highlight');
    allButton.classList.add('highlight');
    todoItem.forEach(item => {
        const classArray = Array.from(item.classList);
        if (classArray.includes('hide')) {
            item.classList.remove('hide');
            item.parentElement.classList.remove('hide')
        }
    })
})

clearButton.addEventListener('click', () => {
    const completedIds = Array.from(todoItem).map(item => {
        const classArray = Array.from(item.classList)
        if (classArray.includes('completed')) {
            return item.getAttribute('data-id')
        }
    }).filter(item => item !== undefined)
  
    fetch('/clear-all', {
        headers: { "Content-Type": "application/json"},
        method: 'DELETE',
        body: JSON.stringify({
            completedIds
        })
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(
        window.location.reload(true)
    )
})