const API_URL = "https://cloud-task-manager-1519.onrender.com/api/tasks";

async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    // Array check taaki crash na ho
    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${task.title}</span>
          <button onclick="deleteTask('${task._id}')" class="delete-btn">✕</button>
        `;
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input.value }),
    });
    input.value = "";
    fetchTasks();
  } catch (err) {
    console.error("Error adding task:", err);
  }
}

async function deleteTask(id) {
  if (confirm("Delete this task?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  }
}

// Enter key support
document.getElementById("taskInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

fetchTasks();
