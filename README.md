# TaskFlow

Application de gestion de projets et de tâches réalisée dans le module React + Next.js (M2 ESIEE-IT).

## Versions

| TP | Branche | Contenu |
| --- | --- | --- |
| TP1 | `tp1` | Liste de tâches typée : formulaire, statuts, filtres |
| TP2 | `tp2` | Hooks : sauvegarde locale, titre d'onglet, focus, priorité, minuteur, thème clair / sombre |
| TP3 | `tp3` | Plusieurs pages (React Router), projets et tâches stockés dans une API REST (json-server) |
| TP4 | `tp4` | TaskFlow refait avec Next.js (dossier `taskflow-next`) |

## Installation

```bash
npm install
```

## Lancement

```bash
npm run dev
```

- Site : http://localhost:5173
- API : http://localhost:3001

`npm run reset-db` remet les données de départ.

## Mise en ligne

Le site est déployé sur Vercel. En production, l'API est servie par la fonction `api/index.js` (mêmes routes que json-server) et `VITE_API_URL=/api` est défini dans `.env.production`.
