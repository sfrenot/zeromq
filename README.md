# zeromq
L'objectif de ce TD est de comprendre les idées principales de l'outil [ØMQ](http://zeromq.org/). Il s'agit d'une bibliothèque de communication bas-niveau, haute-performance, multi-langages, implantant différents modèles de communication.


## Environnement
Nous utilisons nodejs pour les tests.
La bibliothèque utilisée pour zeromq est le package node, zeromq.

Comme toujours, nous allons réaliser tout cela dans /tmp.

Lancez les commandes suivante pour installer l'environnement node
```bash
cd /tmp
wget https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.xz
tar zxvf node-v8.9.4-linux-x64.tar.xz
echo "export PATH=$(pwd)/node-v8.9.4-linux-x64/bin:$PATH" >> ~/.bashrc
. ~/.bashrc
```

Créez votre répertoire de travail
```bash
cd
mkdir td-zeromq
cd td-zeromq
npm install zeromq
```


## Démarrage du TD
Q1 : Quels sont les modèles de communication que vous connaissez ?

Q2 : Quels est le modèle imposé par les protocoles issus de TPC ?

Q3 : Quelles sont les grandes lignes, et les grandes contraintes associées ?

## Premier domaine : le request / reply

Le code suivant est un code serveur utilisant le domaine reply. (rep)  

```javascript
let zmq = require('zeromq');
let server = zmq.socket('rep');

server.on('message', function(request) {
  console.log(request.toString());
})

server.bindSync('tcp://*:6666');
```

Q4 : Ecrire le code client permettant d'envoyer un message sur le serveur. Pour cela :

1) Il faut utiliser le domaine 'req'
2) Utiliser la fonction de connexion connect sur
3) Utiliser la fonction d'envoie de message send

Lancez le client et vérifiez qu'il fonctionne.

Q5 : Relancez-le. Fonctionne-t-il toujours ? Que ce passe-t-il ?

Constatez-vous d'autres comportements surprenant ?

Vous pouvez décidez maintenant d'écouter sur plusieurs port. Ajoutez un nouveau bindSync au niveau du serveur ? Que constatez-vous ?

## Les autres domaines de communication
L'objectif maintenant est de comprendre que le domaine du client/serveur n'est pas seul. D'autres domaines existent et qu'il est intéressant de pouvoir les programmer efficacement.

Q6 : Donnez des exemples d'autres domaines de communication.

### Le Pull / Push (fire-and-forget)

Ici, le monde est séparé en deux : Ceux qui poussent, et ceux qui tirent. Lui, il tire...

```javascript
const socket = require('zeromq').socket('pull');

socket.connect('tcp://localhost:6666');
socket.on('message', function(msg) {
  console.log(`Message ${msg}`);  
});
```

Et toi, tu pousses...
Ecrire la socket serveur (bindSync), qui va pousser un message toute les deux secondes, dont le code partiel est le suivant.

```javascript
var counter = 0;

setInterval(function () {
  const message = `Ping #${counter++}`;
  //...
})
```

Q7 : Quand votre code fonctionne avec un pulleur, lancez un second pulleur en parallèle du premier.

A ce stade, vous devriez commencez à comprendre les objectifs d'une bibliothèque comme zeromq.

### Le Pub / Sub
Dans le modèle pub/sub, les messages sont envoyés dans des topics, il peut y avoir une infinité de clients 'consommant' les messages envoyés dans les topics.

Voici le code d'un publisher.
```javascript
const socket = require(`zeromq`).socket(`pub`);

socket.bindSync(`tcp://127.0.0.1:3000`);

const topic = `heartbeat`;

setInterval(function () {
	const timestamp = Date.now().toString();
	socket.send([topic, timestamp]);
}, 2000);
```

Q8 : Ecrire le code du client, sachant qu'il doit s'incrire au topic avec la fonction suivante :
`socket.subscribe(<topicname>)`

Lancez plusieurs subscribers à l'écoute du publisher et tirez-en vos conclusions.

---
Voici pour une courte présentation de zeromq. Une description complète se trouve ici http://zguide.zeromq.org/page:all. Il existe d'autres modèles de communication, mais nous avons survolé les principaux.

Zeromq, est également indépendant des langages de programmation utilisés.


# Refs
- https://codeblog.dotsandbrackets.com/inter-service-messaging-with-zeromq-node-js/

- http://zeromq.wdfiles.com/local--files/intro%3Aread-the-manual/Middleware%20Trends%20and%20Market%20Leaders%202011.pdf
