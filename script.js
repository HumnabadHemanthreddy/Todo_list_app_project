let tasks = [];

function getRandomColor() {
  const hues = [30, 60, 120, 180, 210, 240, 300];
  const hue = hues[Math.floor(Math.random() * hues.length)];
  return `hsl(${hue}, 70%, 90%)`;
}

function formatTaskText(task) {
  return `${task.time ? `[${task.time}] ` : ""}${task.title}: ${task.text}`;
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty">No tasks yet</li>';
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.textContent = formatTaskText(task);
    li.style.backgroundColor = task.color || getRandomColor();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-button";
    deleteBtn.onclick = () => {
      tasks = tasks.filter((_, i) => i !== index);
      renderTasks();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const titleInput = document.getElementById("taskTitle");
  const textInput = document.getElementById("taskInput");
  const timeInput = document.getElementById("taskTime");

  const title = titleInput.value.trim();
  const text = textInput.value.trim();
  const time = timeInput.value;

  if (!title || !text) return;

  tasks.push({ title, text, time, color: getRandomColor() });

  titleInput.value = "";
  textInput.value = "";
  timeInput.value = "";
  renderTasks();
}

window.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  const titleInput = document.getElementById("taskTitle");
  const textInput = document.getElementById("taskInput");
  const timeInput = document.getElementById("taskTime");

  const submit = () => addTask();

  [titleInput, textInput, timeInput].forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    });
  });

  document.getElementById("addTaskBtn").addEventListener("click", submit);

  const themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      document.body.classList.remove("dark-mode");
      themeToggle.textContent = "🌙";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
    localStorage.setItem("theme", theme);
  }

  themeToggle.addEventListener("click", () => {
    const current = localStorage.getItem("theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});
