const fs = require('fs');
const path = require('path');

// Defining file path
const FILE_PATH = path.join(__dirname, 'tasks.json');

// 1. READ FUNCTION: Gets tasks from the JSON file
function readTasks() {
    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }
    
    const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
    
    return JSON.parse(fileData);
}

// 2. SAVE FUNCTION: Saves the tasks array back to the JSON file
function saveTasks(tasksArray) {
    // Convert the JavaScript array into nicely formatted text (JSON)
    const fileData = JSON.stringify(tasksArray, null, 2);
    
    // Write that text directly to our tasks.json file
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
    // Ask the user what task they want to add
    rl.question("\nEnter task description: ", (taskTitle) => {
        // 1. Read the existing tasks from our file
        const currentTasks = readTasks();
        
        // 2. Create a new task object
        const newTask = {
            id: currentTasks.length > 0 ? currentTasks[currentTasks.length - 1].id + 1 : 1, // Auto-increment ID
            title: taskTitle,
            completed: false
        };
        
        // 3. Add the new task to our array
        currentTasks.push(newTask);
        
        // 4. Save the updated array back to tasks.json
        saveTasks(currentTasks);
        
        console.log(`\nSuccess: Task "${taskTitle}" added with ID: ${newTask.id}!`);
        
        // Loop back to the main menu
        showMenu();
    });
} else if (choice === '2') {
    // 1. Grab the latest list of tasks
    const currentTasks = readTasks();
    
    console.log("\n=== YOUR TASK LIST ===");
    
    // 2. Check if there's nothing to display
    if (currentTasks.length === 0) {
        console.log("No tasks found. Try adding one first!");
    } else {
        // 3. Loop through and format each task
        currentTasks.forEach(task => {
            const statusIcon = task.completed ? "[X]" : "[ ]";
            console.log(`${task.id}. ${statusIcon} ${task.title}`);
        });
    }
    console.log("=======================");
    
    // Loop back to the main menu
    showMenu(); 
        } else if (choice === '3') {
    // 1. Ask the user which task they finished
    rl.question("\nEnter the ID of the task to toggle: ", (targetId) => {
        const currentTasks = readTasks();
        
        // Convert the input string into a number for matching IDs
        const idNumber = parseInt(targetId);
        
        // 2. Find the task in our list
        const task = currentTasks.find(t => t.id === idNumber);
        
        if (task) {
            // 3. Flip the status (true becomes false, false becomes true)
            task.completed = !task.completed;
            
            // 4. Save the updated list back to the file
            saveTasks(currentTasks);
            console.log(`\nSuccess: Task "${task.title}" updated to ${task.completed ? "COMPLETED [X]" : "INCOMPLETE [ ]"}!`);
        } else {
            console.log("\nError: Task ID not found.");
        }
        
        // Loop back to the main menu
        showMenu();
    });} else if (choice === '4') {
    // 1. Ask the user which task they want to destroy
    rl.question("\nEnter the ID of the task to delete: ", (targetId) => {
        const currentTasks = readTasks();
        const idNumber = parseInt(targetId);
        
        // 2. Check if the task actually exists before deleting
        const taskExists = currentTasks.some(t => t.id === idNumber);
        
        if (taskExists) {
            // 3. Filter out the task with the matching ID (creates a new array without it)
            const updatedTasks = currentTasks.filter(t => t.id !== idNumber);
            
            // 4. Save the updated list back to the file
            saveTasks(updatedTasks);
            console.log(`\nSuccess: Task with ID ${idNumber} has been permanently deleted.`);
        } else {
            console.log("\nError: Task ID not found.");
        }
        
        // Loop back to the main menu
        showMenu();
    });} else if (choice === '5') {
            console.log("\nGoodbye!");
            rl.close(); // Closes the terminal connection, ending the script
        } else {
            console.log("\nInvalid choice! Please pick a number from 1 to 5.");
            showMenu(); 
        }
    });
}

// Start the application menu
showMenu();