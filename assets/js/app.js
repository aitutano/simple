// ===== FLOW APP - MAIN JAVASCRIPT =====

// App Configuration
const APP_CONFIG = {
  API_BASE_URL: "http://localhost:3001",
  STORAGE_KEYS: {
    TASKS: "flow_tasks",
    USER_PREFERENCES: "flow_preferences",
  },
  PRIORITY_LEVELS: {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
  },
  TASK_STATUS: {
    PENDING: "pending",
    COMPLETED: "completed",
  },
};

// Global App State
let appState = {
  tasks: [],
  currentUser: null,
  filters: {
    status: "all",
    priority: "all",
  },
  isOnline: navigator.onLine,
};

// ===== UTILITY FUNCTIONS =====
const utils = {
  // Generate unique ID
  generateId: () => Date.now() + Math.random().toString(36).substr(2, 9),

  // Format date
  formatDate: (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR");
  },

  // Get relative time
  getRelativeTime: (date) => {
    if (!date) return "";
    const now = new Date();
    const taskDate = new Date(date);
    const diffTime = taskDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
    if (diffDays === -1) return "Ontem";
    if (diffDays > 1) return `Em ${diffDays} dias`;
    if (diffDays < -1) return `${Math.abs(diffDays)} dias atrás`;

    return utils.formatDate(date);
  },

  // Validate email
  validateEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Sanitize HTML
  sanitizeHTML: (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  // Show notification
  showNotification: (message, type = "info") => {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText =
      "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <span>${message}</span>
        <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  },

  // Debounce function
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

// ===== LOCAL STORAGE MANAGER =====
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },
};

// ===== API MANAGER =====
const api = {
  // Base fetch function
  async request(endpoint, options = {}) {
    const url = `${APP_CONFIG.API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);

      // Fallback to localStorage if API is unavailable
      if (!appState.isOnline) {
        return this.fallbackToStorage(endpoint, options);
      }

      throw error;
    }
  },

  // Fallback to localStorage when offline
  fallbackToStorage(endpoint, options) {
    const method = options.method || "GET";
    const resource = endpoint.split("/")[1]; // Extract resource name

    switch (method) {
      case "GET":
        if (resource === "tasks") {
          return storage.get(APP_CONFIG.STORAGE_KEYS.TASKS, []);
        }
        return [];
      case "POST":
        if (resource === "tasks") {
          const data = JSON.parse(options.body);
          data.id = utils.generateId();
          const existing = storage.get(APP_CONFIG.STORAGE_KEYS.TASKS, []);
          existing.push(data);
          storage.set(APP_CONFIG.STORAGE_KEYS.TASKS, existing);
          return data;
        }
        return null;
      default:
        return null;
    }
  },

  // Tasks API
  tasks: {
    getAll: () => api.request("/tasks"),
    getById: (id) => api.request(`/tasks/${id}`),
    create: (task) =>
      api.request("/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      }),
    update: (id, task) =>
      api.request(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
      }),
    delete: (id) =>
      api.request(`/tasks/${id}`, {
        method: "DELETE",
      }),
  },
};

// ===== FORM VALIDATION =====
const validation = {
  rules: {
    required: (value) => value.trim() !== "",
    email: (value) => utils.validateEmail(value),
    minLength: (min) => (value) => value.length >= min,
    maxLength: (max) => (value) => value.length <= max,
    date: (value) => !isNaN(Date.parse(value)),
  },

  messages: {
    required: "Este campo é obrigatório",
    email: "Por favor, insira um email válido",
    minLength: (min) => `Mínimo de ${min} caracteres`,
    maxLength: (max) => `Máximo de ${max} caracteres`,
    date: "Por favor, insira uma data válida",
  },

  validateField(field, rules) {
    const value = field.value;
    const errors = [];

    for (const rule of rules) {
      const [ruleName, ruleParam] = rule.split(":");
      const validator = this.rules[ruleName];

      if (validator) {
        const isValid = ruleParam
          ? validator(ruleParam)(value)
          : validator(value);

        if (!isValid) {
          const message = ruleParam
            ? this.messages[ruleName](ruleParam)
            : this.messages[ruleName];
          errors.push(message);
        }
      }
    }

    return errors;
  },

  showFieldErrors(field, errors) {
    this.clearFieldErrors(field);

    if (errors.length > 0) {
      field.classList.add("is-invalid");

      const errorContainer = document.createElement("div");
      errorContainer.className = "form-error";
      errorContainer.textContent = errors[0];

      field.parentNode.appendChild(errorContainer);
    } else {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    }
  },

  clearFieldErrors(field) {
    field.classList.remove("is-invalid", "is-valid");
    const existingError = field.parentNode.querySelector(".form-error");
    if (existingError) {
      existingError.remove();
    }
  },

  validateForm(form) {
    const fields = form.querySelectorAll("[data-validation]");
    let isValid = true;

    fields.forEach((field) => {
      const rules = field.dataset.validation.split("|");
      const errors = this.validateField(field, rules);

      this.showFieldErrors(field, errors);

      if (errors.length > 0) {
        isValid = false;
      }
    });

    return isValid;
  },
};

// ===== TASK MANAGER =====
const taskManager = {
  async loadTasks() {
    try {
      appState.tasks = await api.tasks.getAll();
      this.renderTasks();
    } catch (error) {
      console.error("Error loading tasks:", error);
      // Fallback to localStorage
      appState.tasks = storage.get(APP_CONFIG.STORAGE_KEYS.TASKS, []);
      this.renderTasks();
    }
  },

  async createTask(taskData) {
    try {
      // Check for duplicate titles (simple protection)
      const existingTask = appState.tasks.find(
        (task) =>
          task.title.toLowerCase() === taskData.title.toLowerCase().trim(),
      );

      if (existingTask) {
        utils.showNotification(
          "Já existe uma tarefa com este título",
          "warning",
        );
        return;
      }

      const newTask = {
        ...taskData,
        id: utils.generateId(),
        createdAt: new Date().toISOString(),
        status: APP_CONFIG.TASK_STATUS.PENDING,
      };

      const createdTask = await api.tasks.create(newTask);
      appState.tasks.push(createdTask);

      // Save to localStorage as backup
      storage.set(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);

      this.renderTasks();
      utils.showNotification("Tarefa criada com sucesso!", "success");

      return createdTask;
    } catch (error) {
      console.error("Error creating task:", error);
      utils.showNotification("Erro ao criar tarefa", "danger");
      throw error;
    }
  },

  async updateTask(taskId, updates) {
    try {
      const updatedTask = await api.tasks.update(taskId, updates);
      const taskIndex = appState.tasks.findIndex(
        (task) => String(task.id) === String(taskId),
      );

      if (taskIndex !== -1) {
        appState.tasks[taskIndex] = updatedTask;
        storage.set(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);
        this.renderTasks();
        utils.showNotification("Tarefa atualizada com sucesso!", "success");
      }

      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      // Fallback: Try to update in localStorage if API fails
      const taskIndex = appState.tasks.findIndex(
        (task) => String(task.id) === String(taskId),
      );
      if (taskIndex !== -1) {
        appState.tasks[taskIndex] = {
          ...appState.tasks[taskIndex],
          ...updates,
        };
        storage.set(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);
        this.renderTasks();
        utils.showNotification("Tarefa atualizada (modo offline)!", "warning");
      }
    }
  },

  async deleteTask(taskId) {
    try {
      await api.tasks.delete(taskId);
      appState.tasks = appState.tasks.filter(
        (task) => String(task.id) !== String(taskId),
      );

      storage.set(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);
      this.renderTasks();
      utils.showNotification("Tarefa excluída com sucesso!", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      // Fallback: Try to delete from localStorage if API fails
      appState.tasks = appState.tasks.filter(
        (task) => String(task.id) !== String(taskId),
      );
      storage.set(APP_CONFIG.STORAGE_KEYS.TASKS, appState.tasks);
      this.renderTasks();
      utils.showNotification("Tarefa excluída (modo offline)!", "warning");
    }
  },

  filterTasks() {
    return appState.tasks.filter((task) => {
      const statusMatch =
        appState.filters.status === "all" ||
        task.status === appState.filters.status;
      const priorityMatch =
        appState.filters.priority === "all" ||
        task.priority === appState.filters.priority;

      return statusMatch && priorityMatch;
    });
  },

  renderTasks() {
    const tasksContainer = document.getElementById("tasks-container");
    if (!tasksContainer) return;

    const filteredTasks = this.filterTasks();

    if (filteredTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="text-center py-5">
          <picture class="image-container">
            <source
              media="(max-width: 576px)"
              srcset="assets/images/no-tasks.svg"
              type="image/svg+xml">
            <source
              media="(min-width: 577px)"
              srcset="assets/images/no-tasks.svg"
              type="image/svg+xml">
            <img
              src="assets/images/no-tasks.svg"
              alt="Ilustração de uma prancheta vazia representando nenhuma tarefa encontrada"
              class="task-illustration mb-3"
              loading="lazy"
              width="400"
              height="300">
          </picture>
          <h3 class="text-muted">Nenhuma tarefa encontrada</h3>
          <p class="text-muted">Crie sua primeira tarefa para começar!</p>
        </div>
      `;
      return;
    }

    tasksContainer.innerHTML = filteredTasks
      .map((task) => this.renderTaskCard(task))
      .join("");
  },

  renderTaskCard(task) {
    return `
      <div class="task-card fade-in" data-task-id="${task.id}">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h4 class="task-title mb-0">${utils.sanitizeHTML(task.title)}</h4>
          <div class="task-actions">
            <button class="btn btn-sm btn-outline-danger" onclick="taskManager.confirmDeleteTask('${task.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        ${task.description ? `<p class="task-description">${utils.sanitizeHTML(task.description)}</p>` : ""}

        <div class="task-meta">
          <div class="d-flex gap-2 flex-wrap">
            <span class="priority-badge priority-${task.priority}">${this.getPriorityLabel(task.priority)}</span>
            <span class="status-badge status-${task.status.replace("_", "-")}">${this.getStatusLabel(task.status)}</span>
          </div>

          ${
            task.dueDate
              ? `
            <div class="text-muted small">
              <i class="fas fa-calendar-alt me-1"></i>
              ${utils.getRelativeTime(task.dueDate)}
            </div>
          `
              : ""
          }
        </div>

        ${
          task.tags && task.tags.length > 0
            ? `
          <div class="task-tags mt-2">
            ${task.tags.map((tag) => `<span class="badge bg-secondary me-1">#${tag}</span>`).join("")}
          </div>
        `
            : ""
        }

        <div class="task-completion-toggle mt-3">
          <button class="btn btn-sm ${task.status === "completed" ? "btn-success" : "btn-outline-success"}"
                  onclick="taskManager.toggleTaskCompletion('${task.id}')">
            <i class="fas ${task.status === "completed" ? "fa-check-circle" : "fa-circle"} me-1"></i>
            ${task.status === "completed" ? "Concluída" : "Marcar como concluída"}
          </button>
        </div>
      </div>
    `;
  },

  getPriorityLabel(priority) {
    const labels = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
    };
    return labels[priority] || priority;
  },

  getStatusLabel(status) {
    const labels = {
      pending: "Pendente",
      completed: "Concluída",
    };
    return labels[status] || status;
  },

  async toggleTaskCompletion(taskId) {
    const task = appState.tasks.find((t) => String(t.id) === String(taskId));
    if (!task) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";
    const updates = {
      ...task,
      status: newStatus,
      completedAt: newStatus === "completed" ? new Date().toISOString() : null,
    };

    await this.updateTask(taskId, updates);
  },

  confirmDeleteTask(taskId) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      this.deleteTask(taskId);
    }
  },
};

// ===== APP INITIALIZATION =====
const app = {
  async init() {
    console.log("Initializing Flow App...");

    // Check user session
    this.checkUserSession();

    // Check online status
    this.setupOnlineStatusHandlers();

    // Load initial data
    await this.loadInitialData();

    // Setup event listeners
    this.setupEventListeners();

    // Setup form validation
    this.setupFormValidation();

    // Setup jQuery plugins
    this.setupjQueryPlugins();

    // Setup modal reset
    this.setupModalHandlers();

    console.log("Flow App initialized successfully!");
  },

  checkUserSession() {
    const user = storage.get("flow_user");
    const session = storage.get("flow_session");

    if (user && session) {
      // Check if session is still valid
      const sessionExpiry = new Date(session.expires);
      const now = new Date();

      if (sessionExpiry > now) {
        appState.currentUser = user;
        this.updateUserInterface(user);
      } else {
        // Session expired
        this.logout();
      }
    }
  },

  updateUserInterface(user) {
    // Update navigation to show logged-in user
    const userDropdown = document.querySelector(
      ".dropdown .nav-link.dropdown-toggle",
    );
    if (userDropdown) {
      userDropdown.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}" class="rounded-circle me-2" width="32" height="32">
        <span>${user.name}</span>
      `;
    }

    // Update dropdown menu
    const dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      dropdownMenu.innerHTML = `
        <li>
          <div class="dropdown-header">
            <strong>${user.name}</strong>
            <br><small class="text-muted">${user.email}</small>
          </div>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" href="#" onclick="app.showProfile()">
            <i class="fas fa-user me-2"></i>Meu Perfil
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#" onclick="app.showSettings()">
            <i class="fas fa-cog me-2"></i>Configurações
          </a>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" href="#" onclick="app.logout()">
            <i class="fas fa-sign-out-alt me-2"></i>Sair
          </a>
        </li>
      `;
    }
  },

  logout() {
    // Clear user session
    storage.remove("flow_user");
    storage.remove("flow_session");
    storage.remove("flow_remember");

    // Reset app state
    appState.currentUser = null;

    // Show notification
    utils.showNotification("Logout realizado com sucesso!", "success");

    // Redirect to login
    setTimeout(() => {
      window.location.href = "pages/login.html";
    }, 1000);
  },

  showProfile() {
    utils.showNotification(
      "Perfil do usuário será implementado em breve!",
      "info",
    );
  },

  showSettings() {
    utils.showNotification(
      "Configurações serão implementadas em breve!",
      "info",
    );
  },

  async loadInitialData() {
    try {
      // Load tasks
      await taskManager.loadTasks();

      // Load user preferences
      const preferences = storage.get(
        APP_CONFIG.STORAGE_KEYS.USER_PREFERENCES,
        {},
      );
      this.applyUserPreferences(preferences);
    } catch (error) {
      console.error("Error loading initial data:", error);
      // Load from localStorage as fallback
      appState.tasks = storage.get(APP_CONFIG.STORAGE_KEYS.TASKS, []);
      taskManager.renderTasks();
    }
  },

  setupOnlineStatusHandlers() {
    window.addEventListener("online", () => {
      appState.isOnline = true;
      utils.showNotification("Conexão restaurada!", "success");
      this.syncOfflineData();
    });

    window.addEventListener("offline", () => {
      appState.isOnline = false;
      utils.showNotification(
        "Você está offline. Os dados serão salvos localmente.",
        "warning",
      );
    });
  },

  async syncOfflineData() {
    // Sync localStorage data with API when back online
    try {
      const localTasks = storage.get(APP_CONFIG.STORAGE_KEYS.TASKS, []);
      const localProjects = storage.get(APP_CONFIG.STORAGE_KEYS.PROJECTS, []);

      // This would implement proper sync logic
      console.log("Syncing offline data...");
    } catch (error) {
      console.error("Error syncing offline data:", error);
    }
  },

  setupEventListeners() {
    // Navigation
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        this.handleNavigation(e);
      }
    });

    // Filter changes
    const filterElements = document.querySelectorAll("[data-filter]");
    filterElements.forEach((element) => {
      element.addEventListener("change", this.handleFilterChange.bind(this));
    });

    // Search
    const searchInput = document.getElementById("task-search");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        utils.debounce(this.handleSearch.bind(this), 300),
      );
    }
  },

  setupFormValidation() {
    const forms = document.querySelectorAll("form[data-validate]");

    forms.forEach((form) => {
      // Real-time validation
      const fields = form.querySelectorAll("[data-validation]");
      fields.forEach((field) => {
        field.addEventListener("blur", () => {
          const rules = field.dataset.validation.split("|");
          const errors = validation.validateField(field, rules);
          validation.showFieldErrors(field, errors);
        });

        field.addEventListener("input", () => {
          validation.clearFieldErrors(field);
        });
      });

      // Form submission
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (validation.validateForm(form)) {
          this.handleFormSubmission(form);
        }
      });
    });
  },

  setupjQueryPlugins() {
    // Setup jQuery Mask Plugin for phone inputs
    if (typeof $ !== "undefined" && $.fn.mask) {
      $(".phone-mask").mask("(00) 00000-0000");
      $(".date-mask").mask("00/00/0000");
      $(".time-mask").mask("00:00");
    }
  },

  setupModalHandlers() {
    const modal = document.getElementById("newTaskModal");
    if (modal) {
      modal.addEventListener("hidden.bs.modal", () => {
        const form = document.getElementById("task-form");
        const modalTitle = modal.querySelector(".modal-title");
        const submitButton = modal.querySelector("button[type='submit']");

        // Reset form
        form.reset();

        // Clear validation states
        form.querySelectorAll(".is-invalid, .is-valid").forEach((field) => {
          field.classList.remove("is-invalid", "is-valid");
        });

        form.querySelectorAll(".form-error").forEach((error) => {
          error.remove();
        });

        // Reset modal
        modalTitle.innerHTML = '<i class="fas fa-plus me-2"></i>Nova Tarefa';
        submitButton.innerHTML =
          '<i class="fas fa-save me-1"></i>Salvar Tarefa';
      });
    }
  },

  handleNavigation(e) {
    e.preventDefault();
    const targetPage = e.target.getAttribute("href");

    // Simple SPA navigation
    if (targetPage && targetPage !== "#") {
      window.location.href = targetPage;
    }
  },

  handleFilterChange(e) {
    const filterType = e.target.dataset.filter;
    const filterValue = e.target.value;

    appState.filters[filterType] = filterValue;
    taskManager.renderTasks();
  },

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm) {
      const filteredTasks = appState.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm),
      );

      // Render filtered tasks
      const tasksContainer = document.getElementById("tasks-container");
      if (tasksContainer) {
        tasksContainer.innerHTML = filteredTasks
          .map((task) => taskManager.renderTaskCard(task))
          .join("");
      }
    } else {
      taskManager.renderTasks();
    }
  },

  async handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      if (form.id === "task-form") {
        // Process tags
        if (data.tags) {
          data.tags = data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);
        }

        // Create new task
        await taskManager.createTask(data);
        form.reset();
      } else if (form.id === "project-form") {
        // Handle project creation
        console.log("Creating project:", data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  },

  applyUserPreferences(preferences) {
    // Apply other preferences
    console.log("Applied user preferences:", preferences);
  },
};

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  utils.showNotification("Ocorreu um erro inesperado", "danger");
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  utils.showNotification("Erro de conexão ou processamento", "warning");
});

// Export for use in other files
window.Flow = {
  utils,
  storage,
  api,
  validation,
  taskManager,
  app,
  appState,
};
