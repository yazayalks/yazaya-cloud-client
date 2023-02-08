# yazaya-cloud-client

Разработка сайта для для облачного хранилища данных **yazaya-cloud**. Сайт располагается по
url [yazaya-cloud.ru](https://yazaya-cloud.ru).

# Описание

Сайт предназначен для отслеживания, добавления и удаления файлов, хранящихся на VPS (виртуальный частный сервер) по
url [yazaya.space](https://yazaya.space). Каждый пользователь должен зарегестрироваться на сайте, а затем подтвердить
адрес электронной почты, на который придёт ссылка активации.
* Данный проект выполнен с помощью языка программирования [JavaScript](https://www.javascript.com/)  и библиотеки
  создания пользовательских интерфейсов [React](https://reactjs.org/), на данный момент происходит процесс изменения
  языка программирования на [TypeScript](https://www.typescriptlang.org/)
* Использован инструмент для управления состоянием данных [Redux Toolkit](https://redux-toolkit.js.org)
* Для развёртывания проекта используется [Vercel](https://vercel.com/)
* Отправка заявки для связи осуществлена с помощью сервиса [EmailJS](https://www.emailjs.com/)

# Установка и запуск проекта

После клонирования репозитория необходимо выполнить установку пакетов, я использовал [npm](https://www.npmjs.com/)

```bash
npm install
```

Затем необходимо создать файл переменных окружения **.env.local** в корне проекта

```
REACT_APP_API_HOST = "url сервера>"
REACT_APP_SERVICE_ID = "<serviceID из сервиса EmailJS>"
REACT_APP_TEMPLATE_ID = "<templateID из сервиса EmailJS>"
REACT_APP_PUBLIC_KEY = "<publicKey из сервиса EmailJS>"
```

Подробнее с сервисом EmailJS Вы можете ознакомиться [здесь](https://www.emailjs.com/docs/sdk/send/).

Для сборки проекта используется:

```bash
npm run build
```

Для запуска проекта используется:
```bash
npm run start
```

Откройте [http://localhost:3000](http://localhost:3000)  в своём браузере для локального просмотра.
