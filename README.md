DB Diagram: https://dbdiagram.io/d/6468913cdca9fb07c46fc4c1


### Files

- cron job: [wallet.cronjob.ts](src%2Fmodules%2Fhttp%2Fwallet%2Fwallet.cronjob.ts)
- service: [wallet.service.ts](src%2Fmodules%2Fhttp%2Fwallet%2Fwallet.service.ts)
- repository: [wallet.repository.ts](src%2Fmodules%2Fhttp%2Fwallet%2Fwallet.repository.ts)
### app
```shell
docker-compose --profile product up
```

### Run E2E Tests
```shell
docker-compose --profile test up
```

### Document 
```shell
http://localhost:{hostPort}/api
```
![swagger.png](.github%2Fswagger.png)
