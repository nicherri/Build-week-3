// Per eseguire il compito per chiarezza ho creato 3 file. 
// Il file principale mostra solo un menù con 2 scelte, Uscire o Creare un nuovo contribuente
// Il secondo file (InputValidator) contiene tutti i metodi per contrallare che i vari input siano corretti
// In fine il terzo file (Contribuente) permette la creazione del nuovo contribuente e invoca i metodi
// di InputValidator per controllare la corretteza dell'immissione dei dati.

// Come consigliato da lei ho creato un nuovo file chiamato CodiceFiscaleValidator che
// contiene un metodo che viene invocato il InputValidator per il controllo del codice fiscale




using static Progetto_Settimanale_S1_L5_Andrea_Guarnieri.Classe_Contribuente;

namespace Progetto_Settimanale_S1_L5_Andrea_Guarnieri
{
    internal class Program
    {
        static void Main(string[] args)
        {
            InputValidator validator = new InputValidator();

            while (true)
            {
                // Utilizza il metodo RichiediScelta per assicurarsi che la scelta sia valida
                Console.WriteLine("1. Inserisci dati contribuente");
                Console.WriteLine("2. Esci");
                Console.WriteLine("");
                string scelta = validator.RichiediScelta("Seleziona un'opzione (1 o 2)", new[] { "1", "2" });

                if (scelta == "1")
                {
                    Contribuente contribuente = Contribuente.CreaContribuente(validator);
                    Console.WriteLine("");
                    Console.WriteLine("==================================================");
                    Console.WriteLine("CALCOLO DELL'IMPOSTA DA VERSARE:");
                    Console.WriteLine(contribuente);
                    Console.WriteLine("==================================================");
                    Console.WriteLine("");
                }
                else if (scelta == "2")
                {
                    break; // Esce dal loop e termina il programma
                }
            }
        }
    }
}
