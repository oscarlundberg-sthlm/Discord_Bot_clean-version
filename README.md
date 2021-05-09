Närvaropåminnelse

- app som skickar en påminnelse via webhooks till discord
varje dag vi har lektion, med länk till närvarosidan.

lösning 1:
node-server som kör en funktion varje dag kl 13.
den kollar om dagens datum matchar ett lektionsdatum.
Om så, skicka post till webhooken.

Kanske deploy via heroku?