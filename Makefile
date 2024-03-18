build:
	@go build -o ./bin/PortfolioBackend ./cmd/api/main.go

run: build
	@./bin/PortfolioBackend

test: 
	@go test -v ./...