// 🔑 Unique Secret Key Logic
if (!localStorage.getItem("userSecretKey")) {
  localStorage.setItem(
    "userSecretKey",
    "user-" + Math.random().toString(36).slice(2, 11),
  );
}
const SECRET = localStorage.getItem("userSecretKey");
const API_URL = "https://cloud-task-manager-1519.onrender.com/api/tasks";

// Function to get URL with Secret Key
const getUrl = () => `${API_URL}?secret=${SECRET}`;

async function fetchTasks() {
  try {
    const res = await fetch(getUrl());
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    const clearBtn = document.getElementById("clearAllBtn");
    list.innerHTML = "";

    if (Array.isArray(tasks)) {
      if (clearBtn)
        clearBtn.style.display = tasks.length > 0 ? "block" : "none";
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="${task.completed ? "completed" : ""}" onclick="toggleTask('${task._id}')">${task.title}</span>
          <button onclick="deleteTask('${task._id}')" class="delete-btn">✕</button>
        `;
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;
  await fetch(getUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
  });
  input.value = "";
  fetchTasks();
}

async function deleteTask(id) {
  if (confirm("Delete this?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  }
}

async function toggleTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "PATCH" });
  fetchTasks();
}

async function clearAllTasks() {
  if (confirm("Clear all your tasks?")) {
    await fetch(getUrl(), { method: "DELETE" });
    fetchTasks();
  }
}

// Theme & Enter Key Logic
function toggleTheme() {
  const html = document.documentElement;
  const theme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

document.getElementById("taskInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

fetchTasks();
