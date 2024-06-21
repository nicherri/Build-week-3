namespace Progetto_Settimanale_S1_L5_Andrea_Guarnieri
{
    // Classe che gestisce la validazione del codice fiscale italiano
    internal class CodiceFiscaleValidator
    {
        // Dizionario per la conversione dei caratteri in posizione dispari del codice fiscale
        private readonly Dictionary<char, int> ConversioneDispari = new Dictionary<char, int>()
        {
            { '0', 1 }, { '1', 0 }, { '2', 5 }, { '3', 7 }, { '4', 9 }, { '5', 13 },
            { '6', 15 }, { '7', 17 }, { '8', 19 }, { '9', 21 }, { 'A', 1 }, { 'B', 0 },
            { 'C', 5 }, { 'D', 7 }, { 'E', 9 }, { 'F', 13 }, { 'G', 15 }, { 'H', 17 },
            { 'I', 19 }, { 'J', 21 }, { 'K', 2 }, { 'L', 4 }, { 'M', 18 }, { 'N', 20 },
            { 'O', 11 }, { 'P', 3 }, { 'Q', 6 }, { 'R', 8 }, { 'S', 12 }, { 'T', 14 },
            { 'U', 16 }, { 'V', 10 }, { 'W', 22 }, { 'X', 25 }, { 'Y', 24 }, { 'Z', 23 }
        };

        // Dizionario per la conversione dei caratteri in posizione pari del codice fiscale
        private readonly Dictionary<char, int> ConversionePari = new Dictionary<char, int>()
        {
            { '0', 0 }, { '1', 1 }, { '2', 2 }, { '3', 3 }, { '4', 4 }, { '5', 5 },
            { '6', 6 }, { '7', 7 }, { '8', 8 }, { '9', 9 }, { 'A', 0 }, { 'B', 1 },
            { 'C', 2 }, { 'D', 3 }, { 'E', 4 }, { 'F', 5 }, { 'G', 6 }, { 'H', 7 },
            { 'I', 8 }, { 'J', 9 }, { 'K', 10 }, { 'L', 11 }, { 'M', 12 }, { 'N', 13 },
            { 'O', 14 }, { 'P', 15 }, { 'Q', 16 }, { 'R', 17 }, { 'S', 18 }, { 'T', 19 },
            { 'U', 20 }, { 'V', 21 }, { 'W', 22 }, { 'X', 23 }, { 'Y', 24 }, { 'Z', 25 }
        };

        // Dizionario per la conversione del resto della somma in lettera di controllo
        private readonly Dictionary<int, char> LetteraDiControllo = new Dictionary<int, char>()
        {
            { 0, 'A' }, { 1, 'B' }, { 2, 'C' }, { 3, 'D' }, { 4, 'E' }, { 5, 'F' },
            { 6, 'G' }, { 7, 'H' }, { 8, 'I' }, { 9, 'J' }, { 10, 'K' }, { 11, 'L' },
            { 12, 'M' }, { 13, 'N' }, { 14, 'O' }, { 15, 'P' }, { 16, 'Q' }, { 17, 'R' },
            { 18, 'S' }, { 19, 'T' }, { 20, 'U' }, { 21, 'V' }, { 22, 'W' }, { 23, 'X' },
            { 24, 'Y' }, { 25, 'Z' }
        };

        // Metodo per calcolare la somma dei valori associati ai caratteri del codice fiscale
        public int CalcolaSommaCodiceFiscale(string codiceFiscale)
        {
            int somma = 0;

            // Itera su ciascun carattere del codice fiscale, escluso l'ultimo
            for (int i = 0; i < codiceFiscale.Length - 1; i++)
            {
                char c = codiceFiscale[i];
                // Se l'indice è pari, utilizza la conversione dispari
                if (i % 2 == 0)
                {
                    somma += ConversioneDispari[c];
                }
                // Se l'indice è dispari, utilizza la conversione pari
                else
                {
                    somma += ConversionePari[c];
                }
            }

            return somma; // Restituisce la somma calcolata
        }

        // Metodo per verificare la validità del codice fiscale
        public bool VerificaCodiceFiscale(string codiceFiscale)
        {
            // Controlla se la lunghezza del codice fiscale è 16
            if (codiceFiscale.Length != 16)
            {
                Console.WriteLine("Errore: Il codice fiscale deve essere lungo 16 caratteri.");
                return false;
            }

            // Calcola la somma dei valori associati ai caratteri del codice fiscale
            int somma = CalcolaSommaCodiceFiscale(codiceFiscale);

            // Calcola il resto della somma diviso per 26
            int resto = somma % 26;

            // Ottiene la lettera di controllo calcolata dal resto
            char letteraControlloCalcolata = LetteraDiControllo[resto];

            // Ottiene l'ultima lettera del codice fiscale (la lettera di controllo originale)
            char letteraControlloOriginale = codiceFiscale[^1];

            // Confronta la lettera di controllo calcolata con quella originale
            if (letteraControlloCalcolata != letteraControlloOriginale)
            {
                Console.WriteLine("Errore: Codice fiscale non valido. La lettera di controllo non corrisponde.");
                return false;
            }

            // Se la verifica ha successo, stampa il messaggio di validità
            Console.WriteLine("Il codice fiscale è valido.");

            return true; // Restituisce true se il codice fiscale è valido
        }
    }
}
