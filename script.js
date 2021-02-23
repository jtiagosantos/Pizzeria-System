let standardPizzaQuantity = 1;
let cart = []; //estrutura para armazenar todas as pizzas que vão para o carrinho
let modalKey = 0;

//Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); //clone do elemento, incluindo os itens do desse elemento

    const key = pizzaJson[index]; //A pizza que for clicada terá suas informações armazendas nessa variável

    //Adição das pizzas em tela
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', event => {
        standardPizzaQuantity = 1;

        event.preventDefault(); //retira a funcionalidade padrão de uma tag a: atualizar a página
        //event - referência ao elemento que disparou o evento, nesse caso de clique

        modalKey = index;
        
        //Adicão (no modal) das informações da pizza clicada
        document.querySelector('.pizzaInfo h1').innerHTML = key.name;
        document.querySelector('.pizzaInfo--desc').innerHTML = key.description;
        document.querySelector('.pizzaBig img').src = key.img;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${key.price.toFixed(2)}`;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex === 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = key.sizes[sizeIndex];
        })

        //Renderização do modal em tela
        document.querySelector('.pizzaWindowArea').style.display = "flex";
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200); 

        //Ao abrir o modal, a quantidade de pizzas será sempre 1 (valor padrão)
        document.querySelector('.pizzaInfo--qt').innerHTML = standardPizzaQuantity;
    })

    document.querySelector('.pizza-area').append(pizzaItem); //Renderiza cada pizza em tela
})


//EVENTOS DO MODAL
const closeModal = () => {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.display = "none";
        }, 500);
}

document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(element => {
    element.addEventListener('click', () => {
        closeModal();
    });
});

//Eventos de incremento e decremento da quantidade de pizzas 
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(standardPizzaQuantity !== 1) {
        standardPizzaQuantity--;
        document.querySelector('.pizzaInfo--qt').innerHTML = standardPizzaQuantity;        
    }
})
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    standardPizzaQuantity++;
    document.querySelector('.pizzaInfo--qt').innerHTML = standardPizzaQuantity;
})

//Evento de escolha do tamanho da pizza
document.querySelectorAll('.pizzaInfo--size').forEach(size => {
    size.addEventListener('click', () => {
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
})

//Evento de adicionar ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    
    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex(item => item.identifier === identifier);

    if(key > -1) {
        cart[key].quantity += standardPizzaQuantity;
    }else {
        cart.push({
            identifier: identifier,
            id: pizzaJson[modalKey].id,
            size: parseInt(size),
            quantity: standardPizzaQuantity
        });
    }

    closeModal();
})