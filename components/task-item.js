import { LitElement, html, css } from "https://cdn.skypack.dev/lit";

/**
 * TaskItem Web Component
 * Componente reutilizável para exibir uma tarefa individual
 * Implementa ID 25 - Utiliza bibliotecas de web components (Lit)
 */
class TaskItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    .task-card {
      background: var(--secondary-bg, #ffffff);
      border: 1px solid var(--border-color, rgba(37, 34, 30, 0.18));
      border-radius: var(--radius-lg, 0.75rem);
      padding: var(--spacing-lg, 1.5rem);
      transition: all 0.3s ease;
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
    }

    .task-card:hover {
      box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
      transform: translateY(-2px);
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }

    .task-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary, rgb(37, 34, 30));
      flex: 1;
    }

    .task-title.completed {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .task-actions {
      display: flex;
      gap: 0.25rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .task-card:hover .task-actions {
      opacity: 1;
    }

    .action-btn {
      background: none;
      border: 1px solid var(--border-color, rgba(37, 34, 30, 0.18));
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      background: var(--primary-bg, rgb(254, 253, 252));
      color: var(--text-primary, rgb(37, 34, 30));
    }

    .action-btn.danger:hover {
      background: var(--priority-high, #e74c3c);
      color: white;
      border-color: var(--priority-high, #e74c3c);
    }

    .task-description {
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
      font-size: 0.9rem;
      margin: 0.5rem 0 1rem 0;
      line-height: 1.5;
    }

    .task-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .task-badges {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .badge {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-badge.high {
      background: rgba(231, 76, 60, 0.1);
      color: var(--priority-high, #e74c3c);
    }

    .priority-badge.medium {
      background: rgba(243, 156, 18, 0.1);
      color: var(--priority-medium, #f39c12);
    }

    .priority-badge.low {
      background: rgba(39, 174, 96, 0.1);
      color: var(--priority-low, #27ae60);
    }

    .status-badge.pending {
      background: rgba(52, 152, 219, 0.1);
      color: var(--info-blue, rgb(15, 102, 174));
    }

    .status-badge.in-progress {
      background: rgba(243, 156, 18, 0.1);
      color: var(--warning-orange, rgb(199, 123, 0));
    }

    .status-badge.completed {
      background: rgba(76, 122, 69, 0.1);
      color: var(--success-green, rgb(76, 122, 69));
    }

    .project-badge {
      background: var(--primary-bg, rgb(254, 253, 252));
      color: var(--text-primary, rgb(37, 34, 30));
      border: 1px solid var(--border-color, rgba(37, 34, 30, 0.18));
    }

    .task-due-date {
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .task-due-date.overdue {
      color: var(--priority-high, #e74c3c);
      font-weight: 600;
    }

    .task-tags {
      margin-top: 0.75rem;
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
    }

    .tag {
      background: var(--accent-bg, rgb(255, 246, 240));
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
      padding: 0.125rem 0.375rem;
      border-radius: 0.875rem;
      font-size: 0.75rem;
    }

    .task-completion {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color, rgba(37, 34, 30, 0.18));
    }

    .completion-btn {
      background: none;
      border: 2px solid var(--success-green, rgb(76, 122, 69));
      color: var(--success-green, rgb(76, 122, 69));
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .completion-btn:hover {
      background: var(--success-green, rgb(76, 122, 69));
      color: white;
    }

    .completion-btn.completed {
      background: var(--success-green, rgb(76, 122, 69));
      color: white;
    }

    .completion-btn.completed:hover {
      background: var(--text-secondary, rgba(37, 34, 30, 0.66));
      border-color: var(--text-secondary, rgba(37, 34, 30, 0.66));
    }

    @media (max-width: 768px) {
      .task-meta {
        flex-direction: column;
        align-items: flex-start;
      }

      .task-actions {
        opacity: 1;
      }

      .action-btn {
        padding: 0.375rem 0.75rem;
      }
    }
  `;

  static properties = {
    task: { type: Object },
    project: { type: Object },
    editable: { type: Boolean },
    compact: { type: Boolean },
  };

  constructor() {
    super();
    this.task = {};
    this.project = null;
    this.editable = true;
    this.compact = false;
  }

  render() {
    if (!this.task || !this.task.id) {
      return html`<div class="task-card">Tarefa não encontrada</div>`;
    }

    return html`
      <div class="task-card ${this.compact ? "compact" : ""}">
        <div class="task-header">
          <h4
            class="task-title ${this.task.status === "completed"
              ? "completed"
              : ""}"
          >
            ${this.task.title}
          </h4>
          ${this.editable ? this.renderActions() : ""}
        </div>

        ${this.task.description && !this.compact
          ? html` <p class="task-description">${this.task.description}</p> `
          : ""}

        <div class="task-meta">
          <div class="task-badges">
            <span class="badge priority-badge ${this.task.priority}">
              ${this.getPriorityLabel(this.task.priority)}
            </span>
            <span
              class="badge status-badge ${this.task.status.replace("_", "-")}"
            >
              ${this.getStatusLabel(this.task.status)}
            </span>
            ${this.project
              ? html`
                  <span class="badge project-badge">
                    ${this.project.name}
                  </span>
                `
              : ""}
          </div>

          ${this.task.dueDate
            ? html`
                <div class="task-due-date ${this.isOverdue() ? "overdue" : ""}">
                  <i class="fas fa-calendar-alt"></i>
                  ${this.formatDueDate()}
                </div>
              `
            : ""}
        </div>

        ${this.task.tags && this.task.tags.length > 0 && !this.compact
          ? html`
              <div class="task-tags">
                ${this.task.tags.map(
                  (tag) => html` <span class="tag">#${tag}</span> `,
                )}
              </div>
            `
          : ""}
        ${!this.compact
          ? html`
              <div class="task-completion">
                <button
                  class="completion-btn ${this.task.status === "completed"
                    ? "completed"
                    : ""}"
                  @click="${this.toggleCompletion}"
                >
                  <i
                    class="fas ${this.task.status === "completed"
                      ? "fa-check-circle"
                      : "fa-circle"}"
                  ></i>
                  ${this.task.status === "completed"
                    ? "Marcar como pendente"
                    : "Marcar como concluída"}
                </button>
              </div>
            `
          : ""}
      </div>
    `;
  }

  renderActions() {
    return html`
      <div class="task-actions">
        <button class="action-btn" @click="${this.editTask}" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
        <button
          class="action-btn danger"
          @click="${this.deleteTask}"
          title="Excluir"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }

  getPriorityLabel(priority) {
    const labels = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
    };
    return labels[priority] || priority;
  }

  getStatusLabel(status) {
    const labels = {
      pending: "Pendente",
      in_progress: "Em andamento",
      completed: "Concluída",
    };
    return labels[status] || status;
  }

  formatDueDate() {
    if (!this.task.dueDate) return "";

    const now = new Date();
    const dueDate = new Date(this.task.dueDate);
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
    if (diffDays === -1) return "Ontem";
    if (diffDays > 1) return `Em ${diffDays} dias`;
    if (diffDays < -1) return `${Math.abs(diffDays)} dias atrás`;

    return dueDate.toLocaleDateString("pt-BR");
  }

  isOverdue() {
    if (!this.task.dueDate || this.task.status === "completed") return false;

    const now = new Date();
    const dueDate = new Date(this.task.dueDate);
    return dueDate < now;
  }

  toggleCompletion() {
    const newStatus =
      this.task.status === "completed" ? "pending" : "completed";

    this.dispatchEvent(
      new CustomEvent("task-toggle", {
        detail: {
          taskId: this.task.id,
          newStatus: newStatus,
          completedAt:
            newStatus === "completed" ? new Date().toISOString() : null,
        },
        bubbles: true,
      }),
    );
  }

  editTask() {
    this.dispatchEvent(
      new CustomEvent("task-edit", {
        detail: { taskId: this.task.id },
        bubbles: true,
      }),
    );
  }

  deleteTask() {
    this.dispatchEvent(
      new CustomEvent("task-delete", {
        detail: { taskId: this.task.id },
        bubbles: true,
      }),
    );
  }
}

customElements.define("task-item", TaskItem);

export { TaskItem };
