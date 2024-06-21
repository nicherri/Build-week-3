using System.Globalization;
using System.Text.RegularExpressions;

namespace Progetto_Settimanale_S1_L5_Andrea_Guarnieri
{
    // Classe responsabile per la validazione dell'input
    internal class InputValidator
    {
        // Istanza della classe CodiceFiscaleValidator per la validazione del codice fiscale
        private readonly CodiceFiscaleValidator codiceFiscaleValidator;

        // Costruttore della classe InputValidator
        public InputValidator()
        {
            codiceFiscaleValidator = new CodiceFiscaleValidator();
        }

        // Metodo per richiedere l'inserimento di testo che rispetti un determinato pattern
        public string RichiediTesto(string messaggio, string pattern)
        {
            string? input; // Variabile per memorizzare l'input dell'utente
            do
            {
                Console.Write($"{messaggio}: ");
                input = Console.ReadLine(); 

                // Verifica se l'input è nullo o non rispetta il pattern specificato
                if (input == null || !Regex.IsMatch(input, pattern))
                {
                    Console.WriteLine($"Inserimento non valido. Riprova. ({messaggio} deve rispettare il pattern {pattern})");
                }
            } while (input == null || !Regex.IsMatch(input, pattern)); // Continua a chiedere l'input finché non è valido

            return input; // Restituisce l'input valido
        }

        // Metodo per richiedere l'inserimento di una data in un formato specifico
        public string RichiediData(string messaggio)
        {
            string? input; // Variabile per memorizzare l'input dell'utente
            DateTime data; // Variabile per memorizzare la data convertita
            do
            {
                Console.Write($"{messaggio}: ");
                input = Console.ReadLine(); // Legge l'input dall'utente
            } while (input == null || !DateTime.TryParseExact(input, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out data)); // Continua a chiedere l'input finché non è una data valida

            return input ?? string.Empty; // Restituisce l'input valido o una stringa vuota se nullo
        }

        // Metodo per richiedere l'inserimento di un reddito annuale come numero positivo
        public double RichiediReddito(string messaggio)
        {
            string? input; // Variabile per memorizzare l'input dell'utente
            double reddito; // Variabile per memorizzare il reddito convertito
            do
            {
                Console.Write($"{messaggio}: ");
                input = Console.ReadLine(); // Legge l'input dall'utente
            } while (input == null || !double.TryParse(input, out reddito) || reddito < 0); // Continua a chiedere l'input finché non è un numero positivo

            return reddito; // Restituisce il reddito valido
        }

        // Metodo per richiedere l'inserimento di una provincia italiana valida
        public string RichiediProvincia(string messaggio)
        {
            string? input; // Variabile per memorizzare l'input dell'utente
            bool provinciaValida; // Variabile per memorizzare la validità della provincia
            do
            {
                Console.Write($"{messaggio}: ");
                input = Console.ReadLine();
                input = input?.ToUpper(); // Converte l'input in maiuscolo

                // Verifica se la provincia è riconosciuta
                provinciaValida = input != null && Province.ProvinceItaliane.Contains(input);
                if (!provinciaValida)
                {
                    Console.WriteLine($"Inserimento non valido. La provincia '{input}' non è riconosciuta. Riprova.");
                }
            } while (!provinciaValida); // Continua a chiedere l'input finché la provincia non è valida

            return input ?? string.Empty; // Restituisce la provincia valida o una stringa vuota se nullo
        }

        // Metodo per richiedere l'inserimento di un comune di residenza che rispetti un pattern specifico
        public string RichiediComuneResidenza(string messaggio)
        {
            string? input; // Variabile per memorizzare l'input dell'utente
            do
            {
                Console.Write($"{messaggio}: ");
                input = Console.ReadLine(); 

                // Verifica se l'input è nullo o non rispetta il pattern specificato per i comuni
                if (input == null || !Regex.IsMatch(input, "^[a-zA-Z]+(?: [a-zA-Z]+)*$"))
                {
                    Console.WriteLine($"Inserimento non valido. Il {messaggio} deve contenere solo lettere, spazi non consecutivi e senza caratteri speciali o numeri.");
                }
            } while (input == null || !Regex.IsMatch(input, "^[a-zA-Z]+(?: [a-zA-Z]+)*$")); // Continua a chiedere l'input finché non è valido

            return input; // Restituisce l'input valido
        }

        // Metodo per richiedere l'inserimento di una scelta tra opzioni valide
        public string RichiediScelta(string messaggio, string[] opzioniValide)
        {
            string? input; // Variabile per memorizzare l'input dell'utente
            do
            {
                Console.Write($"{messaggio}: ");
                input = Console.ReadLine(); 

                // Verifica se l'input è nullo, vuoto o non contenuto tra le opzioni valide
                if (string.IsNullOrWhiteSpace(input) || !opzioniValide.Contains(input))
                {
                    Console.WriteLine($"Scelta non valida. Inserisci una delle seguenti opzioni: {string.Join(", ", opzioniValide)}.");
                }
            } while (string.IsNullOrWhiteSpace(input) || !opzioniValide.Contains(input)); // Continua a chiedere l'input finché non è valido

            return input; // Restituisce l'input valido
        }

        // Metodo per richiedere l'inserimento di un codice fiscale valido
        public string RichiediCodiceFiscale(string messaggio)
        {
            string codiceFiscale; // Variabile per memorizzare l'input dell'utente
            do
            {
                Console.Write($"{messaggio}: ");
                codiceFiscale = Console.ReadLine()?.ToUpper() ?? string.Empty; // Legge l'input dall'utente e lo converte in maiuscolo

                // Verifica se il codice fiscale è valido utilizzando CodiceFiscaleValidator
                if (!codiceFiscaleValidator.VerificaCodiceFiscale(codiceFiscale))
                {
                    Console.WriteLine("Codice fiscale non valido. Riprova.");
                }

            } while (!codiceFiscaleValidator.VerificaCodiceFiscale(codiceFiscale)); // Continua a chiedere l'input finché il codice fiscale non è valido

            return codiceFiscale; // Restituisce il codice fiscale valido
        }

        // Classe statica per contenere le province italiane
        public static class Province
        {
            // Insieme delle sigle delle province italiane
            public static readonly HashSet<string> ProvinceItaliane = new HashSet<string>
            {
                "AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ",
                "BS", "BR", "CA", "CL", "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN",
                "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO", "GR", "IM", "IS", "SP", "LT", "LE", "LC", "LI",
                "LO", "LU", "MC", "MN", "MS", "MT", "ME", "MI", "MO", "MB", "NA", "NO", "NU", "OR", "PD", "PA",
                "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG", "RA", "RC", "RE", "RI",
                "RN", "RM", "RO", "SA", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "TP", "TN", "TV",
                "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT", "VS"
            };
        }
    }
}
