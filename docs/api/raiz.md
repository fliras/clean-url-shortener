# Raíz

## Acesso às URLs encurtadas

> /:shortCode GET

### Entrada:

```text

params: {
  shortCode: string
}

```

### Saídas:

#### Bem-sucedidas:

```text
status: 301

(redirecionamento à url original)
```

#### Mal-sucedidas:

```text
status: 400

body: {
  "error": "Short url not found"
}
```

```text
status: 400

body: {
  "error": "This short url is expired"
}
```

```text
status: 500

body: {
  "error": "Internal server error"
}
```
