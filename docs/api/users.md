# Users

## Login de usuários

> /users/login POST

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

## Criação de Usuários

> /users POST

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
status: 201

body: {
  "userId": number,
  "username": string,
  "createdAt": string, // ex: "0000-00-00T00:00:00.000Z"
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
  "error": "Username already in use"
}
```

```text
status: 500

body: {
  "error": "Internal server error"
}
```
