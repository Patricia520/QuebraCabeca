
// ---- Variaveis ----

const caixadePecas = document.getElementById("caixadePecas");
const numerodePecas = 18;
let pecas;

// ---- Creation of the puzzle ----

function organizarPecas(numero) {
	// Inicializa um array para armazenar todas as peças
	const todasPecas = [];

	// Inicializa um contador
	let j = 1;
	// Preenche o array com 0s até o número especificado
	while (j < numero+1) {
		todasPecas[j] = 0; // 0 indica que não há peça
		j++;
	}

	// Inicializa um contador
	j = 1;
	// Loop para criar e adicionar peças ao array
	while (j < numero+1) {
		// Chama a função criarPecas com um valor aleatório entre 1 e 17
		criarPecas(Math.floor(Math.random()*17+1));
		// Incrementa o contador
		j++;
	}

	function criarPecas(p) {
		// Verifica se o valor de p é maior que o número especificado
		if (p > numero) 
			// Chama recursivamente criarPecas com 1 se for maior
			criarPecas(1);
		// Verifica se a peça já foi criada
		else if (todasPecas[p] == 1) 
			// Chama recursivamente criarPecas com p+1 se já existir uma peça na posição atual
			criarPecas(p + 1);
		else {
			// Se a posição não estiver ocupada, cria a peça
			const peca = document.createElement("div");
			peca.classList.add("grid-piece");
			peca.id = pecasId();
			const img = document.createElement("img");
			img.src = "Pecas/" + p + ".jpg";
			peca.appendChild(img);
			caixadePecas.appendChild(peca);
			// Marca a posição como ocupada no array todasPecas
			todasPecas[p] = 1;
		}
	}
}

function pecasId() {
	// Loop infinito para gerar um ID único para a peça
while (true) {
    // Gera um número aleatório entre 1 e 9999 para compor o ID
    const id = Math.floor(Math.random() * 9999) + 1;
    
    // Verifica se já existe um elemento com o ID gerado
    if (document.getElementById("Peca" + id) === null) {
        // Retorna o ID único
        return "Peca" + id;
    }
}
}

// Chamando a função para organizar as peças com base no número especificado
organizarPecas(numerodePecas);
// Selecionando todos os elementos com a classe 'grid-piece' e armazenando-os na variável 'pecas'
pecas = document.querySelectorAll(".grid-piece");

// --- Drag and drop actions ----

// Função para tratar o evento de arrastar (drag)
function arrastar(e) {
	// Define a opacidade deste elemento como 0.5 durante o arrasto
	this.style.opacity = "0.5";

	// Verifica se este elemento tem exatamente um filho (child)
	if (this.children.length == 1) {
		// Limpa os dados de transferência de dados da operação de arrastar e soltar (drag and drop)
		e.dataTransfer.clearData();
		// Define os dados a serem transferidos como o ID deste elemento
		e.dataTransfer.setData("text", this.id);
	}
}
// Função para lidar com o evento de arrastar sobre a área de soltar
function arrastarSobre(e) { e.preventDefault(); };
 // Evita o comportamento padrão de permitir a soltura (drop) do elemento arrastado
function soltar(e) {
	// Evita o comportamento padrão de permitir a soltura (drop) do elemento arrastado
	e.preventDefault();

	// Obtém os dados transferidos durante o evento de arrastar
	const data = e.dataTransfer.getData("text");

	// Verifica se os dados não são vazios ou não têm o comprimento esperado
	if (data.length != 2) {
		// Obtém o elemento com base no ID dos dados transferidos
		const element = document.getElementById(data);

		// Verifica se o elemento alvo não tem nenhum filho
		if (this.children.length == 0)
			// Adiciona o filho do elemento arrastado ao elemento alvo
			this.appendChild(element.children[0]);
		// Verifica se o elemento alvo tem exatamente um filho
		else if (this.children.length == 1) {
			// Adiciona o filho do elemento arrastado ao elemento alvo
			this.appendChild(element.children[0]);
			// Move o filho do elemento alvo de volta para o elemento arrastado
			element.appendChild(this.children[0]);
			// Restaura a opacidade do elemento arrastado para 1
			element.style.opacity = "1";
		}
		
			}
}

// Função para atribuir eventos de arrastar e soltar aos elementos da coleção 'pecas'
function callEvents() {
	    // Itera sobre cada elemento na coleção 'pecas'
	pecas.forEach(i=>{
		// Adiciona o evento de início de arrastar ao elemento
		i.addEventListener("dragstart",arrastar);
		// Adiciona o evento de fim de arrastar para restaurar a opacidade do elemento
		i.addEventListener("dragend",function() { this.style.opacity = "1"; });
		 // Adiciona o evento de arrastar sobre o elemento
		i.addEventListener("dragover",arrastarSobre);
		// Adiciona o evento de soltar (drop) ao elemento
		i.addEventListener("drop",soltar);
	});
}

callEvents();



