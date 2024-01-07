# Short URLs

## Criação de URLs encurtadas

> /short-urls POST

Obs: _Apenas usuários autenticados_ podem criar URLs encurtadas.

### Entrada:

```text

headers: {
  authorization: Basic <access-token>
}

body: {
  "url": string,
  "shortCode": string?,
  "validityInDays": number?
}

```

### Saídas:

#### Bem-sucedidas:

```text
status: 201

body: {
  "shortUrlId": number,
  "shortCode": string,
  "fullUrl": string,
  "clicks": number,
  "expirationDate": string?, // ex: "0000-00-00T00:00:00.000Z"
  "createdAt": string, // ex: "0000-00-00T00:00:00.000Z",
  "userId": number
}
```

#### Mal-sucedidas:

```text
status: 400

body: {
  "error": "Missing param: <campo-nao-informado>" // ex: url
}
```

```text
status: 400

body: {
  "error": "Code already in use"
}
```

```text
status: 403

body: {
  "error": "Unauthorized"
}
```

```text
status: 500

body: {
  "error": "Internal server error"
}
```
