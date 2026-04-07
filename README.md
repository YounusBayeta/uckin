# UCKIN — Université Chrétienne de Kinshasa

Plateforme web de l'UCKIN composée de trois services :

| Service | Répertoire | Port | Description |
|---|---|---|---|
| Site vitrine | `my-app/` | 3000 | Page d'accueil publique (Next.js) |
| Espace étudiant | `espace-etudiant/` | 3001 | Portail étudiant (Next.js) |
| Auth service | `Auth/` | 4000 | Micro-service d'authentification (Fastify + PostgreSQL + Redis) |

---

## Prérequis

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+ (`npm install -g pnpm`)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (pour la production ou les bases de données locales)

---

## Démarrage en développement

### 1. Installer les dépendances

```bash
# Depuis la racine du projet
npm run install:all
```

Cette commande installe les dépendances des trois services.

### 2. Configurer les variables d'environnement

```bash
# Copier le fichier exemple et remplir les valeurs
cp .env.example .env

# Configurer le service Auth
cp Auth/.env.example Auth/.env
```

> **Important :** Le service Auth utilise des clés RSA pour les JWT. Générez-les avec :
>
> ```bash
> mkdir -p Auth/keys
> cd Auth && pnpm run generate-keys
> ```

### 3. Lancer tous les services

```bash
# Lancer les 3 services en parallèle
npm run dev:all

# — ou séparément —
npm run dev:site       # Site vitrine   → http://localhost:3000
npm run dev:etudiant   # Espace étudiant → http://localhost:3001
npm run dev:auth       # Auth service   → http://localhost:4000
```

Le service Auth nécessite PostgreSQL et Redis. En développement, lancez-les via Docker :

```bash
docker compose up postgres redis -d
```

---

## Déploiement avec Docker

### 1. Créer le réseau partagé

```bash
docker network create proxy-network
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
# Éditer .env avec les valeurs de production (domaine, mots de passe, etc.)
```

### 3. Générer les clés JWT (première fois uniquement)

```bash
mkdir -p Auth/keys
cd Auth && pnpm run generate-keys
```

### 4. Lancer tous les services

```bash
docker compose up -d --build
```

---

## Structure du projet

```
uckin/
├── my-app/           # Site vitrine Next.js
├── espace-etudiant/  # Portail étudiant Next.js
├── Auth/             # Micro-service d'authentification Fastify
├── docker-compose.yml
├── .env.example
└── package.json      # Scripts racine (monorepo)
```

---

## Variables d'environnement

### Racine (`.env`)

| Variable | Description | Exemple |
|---|---|---|
| `COOKIE_DOMAIN` | Domaine pour les cookies | `localhost` |
| `FRONTEND_URL` | URL du site vitrine | `http://localhost:3000` |
| `AUTH_PUBLIC_URL` | URL publique du service Auth | `http://localhost:4000` |
| `MAIN_SITE_URL` | URL du site principal | `http://localhost:3000` |
| `POSTGRES_USER` | Utilisateur PostgreSQL | `uckin_user` |
| `POSTGRES_PASSWORD` | Mot de passe PostgreSQL | *(à définir)* |
| `POSTGRES_DB` | Nom de la base de données | `uckin_auth` |

Consultez [`Auth/.env.example`](Auth/.env.example) pour les variables spécifiques au service Auth.
