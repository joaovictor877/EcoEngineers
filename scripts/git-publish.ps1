# PowerShell script para inicializar git, adicionar arquivos e publicar
param(
  [string]$remote = 'origin',
  [string]$branch = 'main'
)

Write-Host 'Inicializando repositório git...'
if (-not (Test-Path .git)) {
  git init
}

git add .

git commit -m "inicial: scaffold backend Node.js + PostgreSQL"

git branch -M $branch

# tenta adicionar remote se não existir
$remotes = git remote
if (-not ($remotes -match $remote)) {
  Write-Host "Adicione um remote manualmente, ex: git remote add $remote <url>"
} else {
  git push -u $remote $branch
}

Write-Host 'Publicação finalizada (se remote configurado).'
