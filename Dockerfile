FROM golang:1.19 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -o app

FROM gcr.io/distroless/base-debian11

WORKDIR /app

COPY --from=builder /app/app .

EXPOSE 8080

USER nonroot:nonroot

CMD ["./app"]
