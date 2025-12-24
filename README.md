# Database Pinger

Application PWA pour pinger automatiquement vos bases de donnees Supabase et eviter qu'elles soient mises en pause.

## Installation

```bash
npm install
```

## Configuration

1. Copiez le fichier `.env.example` vers `.env` et remplissez vos credentials Supabase
2. Pour ajouter une nouvelle base de donnees:
   - Ajoutez les variables dans `.env` (NEWDB_URL, NEWDB_ANON_KEY)
   - Ajoutez une entree dans `src/config/databases.ts`

## Developpement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Production

```bash
npm run build
npm start
```

## GitHub Actions (Ping automatique quotidien)

Pour configurer le ping automatique via GitHub Actions:

1. Creez un repository GitHub
2. Allez dans Settings > Secrets and variables > Actions
3. Ajoutez les secrets suivants:

| Secret | Description |
|--------|-------------|
| `MAKEMINIA_URL` | https://nouvdwzhuicfthamuloi.supabase.co |
| `MAKEMINIA_ANON_KEY` | Votre anon key |
| `TESTCIVIQUEFRANCE_URL` | https://wdoyylnmnnohggfujjrc.supabase.co |
| `TESTCIVIQUEFRANCE_ANON_KEY` | Votre anon key |
| `INVOICEPDF_URL` | https://exlwbyfxuhitctiwjech.supabase.co |
| `INVOICEPDF_ANON_KEY` | Votre anon key |
| `AGENTWHATSAPP_URL` | https://izhfgbgxmqdcfgxrpqmv.supabase.co |
| `AGENTWHATSAPP_ANON_KEY` | Votre anon key |
| `MONFISCALFACILE_URL` | https://klvexrfjefycgllnfkra.supabase.co |
| `MONFISCALFACILE_ANON_KEY` | Votre anon key |
| `TRAVELHUB_URL` | https://dqoncbnvyviurirsdtyu.supabase.co |
| `TRAVELHUB_ANON_KEY` | Votre anon key |

Le workflow s'executera automatiquement tous les jours a 8h UTC.

## PWA

L'application est une PWA. Pour l'installer sur votre telephone:
1. Ouvrez l'application dans votre navigateur mobile
2. Appuyez sur "Ajouter a l'ecran d'accueil"

## Deploiement sur Vercel

1. Poussez le code sur GitHub
2. Connectez le repository a Vercel
3. Ajoutez les variables d'environnement dans Vercel (depuis le fichier .env)
4. Deployez

## Structure du projet

```
src/
  app/
    api/
      databases/     # Liste des bases de donnees
      ping/          # API de ping
    layout.tsx       # Layout principal
    page.tsx         # Page principale
    globals.css      # Styles globaux
  components/
    DatabaseCard.tsx     # Carte de base de donnees
    PingChart.tsx        # Graphique de performance
    PingHistoryTable.tsx # Tableau d'historique
    StatsCard.tsx        # Statistiques globales
  config/
    databases.ts     # Configuration des bases (MODULAIRE)
  lib/
    pinger.ts        # Logique de ping
    storage.ts       # Stockage local
  types/
    index.ts         # Types TypeScript
```

## Ajouter une nouvelle base de donnees

1. Dans `.env`, ajoutez:
```
NEWDB_URL=https://xxx.supabase.co
NEWDB_ANON_KEY=your-key
```

2. Dans `src/config/databases.ts`, ajoutez:
```typescript
{
  id: 'newdb',
  name: 'New Database',
  urlEnvKey: 'NEWDB_URL',
  anonKeyEnvKey: 'NEWDB_ANON_KEY',
},
```

3. Dans `.github/workflows/daily-ping.yml`, ajoutez une etape de ping et les secrets correspondants.
