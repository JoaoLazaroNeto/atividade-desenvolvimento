# APEX Rodas

Landing page / loja de rodas esportivas e de liga leve. Catálogo com 408 produtos reais (rodas, pneus, acessórios e limpeza) com fotos, marcas e preços.

## Estrutura

```
apex-rodas/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos (estética limpa estilo Apple)
├── js/
│   ├── produtos.js     # Dados do catálogo (408 produtos)
│   └── app.js          # Lógica da página (busca, filtros, modal)
└── img/
    └── produtos/       # (reservado para imagens locais, se desejar)
```

## Como usar

Abra `index.html` no navegador ou sirva a pasta com um servidor simples:

```bash
npx serve .
```

## Funcionalidades

- Busca por modelo, marca ou aro
- Filtros por categoria (Rodas, Pneus, Acessórios, Limpeza)
- Filtro por aro (13 a 22)
- Modal de produto com pedido via WhatsApp

## Observações

- As fotos dos produtos agora são locais em `img/produtos/` (royalty-free, sem marca d'água), distribuídas por categoria (rodas, pneus, acessórios e limpeza). Para trocar, basta substituir os arquivos `roda-*.jpg`, `pneu-*.jpg`, `acessorio-*.jpg` e `limpeza-*.jpg`.
- WhatsApp: (41) 99211-4884 (número real do fornecedor).