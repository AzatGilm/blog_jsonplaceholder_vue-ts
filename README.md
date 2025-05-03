# Vue 3 Blog with JSONPlaceholder

[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-orange)](https://vitejs.dev/)

Проект представляет собой SPA-блог с постами из JSONPlaceholder API, реализованный на Vue 3 с TypeScript и архитектурой FSD.

## Основные возможности

- Просмотр списка постов с пагинацией
- Поиск по заголовку и содержимому постов
- Детальная страница поста
- Клиентская фильтрация и пагинация
-  Полная типизация
-  Кастомные стили без UI-библиотек

## Технологический стек

- **Frontend**: Vue 3 (Composition API), TypeScript
- **State Management**: Vuex
- **Routing**: Vue Router
- **Build Tool**: Vite
- **Architecture**: Feature-Sliced Design (FSD)
- **Styling**: Vanilla CSS



## Установка и запуск

```
Установить зависимости:

npm install
```
```
Запустить development сервер:

npm run dev
```
```
Собрать production версию:

npm run build
```

## Особенности реализации
```
Vuex Store
Централизованное управление состоянием

Строгая типизация всех модулей

Оптимизированные геттеры с параметрами

Полная обработка состояний загрузки и ошибок

Компоненты
Полностью на Composition API

Разделение логики и представления

Переиспользуемые UI-компоненты

Поиск и пагинация
Клиентская реализация поиска (из-за ограничений API)

Синхронизация пагинации с поиском
```
