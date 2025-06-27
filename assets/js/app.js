// ===== FLOW APP - SIMPLIFIED VERSION =====
// Academic project inspired by Todoist
// Meeting all RA requirements with minimal complexity

// ===== APP CONFIGURATION =====
const APP_CONFIG = {
  API_BASE_URL: "http://localhost:3001",
  STORAGE_KEYS: {
    TASKS: "flow_tasks",
    USER_PREFERENCES: "flow_preferences",
  },
  REGEX_PATTERNS: {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    DATE: /^\d{4}-\d{2}-\d{2}$/,
  },
};

// ===== GLOBAL STATE =====
let appState = {
  tasks: [],
  currentSection: "home",
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
        <div class="d-flex justify-content-between align-items-center">
          <span>${utils.sanitizeHTML(message)}</span>
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
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

// ===== API FUNCTIONS (RA5 - ID 27, ID 28) =====
const api = {
  // Generic fetch with error handling
  async request(url, options = {}) {
    try {
      const response = await fetch(APP_CONFIG.API_BASE_URL + url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  },

  // Tasks CRUD operations
  tasks: {
    // Get all tasks (RA5 - ID 28)
    getAll: () => api.request("/tasks"),

    // Get task by ID
    getById: (id) => api.request(`/tasks/${id}`),

    // Create new task (RA5 - ID 27)
    create: (task) =>
      api.request("/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      }),

    // Update task
    update: (id, task) =>
      api.request(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
      }),

    // Delete task
    delete: (id) =>
      api.request(`/tasks/${id}`, {
        method: "DELETE",
      }),
  },
};

// ===== TASK MANAGEMENT =====
const taskManager = {
  // Load tasks from API with localStorage fallback
  async loadTasks() {
    try {
      // Show loading state
      $("#tasks-container").html(`
        <div class="loading-state text-center">
          <div class="loading-spinner"></div>
          <p class="loading-text">Carregando tarefas...</p>
        </div>
      `);

      // Try to load from API first
      appState.tasks = await api.tasks.getAll();

      // Save to localStorage as backup
      storage.save(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);
    } catch (error) {
      console.error("Failed to load from API, using localStorage:", error);

      // Fallback to localStorage
      appState.tasks = storage.load(APP_CONFIG.STORAGE_KEYS.TASKS, []);
    }

    this.renderTasks();
    this.updateStats();
  },

  // Create new task
  async createTask(taskData) {
    try {
      const newTask = {
        ...taskData,
        id: utils.generateId(),
        status: "pending",
      };

      // Try to save to API
      try {
        const savedTask = await api.tasks.create(newTask);
        appState.tasks.push(savedTask);
      } catch (apiError) {
        console.error("API save failed, saving locally:", apiError);
        appState.tasks.push(newTask);
      }

      // Always save to localStorage
      storage.save(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);

      this.renderTasks();
      this.updateStats();

      return newTask;
    } catch (error) {
      console.error("Error creating task:", error);

      throw error;
    }
  },

  // Update task
  async updateTask(taskId, updates) {
    try {
      const taskIndex = appState.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) {
        throw new Error("Task not found");
      }

      const updatedTask = { ...appState.tasks[taskIndex], ...updates };

      // Try to update via API
      try {
        await api.tasks.update(taskId, updatedTask);
      } catch (apiError) {
        console.error("API update failed, updating locally:", apiError);
      }

      // Update local state
      appState.tasks[taskIndex] = updatedTask;
      storage.save(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);

      this.renderTasks();
      this.updateStats();

      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);

      throw error;
    }
  },

  // Delete task
  async deleteTask(taskId) {
    try {
      // Try to delete via API
      try {
        await api.tasks.delete(taskId);
      } catch (apiError) {
        console.error("API delete failed, deleting locally:", apiError);
        utils.showNotification(
          "Exclusão salva localmente (API indisponível)",
          "warning",
        );
      }

      // Remove from local state
      appState.tasks = appState.tasks.filter((task) => task.id !== taskId);
      storage.save(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);

      this.renderTasks();
      this.updateStats();
    } catch (error) {
      console.error("Error deleting task:", error);

      throw error;
    }
  },

  // Toggle task completion
  async toggleTask(taskId) {
    const task = appState.tasks.find((task) => task.id === taskId);
    if (!task) return;

    const updates = {
      status: task.status === "completed" ? "pending" : "completed",
    };

    await this.updateTask(taskId, updates);
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

// ===== NAVIGATION =====
const navigation = {
  // Initialize navigation
  init() {
    // Handle navigation clicks
    $(document).on("click", "[data-section]", function (e) {
      e.preventDefault();
      const section = $(this).data("section");
      navigation.showSection(section);
    });

    // Handle navbar link clicks
    $(document).on("click", ".nav-link[data-section]", function (e) {
      e.preventDefault();
      const section = $(this).data("section");
      navigation.showSection(section);

      // Update active nav link
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
    });
  },

  // Show specific section
  showSection(sectionName) {
    // Hide all sections
    $(".content-section").removeClass("active");

    // Show target section
    $(`#${sectionName}`).addClass("active");

    // Update state
    appState.currentSection = sectionName;

    // Load tasks if showing tasks section
    if (sectionName === "tasks") {
      taskManager.loadTasks();
    }

    // Update URL hash without triggering scroll
    history.replaceState(null, null, `#${sectionName}`);
  },
};

// ===== QUICK ACTIONS =====
function markAllCompleted() {
  if (confirm("Marcar todas as tarefas pendentes como concluídas?")) {
    const pendingTasks = appState.tasks.filter(
      (task) => task.status === "pending",
    );

    Promise.all(
      pendingTasks.map((task) =>
        taskManager.updateTask(task.id, {
          status: "completed",
        }),
      ),
    )
      .then(() => {})
      .catch(() => {});
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
    Promise.all(completedTasks.map((task) => taskManager.deleteTask(task.id)))
      .then(() => {})
      .catch(() => {});
  }
}

// ===== MAIN APPLICATION (RA4 - ID 23) =====
$(document).ready(function () {
  console.log("Flow App - Simplified Version Loaded");

  // Initialize navigation
  navigation.init();

  // Initialize form masks using jQuery Mask Plugin (RA4 - ID 24)
  $(".phone-mask").mask("(00) 00000-0000", {
    placeholder: "(11) 99999-9999",
  });

  // Initialize form validation with real-time feedback
  $(document).on("input blur", "input, textarea, select", function () {
    const errors = validation.validateField(this);
    validation.showFieldFeedback(this, errors);
  });

  // Handle task form submission
  $("#task-form").on("submit", async function (e) {
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

      reminder: formData.get("reminder") === "on",
    };

    try {
      // Show loading state on submit button
      const $submitBtn = $(this).find('button[type="submit"]');
      const originalText = $submitBtn.html();
      $submitBtn
        .html('<i class="fas fa-spinner fa-spin button-icon"></i>Salvando...')
        .prop("disabled", true);

      await taskManager.createTask(taskData);

      // Reset form and close modal
      this.reset();
      $(".form-control, .form-select").removeClass("is-valid is-invalid");
      $(".form-feedback").text("");
      $("#taskModal").modal("hide");

      // Restore button
      $submitBtn.html(originalText).prop("disabled", false);
    } catch (error) {
      // Restore button on error
      const $submitBtn = $(this).find('button[type="submit"]');
      $submitBtn
        .html('<i class="fas fa-save button-icon"></i>Salvar Tarefa')
        .prop("disabled", false);
    }
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

  // Load initial section based on URL hash
  const initialSection = window.location.hash.replace("#", "") || "home";
  navigation.showSection(initialSection);

  // Update active nav link
  $(`.nav-link[data-section="${initialSection}"]`).addClass("active");

  // Load tasks from localStorage on startup
  appState.tasks = storage.load(APP_CONFIG.STORAGE_KEYS.TASKS, []);
  taskManager.updateStats();

  // Show welcome message
  setTimeout(() => {}, 1000);

  // Handle browser back/forward
  $(window).on("popstate", function () {
    const section = window.location.hash.replace("#", "") || "home";
    navigation.showSection(section);
  });

  // Auto-save user preferences
  $(window).on("beforeunload", function () {
    storage.save(APP_CONFIG.STORAGE_KEYS.USER_PREFERENCES, {
      currentSection: appState.currentSection,
      filters: appState.filters,
    });
  });

  // Load user preferences
  const preferences = storage.load(APP_CONFIG.STORAGE_KEYS.USER_PREFERENCES);
  if (preferences) {
    appState.filters = { ...appState.filters, ...preferences.filters };

    // Apply saved filters
    $(`input[name="statusFilter"][value="${appState.filters.status}"]`).prop(
      "checked",
      true,
    );
    $("#priority-filter").val(appState.filters.priority);
    $("#task-search").val(appState.filters.search);
  }
});

// ===== EXPORT FOR GLOBAL ACCESS =====
window.taskManager = taskManager;
window.markAllCompleted = markAllCompleted;
window.deleteCompleted = deleteCompleted;
window.loadTasks = () => taskManager.loadTasks();
