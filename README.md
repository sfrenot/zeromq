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
