# Contribuindo para o desenvolvimento do React Social Network

Nós damos boas-vindas aos Pull Requests (PR's), bem como a pessoas trabalhando na correção de problemas atuais. Se você está vindo para este projeto novo e se você notar um problema com esta aplicação, sinta-se à vontade para abrir um problema.

Muitos programadores preferem perguntar se podem contribuir ou ser-lhes atribuída uma tarefa como resposta a um problema relatado no separador Problemas. Isso é ótimo. Temos uma política no gate-keeping em nenhum destes projectos. É bem-vindo a trabalhar em qualquer tarefa/questão, basta que nos informe que vai trabalhar num problema.
Se não tiveres a certeza do estilo e do design, há uma discussão aqui: <https://github.com/gbowne1/reactsocialnetwork/discussions/36>. Normalmente, se você acha que vai levar mais de 72 horas depois de ter sido atribuído, para enviar um PR, avise-nos para que as questões não fiquem paradas.

Algumas tarefas podem não ser amigáveis para iniciantes, mesmo que sejam marcadas como `good first issue`, então tente julgar a tarefa de acordo. Se fores um iniciante, existem tarefas mais pequenas em que um iniciante pode trabalhar, tais como questões de estilo.

Você já deve estar familiarizado com React 17 e/ou 18, JavaScript ES5/ES6/ES7.

## Estilo

Ainda não criei um guia de estilo oficial. Se alguém quiser criar um guia de estilo para nós, cria uma discussão.

O layout é um layout de 3 colunas, começando com a visualização desktop com um painel esquerdo de 200-250px, um painel central de 1400-1500px e um painel direito de 200-250px, semelhante à visualização desktop do Facebook quando se olha para a root '/'.

## Desenvolvimento

Se você não tem certeza sobre o que trabalhar, reveja a lista de problemas. Existem também TODO's listados no ficheiro TODO.md.

**Nota:** No caso de precisares de construir um UI podes usar um dos nossos [reusable-components](REUSABLE_COMPONENTS.md) (localizado em [src/components](../src/components) ), para não ter que reinventar a roda.

### PR's

Quando fizer um PR no GitHub, verifique se preencheu a secção à direita, Assignees, Reviewers, Labels, Projects, Milestone(s) e Development antes de submeter o PR. Partilhe também uma captura de ecrã ou mostre a correção funcional na mensagem do Pull Request e uma breve descrição do que foi corrigido. Problemas e descrições em branco podem não ser mesclados.

- Vincule um problema ao Development que o PR fechará
- Verifique se marcou um revisor, por exemplo, @gbowne1
- Escolha as etiquetas apropriadas em Labels
- Verifique-se de que você é o responsável pelo PR.
- Milestone, escolha Frontend ou Backend (mais informações podem vir mais tarde)

### Issues

O @gbowne1 irá atribuir utilizadores a problemas por ordem de chegada. No futuro, eu gostaria de ter um mínimo de 2 pessoas fazendo o Frontend e 2 pessoas fazendo o Backend, então nós podemos designar grupos específicos de pessoas cuidando de coisas como CSS, Componentes, etc.

## Editor & IDE

O repositório contém pastas com definições e configurações apropriadas ao projeto para Visual Studio e Visual Studio code, mas para além disso, somos agnósticos em termos de ferramentas e editores/IDE, por isso pode usar o editor ou IDE que quiser.

## Definições e Configuração

Os espaços de trabalho, definições, configurações e plugins incluídos são para:

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
Visual Studio 2019+ (.vs)
GitHub (.github)

Estas podem não estar 100% correctas, pelo que se puder contribuir para as tornar mais precisas para o desenvolvimento em React, será bem-vindo.

## Tech Stack

Este projeto foi bootstrapped com o Create React App.
Esta aplicação foi criada com:

- React 18.0 - 18.2
- CSS3
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- Node
- Express
- Material UI v5.11.6

## Branches

As nossas branches seguem o GitFlow / GitHub Flow como regra geral.

- [ main ] Branch principal de trabalho
- [ master ] Permanente // Branch de arquivo
- [ test ] código não testado
- Branch de funcionalidades # de funcionalidades - {feature}
- [bugfix - { bug corrigido }]
- [hotfix - { correção }]

Utilize uma branch de teste para submeter/enviar código que acredita que deve funcionar mas que não está completamente testado.
