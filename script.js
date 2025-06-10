// script.js

// --- 1. Dados Estáticos: Explicações de Pontuação ---
// Este objeto 'punctuationExplanations' armazena as regras de uso para cada sinal de pontuação.
// Ele é fundamental para fornecer feedback educativo ao usuário quando ele comete um erro.
// Cada chave (ex: ',', '.', ';') é o sinal de pontuação em si.
// O valor associado a cada chave é um objeto contendo:
//   - 'name': O nome legível do sinal (ex: 'Vírgula').
//   - 'use': Uma descrição detalhada de quando e como usar esse sinal.
const punctuationExplanations = {
    ',': {
        name: 'Vírgula',
        use: 'A vírgula (,) é usada para indicar uma pequena pausa na leitura, separar elementos em uma enumeração, isolar apostos e vocativos, separar orações coordenadas assindéticas, e antes de algumas conjunções.'
    },
    '.': {
        name: 'Ponto final',
        use: 'O ponto final (.) é usado para indicar o fim de uma frase declarativa, abreviações, e em datas e horas.'
    },
    ';': {
        name: 'Ponto e Vírgula',
        use: 'O ponto e vírgula (;) é usado para separar itens de uma lista complexa, orações coordenadas que já contêm vírgulas, ou para indicar uma pausa maior que a vírgula, mas menor que o ponto final.'
    },
    '?': {
        name: 'Ponto de Interrogação',
        use: 'O ponto de interrogação (?) é usado no final de frases que expressam uma pergunta direta.'
    },
    '!': {
        name: 'Ponto de Exclamação',
        use: 'O ponto de exclamação (!) é usado no final de frases que expressam emoção, surpresa, admiração, alegria, raiva, dor, ordem ou súplica.'
    },
    ':': {
        name: 'Dois Pontos',
        use: 'Os dois pontos (:) são usados para introduzir uma citação, uma enumeração, uma explicação ou um esclarecimento de algo que foi dito anteriormente.'
    },
    '...': {
        name: 'Reticências',
        use: 'As reticências (...) são usadas para indicar interrupção da fala, hesitação, suspensão do pensamento, ou para sugerir que algo foi omitido.'
    },
    '“': {
        name: 'Aspas de Abertura',
        use: 'As aspas (“ ”) são usadas para iniciar citações diretas, destacar palavras ou expressões com sentido irônico, gírias, neologismos ou estrangeirismos.'
    },
    '”': {
        name: 'Aspas de Fechamento',
        use: 'As aspas (“ ”) são usadas para finalizar citações diretas, destacar palavras ou expressões com sentido irônico, gírias, neologismos ou estrangeirismos.'
    },
    '(': {
        name: 'Parênteses de Abertura',
        use: 'Os parênteses ( ) são usados para isolar explicações, comentários, informações complementares, datas e referências bibliográficas.'
    },
    ')': {
        name: 'Parênteses de Fechamento',
        use: 'Os parênteses ( ) são usados para isolar explicações, comentários, informações complementares, datas e referências bibliográficas.'
    },
    '-': {
        name: 'Hífen',
        use: 'O hífen (-) é usado para ligar elementos de palavras compostas, ligar pronomes átonos a verbos e para indicar a translineação (divisão de sílabas no fim da linha).'
    },
        '—': {
        name: 'Travessão',
        use: 'O travessão (—) é usado para indicar mudança de interlocutor em diálogos, destacar intervenções do narrador, isolar elementos explicativos ou enfatizar informações dentro da frase.'
    }
};

// --- 2. Dados Estáticos: Questões do Quiz ---
// Este array 'questions' contém todas as perguntas do quiz.
// Cada item no array é um objeto que representa uma única questão.
//   - 'type': Uma categoria para a questão (não diretamente usado na lógica atual, mas útil para organização).
//   - 'text': A frase da questão, onde '_' (sublinhado) marca o local das lacunas a serem preenchidas.
//   - 'correctAnswers': Um array que contém as pontuações corretas, na ordem exata das lacunas na 'text'.
const questions = [
    {
        type: 'comma',
        text: 'João vai à feira comprar maçãs_ peras_ e bananas_ e ele adora frutas frescas.',
        correctAnswers: [',', ',', '.']
    },
    {
        type: 'semicolon',
        text: 'Eu gosto de frutas_ ele_ de vegetais_ somos bem diferentes nos hábitos alimentares.',
        correctAnswers: [';', ';']
    },
    {
        type: 'questionMark',
        text: 'Você vai vir à festa_ Você está animado_ Espero que sim!',
        correctAnswers: ['?', '?']
    },
    {
        type: 'exclamationMark',
        text: 'Que dia lindo_ Socorro_ Fiquei presa no trânsito!',
        correctAnswers: ['!', '!']
    },
    {
        type: 'colon',
        text: 'A lista de compras é a seguinte_ pão_ leite e ovos_ precisamos de tudo isso para o café da manhã.',
        correctAnswers: [':', '.']
    },
    {
        type: 'semicolon',
        text: 'Ele estudou muito_ contudo_ não passou no exame_ Ela se esforçou_ no entanto_ conseguiu o que queria.',
        correctAnswers: [';', ';']
    },
    {
        type: 'ellipsis',
        text: 'Ela começou a falar_ mas parou no meio da frase_ Ela queria dizer algo_ mas hesitou visivelmente.',
        correctAnswers: ['...', '...']
    },
    {
        type: 'quotes',
        text: 'Ele disse_ Não sei se consigo_ Ela respondeu_ Você é capaz_ e deu um sorriso encorajador.',
        correctAnswers: ['“', '”', '“', '”']
    },
    {
        type: 'parentheses',
        text: 'O Brasil é o maior país da América do Sul_ sua capital é Brasília_ é um país tropical_ com uma vasta diversidade.',
        correctAnswers: ['(', ')', '.']
    },
    {
        type: 'mixed1',
        text: 'O livro_ que comprei_ é muito interessante_ você já o leu_ Ele tem me prendido bastante.',
        correctAnswers: [',', ',', '?']
    },
    {
        type: 'mixed2',
        text: 'Ele perguntou_ Onde você vai_ mas ela não respondeu_ A situação ficou um pouco estranha.',
        correctAnswers: ['“', '?', '”', '.']
    },
    {
        type: 'mixed3',
        text: 'Preciso de algumas coisas_ papel_ caneta_ e borracha_ você pode me ajudar_ Tenho uma prova importante.',
        correctAnswers: [':', ',', ',', '?']
    },
    {
        type: 'mixed4',
        text: 'Amanhã_ se o tempo permitir_ iremos à praia_ Que maravilha_ Estou ansioso!',
        correctAnswers: [',', ',', '!', '.']
    },
    {
        type: 'mixed5',
        text: 'Por favor_ traga_me um copo de água_ Ele disse_ com a voz fraca_ É urgente_ estou com muita sede.',
        correctAnswers: [',', '!', '“', '”', '!']
    },
    {
        type: 'mixed6',
        text: 'Eu acredito que_ embora difícil_ podemos alcançar nossos objetivos_ não é mesmo_ A persistência é chave.',
        correctAnswers: [',', ',', ',', '?']
    }
];

// --- 3. Variáveis de Estado do Quiz ---
// Estas variáveis controlam o progresso do quiz e a pontuação do usuário.
let currentQuestionIndex = 0; // O índice da questão atual que está sendo exibida (começa em 0).
let score = 0; // A pontuação total do usuário, começa em 0.
// 'userAnswersLog' armazenará um registro de cada questão respondida,
// incluindo as respostas do usuário e as corretas. Isso é usado para a revisão final.
let userAnswersLog = [];

// --- 4. Referências aos Elementos HTML (Seleção do DOM) ---
// Usamos 'document.getElementById()' para obter referências a elementos HTML.
// Isso nos permite manipular esses elementos (mudar texto, estilos, etc.) com JavaScript.
const questionNumberElement = document.getElementById('questionNumber'); // Onde o número da questão é exibido.
const questionTextElement = document.getElementById('questionText');     // Onde a frase com as lacunas é exibida.
const nextButton = document.getElementById('nextButton');               // O botão para avançar ou verificar.
const feedbackElement = document.getElementById('feedback');             // Onde mensagens curtas de feedback são mostradas (acerto/erro geral).
const errorExplanationBox = document.getElementById('errorExplanation'); // Onde as explicações detalhadas de erros são exibidas.

// --- 5. Opções de Pontuação Disponíveis ---
// Este array lista todas as opções de pontuação que aparecerão nos dropdowns (<select>) das lacunas.
const punctuationOptions = [',', '.', ';', '?', '!', ':', '...', '“', '”', '(', ')', '-', '—'];

// --- 6. Event Listeners (Ouvintes de Eventos) ---
// Estes são os "gatilhos" que fazem o JavaScript reagir a ações específicas.
// 'DOMContentLoaded': Ouve quando todo o HTML foi carregado e analisado pelo navegador.
//                     Quando isso acontece, a função 'loadQuestion' é chamada para exibir a primeira questão.
document.addEventListener('DOMContentLoaded', loadQuestion);
// 'click': Ouve quando o 'nextButton' é clicado. Quando isso acontece, a função 'handleNextButton' é chamada.
nextButton.addEventListener('click', handleNextButton);

/**
 * --- 7. Função loadQuestion() ---
 * Objetivo: Carrega e exibe a questão atual na interface do quiz.
 * Também lida com a transição para a tela de resultados quando todas as questões são respondidas.
 */
function loadQuestion() {
    // Primeiro, verifica se ainda há questões no array 'questions' para exibir.
    if (currentQuestionIndex < questions.length) {
        // Pega o objeto da questão atual usando o 'currentQuestionIndex'.
        const currentQuestion = questions[currentQuestionIndex];
        // Atualiza o texto do elemento 'questionNumberElement' para mostrar qual questão está sendo exibida.
        questionNumberElement.textContent = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;

        // Limpa o conteúdo de elementos da questão anterior para evitar acúmulo.
        questionTextElement.innerHTML = '';    // Limpa a frase da questão.
        feedbackElement.textContent = '';      // Limpa qualquer mensagem de feedback.
        feedbackElement.className = '';        // Remove qualquer classe de estilo de feedback (verde/vermelho).
        
        // Verifica se a caixa de explicação de erro existe antes de manipulá-la.
        if (errorExplanationBox) {
            errorExplanationBox.innerHTML = '';      // Limpa o conteúdo da caixa de explicação de erro.
            errorExplanationBox.style.display = 'none'; // Esconde a caixa de explicação de erro.
        }
        
        // Reinicia o texto do botão para "Avançar" para a nova questão.
        nextButton.textContent = 'Avançar';
        // Garante que o botão esteja habilitado para o usuário interagir.
        nextButton.disabled = false;

        // Divide o texto da questão em partes usando o '_' como delimitador.
        // Ex: "Olá_mundo" se torna ['Olá', 'mundo'].
        const textParts = currentQuestion.text.split('_');
        // Itera sobre cada parte do texto para construir a frase com as lacunas dinamicamente.
        textParts.forEach((part, index) => {
            // Cria um novo elemento 'span' para a parte textual da frase.
            const textSpan = document.createElement('span');
            // Define o texto desse 'span' como a parte atual da frase.
            textSpan.textContent = part;
            // Adiciona o 'span' ao 'questionTextElement' (o div que contém a frase completa).
            questionTextElement.appendChild(textSpan);

            // Verifica se não é a última parte do texto.
            // Se for a última parte, não há lacuna para inserir depois dela.
            if (index < textParts.length - 1) {
                // Cria um novo elemento 'select' (o dropdown) para a lacuna.
                const select = document.createElement('select');
                // Adiciona a classe CSS 'punctuation-select' para aplicar os estilos de lacuna.
                select.classList.add('punctuation-select');
                // Adiciona um atributo 'data-index' ao select, que armazena o índice da lacuna.
                // Isso pode ser útil para depuração ou para associar a lacuna à sua resposta correta.
                select.setAttribute('data-index', index);

                // Cria a opção padrão vazia para o select.
                let defaultOption = document.createElement('option');
                defaultOption.value = '';        // O valor é vazio.
                defaultOption.textContent = '';  // O texto visível é vazio, para que a lacuna apareça vazia.
                defaultOption.disabled = true;   // Desabilita a opção para que o usuário não possa selecioná-la depois de escolher outra.
                defaultOption.selected = true;   // Faz com que esta seja a opção selecionada por padrão.
                select.appendChild(defaultOption); // Adiciona a opção padrão ao select.

                // Itera sobre o array 'punctuationOptions' para adicionar todas as pontuações como opções no select.
                punctuationOptions.forEach(punc => {
                    let option = document.createElement('option');
                    option.value = punc;      // O valor da opção é a pontuação.
                    option.textContent = punc; // O texto visível da opção é a pontuação.
                    select.appendChild(option); // Adiciona a opção ao select.
                });
                // Adiciona o select (com suas opções) ao 'questionTextElement', logo após a parte do texto.
                questionTextElement.appendChild(select);
            }
        });

    } else {
        // Se 'currentQuestionIndex' for igual ou maior que o número total de questões,
        // significa que o quiz terminou. Chama a função 'showResults' para exibir o placar final.
        showResults();
    }
}

/**
 * --- 8. Função checkAnswers() ---
 * Objetivo: Verifica as respostas do usuário para a questão atual.
 * Aplica feedback visual (cores) nas lacunas, atualiza a pontuação,
 * e exibe uma explicação detalhada para CADA erro cometido na questão.
 */
function checkAnswers() {
    let questionCorrect = true; // Uma flag (bandeira) que indica se a questão inteira foi respondida corretamente.
                                // Começa como true e muda para false se qualquer erro for encontrado.
    // Seleciona todos os elementos 'select' (lacunas) que estão dentro do 'questionTextElement'.
    const selects = questionTextElement.querySelectorAll('.punctuation-select');
    // Pega o objeto da questão atual.
    const currentQuestion = questions[currentQuestionIndex];
    // Um array vazio para armazenar os detalhes de CADA erro encontrado nesta questão.
    let errorsFound = [];

    // Cria um objeto para logar a questão atual no histórico do usuário.
    // Isso é vital para a revisão final.
    let currentQuestionLog = {
        questionText: currentQuestion.text,        // O texto original da questão.
        userResponses: [],                         // Um array para guardar as respostas que o usuário deu.
        correctResponses: currentQuestion.correctAnswers, // As respostas corretas esperadas.
        isCorrect: false                           // Será atualizado para true se a questão for totalmente correta.
    };

    // Itera sobre cada 'select' (lacuna) da questão.
    selects.forEach((select, index) => {
        // Pega o valor que o usuário selecionou no dropdown da lacuna.
        const userAnswer = select.value;
        // Pega a resposta correta para esta lacuna específica, usando o 'index'.
        const correctAnswer = currentQuestion.correctAnswers[index];
        
        // Adiciona a resposta do usuário para esta lacuna ao log da questão atual.
        currentQuestionLog.userResponses.push(userAnswer);

        // Compara a resposta do usuário com a resposta correta.
        if (userAnswer === correctAnswer) {
            // Se a resposta estiver correta, aplica estilos de borda e fundo verdes.
            select.style.borderColor = 'green';
            select.style.backgroundColor = '#e6ffe6';
        } else {
            // Se a resposta estiver incorreta, define 'questionCorrect' como false, pois a questão não foi 100% certa.
            questionCorrect = false;
            // Aplica estilos de borda e fundo vermelhos para indicar erro.
            select.style.borderColor = 'red';
            select.style.backgroundColor = '#ffe6e6';
            
            // Adiciona os detalhes deste erro específico (resposta do usuário e correta) ao array 'errorsFound'.
            errorsFound.push({ userAnswer: userAnswer, correctAnswer: correctAnswer });
        }
        // Desabilita o select após a verificação para que o usuário não possa mudar a resposta.
        select.disabled = true;
    });

    // --- Lógica de Feedback Geral e Exibição de Erros ---
    if (questionCorrect) {
        // Se a questão foi respondida totalmente corretamente:
        score++; // Incrementa a pontuação do usuário.
        feedbackElement.textContent = 'Muito bem! Todas as pontuações estão corretas!'; // Mensagem de sucesso.
        feedbackElement.className = 'correct-answer-feedback'; // Aplica classe CSS verde.
        // Esconde a caixa de explicação de erro, caso ela estivesse visível de uma tentativa anterior.
        if (errorExplanationBox) errorExplanationBox.style.display = 'none';
        currentQuestionLog.isCorrect = true; // Marca a questão como correta no log.
    } else {
        // Se a questão teve um ou mais erros:
        feedbackElement.textContent = 'Alguma(s) pontuação(ões) está(ão) incorreta(s). Reveja e tente novamente na próxima!'; // Mensagem de erro.
        feedbackElement.className = 'wrong-answer-feedback'; // Aplica classe CSS vermelha.
        currentQuestionLog.isCorrect = false; // Marca a questão como incorreta no log.

        // Se foram encontrados erros E a caixa de explicação de erro existe no HTML:
        if (errorsFound.length > 0 && errorExplanationBox) {
            // Inicia uma string HTML que será preenchida com os detalhes de cada erro.
            let errorHtml = '<h3>Erros Encontrados:</h3>';
            // Itera sobre o array 'errorsFound' (que contém todos os erros desta questão).
            errorsFound.forEach(error => {
                // Pega o nome e uso do sinal que o usuário selecionou, usando o objeto 'punctuationExplanations'.
                // Se o sinal não for encontrado (ex: opção vazia), usa um texto padrão.
                const userPuncName = punctuationExplanations[error.userAnswer] ? punctuationExplanations[error.userAnswer].name : 'Sinal desconhecido/não selecionado';
                const userPuncUse = punctuationExplanations[error.userAnswer] ? punctuationExplanations[error.userAnswer].use : 'Nenhuma explicação disponível para o sinal selecionado.';
                // Pega o nome e uso do sinal correto.
                const correctPuncName = punctuationExplanations[error.correctAnswer] ? punctuationExplanations[error.correctAnswer].name : 'Sinal desconhecido';
                const correctPuncUse = punctuationExplanations[error.correctAnswer] ? punctuationExplanations[error.correctAnswer].use : 'Nenhuma explicação disponível para o sinal correto.';

                // Adiciona um bloco HTML para este erro específico.
                // Usa classes de feedback para colorir as pontuações (vermelho para erro do usuário, verde para correto).
                errorHtml += `
                    <div class="error-detail-item">
                        <h4>Sua resposta: <span class="wrong-answer-feedback">${error.userAnswer === '' ? '[nada]' : error.userAnswer}</span> (Esperado: <span class="correct-answer-feedback">${error.correctAnswer}</span>)</h4>
                        <p><strong>Uso do sinal que você selecionou (${userPuncName}):</strong> ${userPuncUse}</p>
                        <p><strong>Uso correto do sinal (${correctPuncName}):</strong> ${correctPuncUse}</p>
                        <hr> </div>
                `;
            });
            // Insere todo o HTML de erro gerado dentro da 'errorExplanationBox'.
            errorExplanationBox.innerHTML = errorHtml;
            // Torna a 'errorExplanationBox' visível.
            errorExplanationBox.style.display = 'block';
        }
    }
    
    // Adiciona o log completo da questão atual ao histórico de respostas do usuário.
    userAnswersLog.push(currentQuestionLog);
    // Muda o texto do botão para indicar que a próxima ação é avançar para a próxima questão.
    nextButton.textContent = 'Próxima Questão';
}

/**
 * --- 9. Função handleNextButton() ---
 * Objetivo: Gerencia o fluxo do quiz quando o botão "Avançar" ou "Próxima Questão" é clicado.
 * Ele verifica se as lacunas foram preenchidas antes de permitir a verificação das respostas.
 */
function handleNextButton() {
    // Verifica o texto atual do botão para decidir a próxima ação.
    // Se o texto for "Avançar", significa que o usuário acabou de preencher a questão e quer verificar as respostas.
    if (nextButton.textContent === 'Avançar') {
        const selects = questionTextElement.querySelectorAll('.punctuation-select'); // Pega todas as lacunas.
        let allSelected = true; // Flag para verificar se todas as lacunas foram preenchidas.

        // Itera sobre as lacunas para checar se alguma ainda está com a opção padrão (vazia) selecionada.
        selects.forEach(select => {
            if (select.value === '') {
                allSelected = false; // Se uma lacuna estiver vazia, define a flag como false.
            }
        });

        // Se nem todas as lacunas foram preenchidas:
        if (!allSelected) {
            feedbackElement.textContent = 'Por favor, preencha todas as lacunas antes de avançar!'; // Mensagem de aviso.
            feedbackElement.className = 'wrong-answer-feedback'; // Estilo de aviso (vermelho).
            return; // Interrompe a execução da função, impedindo a verificação e o avanço.
        }

        // Se todas as lacunas foram preenchidas, chama a função 'checkAnswers' para avaliar a questão.
        checkAnswers();
    } else {
        // Se o texto do botão não for "Avançar" (ou seja, é "Próxima Questão"),
        // significa que as respostas já foram verificadas e é hora de ir para a próxima questão.
        currentQuestionIndex++; // Incrementa o índice para a próxima questão.
        loadQuestion(); // Carrega a próxima questão.
    }
}

/**
 * --- 10. Função showResults() ---
 * Objetivo: Exibe a tela de resultados finais do quiz, mostrando a pontuação do usuário
 * e uma revisão detalhada de cada questão respondida.
 */
function showResults() {
    const container = document.querySelector('.container'); // Pega o contêiner principal.
    // Limpa o conteúdo atual do contêiner e insere o HTML da tela de resultados.
    // Isso inclui a pontuação final e um div vazio onde a revisão das questões será inserida.
    container.innerHTML = `
        <h2>Quiz Concluído!</h2>
        <p>Sua pontuação final é: ${score} de ${questions.length}</p>
        <h3>Revisão das Suas Respostas:</h3>
        <div id="resultsReview"></div> <button id="restartButton">Reiniciar Quiz</button>
        <button id="backToHomeButton">Voltar ao Início</button>
    `;

    // Pega a referência ao div onde a revisão detalhada será mostrada.
    const resultsReviewElement = document.getElementById('resultsReview');
    // Itera sobre o 'userAnswersLog' (o histórico de todas as questões respondidas).
    userAnswersLog.forEach((log, index) => {
        // Cria um novo div para cada questão na revisão.
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('review-item'); // Aplica uma classe CSS para estilização.
        
        // Determina a mensagem e a classe CSS para indicar se a questão foi correta ou incorreta.
        let displayCorrectness = log.isCorrect ? '<span class="correct-answer-feedback">✅ Correto</span>' : '<span class="wrong-answer-feedback">❌ Incorreto</span>';
        
        // Reconstrói o texto da questão, mostrando as respostas do usuário e as corretas lado a lado.
        // O método 'map' transforma cada parte do texto em um novo elemento HTML ou texto.
        // O método 'join('')' junta todas essas partes transformadas em uma única string HTML.
        let reviewedText = log.questionText.split('_').map((part, i) => {
            let userPunctuation = log.userResponses[i] || '';     // Pega a pontuação que o usuário colocou.
            let correctPunctuation = log.correctResponses[i] || ''; // Pega a pontuação correta.

            // Verifica se este 'i' corresponde a uma lacuna onde uma pontuação foi inserida (ou deveria ser).
            if (i < log.userResponses.length) {
                if (userPunctuation === correctPunctuation) {
                    // Se a resposta do usuário está correta, mostra a pontuação em verde.
                    return `${part}<span class="correct-answer-feedback"> ${userPunctuation} </span>`;
                } else {
                    // Se a resposta do usuário está incorreta, mostra a resposta do usuário em vermelho,
                    // e a resposta correta em verde entre parênteses.
                    // '[nada]' é exibido se o usuário não selecionou nada.
                    return `${part}<span class="wrong-answer-feedback"> ${userPunctuation === '' ? '[nada]' : userPunctuation} </span><span class="correct-answer-feedback">(${correctPunctuation})</span>`;
                }
            }
            return part; // Retorna a parte do texto (sem pontuação) se não for uma lacuna.
        }).join('');

        // Preenche o HTML do div de revisão da questão.
        questionDiv.innerHTML = `
            <h4>Questão ${index + 1}: ${displayCorrectness}</h4>
            <p>${reviewedText}</p>
            ${!log.isCorrect ? `
                <div class="explanation-small">
                    <p>Reveja as pontuações em vermelho acima.</p>
                </div>
            ` : ''} <hr> `;
        resultsReviewElement.appendChild(questionDiv); // Adiciona o div da questão revisada à área de revisão.
    });

    // Adiciona ouvintes de evento aos botões da tela de resultados.
    // 'restartButton': Recarrega a página para iniciar o quiz do zero.
    document.getElementById('restartButton').addEventListener('click', () => {
        window.location.reload();
    });
    // 'backToHomeButton': Redireciona para a página inicial (index.html).
    document.getElementById('backToHomeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}