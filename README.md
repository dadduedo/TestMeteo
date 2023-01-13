l'applicazione prende i dati della longitudine e della latitudine in modo statico da un array per simulare quello che potrebbe arrivargli da un front-end che sceglie una lista di città

Nell'applicazione ho lasciato il file env con dentro le variabili sensibili per rendere l'uso dell'app più immediato. Normalemente non andrebbe fatto ma per un test su account gratuiti non ci sono problemi.

E' stata presa in considerazione l'idea che alcune città potessero non avere indicazione sul lato commerciale per questo è stato portato avanti un caso in cui non se ne trovassero e comunque venisse gestita l'informazione verso il front-end chiamante.

I dati sono stati inseriti in ordine con Meteo e Commercio separati ma nello stesso sotto elemento dell'array perchè riguardano la stessa città ma con dati differenti.

L'applicazione viene chiamata invocando l'url http://localhost:3000/Meteo e possibilmente usando sul Browser di ricerca un json Formatter per capire meglio i dati mostrati.

