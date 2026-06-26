# Task Management CLI Tool 📝

A pure backend Command Line Interface (CLI) application built from scratch using Node.js. This application allows users to perform full CRUD operations (Create, Read, Update, Delete) on tasks directly inside their terminal, persisting data locally via a JSON file.

This project was built to master the foundational mechanics of backend JavaScript, handling synchronous/asynchronous workflows, local file-system manipulation, and processing stream-based terminal user inputs without relying on a web browser or external npm packages.

## 🚀 Features

* **Create (Add Task):** Interactively prompt user inputs to create a task with an auto-incrementing unique ID and standard incomplete state (`[ ]`).
* **Read (View Tasks):** Reads, parses, and formats the raw JSON payload into a clean, human-readable layout displaying task IDs, completion status flags, and descriptions.
* **Update (Toggle Status):** Evaluates targeted IDs to toggle the current binary completion state of a task (`[ ]` ⇄ `[X]`).
* **Delete (Remove Task):** Utilizes array filtering routines to safely purge specific entries by ID and update the data layer.
* **State Persistence:** Automatically creates, maintains, and updates a localized `tasks.json` payload acting as a local document database.

## 🧠 What I Learned (Backend Foundations)

* **Node.js Core Modules:** Hands-on integration of the built-in `fs` (File System) module for real-time file input/output manipulations, and the `path` module for platform-agnostic absolute file mapping.
* **Streams & User Interfaces:** Leveraging the built-in `readline` module to spin up a continuous interactive runtime context (`process.stdin` / `process.stdout`) to capture and parse terminal flags and keyboard strings.
* **Serialization & Parsing:** Practical experience handling data serialization states using `JSON.stringify()` (with neat multi-space indentation formatting) and structural rebuilding via `JSON.parse()`.
* **State & Array Manipulation:** Applied JavaScript logic primitives including `.forEach()` for data rendering workflows, `.find()` for target mapping, and `.filter()` or `.some()` for array purging and defensive checking.

## 🛠️ Project Structure

```text
task-management-cli-tool/
├── index.js          # Main application engine & CRUD controllers
├── package.json      # Node.js project manifest configurations
├── .gitignore        # Keeps the local database (tasks.json) out of version control
└── README.md         # Documentation and project analysis