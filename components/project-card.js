import { LitElement, html, css } from "https://cdn.skypack.dev/lit";

/**
 * ProjectCard Web Component
 * Componente reutilizável para exibir um projeto
 * Implementa ID 25 - Utiliza bibliotecas de web components (Lit)
 */
class ProjectCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .project-card {
      background: var(--secondary-bg, #ffffff);
      border: 1px solid var(--border-color, rgba(37, 34, 30, 0.18));
      border-radius: var(--radius-lg, 0.75rem);
      padding: var(--spacing-lg, 1.5rem);
      height: 100%;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
      position: relative;
      overflow: hidden;
    }

    .project-card:hover {
      box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
      transform: translateY(-2px);
    }

    .project-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--project-color, #3498db);
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .project-info {
      flex: 1;
    }

    .project-color-indicator {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--project-color, #3498db);
      margin-right: 0.75rem;
      flex-shrink: 0;
    }

    .project-title-row {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary, rgb(37, 34, 30));
    }

    .project-description {
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }

    .project-actions {
      display: flex;
      gap: 0.25rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .project-card:hover .project-actions {
      opacity: 1;
    }

    .action-btn {
      background: none;
      border: 1px solid var(--border-color, rgba(37, 34, 30, 0.18));
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
      padding: 0.375rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-btn:hover {
      background: var(--primary-bg, rgb(254, 253, 252));
      color: var(--text-primary, rgb(37, 34, 30));
    }

    .action-btn.primary:hover {
      background: var(--info-blue, rgb(15, 102, 174));
      color: white;
      border-color: var(--info-blue, rgb(15, 102, 174));
    }

    .action-btn.danger:hover {
      background: var(--priority-high, #e74c3c);
      color: white;
      border-color: var(--priority-high, #e74c3c);
    }

    .project-stats {
      margin: 1rem 0;
    }

    .stats-header {
      display: flex;
      justify-content: between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .stats-label {
      font-size: 0.875rem;
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
    }

    .stats-value {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary, rgb(37, 34, 30));
    }

    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: var(--primary-bg, rgb(254, 253, 252));
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.75rem;
    }

    .progress-bar {
      height: 100%;
      background: var(--project-color, #3498db);
      transition: width 0.3s ease;
      border-radius: 4px;
    }

    .task-breakdown {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
    }

    .task-breakdown-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .status-dot.pending {
      background: var(--info-blue, rgb(15, 102, 174));
    }

    .status-dot.in-progress {
      background: var(--warning-orange, rgb(199, 123, 0));
    }

    .status-dot.completed {
      background: var(--success-green, rgb(76, 122, 69));
    }

    .project-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      color: var(--text-tertiary, rgba(37, 34, 30, 0.49));
      margin-bottom: 1rem;
    }

    .created-date {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .project-actions-bottom {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }

    .primary-btn {
      background: var(--project-color, #3498db);
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .primary-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .secondary-btn {
      background: none;
      border: 2px solid var(--project-color, #3498db);
      color: var(--project-color, #3498db);
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .secondary-btn:hover {
      background: var(--project-color, #3498db);
      color: white;
    }

    .empty-state {
      text-align: center;
      padding: 2rem 1rem;
      color: var(--text-secondary, rgba(37, 34, 30, 0.66));
    }

    .empty-state i {
      font-size: 2rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .project-actions {
        opacity: 1;
      }

      .project-actions-bottom {
        flex-direction: column;
      }

      .secondary-btn {
        width: 100%;
        height: auto;
        padding: 0.5rem 1rem;
      }
    }
  `;

  static properties = {
    project: { type: Object },
    tasks: { type: Array },
    compact: { type: Boolean },
    interactive: { type: Boolean },
  };

  constructor() {
    super();
    this.project = {};
    this.tasks = [];
    this.compact = false;
    this.interactive = true;
  }

  updated() {
    // Update CSS custom property for project color
    if (this.project.color) {
      this.style.setProperty("--project-color", this.project.color);
    }
  }

  render() {
    if (!this.project || !this.project.id) {
      return html`
        <div class="project-card">
          <div class="empty-state">
            <i class="fas fa-folder-open"></i>
            <p>Projeto não encontrado</p>
          </div>
        </div>
      `;
    }

    const projectTasks = this.tasks.filter(
      (task) => task.projectId === this.project.id,
    );
    const completedTasks = projectTasks.filter(
      (task) => task.status === "completed",
    );
    const inProgressTasks = projectTasks.filter(
      (task) => task.status === "in_progress",
    );
    const pendingTasks = projectTasks.filter(
      (task) => task.status === "pending",
    );

    const progress =
      projectTasks.length > 0
        ? (completedTasks.length / projectTasks.length) * 100
        : 0;

    return html`
      <div class="project-card ${this.compact ? "compact" : ""}">
        <div class="project-header">
          <div class="project-info">
            <div class="project-title-row">
              <div class="project-color-indicator"></div>
              <h3 class="project-title">${this.project.name}</h3>
            </div>
            ${this.project.description && !this.compact
              ? html`
                  <p class="project-description">${this.project.description}</p>
                `
              : ""}
          </div>

          ${this.interactive
            ? html`
                <div class="project-actions">
                  <button
                    class="action-btn primary"
                    @click="${this.editProject}"
                    title="Editar projeto"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="action-btn"
                    @click="${this.duplicateProject}"
                    title="Duplicar projeto"
                  >
                    <i class="fas fa-copy"></i>
                  </button>
                  <button
                    class="action-btn danger"
                    @click="${this.deleteProject}"
                    title="Excluir projeto"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              `
            : ""}
        </div>

        ${!this.compact
          ? html`
              <div class="project-meta">
                <div class="created-date">
                  <i class="fas fa-calendar-plus"></i>
                  Criado ${this.formatCreatedDate()}
                </div>
                <div class="task-count">
                  ${projectTasks.length}
                  ${projectTasks.length === 1 ? "tarefa" : "tarefas"}
                </div>
              </div>

              <div class="project-stats">
                <div class="stats-header">
                  <span class="stats-label">Progresso</span>
                  <span class="stats-value"
                    >${completedTasks.length}/${projectTasks.length}</span
                  >
                </div>

                <div class="progress-bar-container">
                  <div class="progress-bar" style="width: ${progress}%"></div>
                </div>

                ${projectTasks.length > 0
                  ? html`
                      <div class="task-breakdown">
                        ${pendingTasks.length > 0
                          ? html`
                              <div class="task-breakdown-item">
                                <span class="status-dot pending"></span>
                                ${pendingTasks.length}
                                pendente${pendingTasks.length !== 1 ? "s" : ""}
                              </div>
                            `
                          : ""}
                        ${inProgressTasks.length > 0
                          ? html`
                              <div class="task-breakdown-item">
                                <span class="status-dot in-progress"></span>
                                ${inProgressTasks.length} em andamento
                              </div>
                            `
                          : ""}
                        ${completedTasks.length > 0
                          ? html`
                              <div class="task-breakdown-item">
                                <span class="status-dot completed"></span>
                                ${completedTasks.length}
                                concluída${completedTasks.length !== 1
                                  ? "s"
                                  : ""}
                              </div>
                            `
                          : ""}
                      </div>
                    `
                  : html`
                      <div class="task-breakdown">
                        <span style="color: var(--text-tertiary);"
                          >Nenhuma tarefa criada</span
                        >
                      </div>
                    `}
              </div>

              <div class="project-actions-bottom">
                <button class="primary-btn" @click="${this.viewTasks}">
                  <i class="fas fa-eye"></i>
                  Ver Tarefas
                </button>
                <button
                  class="secondary-btn"
                  @click="${this.addTask}"
                  title="Adicionar tarefa"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            `
          : html`
              <div class="project-actions-bottom">
                <button class="primary-btn" @click="${this.viewTasks}">
                  ${projectTasks.length}
                  ${projectTasks.length === 1 ? "tarefa" : "tarefas"}
                </button>
              </div>
            `}
      </div>
    `;
  }

  formatCreatedDate() {
    if (!this.project.createdAt) return "";

    const createdDate = new Date(this.project.createdAt);
    const now = new Date();
    const diffTime = now - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "hoje";
    if (diffDays === 1) return "ontem";
    if (diffDays < 30) return `há ${diffDays} dias`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `há ${months} ${months === 1 ? "mês" : "meses"}`;
    }

    return createdDate.toLocaleDateString("pt-BR");
  }

  viewTasks() {
    this.dispatchEvent(
      new CustomEvent("project-view-tasks", {
        detail: { projectId: this.project.id },
        bubbles: true,
      }),
    );
  }

  addTask() {
    this.dispatchEvent(
      new CustomEvent("project-add-task", {
        detail: { projectId: this.project.id },
        bubbles: true,
      }),
    );
  }

  editProject() {
    this.dispatchEvent(
      new CustomEvent("project-edit", {
        detail: { projectId: this.project.id },
        bubbles: true,
      }),
    );
  }

  duplicateProject() {
    this.dispatchEvent(
      new CustomEvent("project-duplicate", {
        detail: { projectId: this.project.id },
        bubbles: true,
      }),
    );
  }

  deleteProject() {
    this.dispatchEvent(
      new CustomEvent("project-delete", {
        detail: { projectId: this.project.id },
        bubbles: true,
      }),
    );
  }
}

customElements.define("project-card", ProjectCard);

export { ProjectCard };
