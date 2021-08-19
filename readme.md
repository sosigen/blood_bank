# Nazwa projektu: Bank krwi

## stack: node.js, express.js, html, css, javascript, mysql

Zadaniem tego systemu jest obsługa dawców (donors), biorców (recipients) oraz operacji zachodzacych miedzy nimi: donacji(donations) oraz przekazań krwi biorcom (transactions)

Charakterystyka: 
- Zakładam, że dawcy oddają zawsze 450 ml krwi, zgodnie z Narodowym Centrum Krwi
- Raz przekazana krew zostaje oznaczona jako niedostępna (pole available)
- Przykładowy proces pełnego transferu krwi:
  - Rejestracja dawcy
  - Dodanie jego donacji
  - dodanie transakcji z zarejestrowanym biorcą 


# Instalacja

- wymagany zainstalowany node.js oraz program do obsługi mysql
- należy zaimportować bazę, po czym uruchomić serwer MySQL
- w terminalu, po przejściu do folderu projektu (blood bank) wpisać polecenie _npm install_
- by uruchomić serwer należy wpisać _npm run build_
- aplikacja działa na http://localhost:5000/
