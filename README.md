Projeto backend do EcoEngineers (Node.js + Express + PostgreSQL)

Instruções rápidas:

1. Copie .env.example para .env e adapte DATABASE_URL e JWT_SECRET.
2. Instale dependências: npm install
3. Crie o banco de dados PostgreSQL e rode o script db/init.sql (psql -f db/init.sql)
4. Rode em dev: npm run dev

Endpoints principais:
- POST /api/register
- POST /api/login
- GET /api/materials
- POST /api/materials
- POST /api/wastes
- GET /api/wastes
- GET /api/dashboard/stats

Token JWT deve ser enviado em Authorization: Bearer <token>

Suporte a diferentes bancos SQL:

Você pode usar Postgres, MySQL ou MSSQL. Ajuste a variável DB_CLIENT no seu .env para uma destas opções e configure DATABASE_URL adequadamente.

Drivers recomendados por DB_CLIENT:
- postgres: "pg"
- mysql: "mysql2"
- mssql: "mssql"

Exemplo .env para MySQL:

DATABASE_URL=mysql://user:password@localhost:3306/ecoengineers
DB_CLIENT=mysql

Ao trocar para outro banco, instale o pacote driver correspondente: npm i mysql2  (para MySQL) ou npm i mssql (para MSSQL).

Quer publicar no Git?

Use os scripts em scripts/ para inicializar, commitar e fazer push (mensagens em português):

PowerShell (Windows):

powershell -ExecutionPolicy Bypass -File scripts/git-publish.ps1

Bash (Linux/macOS/Git Bash):

bash scripts/git-publish.sh

Observação: os scripts esperam que o remote já esteja configurado (git remote add origin <url>) — caso não esteja, adiciona manualmente e rode novamente.
