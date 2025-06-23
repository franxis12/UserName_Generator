const generateBtn = document.getElementById("btnGenerate");
const usernameDisplay = document.getElementById("usernameResult");
const sugestedUsersUL = document.getElementById("sugestedUsers");

const extraLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


generateBtn.addEventListener("click", () => {
    const adjectiveWord = document.getElementById("adjective").value;
    const nounWord = document.getElementById("noun").value;
    const numberInput = parseInt(document.getElementById("number").value);
    const separatorSym = document.getElementById("separator").value;

    const userGenerateUL = []
    const options = []
    const userGenerate = []

    if(adjectiveWord) options.push("adje");
    if(nounWord) options.push("noun");
    if(numberInput) options.push("num");
    if(separatorSym) options.push("sym");

    if(options.length === 0){
        // Crear dicionario de palabras para generar
        //  username sin que el usuario imgrese informacion
        alert("Enter a word")

        return;
    }


    let adje = 0;
    let noun = 0;
    let numb = 0;
    let symb = 0;

    for (let i = 0; i < options.length; i++){
        const randomType = options[Math.floor(Math.random() * options.length)]
        
        if(randomType === "adje" && adje === 0){
            userGenerate.push(adjectiveWord)

            const randomLeters = Math.floor(Math.random() * extraLetters.length)
            userGenerate.push(extraLetters[randomLeters])
            adje = 1;
        }

        if(randomType === "noun" && noun === 0){
            userGenerate.push(nounWord)

            noun = 1;
        }

        if(randomType === "num" && numb === 0){
            userGenerate.push(numberInput)
            numb = 1;
        }

        if(randomType === "sym" && symb === 0){
           
            userGenerate.push(separatorSym)
            symb = 1;
        }

        
        
    }

    const final = userGenerate.join("")
    usernameDisplay.textContent = final;
    userGenerateUL.push(final);
    
    userGenerateUL.map(users => {
      const li = document.createElement("li");
      li.textContent = users;
      sugestedUsersUL.appendChild(li);  
    })

    console.log(final)


    




})