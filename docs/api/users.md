# Users

## Login de usuários

> /api/users/login POST

### Entrada:

```text
body: {
  "username": string,
  "password": string
}
```

### Saídas:

#### Bem-sucedidas:

```text
status: 200

body: {
  "token": "<token-de-acesso>"
}
```

#### Mal-sucedidas:

```text
status: 400

body: {
  "error": "Missing param: <campo-nao-informado>" // ex: username
}
```

```text
status: 400

body: {
  "error": "User not found"
}
```

```text
status: 400

body: {
  "error": "Invalid login"
}
```

```text
status: 500

body: {
  "error": "Internal server error"
}
```
