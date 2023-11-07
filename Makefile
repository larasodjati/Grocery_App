SHELL := /bin/bash
ENV=source .env &&
DB_CONTAINER_NAME := "grocery_app"

.PHONY: setup
.PHONY: db
.PHONY: start-db
.PHONY: stop-db
.PHONY: reset-db
.PHONY: watch-db
.PHONY: shell-db

setup:
	if [[ ! -f .env ]]; then cp env-template .env; fi

# 99% of the time, this is what you want when you change `initdb.sql`, because
# you want to re-init the DB with that change, and also watch to make sure
# your change doesn't have a bug.
db: setup reset-db watch-db

start-db: setup
	$(ENV) docker run \
        --name $(DB_CONTAINER_NAME) \
        -e POSTGRES_DATABASE="$$POSTGRES_DB" \
        -e POSTGRES_USER="$$POSTGRES_USERNAME" \
        -e POSTGRES_PASSWORD="$$POSTGRES_PASSWORD" \
        -v $(PWD)/initdb.sql:/docker-entrypoint-initdb.d/initdb.sql \
        -p 5432:5432 \
        -d \
        postgres:15

stop-db:
	docker kill $(DB_CONTAINER_NAME) || true
	docker rm $(DB_CONTAINER_NAME) || true

reset-db: stop-db
	make start-db

watch-db:
	docker logs -f $(DB_CONTAINER_NAME)

shell-db:
	$(ENV) PGPASSWORD=$$POSTGRES_PASSWORD \
		psql -U "$$POSTGRES_USERNAME" -h 0.0.0.0 $$POSTGRES_DB
