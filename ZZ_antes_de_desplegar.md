agregar esto a vercel.json para deploy, y quitarlo para desarrollo local:

```
,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]

```