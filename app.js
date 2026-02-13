const API_URL = "https://cloud-task-manager-1519.onrender.com/api/tasks";

async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    const clearBtn = document.getElementById("clearAllBtn"); // Clear button ko pakda
    list.innerHTML = "";

    if (Array.isArray(tasks)) {
      // --- STEP 3: Button Logic ---
      // Agar tasks hain toh button dikhao, nahi toh chhupa do
      if (clearBtn) {
        clearBtn.style.display = tasks.length > 0 ? "block" : "none";
      }

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

// Clear All Tasks Function
async function clearAllTasks() {
  if (confirm("Are you sure you want to delete ALL tasks?")) {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("All tasks cleared");
        fetchTasks();
      } else {
        alert("Failed to clear tasks");
      }
    } catch (err) {
      console.error("Error clearing tasks:", err);
    }
  }
}

// Enter key support
document.getElementById("taskInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

fetchTasks();
