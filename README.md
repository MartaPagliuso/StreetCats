# StreetCats - Progetto Tecnologie Web 2024/2025
<img src="https://img.shields.io/badge/license-MIT-blue.svg" width="70px"> <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen" width="90px"> <img src="https://img.shields.io/badge/angular-20.3.6-red" width="90px"> 

## Indice 

## 🎯 Descrizione

**StreetCats** è una web application che permette agli amanti dei gatti di:
- Segnalare avvistamenti di gatti randagi con foto e posizione GPS
- Visualizzare una mappa interattiva con tutte le segnalazioni
- Commentare e interagire con le segnalazioni della community
- Tenere traccia dei gatti liberi sul territorio

## 🌟 Caratteristiche 

### Funzionalità principali

- 🗺️ **Mappa Interattiva** - Visualizzazione delle segnalazioni su mappa con Leaflet
- 📷 **Upload Foto** - Caricamento immagini dei gatti avvistati
- 📍 **Geolocalizzazione** - Ricerca indirizzi tramite geocoding (Nominatim)
- 💬 **Sistema Commenti** - Interazione tra utenti sulle segnalazioni
- ✍️ **Markdown Support** - Descrizioni formattate con ngx-markdown
- 🔐 **Autenticazione JWT** - Sistema sicuro con Access e Refresh Token
- 📱 **Responsive Design** - Ottimizzato per desktop, tablet e mobile

### Funzionalità utente 

- Registrazione e login
- Creazione, visualizzazione ed eliminazione segnalazioni
- Aggiunta ed eliminazione commenti

## 🛠️ Tecnologie 

### Frontend 

- **Angular 20.3.6** - Framework principale
- **Typescript** - Linguaggio di programmazione
- **SCSS** - Preprocessore CSS
- **Leaflet** - Libreria per mappe interattive
- **ngx-markdown** - Rendering Markdown
- **RxJS** - Programmazione reattiva

### Backend 

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM per PostgreSQL
- **JWTT** - Autenticazione
- **Multer** - Upoload file
- **Swagger** - Documentazione API

### Database 

- **PostgreSQL** - Database relazionale

### Testing

- **Playwright** - End-to-End testing

## 📦 Prerequisiti

Prima di iniziare, assicurati di aver installato:
- **Node.js** (v18 o superiore)
- **npm** (v9 o superiore)
- **PostgreSQL** (v14 o superiore)
- **Angular CLI** (v20.3.6)

Per verificare le versione installate usa i comandi:
``` bash
node --version
npm --version
psql --version
ng version
```

## 🚀 Installazione

### 1. Clona il Repository

``` bash
git clone https://github.com/MartaPagliuso/StreetCats.git
cd streetcats
```

### 2. Setup Backend

``` bash
cd server
npm install
```

### 3. Setup Frontend

``` bash
cd ../client
npm install
```

## 🎮 Utilizzo

### Avvio sviluppo

1. Avvia il BackEnd
``` bash
cd server
npm start
```
Il server sarà disponibile su `http://localhost:3000`

2. Avvia il Frontend
``` bash
cd ../client
ng serve
```

L'applicazione sarà disponibile su `http://localhost:4200`

### Principali Endpoint

**Autenticazione**
- `POST /auth` - Login utente
- `POST /register` - Registrazione utente
- `POST /refresh` - Rinnova Access Token
- `POST /logout` - Logout utente

**Segnalazioni**
- `GET /signals` - Lista tutte le segnalazioni (pubblico)
- `GET /signals/:id` - Dettagli segnalazione (pubblico)
- `POST /signals` - Crea segnalazione (autenticato)
- `DELETE /signals/:id` - Elimina segnalazione (autenticato, proprietario)

**Commenti**
- `GET /comments/signals/:id` - Commenti di una segnalazione (pubblico)
- `POST /comments` - Aggiunti commento (autenticato)
- `DELETE /comments/:id` - Elimina commento (autenticato, proprietario)

## 🗃️ Struttura del Progetto

``` bash
streetcats/
|-- client/                              # Frontend Angular
|   |-- src/ 
|   |   |-- app/
|   |   |   |-- guards/                  # Route guards
|   |   |   |-- interceptors/            # HTTP interceptors
|   |   |   |-- pages/                   # Componenti pagina
|   |   |   |   |-- home/
|   |   |   |   |-- login/
|   |   |   |   |-- register/
|   |   |   |   |-- add-signal/
|   |   |   |   |-- signals-list/
|   |   |   |   |-- signal-detail/
|   |   |   |-- services/                # Servizi Angular
|   |   |   |-- app.routes.ts            # Routing
|   |   |-- assets/                      # Risorse statiche
|   |   |-- environments/                # Configurazioni ambiente
|   |-- tests/                           # Test Playwright
|   |-- playwright.config.ts
|
|
|-- server/                              # Backend Node.js/Express
|   |-- controller/                      # Controller logica business
|   |   |-- authentication.controller.js
|   |   |-- signal.controller.js
|   |   |-- comment.controller.js
|   |-- middleware/                      # Middleware Express
|   |   |-- authorization.js
|   |   |-- upload.middleware.js
|   |-- models/                          # Modelli Sequelize
|   |   |-- database.model.js
|   |   |-- user.model.js
|   |   |-- signal.model.js
|   |   |-- comment.model.js
|   |-- routes/                          # Route Express
|   |   |-- authentication.router.js
|   |   |-- signal.router.js
|   |   |-- comment.router.js
|   |   |-- geocoding.router.js
|   |-- uploads/                         # File caricati
|   |   |-- signals/
|   |-- .env
|   |-- index.js
|
|
|-- README.md
```









