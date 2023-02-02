#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..

rm -rf dist
rm -rf src/entities
cp -R ../../apps/server/src/database/entities src

if [[ "$OSTYPE" == "darwin"* ]]; then
  find src/entities -type f -name '*.ts' -exec sed -i '' -e 's/type-defs/\.\.\/types/g' {} \; 
else
  find src/entities -type f -name '*.ts' -exec sed -i -e 's/type-defs/\.\.\/types/g' {} \; 
fi

tsc -p tsconfig.typegen.json

mkdir -p dist/es
mv generated/entities dist/dts
cp -R dist/dts dist/es

rm -rf generated
