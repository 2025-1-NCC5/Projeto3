# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
<a href="https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" border="0"></a>
</p>

# Estimador de Preços de Corridas

## Nome do Grupo - insightmob

## Integrantes: 
- [Ruan Paulo](https://www.linkedin.com)
- [Rafael Ferreira](https://www.linkedin.com)
- [Yasmin Ribeiro](https://www.linkedin.com)
- [Vinicius Binda](https://www.linkedin.com)

## Professores Orientadores: 
- [Renata Muniz](https://www.linkedin.com)
- [Vinicius Heltai](https://www.linkedin.com)
- [Rafael Rossetti](https://www.linkedin.com)
- [Marcos Minoru](https://www.linkedin.com)
- [Rodrigo da Rosa](https://www.linkedin.com)

## Nome da Empresa
[Khipo](https://www.linkedin.com)

## Descrição

<p align="center">
<img src="src/insightmob/assets/InsightMob (1).png" alt="Estimador de Preços" border="0">
</p>

Este projeto tem como objetivo desenvolver modelos de Machine Learning capazes de prever o preço estimado de corridas para três categorias de serviço: UberX, Uber Comfort e Uber Black. O sistema considera múltiplos fatores, como distância, tempo estimado, demanda e condições de tráfego. Como diferencial, também pode utilizar dados de outras empresas (como 99 ou transporte público) para sugerir a forma mais barata de chegar ao destino, tornando-se um estimador comparativo entre vários serviços.


## 🛠 Estrutura de pastas

- **documentos/**: Documentação do projeto, separada por entregas e disciplinas.
- **imagens/**: Imagens utilizadas no sistema e na documentação.
- **src/**: Código-fonte do projeto.
  - **insightmob/**: Aplicativo desenvolvido em React Native.
  - **API/**: Código da API, hospedada em nuvem (Railway).
- **.gitattributes, .gitignore**: Arquivos de configuração do Git.
- **README.md**: Este arquivo de explicação geral do projeto.

Exemplo da estrutura:
```
Projeto3/
│
├── documentos/
│   ├── Entrega 1/
│   ├── Entrega 2/
│   └── Entrega 3/
├── imagens/
├── src/
│   ├── API/
│   └── insightmob/
│       ├── assets/
│       └── screens/
├── .gitattributes
├── .gitignore
└── README.md
```

## 🎯 Objetivo da Aplicação

Uber oferece diferentes categorias de serviço, cada uma com um preço distinto baseado em múltiplos fatores, como distância, tempo estimado, demanda e condições de tráfego. O desafio é criar modelos de Machine Learning capazes de prever o preço estimado das corridas para três categorias: UberX, Uber Comfort e Uber Black. Como extra, podem ser utilizados dados de outras empresas como 99 ou transporte público para estimar a forma mais barata de chegar ao local desejado, gerando assim um estimador entre vários serviços.

## 🚩 Desafio

Desenvolver modelos de Machine Learning que possam prever o campo `Price` da tabela `rideestimative`, utilizando como entrada:
- As características da corrida registradas nas tabelas ride (sem utilizar o campo `Price` dessa tabela), rideestimative e product.
- As estimativas de preços de outras categorias de serviço como variáveis auxiliares.

## 📏 Regras

- Não é permitido utilizar diretamente o campo `Price` da tabela `ride` como feature no modelo.
- O objetivo é maximizar a acurácia das previsões por meio da escolha adequada de features, técnicas de engenharia de dados e modelos.
- A solução pode ser baseada em modelos de regressão, redes neurais ou outras abordagens adequadas.

## 🛠 Instalação

<b>Android:</b>

No momento, não há APK disponível para instalação.

## 💻 Configuração para Desenvolvimento

### API
A API está hospedada na Railway e pode ser acessada em: [https://insightmob.up.railway.app/](https://insightmob.up.railway.app/)

O código da API está em `src/API/`.

### Aplicativo React Native
O aplicativo está localizado em `src/insightmob/`.

Para rodar o app localmente, é necessário ter o ambiente React Native configurado. Exemplo de comandos:
```sh
cd src/insightmob
npm install
npx react-native run-android ou run-ios
```

### Dependências gerais
- Python 3.x (se necessário para scripts auxiliares)
- Node.js e npm (para o app React Native)
- (Adicione outras dependências, como bibliotecas específicas, se houver)



## 📋 Licença/License
Utilize o link <https://chooser-beta.creativecommons.org/> para fazer uma licença CC BY 4.0.


