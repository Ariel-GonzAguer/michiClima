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


Si vuelve a fallar el despliegue, volver a commit anterior. Eliminar todo rastro de cloudinary y michi modo.