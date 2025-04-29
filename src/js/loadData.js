document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const navigationControls = document.getElementById("navigation-controls");
    const pageNumber = document.getElementById("page-number");
    const nextButton = document.getElementById("next-page");
    const prevButton = document.getElementById("prev-page");
    const moreButton = document.getElementById("show-more");
    const buttonContainer = document.getElementById("button-container");
    const input = document.getElementById("search-input");
    const submit = document.getElementById("submit");
    const buttons = buttonContainer.querySelectorAll("button");
    
    let allCards = [];
    let visibleCards = [];
    let currentPage = 1;
    let startCard = 0;
    const itemsPerPage = 10; 
    let currentFilter = "";
    let query = "";
    
    async function loadData() {
        try{
            const response = await fetch("data.json");
            allCards = await response.json();
            visibleCards = allCards.slice(startCard, startCard + itemsPerPage);
            loadCards();
            
        }catch(err){
            console.log(err);
        }
    }
    
    function loadCards(){
        gallery.innerHTML = "";
        let currentCards = visibleCards.slice(startCard, startCard + itemsPerPage);

        currentCards.forEach(el => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                    <img class="card-image" src="${el.image}" alt="course image">
                    <b>${el.title}</b>
                    <p class="instructor-name">${el.instructor}</p>
                    <p>${el.description}</p>
                    <div class="level">${el.level}</div>
                `;
            gallery.appendChild(card);
            pageNumber.innerHTML = `${currentPage}`;
        });
    }

    function filterCards(category){
        currentFilter = category;
        let filtered = [];
        if(moreButton.style.display === "none"){
            filtered = allCards;
        }
        else{
            filtered = allCards.slice(startCard, startCard + itemsPerPage);
        }
        if(category === "all"){
            visibleCards = filtered;
            currentFilter = "";
        }
        else{
            visibleCards = filtered.filter(card => card.category === category);
        }
        if(visibleCards.length <= startCard){
            startCard -= itemsPerPage;
            currentPage--;
        }
        input.value = "";
        query = "";
    }
    
    function queryFilter(){
        let filtered = [];
        if(moreButton.style.display === "none"){
            filtered = allCards;
        }
        else{
            filtered = allCards.slice(startCard, startCard + itemsPerPage);
        }
        visibleCards = filtered.filter(card => 
            card.title.toLowerCase().includes(query) ||
            card.instructor.toLowerCase().includes(query) ||
            card.description.toLowerCase().includes(query) ||
            card.level.toLowerCase().includes(query)
        );
        if(visibleCards.length <= startCard){
            startCard -= itemsPerPage;
            currentPage--;
        }
    }

    moreButton.addEventListener("click", () => {
        visibleCards = allCards;
        moreButton.style.display = "none";
        navigationControls.style.display = "block";
        if(currentFilter){
            visibleCards = allCards.filter(card => card.category == currentFilter);
        }
        if(query){
            queryFilter();
        }
                
        loadCards();
    });

    nextButton.addEventListener("click", () => {
        if(startCard + itemsPerPage < visibleCards.length){
            startCard+= itemsPerPage;
            currentPage++;
            loadCards();
        }
    });
    
    prevButton.addEventListener("click", () => {
        if(startCard - itemsPerPage >= 0){
            startCard-= itemsPerPage;
            currentPage--;
            loadCards();
        } 
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            filterCards(button.id);
            loadCards();
        });
    });

        
    submit.addEventListener("click", () => {
        query = input.value.toLowerCase();
        if(query){
            queryFilter();
            loadCards();
        }
             
    });

       
    loadData();
});







