document.addEventListener('DOMContentLoaded', () => {
    const botaoGerar = document.getElementById('gerarTitulo');
    const resultadoDiv = document.getElementById('resultado');

    botaoGerar.addEventListener('click', async () => {
        try {
            botaoGerar.disabled = true;
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading';
            resultadoDiv.innerHTML = '';
            resultadoDiv.appendChild(loadingDiv);

            const response = await fetch(`${config.API_URL}?key=${config.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Me gere um título ridículo de anime isekai. Só me dê o título e mais nada."
                        }]
                    }]
                })
            });

            const data = await response.json();
            
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                resultadoDiv.textContent = data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Resposta inválida da API');
            }
        } catch (error) {
            console.error('Erro:', error);
            resultadoDiv.textContent = 'Erro ao gerar título. Tente novamente.';
        } finally {
            botaoGerar.disabled = false;
        }
    });
}); 