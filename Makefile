APP_NAME=myapp
BASE_IMAGE=node:14.15.4-alpine3.10
sha=$(shell git describe --abbrev=8 --dirty --always --tags --long | awk -F'-' '{if ($$0 ~ "dirty") print "0ddba11"; else print substr($$1, 2, 8)}')
DOCKER_RUN = docker run --rm -ti -v $(shell pwd):/workspace -w /workspace ${BASE_IMAGE}
BUILD_DIR="build"
DIST_DIR="dist"

# Install dependencies
install:	
	@${DOCKER_RUN} yarn install

# Generate sha header
sha.header: ./.git/HEAD ./.git/index
	@echo export const sourceCommitSha = 0x${sha}\; | tee src/sha.ts

# Build artifacts
build: sha.header
	@mkdir -p ${BUILD_DIR}
	@${DOCKER_RUN} yarn build
	@docker build -t ${APP_NAME}:${sha} .

# Generate disbributable artifacts
bundle: build
	@mkdir -p ${DIST_DIR}
	# Bundle docker image
	@docker image save ${APP_NAME}:${sha} -o dist/${APP_NAME}_${sha}_container.tar
	# Bundle dist
	@if [ "${sha}" = "0ddba11" ]; then \
		${DOCKER_RUN} yarn pack -f ${DIST_DIR}/${APP_NAME}_oddball-$(shell date +%s).tar.gz; \
	else \
		${DOCKER_RUN} yarn pack -f ${DIST_DIR}/${APP_NAME}_${sha}.tar.gz; \
	fi

# Clean artifacts
clean:
	@rm -rf node_modules build dist

# Run Unit Tests
test:
	@${DOCKER_RUN} yarn test
	
# Lint codebase
lint:
	@${DOCKER_RUN} yarn lint

pretty:
	@${DOCKER_RUN} prettier src/**/*.ts test/**/*.ts --write

install-hooks:
	cp util/hooks/* .git/hooks/