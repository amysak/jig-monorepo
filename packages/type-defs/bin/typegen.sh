#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..
echo "Current directory: $(pwd)"
echo "Directory contents two levels up: $(ls ../../)"

rm -rf dist
cp -R ../../apps/server/src/database/entities src

echo "Src contents: $(ls src)"
echo "Find results: $(find ./src/entities -type f -name '*.ts')"

find ./src/entities -type f -name '*.ts' -exec sed -i '' -e 's/type-defs/\.\.\/types/g' {} \; 

tsc -p tsconfig.typegen.json

mkdir -p dist/es
mv generated/entities dist/dts
cp -R dist/dts dist/es

rm -rf generated
