# HabitTracker
<img src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

## 💻 Projeto

#### Um habit tracker minimalista de uso pessoal, para criar, acompanhar e manter hábitos diários.


<h2>Mobile 📱</h2>
<h1 align="center">

![image](https://github.com/dev-araujo/habit-tracker/assets/97068163/521cd625-50f9-4b91-a9ba-91d706679dc9)

  

</h1>

<details><summary> <h2>Desktop 🖥️</h2></summary>

![image](https://github.com/dev-araujo/habit-tracker/assets/97068163/ea2d752f-a808-4745-857a-0fd9482807b6)

</details>


## Feito com 🔨
- **Angular +2** para o frontend
- **Node.js + Express** para o backend
- **SQLite** para o banco de dados

<details><summary> <h2>Instruções para rodar local</h2></summary>

### Pré-requisitos:
É necessário ter **Node.js** e **Angular CLI** instalados para rodar o projeto localmente.

No terminal, clone o projeto:
```
git clone https://github.com/dev-araujo/habit-tracker.git
```

### Configuração do Backend

Navegue até a pasta do backend e instale as dependências:
```
cd back
npm install
```

Inicie o servidor do backend:
```
npm run dev
```

### Configuração do Frontend

Em um novo terminal, navegue até a pasta do frontend e instale as dependências:
```
cd front
npm install
```

Inicie a aplicação Angular:
```
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

</details>


<details><summary> <h2>Instruções para rodar com Docker🐋</h2></summary>

Você pode construir e rodar o projeto usando Docker individualmente para o backend e frontend.

#### Backend

```bash
cd back
docker build -t backend-habits .
docker run -p 3000:3000 backend-habits
```

#### Frontend

```bash
cd front
docker build -t frontend-habits .
docker run -p 4200:4200 frontend-habits
```

</details>



<details><summary> <h2>Instruções para rodar com Docker-Compose🐙</h2></summary>

Execute

```
docker-compose up -d
```
ou

```
docker compose up -d
```

Isso iniciará ambos, o frontend no `http://localhost:4200` e o backend no `http://localhost:3000`.

</details>

----

#### Autor 👷

<img src="https://user-images.githubusercontent.com/97068163/149033991-781bf8b6-4beb-445a-913c-f05a76a28bfc.png" width="5%" alt="caricatura do autor desse repositório"/>

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/araujocode/)

