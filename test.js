const addTaskBtn = document.getElementById('addTask');
const taskNameInput = document.getElementById('taskName');
const assignedToInput = document.getElementById('assignedTo');
const categoriesSelect = document.getElementById('categories');
const taskDateInput = document.getElementById('taskDate');
const recordsDisplay = document.getElementById('records');

let taskArray = [];
let edit_id = null;

let objStr = localStorage.getItem('tasks');

if (objStr != null) {
    taskArray = JSON.parse(objStr);
}

DisplayTasks();

addTaskBtn.onclick = () => {
    const taskName = taskNameInput.value;
    const assignedTo = assignedToInput.value;
    const categories = categoriesSelect.value;
    const taskDate = taskDateInput.value;

    if (edit_id !== null) {
        taskArray.splice(edit_id, 1, {
            'taskName': taskName,
            'assignedTo': assignedTo,
            'categories': categories,
            'taskDate': taskDate,
            'status': 'Incomplete' 
        });
        edit_id = null;
    } else {
        taskArray.push({
            'taskName': taskName,
            'assignedTo': assignedTo,
            'categories': categories,
            'taskDate': taskDate,
            'status': 'Incomplete'
        });
    }

    SaveTasks(taskArray);

    taskNameInput.value = '';
    assignedToInput.value = '';
    categoriesSelect.value = 'Work';
    taskDateInput.value = '';
    addTaskBtn.innerText = 'Add Task';
};

function SaveTasks(taskArray) {
    let str = JSON.stringify(taskArray);
    localStorage.setItem('tasks', str);
    DisplayTasks();
}
function DisplayTasks(tasksToShow) {
    let statement = '';

    const tasksToDisplay = tasksToShow || taskArray;

    tasksToDisplay.forEach((task, i) => {
        statement += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${task.taskName}</td>
            <td>${task.assignedTo}</td>
            <td>${task.categories}</td>
            <td>${task.taskDate}</td>
            <td>${task.status}</td>
            <td>
                <i class="fa fa-check btn text-white btn mx-2 bg-success" id="completeTaskbtn"
                onclick='CompleteTask(${i})'></i>
                <i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditTask(${i})'></i>
                <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteTask(${i})'></i>
            </td>
        </tr>`;
    });

    recordsDisplay.innerHTML = statement;
}



function EditTask(id) {
    edit_id = id;
    const task = taskArray[id];
    taskNameInput.value = task.taskName;
    assignedToInput.value = task.assignedTo;
    categoriesSelect.value = task.categories;
    taskDateInput.value = task.taskDate;
    addTaskBtn.innerText = 'Save Changes';
}

function DeleteTask(id) {
    taskArray.splice(id, 1);
    SaveTasks(taskArray);
}

function CompleteTask(id) {
    const taskRow = recordsDisplay.querySelector(`tr:nth-child(${id + 1})`);
    if (taskArray[id].status === 'Incomplete') {
        taskArray[id].status = 'Complete';
        taskRow.style.textDecoration = 'line-through';
    } else {
        taskArray[id].status = 'Incomplete';
        taskRow.style.textDecoration = 'none';
    }
    SaveTasks(taskArray);

    const CompleteTaskbtn = document.getElementById("completeTaskbtn");

    CompleteTaskbtn.disabled = true;
    
}


const allTr = document.querySelectorAll('#records tr');
const searchInputField = document.querySelector('#search');
searchInputField.addEventListener('input', function (e) {
    const searchStr = e.target.value.toLowerCase();
    recordsDisplay.innerHTML = '';
    allTr.forEach(tr => {
        const td_in_tr = tr.querySelectorAll('td');
        if (td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1 || td_in_tr[1].innerText.toLowerCase().indexOf(searchStr) > -1 || td_in_tr[2].innerText.toLowerCase().indexOf(searchStr) > -1 || td_in_tr[3].innerText.toLowerCase().indexOf(searchStr) > -1) {
            recordsDisplay.appendChild(tr);
        }
    });

    if (recordsDisplay.innerHTML == '') {
        recordsDisplay.innerHTML = ' No Records Found';
    }
});



// ... (Your existing code)

const filterOption = document.getElementById('filterOption');
filterOption.addEventListener('change', function () {
    const selectedOption = filterOption.value;
    let filteredTasks = [];

    if (selectedOption === 'all') {
        filteredTasks = taskArray;
    } else if (selectedOption === 'complete' || selectedOption === 'incomplete') {
        filteredTasks = taskArray.filter(task => task.status.toLowerCase() === selectedOption.toLowerCase());
    } else {
        filteredTasks = taskArray.filter(task => task.categories.toLowerCase() === selectedOption.toLowerCase());
    }
    console.log(filteredTasks);
    DisplayTasks(filteredTasks);
});


const sortTaskBtn = document.getElementById('sortTask');
sortTaskBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => a.taskName.localeCompare(b.taskName));
    DisplayTasks();
});

const sortAssignedToBtn = document.getElementById('sortAssignedTo');
sortAssignedToBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => a.assignedTo.localeCompare(b.assignedTo));
    DisplayTasks();
});

const sortCategoriesBtn = document.getElementById('sortCategories');
sortCategoriesBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => a.categories.localeCompare(b.categories));
    DisplayTasks();
});

const sortDateBtn = document.getElementById('sortDate');
sortDateBtn.addEventListener('click', () => {
    taskArray.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
    DisplayTasks();
});





