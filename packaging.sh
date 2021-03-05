function clean() {
  npm run clean:build
}

function pack() {
  npm run pack && \
  tar -tvf mcp-3xxx-1.0.1.tgz
}

function remove-dependency() {
  cd ../environment-chamber/packages/devices && \
  npm remove mcp-3xxx && \
  cd -
}

function add-dependency() {
  ../environment-chamber/packages/devices && \
  npm add ../../../mcp-3xxx/mcp-3xxx-1.0.1.tgz && \
  npm start && \
  cd -
}

# clean && remove-dependency && pack && add-dependency
# pack
