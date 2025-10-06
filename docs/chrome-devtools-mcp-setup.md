# Chrome DevTools MCP Setup Guide

## Šta je Chrome DevTools MCP?

Chrome DevTools MCP (Model Context Protocol) omogućava AI asistentima da direktno kontrolišu i inspektuju Chrome pretraživač, pružajući pristup svim mogućnostima Chrome DevTools-a.

## Instalacija i Konfiguracija

### Preduslovi

- Node.js 20+ (preporučeno 22+)
- Google Chrome instaliran
- Cursor IDE

### Konfiguracija za Cursor

Konfiguracija je već kreirana u: `%APPDATA%\Cursor\User\mcp.json`

```json
{
	"mcpServers": {
		"chrome-devtools": {
			"command": "npx",
			"args": ["-y", "chrome-devtools-mcp@latest"]
		}
	}
}
```

### Kako koristiti

1. **Restartuj Cursor** - Da bi se učitala nova MCP konfiguracija
2. **Pokreni dev server** - `pnpm dev`
3. **Otvori aplikaciju u Chrome-u** - http://localhost:3000
4. **Zatraži od AI asistenta** da koristi Chrome DevTools

## Mogućnosti

### 1. Automatizovano Testiranje

```
"Testiraj booking flow: otvori stranicu apartmana, izaberi datume i proveri da li se cena pravilno računa"
```

### 2. Performance Analiza

```
"Analiziraj performanse početne stranice i identifikuj uska grla"
```

### 3. Debagovanje

```
"Proveri mrežne zahteve i identifikuj greške u konzoli"
```

### 4. UI/UX Validacija

```
"Testiraj responsive dizajn na mobilnim uređajima"
```

### 5. Accessibility Testing

```
"Proveri accessibility standarde za booking formu"
```

## Primeri za našu Booking Aplikaciju

### Test Booking Flow-a

```
"Otvori http://localhost:3000/apartments/1, izaberi check-in datum za sutra i check-out za 3 dana kasnije, proveri da li se cena pravilno prikazuje"
```

### Test Admin Dashboard-a

```
"Otvori admin dashboard, proveri da li se bookings lista učitava i testiraj filter funkcionalnost"
```

### Performance Check

```
"Snimi performance profile za početnu stranicu i identifikuj komponente koje usporavaju učitavanje"
```

### Responsive Testing

```
"Testiraj apartman kartice na mobilnim uređajima (375px, 768px, 1024px)"
```

## Troubleshooting

### MCP server se ne pokreće

1. Proveri Node.js verziju: `node --version`
2. Ažuriraj na verziju 22+ ako je potrebno
3. Restartuj Cursor

### Chrome se ne otvara

1. Proveri da li je Chrome instaliran
2. Proveri PATH environment varijablu
3. Pokušaj ručno: `npx -y chrome-devtools-mcp@latest`

### Cursor ne vidi MCP server

1. Proveri da li postoji fajl: `%APPDATA%\Cursor\User\mcp.json`
2. Restartuj Cursor
3. Proveri Cursor Settings → Features → Model Context Protocol

## Korisni Linkovi

- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- [Cursor MCP Integration](https://docs.cursor.com/advanced/model-context-protocol)

## Napomene

- Chrome DevTools MCP je trenutno u beta fazi
- Neke funkcionalnosti mogu biti nestabilne
- Redovno ažuriraj na najnoviju verziju: `npx -y chrome-devtools-mcp@latest`
