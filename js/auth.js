// Configuração da URL base da API
const API_BASE_URL = 'http://localhost:8080'; // Ajuste para a URL da sua API

// Funções para interagir com a API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
}

// Função para carregar dados quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Aqui você pode adicionar a lógica inicial da sua aplicação
    console.log('Aplicação iniciada!');
}); 