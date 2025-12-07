dockerComposeDev := "docker compose -f docker-compose.development.yml"

start:
    {{dockerComposeDev}} up

stop:
    {{dockerComposeDev}} down --remove-orphans

restart:
    {{dockerComposeDev}} down --remove-orphans
    {{dockerComposeDev}} up

build:
    {{dockerComposeDev}} build --no-cache