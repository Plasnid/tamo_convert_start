function Tamogotchi(tamoName) {
    //
    this.petName;
    this.initialFood = 60;
    this.metabolismRate = 1000;

    /*
        add an array of objects
        -20 items
        -each element of the array has the following
            -mood(angry, happy, sad, joke)
            -mood percentage
            -saying(a saying relating the the mood)
    */
    this.sayings = [
        {mood: "happy", perc:0.2, saying:"Today is the greatest day I've ever known."},
        {mood: "angry", perc:0.2, saying:"Toasting my marshmallows"},
        {mood: "sad", perc:0.2, saying:"I'm a wet noodle of sadness :("},
        {mood: "joke", perc:0.2, saying:"Smoking will kill you... Bacon will kill you... But,smoking bacon will cure it."},
    ]
    /*
        an array of compliments
        -10 items
    */
    this.compliments = [
        'bork you have the shiniest nose hairs!',
        `bork is awesome!`
    ];

    /*
        add an array of favourite foods(at least 10)
        each element of the array should have
        -food name
        -food value
        -chance of food poisoning
    */
    this.foods = [
        {foodName: "Oysters", foodValue:5, foodPoisoning:.4},
        {foodName: "Sushi", foodValue:25, foodPoisoning:.2}
    ]

    this.init = () => {
        this.petName = tamoName;
        console.log(`Hi!  I'm ${this.petName}`);
        this.hatch();
    }
    this.init();
}
Tamogotchi.prototype.resetFood = function(){
    this.food=this.initialFood;
}

Tamogotchi.prototype.hatch = function(){
    this.resetFood();
    this.startMetabolism();
}
Tamogotchi.prototype.die = function(){
    clearInterval(this.metabolism);
    console.log("I am dead!");
}
Tamogotchi.prototype.startMetabolism = function(){
    this.metabolism = setInterval(()=> {
        this.food -=1;
        console.log(`${this.food} until I starve`);
        if(this.food<=0){
            this.die();
        }
    },this.metabolismRate);
}

Tamogotchi.prototype.eatLasagna = function() {
    console.log(`can I see the food? ${this.food}`);
    this.food +=20;
}

//to add

//a drink coffee command that speeds up the metabolism of your pet
Tamogotchi.prototype.drinkCoffee = function(){
    if(this.food>0){
        console.log("Yum!  Coffee!!!!! :D");
        this.changeMetabolism(500);
    }else{
        console.log("the dead do not drink coffee!");
    }
}

//a drink beer command that slows down the metabolism of your pet
Tamogotchi.prototype.drinkBeer = function(){
    if(this.food>0){
        console.log("Yum!  Beer!!!!!! :D");
        this.changeMetabolism(200);
    }else{
        console.log("the dead do not drink beer!");
    }
}
Tamogotchi.prototype.changeMetabolism = function(newRate){
    console.log("Yum!  Coffee!!!!! :D");
    clearInterval(this.metabolism);
    this.metabolismRate = newRate;
    this.startMetabolism();
}
/*
an eat food command that will select a random food that will 
-check if the pet gets food poisoning
-add points to the pets food count if they don't get food poisoning
-remove points from the pets food count if they do get food poisoning
*/
Tamogotchi.prototype.eatFood = function(){
    if(this.food>0){
        const chosenFood = this.foods[Math.floor(Math.random()*this.foods.length)];
        const isPoisoned = Math.random()<chosenFood.foodPoisoning;
        if(isPoisoned==true){
            this.food -=chosenFood.foodValue;
            console.log(`Yuck!  I just lost ${chosenFood.foodValue} from eating ${chosenFood.foodName}`);
        }else{
            this.food +=chosenFood.foodValue;
            console.log(`Yummy!  I just gained ${chosenFood.foodValue} from eating ${chosenFood.foodName}`);
        }
    }
};
// a command that takes in a mood and returns a phrase
Tamogotchi.prototype.talk = function(mood){
    const moodPhrases  = this.sayings.filter(saying => saying.mood == mood);
    if(moodPhrases.length>0){
        const moodPhrase = moodPhrases[Math.floor(Math.random()*moodPhrases.length)];
        console.log(moodPhrase.saying);
    }else{
        console.log("uh, what?");
    }
}

/*
    a command that takes in your name and returns you a compliment structured using template
*/
Tamogotchi.prototype.wooMe = function(compName){
    let phrase =this.compliments[Math.floor(Math.random()*this.compliments.length)];
    let updatedPhrase = phrase.replace(/bork/g, compName);
    console.log(updatedPhrase);
};