agregar esto a vercel.json:

```
,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]

```
