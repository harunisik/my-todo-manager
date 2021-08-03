FROM golang:1.12-alpine

RUN apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /my-todo-service

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

# Build the Go app
RUN go build -o ./out/my-todo-service .


# This container exposes port 8080 to the outside world
EXPOSE 8778

# Run the binary program produced by `go install`
CMD ["./out/my-todo-service"]