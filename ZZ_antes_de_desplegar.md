agregar esto a vercel.json para deploy, y quitarlo para desarrollo local:

```
,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]

```
