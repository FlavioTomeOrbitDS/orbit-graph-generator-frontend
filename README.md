## Orbit Gaph Data Generator - Frontend

## Descrição do Projeto:
---

O Graph Data Generator é um web app que recebe uma tabela de dados no formato .xlsx do usuário e, em seguida, processa as informações gerando um outro arquivo .xlsx contendo uma tabela com os Vértices, Rótulos e Pesos de um grafo.

O frontend deste projeto foi gerado utilizando o Framework Angular na versão 13.3.1.

O site gerado pelo projeto possui 2 páginas:

  1. A página de login, na qual o login é feito por meio de um usuário previamente cadastrado.
  2. A página principal, que possui um text input e um botão para que o usuário realize o upload de um arquivo no formato .xlsx. O arquivo deve conter uma tabela de menções de palavras chave em um determinado contexto. Assim que o usuário fizer o upload do arquivo, um botão para iniciar o processo de exportação dos dados é mostrado.
  

## Páginas da Aplicação
---
### Login page:
![login](https://user-images.githubusercontent.com/115179333/231564054-27ee01f8-f99c-409a-aea0-a11302f113fc.png)

### Index Page:
![main](https://user-images.githubusercontent.com/115179333/231564125-8b7d8273-6893-44c2-a18a-4bafe3eef2fa.png)

## Manual de utilização
  * O usuário deve informar o login e a senha padrão para acessar o sistema. Não há cadastro de usuários.  
  ### Etapas para a produção dos dados:
  1. Primeiramento o usuário deve fazer o upload do arquivo no formato .xlsx contendo a tabela de menções a serem analizadas. O arquivo precisa estar formatado da seguinte maneira:  
  
  ![data-format](https://user-images.githubusercontent.com/115179333/231565526-15ae0f7e-a544-4dc0-b45a-08b0b454538a.png)  
  
  * A **linha 1** deve conter as palavras ou frases chave da tabela;
  * Cada palavra ou frase chave deve ocupar 1 coluna iniciando na **Coluna A**;
  * As demais linhas e colunas devem ser assinaladas somente com valores numéricos;
  * Qualquer arquivo no formato diferente do padrão irá resultar em erro ou em valores inconsistentes;  
  
  2. Depedendo do tamanho do arquivo, o upload pode demorar até alguns segundos;
  3. Assim que o upload estiver completo, o usuário deverá clicar no botão **Iniciar Processo!**. Novamente, dependendo da quantidade de dados a serem processados, o processamento pode demorar alguns segundos;
  4. Assim que os dados estiverem prontos, será feito automaticamente o download de um arquivo no formato .xlsx contendo com a seguinte estrutura:  
  
  ![result](https://user-images.githubusercontent.com/115179333/231569055-d6e9d8d1-3d3f-4552-8804-88dc742f272c.png)
  
  * As colunas A e B são as palavras-chave (vértices do grafo), e a coluna **TOTAL** é a quantidade de menções que possuem as 2 palavras-chave na tabela (peso da relação no grafo). 



## Instalação e Configuração
---
### Pré-requisitos

Para executar este projeto, é necessário ter o seguinte software instalado em sua máquina:

* Node.js (v14.18.1 ou superior)
* Angular CLI (v13.0.4 ou superior)

### Instalação
1. Clone o repositório do projeto no seu computador.
```
  git clone https://github.com/FlavioTomeOrbitDS/orbit-graph-generator-frontend.git
```

2. Abra o terminal ou prompt de comando e navegue até o diretório raiz do projeto.
```
 ...\orbit-graph-generator-frontend>
```
3. Execute o comando npm install para instalar todas as dependências do projeto.
```
 ...\orbit-graph-generator-frontend>npm install
```

## Executando o projeto
---
1. Para executar o projeto, execute o comando ng serve na raiz do projeto.
```
 ...\orbit-graph-generator-frontend>ng serve
```

2. Em seguida, abra o navegador e acesse http://localhost:4200/ para visualizar a página de login.

## Estrutura do Projeto
---
```
.
├── src/
│   ├── app/
│   │   ├── components/                  # Componentes reutilizáveis em toda a aplicação
│   │   ├── app-routing.module.ts        # Definição das rotas da aplicação
│   │   ├── app.component.html          # Template principal da aplicação
│   │   ├── app.component.ts            # Código do componente principal da aplicação
│   │   └── app.module.ts                # Definição dos módulos da aplicação
│   ├── assets/                          # Arquivos estáticos
```

## Deploy da aplicação no Google Firebase
---
O Google Firebase é uma plataforma de desenvolvimento de aplicativos móveis e web que oferece diversos serviços, incluindo hospedagem de sites estáticos. Para realizar o deploy da aplicação Angular no Firebase, siga os passos abaixo:

1. Crie uma conta no Google Firebase e faça o login no console do Firebase.

2. Crie um novo projeto no Firebase e configure o serviço de hospedagem seguindo as instruções do console.

3. No terminal, execute o comando npm run build para gerar a versão de produção da aplicação. Isso criará uma pasta dist na raiz do projeto com os arquivos otimizados para produção.
```
...\orbit-graph-generator-frontend>npm run build
```

4. Instale a ferramenta Firebase CLI globalmente na sua máquina com o seguinte comando:
```
...\orbit-graph-generator-frontend>npm install -g firebase-tools
```
5. Inicie o processo de login com o Firebase CLI executando o comando firebase login. Siga as instruções na tela para autenticar sua conta.

6. No terminal, navegue até a pasta **dist** criada no passo 3 e execute o comando firebase init. Isso iniciará um processo de configuração do Firebase Hosting para o projeto.
```
...\orbit-graph-generator-frontend\dist>firebase init
```
7. Siga as instruções na tela para configurar o Firebase Hosting. Quando perguntado sobre qual pasta deve ser usada como diretório público, informe a pasta **dist**.

8. Após a conclusão da configuração, execute o comando firebase deploy para realizar o deploy da aplicação no Firebase Hosting.
```
...\orbit-graph-generator-frontend>firebase deploy
```

9. Após o deploy ser concluído, a aplicação Angular estará disponível no URL fornecido pelo Firebase Hosting.

Dessa forma, você pode realizar o deploy da aplicação Angular no serviço de hospedagem do Google Firebase. Vale lembrar que é importante seguir as instruções com cuidado e garantir que todas as configurações estejam corretas antes de realizar o deploy.
