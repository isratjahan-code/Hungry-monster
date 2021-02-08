function retriveMeals(){
    
    var searchKey = document.getElementById("meals-search").value;
    //alert(searchKey);
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchKey)
    .then(response => response.json())
    .then(data => getMealsData(data));
}

var mealList=null;

const getMealsData = mealSearchResult => {
    console.log(mealSearchResult);
    const mealCategoryDiv = document.getElementById('mealCategory');
    //alert(mealSearchResult.meals.length);
    if(mealSearchResult.meals && mealSearchResult.meals !== 'null' && mealSearchResult.meals !== 'undefined'){
        mealList = mealSearchResult.meals;
    for (let i = 0; i < mealSearchResult.meals.length; i++) {
        let mealsType = mealSearchResult.meals[i];
        console.log(mealsType);
        //alert(mealsType);
        const mealDiv = document.createElement('div');
        mealDiv.className = 'menu';
        const cardDiv = document.createElement('card');
        cardDiv.id = mealsType.idMeal;

        const mealInfo = `
            <img id="img-meal-${mealsType.idMeal}" src="${mealsType.strMealThumb}" onclick=getMealDetails("${mealsType.idMeal}")></img> 
                 <h6 id="name-meal-${mealsType.idMeal}">${mealsType.strMeal}</h6>
                 `
        mealDiv.innerHTML = mealInfo;
        cardDiv.appendChild(mealDiv);
        //cardDiv.onclick = retriveMealsDetails(mealsType.idMeal);
        // cardDiv.addEventListener("click", Event =>{
        //     retriveMealsDetails(mealsType.idMeal);
        // });
        mealCategoryDiv.appendChild(cardDiv);
    }
    } else {
        alert("No result found, Please try again!");
    }
}

function getMealDetails(mealId){
    console.log(mealId);
    for (let i = 0; i < mealList.length; i++) {
        if(mealList[i].idMeal == mealId){
            console.log(mealList[i].strIngredient1);
            const IngredientDiv =  document.createElement("div");
            IngredientDiv.className = 'ingredient';
            const mealIngredientInfo = `
                    <img id="img-meal-${mealList[i].idMeal}" src="${mealList[i].strMealThumb}"></img> 
                         <h4>${mealList[i].strMeal}</h4>
                         <p></p>
                         <h6>Ingredients</h6>
                        
                         <li>${mealList[i].strIngredient1}</li>
                         <li>${mealList[i].strIngredient2}</li>
                         <li>${mealList[i].strIngredient3}</li>
                         <li>${mealList[i].strIngredient4}</li>
                         <li>${mealList[i].strIngredient5}</li>
                        
                         `
             IngredientDiv.innerHTML = mealIngredientInfo ; 
             const MealIngredientsDiv = document.getElementById('ingredient-info');
             MealIngredientsDiv.appendChild(IngredientDiv);   
             var searchDiv = document.getElementById("card-area");
             var detailDiv = document.getElementById("ingredient-info");
             searchDiv.style.display = 'none';
             detailDiv.style.display = 'block';
             break;
        }
    }
}

function retriveMealsDetails(idMeal){
    console.log(idMeal);
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+idMeal)
    .then(response => response.json())
    .then(data => getMealsDetails(data));
}

const getMealsDetails = mealsDetailsResults => {
    console.log(mealsDetailsResults);
    const MealIngredientsDiv = document.getElementById('ingredient-info');
    console.log(mealsDetailsResults.meals.length);
    for (let i = 0; i < mealsDetailsResults.meals.length; i++) {
        let mealsType = mealsDetailsResults.meals[i];
    const IngredientDiv =  document.createElement("div");
    IngredientDiv.className = 'ingredient';
    const mealIngredientInfo = `
            <img id="img-meal-${mealsType.idMeal}" src="${mealsType.strMealThumb}"></img> 
                 <h6 id="name-meal-${mealsType.idMeal}">${mealsType.strMeal}</h6>
                 <p id="name-meal-${mealsType.idMeal}">${mealsType.strIngredient}</p>
                 `
     IngredientDiv.innerHTML = mealIngredientInfo ; 
     MealIngredientsDiv.appendChild(IngredientDiv);     

    }
    toogleDiv();
}

function toogleDiv() {
    var searchDiv = document.getElementById("card-area");
    var detailDiv = document.getElementById("ingredient-info");

searchDiv.addEventListener('click', function(){

   searchDiv.style.display = 'none';
    detailDiv.style.display = 'block';
})}
