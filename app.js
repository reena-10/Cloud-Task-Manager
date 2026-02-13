const API_URL = "https://cloud-task-manager-1519.onrender.com/api/tasks";

// 1. Dark Mode
function toggleTheme() {
  const html = document.documentElement;
  const theme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// 2. Fetch and Display (No Token Needed)
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}" onclick="toggleTask('${task._id}')">
                    ${task.title}
                </span>
                <button onclick="deleteTask('${task._id}')" class="delete-btn">✕</button>
            `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

// 3. Add Task (Simple Post)
async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
  });
  input.value = "";
  fetchTasks();
}

// 4. Delete Task
async function deleteTask(id) {
  if (confirm("Delete this task?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  }
}

// Page load par tasks fetch karein
fetchTasks();
