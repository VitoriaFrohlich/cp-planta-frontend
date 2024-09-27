#!/bin/bash

# Verifica se o commit message é válido utilizando commitlint
npx commitlint --edit "$1"

# Verifica se a validação do commit message passou
if [ $? -ne 0 ]; then
    echo "### ERRO: Commit message inválido."
    exit 1
fi

echo "### COMMIT-MSG: Validação do commit message concluída com sucesso."