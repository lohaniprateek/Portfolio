
FROM golang:1.19

WORKDIR /app

COPY . .
RUN go mod download
COPY *.go ./

# Build
RUN go build -o /docker-gs-ping


EXPOSE 8080

# Run
CMD ["/docker-gs-ping"]