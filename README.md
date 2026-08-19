# APEX Rodas — Landing Page de Loja de Rodas

## Integrantes

- [Nome do integrante 1]
- [Nome do integrante 2]

## Sobre o produto

A **APEX Rodas** é uma landing page de uma loja fictícia especializada em rodas
esportivas e de liga leve. O objetivo da página é apresentar a loja, exibir um
catálogo com mais de 360 produtos (com busca, filtros por categoria e aro e
preço), explicar como funciona o pedido e levar o visitante a uma ação de
compra pelo WhatsApp.

O público-alvo são entusiastas de carros (JDM, muscle, arrancada e stance) que
buscam personalizar o veículo e comparar rodas de forma rápida, com visual
profissional e navegação simples.

## Jornada de construção

### Ideia inicial

A dupla queria uma landing page de e-commerce que fosse ao mesmo tempo bonita e
funcional. A primeira ideia era um site genérico de "loja de acessórios
automotivos". Depois de conversar, focamos em um nicho mais específico: **rodas
esportivas e de liga leve**, que permitia um catálogo rico (muitas variações de
aro, marcas e estilos) e um visual marcante.

Alternativas consideradas:

- Loja de peças de performance em geral (descartada por ficar genérica demais);
- Estética dark/automotiva com vermelho (descartada pela dupla preferir um
  visual mais limpo e "premium");
- Aproveitar o layout que já existia (estilo Apple, cores azul e branco) e
  apenas refiná-lo — **esta foi a escolha final**, pois já agradava.

### Pesquisa e referências

- Pesquisamos páginas de lojas de rodas reais no Brasil para entender quais
  informações o cliente espera (marcas, aro, furação, preço);
- Como referência visual, usamos o estilo de sites da Apple: fundo claro,
  muito espaço em branco, tipografia grande, cantos arredondados e um azul de
  destaque para ações;
- Consultamos bancos de imagens gratuitos (Pexels) para encontrar fotos de
  rodas sem marca d'água para o catálogo;
- A estrutura de uma landing page foi pensada a partir de boas práticas de
  conversão: hero → catálogo → como funciona → depoimentos → FAQ → CTA.

### Ferramentas utilizadas

- HTML, CSS e JavaScript (vanilla, sem frameworks)
- VS Code / OpenCode
- Python com a biblioteca Pillow (para otimizar e gerar as imagens dos produtos)
- Pexels (imagens royalty-free)
- Navegador (testes e inspeção)

### Uso de IA

Utilizamos um assistente de IA de código (OpenCode) durante todo o
desenvolvimento. O modelo ajudou em:

- **Repaginação visual**: refinamos o CSS (cores, espaçamentos, estados de
  hover, responsividade) mantendo o layout que a dupla já gostava;
- **Novas funcionalidades**: menu hambúrguer, scrollspy (destacar o link da
  seção ativa), paginação "Carregar mais", barra de estatísticas;
- **Otimização de desempenho**: identificação de que a fonte do Google Fonts
  bloqueava a renderização e remoção dela; compressão das imagens para WebP;
- **Geração de imagens**: um script em Python/Pillow que criou uma foto única
  para cada anúncio, sobrepondo o modelo, o aro e o preço sobre as fotos-base.

Sugestões da IA que foram mantidas: remoção do carrossel de marcas, uso de
imagens locais sem marca d'água, paginação para acelerar o carregamento.

Sugestões da IA que foram ajustadas/descartadas:

- **Fotos com marca d'água**: inicialmente a IA sugeriu manter as fotos do
  fornecedor; a dupla preferiu trocar por fotos royalty-free;
- **Redução agressiva de fotos**: em um momento, a IA reduziu o conjunto de
  26 para 13 fotos para "aliviar" o site; a dupla pediu para voltar as fotos
  anteriores e depois evoluímos para fotos únicas por anúncio;
- A IA sugeriu manter o catálogo com produtos duplicados; a dupla decidiu
  remover os anúncios repetidos para ficar mais profissional.

### Evolução da solução

O que mudou entre a primeira ideia e a versão final:

- **Cores e estilo**: mantivemos azul e branco, mas refinamos a paleta, o
  brilho sutil do hero e os estados de interação;
- **Navegação**: entrou o menu hambúrguer no mobile e o destaque da seção ativa
  no menu;
- **Remoção do carrossel**: a faixa animada de marcas foi retirada do meio da
  página;
- **Imagens**: trocamos fotos com marca d'água por fotos royalty-free, depois
  otimizamos para WebP, reduzimos/resolvemos questões de peso e, por fim,
  geramos **uma foto exclusiva por anúncio** (364 anúncios únicos);
- **Performance**: removemos o carregamento de fonte externa, adicionamos
  carregamento preguiçoso e paginação;
- **Conteúdo da página**: adicionamos as seções **Como funciona**,
  **Depoimentos** (prova social), **FAQ** e um **CTA final**, para atender a
  proposta de landing page completa.

### Resultado final

Avaliamos o resultado como muito positivo: a página ficou com identidade
visual consistente (azul e branco), carregamento rápido (tudo local, sem
dependência de internet), catálogo funcional com busca/filtros e todas as
seções de uma boa landing page, com CTAs funcionais (WhatsApp e modal).

Se tivéssemos mais tempo, faríamos diferente:

- Criaríamos um carrinho de compras e checkout simulados;
- Testaríamos a página em mais dispositivos e navegadores;
- Estudaríamos cores e hierarquia visual com mais profundidade (testes A/B);
- Poderíamos usar fotos de rodas mais variadas, com fundos padronizados.

---

## Como executar

Abra o arquivo `index.html` no navegador, ou sirva a pasta com um servidor simples:

```bash
npx serve .
```