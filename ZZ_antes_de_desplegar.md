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

volver a instalar lo necesario para cloudinary y volver a react18