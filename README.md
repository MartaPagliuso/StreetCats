# StreetCats - Progetto Tecnologie Web 2024/2025
<img src="https://img.shields.io/badge/license-MIT-blue.svg" width="70px"> <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen" width="90px"> <img src="https://img.shields.io/badge/angular-20.3.6-red" width="90px"> <img src="https://img.shields.io/badge/PostgreSQL-14%2B-blue" width="100px">

## Indice 
1. [Descrizione](#descrizione)
2. [Caratteristiche](#caratteristiche)
3. [Tecnologie](#tecnologie)
4. [Prerequisiti](#prerequisiti)
5. [Installazione](#installazione)
6. [Configurazione](#configurazione)
7. [Utilizzo](#utilizzo)
8. [Testing](#testing)
9. [API Documentation](#api-documentation)
10. [Struttura del Progetto](#struttura-del-progetto)

<a id="descrizione"></a>
## 🎯 Descrizione

**StreetCats** è una web application che permette agli amanti dei gatti di:
- Segnalare avvistamenti di gatti randagi con foto e posizione GPS
- Visualizzare una mappa interattiva con tutte le segnalazioni
- Commentare e interagire con le segnalazioni della community
- Tenere traccia dei gatti liberi sul territorio

L'obiettivo è creare una rete di supporto per monitorare e proteggere i gatti randagi.

<a id="caratteristiche"></a>
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

**Non Autenticato**:
- Visualizzazione mappa e segnalazioni
- Visualizzazione dettagli segnalazione
- Visualizzazione commenti

**Autenticato**: 
- Tutte le funzionalità sopra +
- Creazione segnalazioni
- Eliminazione delle proprie segnalazioni
- Aggiunta commenti
- Eliminazione propri commenti

<a id="tecnologie"></a>
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
- **JWT** - Autenticazione
- **Multer** - Upload file
- **Swagger** - Documentazione API

### Database 

- **PostgreSQL** (v14+) - Database relazionale

### Testing

- **Playwright** - End-to-End testing

<a id="prerequisiti"></a>
## 📦 Prerequisiti

Prima di iniziare, assicurati di aver installato:
| Software | Versione minima | Come verificare | 
| :---: | :---: | :---: | 
| Node.js | v18.0.0 | `node --version` | 
| npm | v9.0.0 | `npm --version` | 
| PostgreSQL | v14.0 | `psql --version` | 
| AngularCLI | v20.3.6 | `ng version` |

### Installazione PostgreSQL

**Windows**: 
```bash
# Scarica da https://www.postgresql.org/download/windows/
```

**macOS**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```
<a id="installazione"></a>
## 🚀 Installazione

### 1. Clona il Repository

``` bash
git clone https://github.com/MartaPagliuso/StreetCats.git
cd streetcats
```

### 2. Setup Database

```bash
# Accedi a PostgreSQL
psql -U postgres

# Crea il database
CREATE DATABASE streetcats;

# Esci
\q
```

### 3. Setup Backend

``` bash
cd server
npm install

# Crea il file .env (vedi sezione Configurazione)
cp .env.example .env
# Modifica .env con i tuoi dati
```

### 4. Setup Frontend

``` bash
cd ../client
npm install
```

<a id="configurazione"></a>
## ⚙️ Configurazione

### File .env (Backend)

Crea un file `.env` nella cartella `server/` con il seguente contenuto:
```env
# Database Configuration
DB_HOST=localhost
DB_PORTA=5432
DB_NOME=streetcats
DB_UTENTE=postgres
DB_PASSWORD=tua_password_qui

# JWT Secrets (GENERA CHIAVI CASUALI!)
TOKEN_SECRET=genera_una_chiave_casuale_lunga_e_sicura
TOKEN_SECRET_AGGIORNAMENTO=genera_un_altra_chiave_diversa_dalla_prima

# Environment
NODE_ENV=development
```
### Creazione cartella uploads

```bash
# Nel server, crea la cartella per le immagini
cd server
mkdir -p uploads/signals
```

<a id="utilizzo"></a>
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

<a id="testing"></a>
## 🧪 Testing

Il progetto utilizza **Playwright** per i test E2E.

**Eseguire i test**
```bash
cd client

# Installa Playwright (prima volta)
npx playwright install

# Esegui tutti i test
npm test

# Esegui test in modalità UI
npx playwright test --ui

# Esegui test specifico
npx playwright test streetcats.spec.ts

# Genera report HTML
npx playwright show-report
```

**Test Coperti**
- **TEST 1**: La HomePage dovrebbe visualizzare gli elementi principali
- **TEST 2**: Registrazione di un nuovo utente
- **TEST 3**: Login con credenziali valide
- **TEST 4**: Login con credenziali non valide
- **TEST 5**: Visualizzazione dell'elenco dei segnali
- **TEST 6**: Visualizzazione dettagli di una segnalazione
- **TEST 7**: Creazione di una nuova segnalazione (per utenti autenticati)
- **TEST 8**: Ricerca indirizzo tramite geocoding
- **TEST 9**: Aggiungere un commento a una segnalazione
- **TEST 10**: Logout
- **TEST 11**: Accesso a una pagina protetta senza autenticazione
- **TEST 12**: L'utente può tornare indietro usando il percorso di navigazione nella pagina di dettaglio di una segnalazione
- **TEST 13**: Controllo matching delle password in fare di registrazione
- **TEST 14**: Interazione con la mappa 

<a id="api-documentation"></a>
## 📚 API Documentation

### Accesso a Swagger

Una volta avviato il backend, accedi alla documentazione interattiva:
```
http://localhost:3000/api-docs
```

### Principali Endpoint

**Autenticazione**
| Metodo | Endpoint | Descrizione | Auth |
| :---: | :---: | :---: | :---: |
| POST | /auth | Login utente | ❌ |
| POST | /register | Registrazione | ❌ |
| POST | /refresh | Rinnova Access Token | 🔒 Cookie |
| POST | /logout | Logout | 🔒 Cookie |

**Segnalazioni**
| Metodo | Endpoint | Descrizione | Auth |
| :---: | :---: | :---: | :---: |
| GET | /signals | Lista segnalazioni | ❌ |
| GET | /signals/:id | Dettagli segnalazione | ❌ |
| POST | /signals | Crea segnalazione | 🔒 JWT | 
| DELETE | /signals/:id | Elimina segnalazione | 🔒 JWT + Owner |
 
**Commenti**
| Metodo | Endpoint | Descrizione | Auth |
| :---: | :---: | :---: | :---: |
| GET | /comments/signals/:id | Commenti di una segnalazione | ❌ |
| POST | /comments | Aggiungi commento | 🔒 JWT | 
| DELETE | /comments/:id | Elimina commento | 🔒 JWT + Owner |

**Geocoding**
| Metodo | Endpoint | Descrizione | Auth |
| :---: | :---: | :---: | :---: |
| GET | /geocoding/search?q=address | Cerca indirizzo | ❌ |

**Autenticazione API**
Le route protette richiedono un Bearer Token nell'header:\
```http
Authorization: Bearer <your_access_token>
```

<a id="struttura-del-progetto"></a>
## 🗃️ Struttura del Progetto

``` 
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
|   |-- .gitignore
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
|   |-- uploads/                         # File caricati (gitignored)
|   |   |-- signals/
|   |-- .env.example                     # Template variabili ambiente
|   |-- index.js
|   |-- .gitignore
|
|-- README.md
```
