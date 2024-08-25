document.addEventListener('DOMContentLoaded', () => {
    const breedButtonsContainer = document.getElementById('breed-buttons');
    const imageGallery = document.getElementById('image-gallery');
    const searchInput = document.getElementById('search-input');

    let allBreeds = []; // Para armazenar as raças carregadas
    let breedButtons = {}; // Para armazenar os botões das raças

    // Função para carregar e exibir os botões de raças
    function loadBreeds() {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                allBreeds = Object.keys(data.message);
                createBreedButtons(allBreeds);
            })
            .catch(error => {
                console.error('Erro ao carregar raças:', error);
                alert('Erro ao carregar raças.');
            });
    }

    // Função para criar botões de raças
    function createBreedButtons(breeds) {
        breedButtonsContainer.innerHTML = '';
        breeds.forEach(breed => {
            const button = document.createElement('button');
            button.className = 'breed-button';
            button.textContent = breed;
            button.addEventListener('click', () => loadImages(breed));
            breedButtonsContainer.appendChild(button);
            breedButtons[breed] = button; // Armazenar o botão para referência futura
        });
    }

    // Função para carregar e exibir imagens da raça selecionada
    function loadImages(breed) {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random/16`)
            .then(response => response.json())
            .then(data => {
                imageGallery.innerHTML = '';
                data.message.forEach(url => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = `Imagem de um(a) ${breed}`;
                    const container = document.createElement('div');
                    container.className = 'image-container';
                    container.appendChild(img);
                    imageGallery.appendChild(container);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar imagens:', error);
                alert('Erro ao carregar imagens.');
            });
    }

    // Função para filtrar botões de raças com base no input de pesquisa
    function filterBreeds() {
        const searchTerm = searchInput.value.toLowerCase();
        allBreeds.forEach(breed => {
            if (breed.toLowerCase().includes(searchTerm)) {
                breedButtons[breed].style.display = 'inline-block';
            } else {
                breedButtons[breed].style.display = 'none';
            }
        });
    }

    // Carregar raças ao iniciar a aplicação
    loadBreeds();

    // Adicionar evento para filtragem ao digitar no campo de pesquisa
    searchInput.addEventListener('input', filterBreeds);
});
