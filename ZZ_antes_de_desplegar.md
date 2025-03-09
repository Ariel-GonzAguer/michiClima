agregar esto a vercel.json para deploy, y quitarlo para desarrollo local:

```
,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "redirects": [
    {
      "source": "http://michicompany.info",
      "destination": "https://www.michicompany.info",
      "permanent": true
    }
  ]

```
