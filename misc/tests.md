### ***Creating a user***
```bash
curl -X POST http://127.0.0.1:8000/api/users -H 'Content-Type: application/json' -d '{"name":"<name>","password":"<password>","email":"<email>"}'
```

### ***Getting a list of users***
```bash
curl -X GET http://127.0.0.1:8000/api/users
```

### ***Signing In***
```bash
curl -X POST http://127.0.0.1:8000/auth/signin -H 'Content-Type: application/json' -d '{"email":"<email>","password":"<password>"}'
```

### ***Getting specific user information***
```bash
curl -X GET http://127.0.0.1:8000/api/users/<user-id> -H "Authorization: Bearer <token>" -H 'Content-Type: application/json'
```