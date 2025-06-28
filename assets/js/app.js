// ===== FLOW APP - SIMPLIFIED VERSION =====
// Academic project inspired by Todoist
// Meeting all RA requirements with minimal complexity

// ===== APP CONFIGURATION =====
const APP_CONFIG = {
  STORAGE_KEYS: {
    TASKS: "flow_tasks",
  },
  REGEX_PATTERNS: {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    DATE: /^\d{4}-\d{2}-\d{2}$/,
  },
};

// ===== GLOBAL STATE =====
let appState = {
  tasks: [],
  filters: {
    status: "all",
    priority: "all",
    search: "",
  },
};

// ===== UTILITY FUNCTIONS =====
const utils = {
  // Generate unique ID
  generateId: () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2),

  // Format date to Brazilian format
  formatDate: (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  },

  // Get relative time description
  getRelativeTime: (dateString) => {
    if (!dateString) return "";

    const now = new Date();
    const date = new Date(dateString);
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
    if (diffDays === -1) return "Ontem";
    if (diffDays > 1) return `Em ${diffDays} dias`;
    if (diffDays < -1) return `${Math.abs(diffDays)} dias atrás`;

    return utils.formatDate(dateString);
  },

  // Check if date is overdue
  isOverdue: (dateString) => {
    if (!dateString) return false;
    const now = new Date();
    const date = new Date(dateString);
    return date < now;
  },

  // Sanitize HTML to prevent XSS
  sanitizeHTML: (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  // Show notification with animation (RA1 - ID 05)
  showNotification: (message, type = "info") => {
    const notification = $(`
      <div class="alert alert-${type} alert-dismissible fade show position-fixed animate__animated animate__fadeInRight"
           style="top: 100px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;">
        <span>${utils.sanitizeHTML(message)}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `);

    $("body").append(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.addClass("animate__fadeOutRight");
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

// ===== WEB STORAGE FUNCTIONS (RA2 - ID 15) =====
const storage = {
  // Save data to localStorage
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  },

  // Load data from localStorage
  load: (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return defaultValue;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },
};

// ===== FORM VALIDATION (RA2 - ID 12, ID 13) =====
const validation = {
  // Validation rules using regex (RA2 - ID 13)
  rules: {
    required: (value) => value.trim() !== "",
    email: (value) => APP_CONFIG.REGEX_PATTERNS.EMAIL.test(value),
    minLength: (value, min) => value.length >= min,
    maxLength: (value, max) => value.length <= max,
    date: (value) =>
      APP_CONFIG.REGEX_PATTERNS.DATE.test(value) && !isNaN(Date.parse(value)),
  },

  // Error messages
  messages: {
    required: "Este campo é obrigatório",
    email: "Por favor, insira um email válido",
    minLength: (min) => `Mínimo de ${min} caracteres`,
    maxLength: (max) => `Máximo de ${max} caracteres`,
    date: "Por favor, insira uma data válida",
  },

  // Validate individual field
  validateField: (field) => {
    const $field = $(field);
    const value = $field.val().trim();
    const isRequired = $field.prop("required");
    const maxLength = $field.attr("maxlength");
    const minLength = $field.attr("minlength");
    const type = $field.attr("type");

    const errors = [];

    // Check required
    if (isRequired && !validation.rules.required(value)) {
      errors.push(validation.messages.required);
    }

    // Only validate other rules if field has value
    if (value) {
      // Check email
      if (type === "email" && !validation.rules.email(value)) {
        errors.push(validation.messages.email);
      }

      // Check date
      if (type === "date" && !validation.rules.date(value)) {
        errors.push(validation.messages.date);
      }

      // Check length constraints
      if (
        minLength &&
        !validation.rules.minLength(value, parseInt(minLength))
      ) {
        errors.push(validation.messages.minLength(minLength));
      }

      if (
        maxLength &&
        !validation.rules.maxLength(value, parseInt(maxLength))
      ) {
        errors.push(validation.messages.maxLength(maxLength));
      }
    }

    return errors;
  },

  // Show field validation feedback
  showFieldFeedback: (field, errors) => {
    const $field = $(field);
    const $feedback = $field.siblings(".form-feedback");

    // Clear previous states
    $field.removeClass("is-invalid is-valid");
    $feedback.text("");

    if (errors.length > 0) {
      $field.addClass("is-invalid");
      $feedback.text(errors[0]);
    } else if ($field.val().trim() !== "") {
      $field.addClass("is-valid");
    }
  },

  // Validate entire form
  validateForm: (form) => {
    const $form = $(form);
    let isValid = true;

    // Validate all required fields and fields with validation attributes
    $form.find("input, textarea, select").each(function () {
      const errors = validation.validateField(this);
      validation.showFieldFeedback(this, errors);

      if (errors.length > 0) {
        isValid = false;
      }
    });

    return isValid;
  },
};

// ===== TASK MANAGEMENT =====
const taskManager = {
  // Load tasks from localStorage
  loadTasks() {
    appState.tasks = storage.load(APP_CONFIG.STORAGE_KEYS.TASKS, []);
    this.renderTasks();
    this.updateStats();
  },

  // Create new task
  createTask(taskData) {
    const newTask = {
      ...taskData,
      id: utils.generateId(),
      status: "pending",
    };

    appState.tasks.push(newTask);
    storage.save(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);

    this.renderTasks();
    this.updateStats();

    return newTask;
  },

  // Update task
  updateTask(taskId, updates) {
    const taskIndex = appState.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.error("Task not found");
      return;
    }

    const updatedTask = { ...appState.tasks[taskIndex], ...updates };
    appState.tasks[taskIndex] = updatedTask;
    storage.save(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);

    this.renderTasks();
    this.updateStats();

    return updatedTask;
  },

  // Delete task
  deleteTask(taskId) {
    appState.tasks = appState.tasks.filter((task) => task.id !== taskId);
    storage.save(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);

    this.renderTasks();
    this.updateStats();
  },

  // Toggle task completion
  toggleTask(taskId) {
    const task = appState.tasks.find((task) => task.id === taskId);
    if (!task) return;

    const updates = {
      status: task.status === "completed" ? "pending" : "completed",
    };

    this.updateTask(taskId, updates);
  },

  // Filter tasks based on current filters
  getFilteredTasks() {
    let filtered = [...appState.tasks];

    // Filter by status
    if (appState.filters.status !== "all") {
      filtered = filtered.filter(
        (task) => task.status === appState.filters.status,
      );
    }

    // Filter by priority
    if (appState.filters.priority !== "all") {
      filtered = filtered.filter(
        (task) => task.priority === appState.filters.priority,
      );
    }

    // Filter by search term
    if (appState.filters.search) {
      const searchTerm = appState.filters.search.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm) ||
          task.category.toLowerCase().includes(searchTerm),
      );
    }

    return filtered;
  },

  // Render tasks list
  renderTasks() {
    const filteredTasks = this.getFilteredTasks();
    const $container = $("#tasks-container");

    if (filteredTasks.length === 0) {
      $container.html(`
        <div class="text-center py-5">
          <i class="fas fa-tasks" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h4 class="text-muted">Nenhuma tarefa encontrada</h4>
          <p class="text-muted">
            ${
              appState.tasks.length === 0
                ? "Comece criando sua primeira tarefa!"
                : "Tente ajustar os filtros de busca."
            }
          </p>
          <button class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#taskModal">
            <i class="fas fa-plus button-icon"></i>
            Criar Primeira Tarefa
          </button>
        </div>
      `);
      return;
    }

    const tasksHTML = filteredTasks
      .map((task) => this.renderTaskCard(task))
      .join("");
    $container.html(tasksHTML);
  },

  // Render individual task card
  renderTaskCard(task) {
    const isOverdue =
      task.status !== "completed" &&
      task.dueDate &&
      utils.isOverdue(task.dueDate);
    const priorityBadge = `badge-${task.priority}`;
    const statusBadge = `badge-${task.status}`;

    return `
      <div class="task-card animate__animated animate__fadeIn" data-task-id="${task.id}">
        <div class="task-header">
          <h4 class="task-title ${task.status === "completed" ? "completed" : ""}">${utils.sanitizeHTML(task.title)}</h4>
          <div class="task-actions">
            <button class="task-action-btn" onclick="taskManager.toggleTask('${task.id}')" title="Alternar status">
              <i class="fas ${task.status === "completed" ? "fa-undo" : "fa-check"}"></i>
            </button>
            <button class="task-action-btn danger" onclick="taskManager.deleteTask('${task.id}')" title="Excluir">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        ${task.description ? `<p class="task-description">${utils.sanitizeHTML(task.description)}</p>` : ""}

        <div class="task-meta">
          <div class="task-badges">
            <span class="task-badge ${priorityBadge}">${this.getPriorityLabel(task.priority)}</span>
            <span class="task-badge ${statusBadge}">${this.getStatusLabel(task.status)}</span>
            ${task.category ? `<span class="task-badge badge-category">${utils.sanitizeHTML(task.category)}</span>` : ""}
          </div>

          ${
            task.dueDate
              ? `
            <div class="task-due-date ${isOverdue ? "overdue" : ""}">
              <i class="fas fa-calendar-alt"></i>
              ${utils.getRelativeTime(task.dueDate)}
            </div>
          `
              : ""
          }
        </div>

        <div class="task-completion">
          <button class="completion-btn ${task.status === "completed" ? "completed" : ""}"
                  onclick="taskManager.toggleTask('${task.id}')">
            <i class="fas ${task.status === "completed" ? "fa-check-circle" : "fa-circle"}"></i>
            ${task.status === "completed" ? "Marcar como pendente" : "Marcar como concluída"}
          </button>
        </div>
      </div>
    `;
  },

  // Get priority label
  getPriorityLabel(priority) {
    const labels = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
    };
    return labels[priority] || priority;
  },

  // Get status label
  getStatusLabel(status) {
    const labels = {
      pending: "Pendente",
      completed: "Concluída",
    };
    return labels[status] || status;
  },

  // Update statistics
  updateStats() {
    const total = appState.tasks.length;
    const pending = appState.tasks.filter(
      (task) => task.status === "pending",
    ).length;
    const completed = appState.tasks.filter(
      (task) => task.status === "completed",
    ).length;

    $("#stat-total").text(total);
    $("#stat-pending").text(pending);
    $("#stat-completed").text(completed);
  },
};

// ===== QUICK ACTIONS =====
function markAllCompleted() {
  if (confirm("Marcar todas as tarefas pendentes como concluídas?")) {
    const pendingTasks = appState.tasks.filter(
      (task) => task.status === "pending",
    );

    pendingTasks.forEach((task) =>
      taskManager.updateTask(task.id, {
        status: "completed",
      }),
    );
  }
}

function deleteCompleted() {
  const completedTasks = appState.tasks.filter(
    (task) => task.status === "completed",
  );

  if (completedTasks.length === 0) {
    return;
  }

  if (
    confirm(
      `Excluir ${completedTasks.length} tarefa(s) concluída(s)? Esta ação não pode ser desfeita.`,
    )
  ) {
    completedTasks.forEach((task) => taskManager.deleteTask(task.id));
  }
}

// ===== MAIN APPLICATION (RA4 - ID 23) =====
$(document).ready(function () {
  // Initialize form validation with real-time feedback
  $(document).on("input blur", "input, textarea, select", function () {
    const errors = validation.validateField(this);
    validation.showFieldFeedback(this, errors);
  });

  // Handle task form submission
  $("#task-form").on("submit", function (e) {
    e.preventDefault();

    if (!validation.validateForm(this)) {
      return;
    }

    // Get form data
    const formData = new FormData(this);
    const taskData = {
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate"),
      category: formData.get("category"),
    };

    taskManager.createTask(taskData);

    // Reset form and close modal
    this.reset();
    $(".form-control, .form-select").removeClass("is-valid is-invalid");
    $(".form-feedback").text("");
    $("#taskModal").modal("hide");
  });

  // Handle filter changes
  $('input[name="statusFilter"]').on("change", function () {
    appState.filters.status = $(this).val();
    taskManager.renderTasks();
  });

  $("#priority-filter").on("change", function () {
    appState.filters.priority = $(this).val();
    taskManager.renderTasks();
  });

  // Handle search with debouncing for performance
  const searchHandler = utils.debounce(function () {
    appState.filters.search = $("#task-search").val().trim();
    taskManager.renderTasks();
  }, 300);

  $("#task-search").on("input", searchHandler);

  // Load tasks on startup
  taskManager.loadTasks();
});

// ===== EXPORT FOR GLOBAL ACCESS =====
window.taskManager = taskManager;
window.markAllCompleted = markAllCompleted;
window.deleteCompleted = deleteCompleted;
