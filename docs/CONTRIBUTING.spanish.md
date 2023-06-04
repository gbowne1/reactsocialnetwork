# Contribuir al desarrollo de React Social Network

Damos la bienvenida a las Pull Requests (PR) y a las personas que trabajan en solucionar los problemas actuales. Si te unes a este proyecto por primera vez y encuentras un problema en esta aplicación, no dudes en abrir un issue.

Muchos desarrolladores prefieren preguntar si pueden contribuir o ser asignados a una tarea como respuesta a un problema reportado en la pestaña de Issues. Esto es genial. Tenemos una estricta política de no obstaculizar en ninguno de estos proyectos. Eres bienvenido a trabajar en cualquier tarea/problema, solo avísanos que trabajarás en él.
Si no estás seguro del estilo y el diseño, hay un problema aquí: <https://github.com/gbowne1/reactsocialnetwork/discussions/36>. Por lo general, si crees que te llevará más de 72 horas después de haber sido asignado para enviar una PR, avísanos para que los problemas no se queden estancados.

Algunas tareas pueden no ser adecuadas para principiantes, incluso si están etiquetadas como `good first issue`. Así que intenta juzgar la tarea en consecuencia. Si eres principiante, hay tareas más pequeñas en las que un principiante puede trabajar, como problemas de estilo.

Deberías estar familiarizado/a con React 17 y/o 18, JavaScript ES5/ES6/ES7.



## stilo

Todavía no he creado una guía de estilo oficial. Si alguien desea crear una guía de estilo para nosotros, crea una discusión al respecto.

El diseño es de tres columnas, comenzando con una vista de escritorio que consta de un panel izquierdo de 200-250px, un panel central de 1400-1500px y un panel derecho de 200-250px, similar a la vista de escritorio de Facebook cuando se mira la raíz '/'.

## Desarrollo

Si no estás seguro/a en qué trabajar, revisa la lista de problemas (issues). También hay tareas pendientes (TODO's) enumeradas en el archivo TODO.md incluido.

Nota: En caso de que necesites construir una interfaz de usuario, puedes utilizar uno de nuestros componentes reutilizables [reusable-components](REUSABLE_COMPONENTS.md) (located under [src/components](../src/components) ), para no tener que reinventar la rueda.


### PR's
Cuando hagas una PR en GitHub, asegúrate de completar la sección de la derecha con Assignees, Reviewers, Labels, Projects, Milestone(s) y Development antes de enviar la PR. Por favor, también comparte una captura de pantalla o muestra la solución funcional en el mensaje de la Pull Request, junto con una breve descripción de lo que has corregido. Los problemas y descripciones en blanco podrían no ser fusionados.

- Vincula un issue a Development que la PR cerrará.
- Asegúrate de etiquetar a un revisor, por ejemplo, @gbowne1.
- Elige las etiquetas apropiadas de Labels.
- Asegúrate de ser el asignado a la PR.
- Milestone, elige Frontend o Backend (pueden añadirse más en el futuro).


### Issues

@gbowne1 asignará usuarios a los issues según el orden de llegada. En el futuro, me gustaría que haya un mínimo de 2 personas trabajando en Frontend y 2 personas en Backend, para luego asignar grupos específicos de personas encargadas de cosas como CSS, Componentes, etc.


## Editor y IDE

El repositorio contiene carpetas con configuraciones y ajustes apropiados para el proyecto en Visual Studio y Visual Studio Code. Sin embargo, más allá de eso, somos agnósticos en cuanto a las herramientas, editores e IDEs, por lo que puedes usar el editor o IDE que prefieras.

## Configuración y ajustes

Los espacios de trabajo, configuraciones y complementos incluidos son para:

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
Visual Studio 2019+ (.vs)
GitHub (.github)


Es posible que no estén al 100% correctos, por lo que si puedes contribuir para que sean más precisos para el desarrollo de React, sería bienvenido.


## Stack Tecnológico

Este proyecto se inició con Create React App.
Esta aplicación está construida con:

- React 18.0 - 18.2
- CSS3
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- Node
- Express
- Material UI v5.11.6

## Ramas (Branches)

Nuestras ramas siguen la metodología GitFlow / GitHub Flow como regla general.

- [ main ] main working branch
- [ master ] Permanent // Archive branch
- [ test ] untested code
- Feature Branch # of feature - {feature}
- [bugfix - { fixed bug }]
- [hotfix - { fix }]

Utiliza una rama de prueba para hacer commit/push de código que creas que debería funcionar, pero que no ha sido completamente probado.