<h3>Generate Prisma Migrations</h3>

<code>npx prisma generate</code><br>
<code>npx prisma migrate dev **name** </code>

<h3>Generate Prisma Migration for integration tests</h3>
<code>npx prisma generate --schema=./prisma/schema.test.prisma </code><br>
<code>npx prisma migrate dev --schema=./prisma/schema.test.prisma</code>

<h2>Rodar Projeto</h2>

<span>Entrar na pasta backend <code>cd backend</code> </span>  
<span>Instalar Dependências <code>yarn</code> or <code>yarn install</code> or <code>npm install</code> </span>

<div>
  <h3>Com docker</h3>
  <span>Na versão mais atual docker</span>
  <code>docker compose up</code><br>
  <span>Nas versões mais antigas docker</span>
  <code>docker-compose up</code><br>
</div>
<span></span>
<div>
  <h3>Sem docker</h3>
  <code>yarn dev</code>
</div>

<span >Porta do Projeto -----> 3310</span>
