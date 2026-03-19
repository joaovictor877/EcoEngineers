#!/bin/bash
REMOTE=${1:-origin}
BRANCH=${2:-main}

echo "Inicializando repositório git..."
if [ ! -d .git ]; then
  git init
fi

git add .

git commit -m "inicial: scaffold backend Node.js + PostgreSQL" || true

git branch -M $BRANCH

# verifica remote
if ! git remote | grep -q "$REMOTE"; then
  echo "Remote '$REMOTE' não encontrado. Adicione com: git remote add $REMOTE <url>"
else
  git push -u $REMOTE $BRANCH
fi

echo "Publicação finalizada (se remote configurado)."