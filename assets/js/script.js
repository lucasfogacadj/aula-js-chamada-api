/*
Starter da Aula 5

Este arquivo ja parte do gabarito funcional da Aula 4.
Agora a tarefa e EVOLUIR a mesma aplicacao para receber itens da API.

O que ja esta pronto:
- formulario manual
- validacao
- array items
- renderizacao da lista
- remocao por delegacao

O que falta construir:
- formulario da API
- estados de loading, empty e error
- fetch + async/await
- leitura de JSON e status HTTP
*/

const items = [];
let nextId = 1;
const API_URL = "https://jsonplaceholder.typicode.com/todos";
let lastUserId = "";

const form = document.getElementById("study-form");
const input = document.getElementById("study-input");
const feedback = document.getElementById("feedback");

const apiForm = document.getElementById("api-form");
const apiUserIdInput = document.getElementById("api-user-id");
const apiFeedback = document.getElementById("api-feedback");
const statusMessage = document.getElementById("status-message");
const reloadButton = document.getElementById("reload-button");
const apiSubmitButton = apiForm.querySelector('button[type="submit"]');

const list = document.getElementById("study-list");
const emptyState = document.getElementById("empty-state");

// TODO Aula 5:
// 1. Completar o nucleo de fetchSuggestions(userId = "").
// 2. Fazer GET com fetch(url).
// 3. Validar response.ok e response.status.
// 4. Ler await response.json().
// 5. Converter os dados da API para o formato de items.
// 6. Reaproveitar renderList() para desenhar a mesma lista.

function setFeedback(message, type = "") {
  feedback.textContent = message;
  feedback.className = "feedback";

  if (type) {
    feedback.classList.add(`feedback--${type}`);
  }
}

function setApiFeedback(message, type = "") {
  apiFeedback.textContent = message;
  apiFeedback.className = "feedback";

  if (type) {
    apiFeedback.classList.add(`feedback--${type}`);
  }
}

function setStatus(message, type = "") {
  statusMessage.hidden = false;
  statusMessage.textContent = message;
  statusMessage.className = "status";

  if (type) {
    statusMessage.classList.add(`status--${type}`);
  }
}

function hideStatus() {
  statusMessage.hidden = true;
  statusMessage.textContent = "";
  statusMessage.className = "status";
}

function setApiLoading(isLoading) {
  apiSubmitButton.disabled = isLoading;
  reloadButton.disabled = isLoading;
  apiUserIdInput.disabled = isLoading;
  apiForm.setAttribute("aria-busy", String(isLoading));

  apiSubmitButton.textContent = isLoading ? "Buscando..." : "Buscar sugestoes";
  reloadButton.textContent = isLoading ? "Atualizando..." : "Recarregar ultima busca";
}

function validateTitle(title) {
  if (title.length === 0) {
    return "Digite uma atividade.";
  }

  if (title.length < 3) {
    return "Use pelo menos 3 caracteres.";
  }

  return "";
}

function createStudyItem(item) {
  const li = document.createElement("li");
  li.className = "study-item";
  li.dataset.id = String(item.id);

  const content = document.createElement("div");
  content.className = "study-item__content";

  const top = document.createElement("div");
  top.className = "study-item__top";

  const title = document.createElement("p");
  title.className = "study-item__title";
  title.textContent = item.title;

  const badge = document.createElement("span");
  badge.className = item.source === "api" ? "badge badge--api" : "badge badge--manual";
  badge.textContent = item.source === "api" ? "API" : "Manual";

  const meta = document.createElement("p");
  meta.className = "study-item__meta";

  if (item.source === "api") {
    const statusLabel = item.completed ? "concluida" : "pendente";
    meta.textContent = `Sugestao remota | userId ${item.userId} | ${statusLabel}`;
  } else {
    meta.textContent = "Item criado manualmente na interface.";
  }

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "btn btn--danger";
  removeButton.textContent = "Remover";
  removeButton.dataset.action = "remove";

  top.append(title, badge);
  content.append(top, meta);
  li.append(content, removeButton);

  return li;

}

function renderList() {
  list.replaceChildren();

  if (items.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  items.forEach((item) => {
    list.appendChild(createStudyItem(item));
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const title = input.value.trim();
  const errorMessage = validateTitle(title);

  if (errorMessage) {
    setFeedback(errorMessage, "error");
    return;
  }

  hideStatus();

  items.unshift({
    id: nextId,
    title,
    source: "manual",
  });

  nextId += 1;
  form.reset();
  input.focus();
  setFeedback("Item adicionado com sucesso.", "success");
  renderList();
}

function handleListClick(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const itemElement = button.closest(".study-item");

  if (!itemElement) {
    return;
  }

  const id = Number(itemElement.dataset.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  const removedTitle = items[index].title;
  items.splice(index, 1);
  setFeedback(`Item removido: ${removedTitle}.`, "success");
  renderList();
}

async function fetchSuggestions(userId = "") {
  const params = new URLSearchParams();
  params.set("_limit", "5");

  if (userId) {
    params.set("userId", userId);
  }

  const url = `${API_URL}?${params.toString()}`;

  setApiLoading(true);
  setApiFeedback("", "");
  setStatus("Carregando sugestoes da API...", "loading");

  try {
    // TODO 1:
    // Fazer a requisicao com:
    // const response = await fetch(url);

    const response = await fetch(url);



    // TODO 2:
    // Validar se a resposta foi OK.
    // Dica:
    // if (!response.ok) {
    //   throw new Error(`Falha HTTP: ${response.status}`);
    // }

    
    if(!response.ok) {
      throw new Error(`Falha HTTP: ${response.status}`);
    }


    // TODO 3:
    // Converter o corpo com:
    // const data = await response.json();

    const data = await response.json();


    // TODO 4:
    // Garantir que data seja um array antes de continuar.

    if(!Array.isArray(data)) {
      throw new Error("Resposta inesperada da API: esperado um array.");
    }

    // TODO 5:
    // Limpar os items atuais e transformar cada todo em:
    // {
    //   id: nextId,
    //   title: todo.title,
    //   source: "api",
    //   completed: todo.completed,
    //   userId: todo.userId,
    // }

    items.length = 0;



    // TODO 6:
    // Incrementar nextId a cada item, chamar renderList()
    // e tratar os casos de sucesso e lista vazia.

      data.forEach((todo) =>{
      items.push({
        id: nextId,
        title: todo.title,
        source: "api",
        completed: todo.completed,
        userId: todo.userId
      })
      nextId ++;
    })

    renderList();

    if(data.length === 0 )
    {
      setStatus("Complete os TODOs de fetchSuggestions para carregar a API.", "empty");
      setApiFeedback("Busca concluída, mas api nãor retornou itens", "warning");
      return
    }

    hideStatus();
    setApiFeedback(`${data.length} sugestões carregadas. Status ${response.status}.`, "sucess");
  
  } catch (error) {
    items.length = 0;
    renderList();
    setStatus("Nao foi possivel carregar sugestoes da API. Tente novamente.", "error");
    setApiFeedback(`Falha na requisicao: ${error.message}`, "error");
  } finally {
    setApiLoading(false);
  }
}

function handleApiSubmit(event) {
  event.preventDefault();
  lastUserId = apiUserIdInput.value.trim();
  fetchSuggestions(lastUserId);
}

form.addEventListener("submit", handleFormSubmit);
list.addEventListener("click", handleListClick);
apiForm.addEventListener("submit", handleApiSubmit);
reloadButton.addEventListener("click", () => {
  fetchSuggestions(lastUserId);
});

input.addEventListener("input", () => {
  if (feedback.classList.contains("feedback--error")) {
    setFeedback("");
  }
});

apiUserIdInput.addEventListener("input", () => {
  if (apiFeedback.classList.contains("feedback--error")) {
    setApiFeedback("");
  }
});

renderList();
