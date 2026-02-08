# Finanças

Quantum MEI é uma aplicação web moderna e futurista para gerenciamento financeiro de microempreendedores individuais (MEI). Com interface intuitiva e visualizações em tempo real, ajuda empreendedores a controlar receitas, despesas e lucro líquido de forma eficiente.

✨ Funcionalidades
📊 Dashboard Interativo: Visualização em tempo real de receitas, despesas e lucro líquido

📈 Gráficos Dinâmicos: Representação visual dos dados financeiros com Chart.js

📝 Registro de Transações: Adição de receitas e despesas com descrição, valor e data

🔍 Sistema de Filtros: Filtre registros por data, tipo (receita/despesa) ou mês específico

📤 Exportação para Excel: Exporte todos os registros para planilha Excel com um clique

🗑️ Gestão de Registros: Edite ou exclua transações conforme necessário

📱 Design Responsivo: Interface adaptável para diferentes dispositivos

🎨 Tema Futurista: Design moderno com elementos visuais atrativos

🚀 Tecnologias Utilizadas
HTML5 - Estrutura da aplicação

CSS3 - Estilização com variáveis CSS e design responsivo

JavaScript (ES6+) - Lógica da aplicação

Chart.js - Gráficos e visualizações de dados

SheetJS (xlsx) - Exportação para Excel

Google Fonts - Fontes Roboto e Orbitron

📋 Pré-requisitos
Navegador web moderno com suporte a:

JavaScript habilitado

LocalStorage para armazenamento de dados

Canvas API para renderização de gráficos

🛠️ Instalação e Configuração
1. Clone o repositório
bash
git clone https://github.com/seu-usuario/quantum-mei.git
cd quantum-mei
2. Estrutura do Projeto
text
quantum-mei/
├── index.html          # Arquivo principal HTML
├── css/
│   └── styles.css      # Estilos da aplicação
├── js/
│   └── script.js       # Lógica JavaScript principal
└── README.md           # Este arquivo
3. Execução
Abra o arquivo index.html diretamente no navegador ou utilize um servidor local:

bash
# Usando Python
python -m http.server 8000

# Usando Node.js com http-server
npx http-server
Acesse: http://localhost:8000

🎯 Como Usar
Adicionar Registro
Preencha o formulário "NOVO REGISTRO"

Informe descrição, valor, data e tipo (Receita/Despesa)

Clique em "+ Adicionar"

Filtrar Registros
Use os filtros para visualizar dados específicos por:

Data específica

Tipo (Receitas, Despesas ou Todos)

Mês específico

Aplique ou limpe filtros conforme necessário

Exportar Dados
Clique em "Exportar para Excel" para baixar todos os registros

O arquivo será gerado no formato XLSX

Visualizar Gráficos
O gráfico é atualizado automaticamente com cada novo registro

Visualize a distribuição de receitas e despesas ao longo do tempo

📊 Armazenamento de Dados
Os dados são armazenados localmente no navegador utilizando LocalStorage, garantindo:

Persistência entre sessões

Privacidade dos dados (não enviados para servidores externos)

Performance otimizada

🔧 Personalização
Cores e Tema
As cores podem ser personalizadas editando as variáveis CSS no arquivo css/styles.css:

css
:root {
    --primary-color: #6a11cb;
    --secondary-color: #2575fc;
    --income-color: #00d4aa;
    --expense-color: #ff416c;
    /* Adicione suas customizações aqui */
}
Adicionar Novos Recursos
Estenda a função addRecord() para novos campos

Modifique updateDashboard() para novos cálculos

Atualize a tabela e filtros conforme necessário

🤝 Contribuindo
Contribuições são bem-vindas! Siga estes passos:

Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📝 Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

👥 Autores
Seu Nome - Desenvolvimento Inicial - SeuGitHub

🙏 Agradecimentos
Chart.js por fornecer excelentes bibliotecas de gráficos

SheetJS pela funcionalidade de exportação Excel

Google Fonts pelas fontes utilizadas

Comunidade open-source por todas as inspirações
