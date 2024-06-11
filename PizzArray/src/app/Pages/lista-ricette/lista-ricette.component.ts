import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-ricette',
  templateUrl: './lista-ricette.component.html',
  styleUrl: './lista-ricette.component.scss'
})
export class ListaRicetteComponent {
  recipe=[{
    "id": 2,
    "nome_ricetta": "Tiramisù",
    "immagine": "https://www.giallozafferano.it/images/173-17354/Tiramisu_650x433_wm.jpg",
    "ingredienti": [
      {
        "ingrediente": "Mascarpone",
        "quantita": "250g"
      },
      {
        "ingrediente": "Caffè",
        "quantita": "100ml"
      },
      {
        "ingrediente": "Savoiardi",
        "quantita": "200g"
      },
      {
        "ingrediente": "Zucchero",
        "quantita": "100g"
      },
      {
        "ingrediente": "Uova",
        "quantita": "3"
      },
      {
        "ingrediente": "Cacao",
        "quantita": "q.b."
      }
    ],
    "tempo_preparazione": 30,
    "tempo_cottura": 0,
    "porzioni": 6,
    "difficolta": "Media",
    "preparazione": "Separare i tuorli dagli albumi. Montare i tuorli con lo zucchero, aggiungere il mascarpone. Montare gli albumi a neve e incorporarli. Inzuppare i savoiardi nel caffè, alternare strati di savoiardi e crema, terminando con il cacao."
  },
  {
    "id": 3,
    "nome_ricetta": "Lasagne alla Bolognese",
    "immagine": "https://www.elitesurgelati.it/wp-content/uploads/2019/12/3427.jpg",
    "ingredienti": [
      { "ingrediente": "Pasta per Lasagne", "quantita": "250g" },
      { "ingrediente": "Ragù alla Bolognese", "quantita": "500g" },
      { "ingrediente": "Besciamella", "quantita": "500ml" },
      { "ingrediente": "Parmigiano Reggiano", "quantita": "100g" }
    ],
    "tempo_preparazione": 30,
    "tempo_cottura": 40,
    "porzioni": 6,
    "difficolta": "media",
    "preparazione": "Alternare strati di pasta, ragù, besciamella e parmigiano. Cuocere in forno a 180°C per 40 minuti.",
    "portata": "primo"
  },{
    "id": 5,
    "nome_ricetta": "Pollo alla Cacciatora",
    "immagine": "https://www.mangimifusco.it/new/wp-content/uploads/2021/03/SH_pollo_cacciatora-1200x800-1.jpg",
    "ingredienti": [
      { "ingrediente": "Pollo", "quantita": "1kg" },
      { "ingrediente": "Pomodori Pelati", "quantita": "400g" },
      { "ingrediente": "Carote", "quantita": "2" },
      { "ingrediente": "Sedano", "quantita": "2 coste" },
      { "ingrediente": "Cipolla", "quantita": "1" },
      { "ingrediente": "Vino Rosso", "quantita": "200ml" },
      { "ingrediente": "Olio d'Oliva", "quantita": "q.b." },
      { "ingrediente": "Rosmarino", "quantita": "q.b." }
    ],
    "tempo_preparazione": 20,
    "tempo_cottura": 60,
    "porzioni": 4,
    "difficolta": "media",
    "preparazione": "Rosolare il pollo, aggiungere verdure tritate e vino. Unire i pomodori e cuocere a fuoco lento per un'ora.",
    "portata": "secondo"
  }, {
    "id": 6,
    "nome_ricetta": "Minestrone di Verdure",
    "immagine": "https://www.salepepe.it/files/2017/12/Minestrone-di-farro-al-basilico-1140x636.jpg",
    "ingredienti": [
      { "ingrediente": "Carote", "quantita": "2" },
      { "ingrediente": "Zucchine", "quantita": "2" },
      { "ingrediente": "Patate", "quantita": "2" },
      { "ingrediente": "Sedano", "quantita": "2 coste" },
      { "ingrediente": "Fagioli Borlotti", "quantita": "200g" },
      { "ingrediente": "Pomodori", "quantita": "4" },
      { "ingrediente": "Spinaci", "quantita": "100g" },
      { "ingrediente": "Cipolla", "quantita": "1" },
      { "ingrediente": "Olio d'Oliva", "quantita": "q.b." }
    ],
    "tempo_preparazione": 20,
    "tempo_cottura": 40,
    "porzioni": 6,
    "difficolta": "facile",
    "preparazione": "Tagliare tutte le verdure a cubetti. Soffriggere la cipolla, aggiungere le verdure e coprire con acqua. Cuocere fino a quando tutte le verdure sono tenere.",
    "portata": "primo"
  }]
}
