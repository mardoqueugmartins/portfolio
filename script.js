// Efeito digitando & NavMenu

function escrevendoLetra(){
  function ativaLetra(elemento) {
    const arrText = elemento.innerHTML.split("");
    elemento.innerHTML = "";
    arrText.forEach((Letra, i) => {
      setTimeout(() => {
        elemento.innerHTML += Letra;
      }, 60 * i);
    });
  }

  const titulo = document.querySelector("#typinghero");
  ativaLetra(titulo);
}

const ativaMenu = document.querySelector('.fa-bars');
const navMenu = document.querySelector('.navigation-primary')

ativaMenu.addEventListener('click', () =>{
    ativaMenu.classList.toggle('fa-bars');
    ativaMenu.classList.toggle('fa-x');
    navMenu.classList.toggle('ativado')
})


escrevendoLetra();

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

        console.log(`Botão: ${filterValue} | Card: ${category}`);

    if (filterValue === 'all' || filterValue === category) {
      card.style.display = 'block';
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    } else {
      card.style.display = 'none';
    }
  })
})
});
