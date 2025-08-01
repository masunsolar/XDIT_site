# X-DIT – Plataforma de Gestão Fiscal Inteligente

## Descrição do Projeto

O **X-DIT** é um MVP de uma plataforma fiscal como serviço (SaaS) desenvolvida para resolver um dos principais problemas das empresas de médio porte brasileiras: a gestão eficiente de documentos fiscais eletrônicos (NF-e, CT-e e NFS-e). A solução combina **usabilidade**, **validações fiscais inteligentes** e **escalabilidade**, oferecendo uma alternativa moderna aos sistemas básicos gratuitos e aos softwares corporativos complexos e caros.

## Objetivo da Startup

Nosso objetivo é transformar a gestão fiscal das empresas brasileiras, especialmente escritórios de contabilidade, transportadoras e prestadores de serviço que lidam com múltiplos CNPJs. O X-DIT centraliza e valida documentos fiscais automaticamente, evitando erros e reduzindo custos operacionais.

**Problema que resolvemos:**

* Gestão manual e descentralizada de múltiplos CNPJs.
* Alto risco de erros fiscais (CFOP, CST, alíquotas) e autuações.
* Falta de soluções intermediárias acessíveis e completas.

**Nossa solução:**

* Plataforma SaaS leve e responsiva.
* Validações fiscais proativas e alertas automáticos.
* Módulo multiempresa com controle de acesso seguro.
* Importação em lote de XML e relatórios estratégicos.

## Tecnologias Utilizadas

**Frontend:** HTML5, CSS3, JavaScript (estrutura atual do MVP)
**Backend planejado:** Node.js ou Cloud Functions (Firebase/Supabase)
**Banco de dados planejado:** PostgreSQL
**Infraestrutura:** Cloud (Firebase/Supabase)
**Controle de versão:** Git
**Padrão de interface:** Responsiva e otimizada para web

## Estrutura do Projeto

```
XDIT/
├── main.html              # Página principal do site
├── script.js              # Lógica básica de interação
├── css/                   # Estilos organizados em módulos
│   ├── style.css
│   ├── base/              # Reset, tipografia, utilitários
│   ├── components/        # Botões, cards, gráficos, etc.
│   ├── layout/            # Estrutura geral (header, footer, seções)
│   └── vendors/           # Fontes e recursos externos
├── login/                 # Tela de login e estilos
├── images/                # Logos, ícones e imagens de apoio
└── README.md              # Documentação (este arquivo)
```

## Funcionalidades do MVP Atual

* **Interface Web Responsiva:** HTML, CSS e JS com design limpo e moderno.
* **Tela de Login:** Prototipagem inicial de autenticação.
* **Layout Modular:** Estrutura de componentes reutilizáveis (cards, botões, gráficos, etc.).
* **Base Preparada para Expansão:** Código organizado para futura migração para frameworks modernos (ex.: React ou Next.js).

## Como Rodar Localmente

1. **Pré-requisitos:**

   * Navegador moderno (Chrome, Edge ou Firefox)
   * (Opcional) Servidor local (ex.: VS Code Live Server, Node.js HTTP server)

2. **Clonar o repositório:**

```bash
git clone https://github.com/masunsolar/XDIT_site
cd xdit
```

3. **Executar localmente:**

* Abrir `main.html` diretamente no navegador, ou
* Utilizar um servidor local:

```bash
# Exemplo com Node.js
globally install http-server (npm install -g http-server)
http-server .
```

Acesse em: `http://localhost:8080`

## Contribuindo

Quer contribuir com o desenvolvimento do X-DIT? Siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature ou correção (`git checkout -b feature/nome`)
3. Commit suas alterações (`git commit -m 'Minha melhoria'`)
4. Envie para o seu fork (`git push origin feature/nome`)
5. Abra um Pull Request

Sinta-se à vontade para abrir **issues** com sugestões ou bugs encontrados.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato e Links Úteis

* **Whatsapp:** [WhatsApp]((18)98118-1788) (em desenvolvimento)
* **E-mail:** [companyxdit@gmail.com](mailto:companyxdit@gmail.com)

---

**X-DIT** – Transformando a gestão fiscal em inteligência estratégica.