        // Carrega os registros do localStorage
        function loadRecordsFromLocalStorage() {
            return JSON.parse(localStorage.getItem('meiRecords')) || [];
        }

        // Variáveis globais
        let records = loadRecordsFromLocalStorage();
        let totalIncome = 0;
        let totalExpenses = 0;
        let financeChart = null;
        // Inicializa a aplicação
        function initializeApplication() {
            // Configura a data padrão para hoje
            document.getElementById('date').valueAsDate = new Date();
            
            // Carrega e renderiza os registros, atualiza totais e gráfico
            renderRecordsTable();
            updateTotals();
            renderChart();
            
            // Configura os eventos
            setupEventListeners();
        }

        // Inicialização
        document.addEventListener('DOMContentLoaded', initializeApplication);

        // Configura os listeners de eventos
        function setupEventListeners() {
            document.getElementById('serviceForm').addEventListener('submit', function(event) {
                event.preventDefault();
                addNewRecord();
            });
            
            document.getElementById('filterBtn').addEventListener('click', applyFilters);
            document.getElementById('resetBtn').addEventListener('click', resetFilters);
            document.getElementById('exportBtn').addEventListener('click', exportToExcel);
        }

        // Reseta o formulário de novo registro
        function resetNewRecordForm() {
            document.getElementById('serviceForm').reset();
            document.getElementById('date').valueAsDate = new Date();
        }

        // Adiciona um novo registro
        function addNewRecord() {
            const description = document.getElementById('description').value.trim();
            const value = parseFloat(document.getElementById('value').value);
            const date = document.getElementById('date').value;
            const type = document.getElementById('type').value;
            
            if (!description || isNaN(value) || value <= 0 || !date) {
                alert('Por favor, preencha todos os campos corretamente e o valor deve ser positivo.');
                return;
            }
            
            const newRecord = {
                id: Date.now(),
                date,
                description,
                value,
                type
            };
            
            records.push(newRecord);
            saveRecords();
            renderRecordRow(newRecord);
            updateTotals();
            renderChart();
            
            resetNewRecordForm();
        }

        // Renderiza um registro na tabela
        function renderRecordRow(record) {
            const tableBody = document.getElementById('recordsTable').querySelector('tbody');
            const newRow = tableBody.insertRow();
            
            newRow.setAttribute('data-id', record.id);
            newRow.setAttribute('data-type', record.type);
            newRow.setAttribute('data-date', record.date);
            
            newRow.insertCell(0).textContent = formatDate(record.date);
            newRow.insertCell(1).textContent = record.description;
            
            const valueCell = newRow.insertCell(2);
            valueCell.textContent = record.value.toFixed(2);
            valueCell.className = record.type === 'renda' ? 'income' : 'expense';
            
            const typeCell = newRow.insertCell(3);
            typeCell.textContent = record.type === 'renda' ? 'Receita' : 'Despesa';
            typeCell.className = record.type === 'renda' ? 'income' : 'expense';
            
            const actionCell = newRow.insertCell(4);
            actionCell.className = 'action-buttons';
            actionCell.innerHTML = `
                <button onclick="editRecord(${record.id})" class="btn-primary">Editar</button>
                <button onclick="deleteRecord(${record.id})" class="btn-danger">Excluir</button>
            `;
        }

        // Renderiza todos os registros na tabela
        function renderRecordsTable() {
            const tableBody = document.getElementById('recordsTable').querySelector('tbody');
            tableBody.innerHTML = ''; // Limpa a tabela antes de renderizar
            
            records.forEach(record => {
                renderRecordRow(record);
            });
        }


        function updateTotalsDisplay() {
            document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
            document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
            document.getElementById('totalProfit').textContent = (totalIncome - totalExpenses).toFixed(2);
            
            // Atualiza as cores do lucro
            const profitElement = document.getElementById('totalProfit');
            const profit = totalIncome - totalExpenses;
            
            if (profit > 0) {
                profitElement.className = 'income';
            } else if (profit < 0) {
                profitElement.className = 'expense';
            } else {
                profitElement.className = '';
            }
        }

        // Calcula o resumo financeiro (receita, despesa, lucro)
        function calculateFinancialSummary(recordsArray) {
            const income = recordsArray
                .filter(r => r.type === 'renda')
                .reduce((sum, r) => sum + r.value, 0);
                
            const expenses = recordsArray
                .filter(r => r.type === 'gastos')
                .reduce((sum, r) => sum + r.value, 0);
                
            const profit = income - expenses;
            
            return { income, expenses, profit };
        }

        // Atualiza os totais
        function updateTotals() {
            const summary = calculateFinancialSummary(records);
            totalIncome = summary.income;
            totalExpenses = summary.expenses;
            
            updateTotalsDisplay();
        }

        // Edita um registro
        function editRecord(id) {
            const record = records.find(r => r.id === id);
            if (!record) return;
            
            document.getElementById('description').value = record.description;
            document.getElementById('value').value = record.value;
            document.getElementById('date').value = record.date;
            document.getElementById('type').value = record.type;
            
            // Remove o registro antigo
            deleteRecord(id, false);
        }

        // Remove um registro da tabela
        function removeRecordRowFromDOM(id) {
            const row = document.querySelector(`tr[data-id="${id}"]`);
            if (row) row.remove();
        }

        // Exclui um registro
        function deleteRecord(id, updateStorage = true) {
            const recordIndex = records.findIndex(r => r.id === id);
            if (recordIndex === -1) return;
            
            const record = records[recordIndex];
            records.splice(recordIndex, 1);
            
            if (updateStorage) {
                saveRecords();
                updateTotals();
                renderChart();
            }
            
            removeRecordRowFromDOM(id);
        }

        // Aplica os filtros
        function applyFilters() {
            const filterDate = document.getElementById('filterDate').value;
            const filterType = document.getElementById('filterType').value;
            const filterMonth = document.getElementById('filterMonth').value;
            
            const rows = document.getElementById('recordsTable').querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const rowDate = row.getAttribute('data-date');
                const rowType = row.getAttribute('data-type');
                const rowMonth = rowDate.split('-')[1];
                
                let showRow = true;
                
                if (filterDate && rowDate !== filterDate) showRow = false;
                if (filterType !== 'all' && rowType !== filterType) showRow = false;
                if (filterMonth !== 'all' && rowMonth !== filterMonth) showRow = false;
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        // Reseta os filtros
        function resetFilters() {
            document.getElementById('filterDate').value = '';
            document.getElementById('filterType').value = 'all';
            document.getElementById('filterMonth').value = 'all';
            
            const rows = document.getElementById('recordsTable').querySelectorAll('tbody tr');
            rows.forEach(row => row.style.display = '');
        }

        // Exporta para Excel
        function exportToExcel() {
            const table = document.getElementById('recordsTable');
            const wb = XLSX.utils.book_new();
            
            // Prepara os dados
            const ws_data = [
                ['Data', 'Descrição', 'Valor (R$)', 'Tipo']
            ];
            
            // Adiciona os registros filtrados
            const rows = document.getElementById('recordsTable').querySelectorAll('tbody tr:not([style*="display: none"])');
            
            rows.forEach(row => {
                if (row.style.display === 'none') return;
                
                const cells = row.cells;
                ws_data.push([
                    cells[0].textContent,
                    cells[1].textContent,
                    parseFloat(cells[2].textContent),
                    cells[3].textContent
                ]);
            });
            
            const ws = XLSX.utils.aoa_to_sheet(ws_data);
            XLSX.utils.book_append_sheet(wb, ws, "Registros MEI");
            
            // Gera a data para o nome do arquivo
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            
            XLSX.writeFile(wb, `registros_mei_${dateStr}.xlsx`);
        }

        // Renderiza o gráfico
        function renderChart() {
            const ctx = document.getElementById('financeChart').getContext('2d');
            
            // Agrupa por mês
            const monthlyData = {};
            
            records.forEach(record => {
                const month = record.date.substring(0, 7); // YYYY-MM
                
                if (!monthlyData[month]) {
                    monthlyData[month] = { income: 0, expenses: 0 };
                }
                
                if (record.type === 'renda') {
                    monthlyData[month].income += record.value;
                } else {
                    monthlyData[month].expenses += record.value;
                }
            });
            
            // Ordena os meses
            const sortedMonths = Object.keys(monthlyData).sort();
            
            // Prepara os dados para o gráfico
            const labels = sortedMonths.map(month => {
                const [year, monthNum] = month.split('-');
                return `${monthNum}/${year}`;
            });
            
            const incomeData = sortedMonths.map(month => monthlyData[month].income);
            const expensesData = sortedMonths.map(month => monthlyData[month].expenses);
            
            // Destrói o gráfico anterior se existir
            if (financeChart) {
                financeChart.destroy();
            }
            
            // Cria o novo gráfico
            financeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Receitas',
                            data: incomeData,
                            backgroundColor: 'rgba(0, 212, 255, 0.7)',
                            borderColor: 'rgba(0, 212, 255, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Despesas',
                            data: expensesData,
                            backgroundColor: 'rgba(255, 56, 96, 0.7)',
                            borderColor: 'rgba(255, 56, 96, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    animation: {
                        duration: 1000
                    }
                }
            });
        }

        // Formata a data para exibição
        function formatDate(dateStr) {
            const [year, month, day] = dateStr.split('-');
            return `${day}/${month}/${year}`;
        }

        // Salva os registros no localStorage
        function saveRecords() {
            localStorage.setItem('meiRecords', JSON.stringify(records));
        }
