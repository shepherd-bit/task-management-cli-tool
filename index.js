const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'tasks.json');

function readTasks() {
    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }
    
    const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
    
    return JSON.parse(fileData);
}

function saveTasks(tasksArray) {

    const fileData = JSON.stringify(tasksArray, null, 2);
    
    fs.writeFileSync(FILE_PATH, fileData);
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// The main menu loop
function showMenu() {
    console.log("\n--- TASK MANAGER ---");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Toggle Task Status");
    console.log("4. Delete Task");
    console.log("5. Exit");
    
    
    rl.question("\nChoose an option (1-5): ", (choice) => {
        if (choice === '1') {

    rl.question("\nEnter task description: ", (taskTitle) => {
        const currentTasks = readTasks();
        
        const newTask = {
            id: currentTasks.length > 0 ? currentTasks[currentTasks.length - 1].id + 1 : 1, // Auto-increment ID
            title: taskTitle,
            completed: false
        };
        
        currentTasks.push(newTask);
        
        saveTasks(currentTasks);
        
        console.log(`\nSuccess: Task "${taskTitle}" added with ID: ${newTask.id}!`);
        
        showMenu();
    });
} else if (choice === '2') {
    const currentTasks = readTasks();
    
    console.log("\n=== YOUR TASK LIST ===");
    
    if (currentTasks.length === 0) {
        console.log("No tasks found. Try adding one first!");
    } else {
        currentTasks.forEach(task => {
            const statusIcon = task.completed ? "[X]" : "[ ]";
            console.log(`${task.id}. ${statusIcon} ${task.title}`);
        });
    }
    console.log("=======================");
    
    showMenu(); 
        } else if (choice === '3') {

    rl.question("\nEnter the ID of the task to toggle: ", (targetId) => {
        const currentTasks = readTasks();

        const idNumber = parseInt(targetId);

        const task = currentTasks.find(t => t.id === idNumber);
        
        if (task) {
            task.completed = !task.completed;
            
            saveTasks(currentTasks);
            console.log(`\nSuccess: Task "${task.title}" updated to ${task.completed ? "COMPLETED [X]" : "INCOMPLETE [ ]"}!`);
        } else {
            console.log("\nError: Task ID not found.");
        }
        
        showMenu();
    });} else if (choice === '4') {

    rl.question("\nEnter the ID of the task to delete: ", (targetId) => {
        const currentTasks = readTasks();
        const idNumber = parseInt(targetId);
        
        const taskExists = currentTasks.some(t => t.id === idNumber);
        
        if (taskExists) {
            const updatedTasks = currentTasks.filter(t => t.id !== idNumber);
            
            saveTasks(updatedTasks);
            console.log(`\nSuccess: Task with ID ${idNumber} has been permanently deleted.`);
        } else {
            console.log("\nError: Task ID not found.");
        }
        
        showMenu();
    });} else if (choice === '5') {
            console.log("\nGoodbye!");
            rl.close(); 
        } else {
            console.log("\nInvalid choice! Please pick a number from 1 to 5.");
            showMenu(); 
        }
    });
}

// Start the application menu
showMenu();