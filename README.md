# Exercicio - Evolucao da Aula 4 com consumo de API

## Conteudo da aula
Promises, async/await, fetch, JSON, status codes e tratamento de erros

## Objetivo pratico
Evoluir a "Lista de estudos do dia" da Aula 4 para que a mesma lista tambem possa receber sugestoes vindas de uma API publica.

Endpoint base da parte nova:

```text
https://jsonplaceholder.typicode.com/todos
```

## O que o starter entrega
- HTML evoluido a partir da Aula 4
- CSS evoluido a partir da Aula 4
- codigo JavaScript da Aula 4 ja funcional
- seletores e utilitarios da Aula 5 ja preparados
- esqueleto da busca remota com `async function fetchSuggestions(...)`

## O que falta implementar
- o nucleo do `fetch`
- a validacao de `response.ok`
- a leitura de `response.json()`
- a transformacao da resposta remota em itens da lista
- o fechamento do fluxo de sucesso, empty e error

## Sugestao de ordem
1. Entender onde termina a Aula 4 no arquivo.
2. Ler os utilitarios novos da Aula 5 que ja ficaram prontos.
3. Completar `fetchSuggestions` com `async/await`.
4. Transformar a resposta da API em `items`.
5. Testar busca com e sem `userId`.

---
Disciplina: Aplicacoes Front-End | Aula 5 | 2026/1
