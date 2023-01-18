#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..

rm -rf dist
cp -R ../../apps/server/src/database/entities src
find src/entities -type f -name '*.ts' -exec sed -i '' -e 's/type-defs/\.\.\/types/g' {} \; 

tsc -p tsconfig.typegen.json

mkdir -p dist/es
mv generated/entities dist/dts
cp -R dist/dts dist/es

rm -rf generated
