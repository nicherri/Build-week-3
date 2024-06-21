namespace Progetto_Settimanale_S1_L5_Andrea_Guarnieri
{
    // Classe principale per gestire le operazioni relative ai contribuenti
    internal class Classe_Contribuente
    {
        // Classe che rappresenta un contribuente con le sue proprietà e metodi
        public class Contribuente
        {
            // Proprietà del contribuente
            public string Nome { get; set; } // Nome del contribuente
            public string Cognome { get; set; } // Cognome del contribuente
            public string DataNascita { get; set; } // Data di nascita del contribuente
            public string CodiceFiscale { get; set; } // Codice fiscale del contribuente
            public string Sesso { get; set; } // Sesso del contribuente
            public string ComuneResidenza { get; set; } // Comune di residenza del contribuente
            public double RedditoAnnuale { get; set; } // Reddito annuale dichiarato dal contribuente
            public string Provincia { get; set; } // Provincia di residenza del contribuente

            // Costruttore per inizializzare un nuovo contribuente con i dati forniti
            public Contribuente(string nome, string cognome, string dataNascita, string codiceFiscale, string sesso, string comuneResidenza, double redditoAnnuale, string provincia)
            {
                Nome = nome;
                Cognome = cognome;
                DataNascita = dataNascita;
                CodiceFiscale = codiceFiscale;
                Sesso = sesso;
                ComuneResidenza = comuneResidenza;
                Provincia = provincia;
                RedditoAnnuale = redditoAnnuale;
            }

            // Metodo statico per creare un nuovo contribuente utilizzando un validatore di input
            public static Contribuente CreaContribuente(InputValidator validator)
            {
                Console.WriteLine("Inserisci i dati del contribuente:");

                // Richiede l'inserimento del nome, assicurandosi che contenga solo lettere
                string nome = validator.RichiediTesto("Nome", "^[a-zA-Z]+$");

                // Richiede l'inserimento del cognome, assicurandosi che contenga solo lettere
                string cognome = validator.RichiediTesto("Cognome", "^[a-zA-Z]+$");

                // Richiede l'inserimento della data di nascita nel formato gg/mm/aaaa
                string dataNascita = validator.RichiediData("Data di nascita (gg/mm/aaaa)");

                // Richiede l'inserimento del codice fiscale e ne verifica la validità
                string codiceFiscale = validator.RichiediCodiceFiscale("Codice fiscale");

                // Richiede l'inserimento del sesso (M o F)
                string sesso = validator.RichiediTesto("Sesso (M/F)", "^[MFmf]$").ToUpper();

                // Richiede l'inserimento del comune di residenza, assicurandosi che contenga solo lettere
                string comuneResidenza = validator.RichiediComuneResidenza("Comune di residenza");

                // Richiede l'inserimento della provincia di residenza
                string provincia = validator.RichiediProvincia("Provincia (sigla)");

                // Richiede l'inserimento del reddito annuale
                double redditoAnnuale = validator.RichiediReddito("Reddito annuale");

                // Restituisce un nuovo oggetto Contribuente con i dati inseriti
                return new Contribuente(nome, cognome, dataNascita, codiceFiscale, sesso, comuneResidenza, redditoAnnuale, provincia);
            }

            // Metodo per calcolare l'imposta basata sul reddito annuale del contribuente
            public double CalcolaImposta()
            {
                double imposta = 0.0; // Inizializza l'imposta a 0
                double reddito = RedditoAnnuale; // Assegna il reddito annuale

                // Calcola l'imposta in base agli scaglioni di reddito
                if (reddito <= 15000)
                {
                    imposta = reddito * 0.23; // Imposta al 23% per redditi fino a 15.000€
                }
                else if (reddito <= 28000)
                {
                    imposta = 3450 + (reddito - 15000) * 0.27; // Imposta al 27% per la parte di reddito oltre 15.000€ e fino a 28.000€
                }
                else if (reddito <= 55000)
                {
                    imposta = 6960 + (reddito - 28000) * 0.38; // Imposta al 38% per la parte di reddito oltre 28.000€ e fino a 55.000€
                }
                else if (reddito <= 75000)
                {
                    imposta = 17220 + (reddito - 55000) * 0.41; // Imposta al 41% per la parte di reddito oltre 55.000€ e fino a 75.000€
                }
                else
                {
                    imposta = 25420 + (reddito - 75000) * 0.43; // Imposta al 43% per la parte di reddito oltre 75.000€
                }

                return imposta; // Restituisce l'imposta calcolata
            }

            // Override del metodo ToString per fornire una rappresentazione leggibile del contribuente
            public override string ToString()
            {
                return $"Contribuente: {Nome} {Cognome}, nato il {DataNascita} ({Sesso}), residente in {ComuneResidenza}, provincia: {Provincia}, codice fiscale: {CodiceFiscale}\n" +
                       $"Reddito dichiarato:  {RedditoAnnuale:0.00}\n" +
                       $"IMPOSTA DA VERSARE:  {CalcolaImposta():0.00}";
            }
        }
    }
}
