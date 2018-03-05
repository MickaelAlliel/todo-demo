# Rookout Tutorial App

## Running with Docker-Compose
1. Run `docker-compose up -d`
2. Go to [http://localhost:5000](http://localhost:5000)

## Running with Makefile
1. Run `make -j run-prod`
2. Go to [http://localhost:5000](http://localhost:5000)

__If you already have a mongod service running on port 27017 run this command instead:__
`make -j run-prod-nodb`

### What runs behinds the scene?
- MongoDB instance
- Rookout Agent
- Node.JS Express based API backend (with the node rook)
- Node.JS React based frontend