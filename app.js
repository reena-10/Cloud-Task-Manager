const API_URL = "http://localhost:3000/api/tasks";

// 1. Dark Mode Persistence
function toggleTheme() {
  const html = document.documentElement;
  const theme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// Set saved theme on load
document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("theme") || "light",
);

// 2. Fetch and Display
async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  // Clear All Button Logic
  let clearBtn = document.getElementById("clearAllBtn");
  if (tasks.length > 0) {
    if (!clearBtn) {
      clearBtn = document.createElement("button");
      clearBtn.id = "clearAllBtn";
      clearBtn.className = "btn btn-clear";
      clearBtn.innerText = "Clear All Tasks";
      clearBtn.onclick = clearAllTasks;
      list.parentNode.appendChild(clearBtn);
    }
  } else if (clearBtn) {
    clearBtn.remove();
    list.innerHTML =
      "<p style='text-align:center; opacity:0.5'>No tasks yet.</p>";
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}" onclick="toggleTask('${task._id}')">
                ${task.title}
            </span>
            <button onclick="deleteTask('${task._id}')" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
        `;
    list.appendChild(li);
  });
}

// 3. CRUD Operations
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

async function deleteTask(id) {
  if (confirm("Delete this task?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  }
}

async function clearAllTasks() {
  if (confirm("Are you sure you want to clear all the tasks?")) {
    await fetch(API_URL, { method: "DELETE" });
    fetchTasks();
  }
}

async function toggleTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "PATCH" });
  fetchTasks();
}

fetchTasks();
