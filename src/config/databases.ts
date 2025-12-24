// Configuration modulaire des bases de donnees
// Pour ajouter une nouvelle base, ajoutez simplement une nouvelle entree dans ce tableau

export interface DatabaseConfig {
  id: string;
  name: string;
  urlEnvKey: string;
  anonKeyEnvKey: string;
}

// Liste des bases de donnees a pinger
// Pour ajouter une nouvelle base:
// 1. Ajoutez les variables dans .env (NEWDB_URL, NEWDB_ANON_KEY)
// 2. Ajoutez une nouvelle entree ici
export const databases: DatabaseConfig[] = [
  {
    id: 'makeminia',
    name: 'MakeMinia',
    urlEnvKey: 'MAKEMINIA_URL',
    anonKeyEnvKey: 'MAKEMINIA_ANON_KEY',
  },
  {
    id: 'testciviquefrance',
    name: 'Test Civique France',
    urlEnvKey: 'TESTCIVIQUEFRANCE_URL',
    anonKeyEnvKey: 'TESTCIVIQUEFRANCE_ANON_KEY',
  },
  {
    id: 'invoicepdf',
    name: 'InvoicePDF',
    urlEnvKey: 'INVOICEPDF_URL',
    anonKeyEnvKey: 'INVOICEPDF_ANON_KEY',
  },
  {
    id: 'agentwhatsapp',
    name: 'Agent Whatsapp',
    urlEnvKey: 'AGENTWHATSAPP_URL',
    anonKeyEnvKey: 'AGENTWHATSAPP_ANON_KEY',
  },
  {
    id: 'monfiscalfacile',
    name: 'Mon Fiscal Facile',
    urlEnvKey: 'MONFISCALFACILE_URL',
    anonKeyEnvKey: 'MONFISCALFACILE_ANON_KEY',
  },
  {
    id: 'travelhub',
    name: 'TravelHub',
    urlEnvKey: 'TRAVELHUB_URL',
    anonKeyEnvKey: 'TRAVELHUB_ANON_KEY',
  },
];
