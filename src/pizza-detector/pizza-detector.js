 let pizzalist = [
{ name:"Margherita", regex:"Mar?gh?[e|a]rita", ingredients: ["Tomaten" , "Käse" ], alergenes: "AG"},
{ name:"Siciliana", regex:"Siciliana", ingredients: ["Tomaten", "Käse", "Oliven", "Kapern" , "Sardellen" ], alergenes: "AGDP"},
{ name:"Cardinale", regex:"Cardinale", ingredients: ["Tomaten", "Käse" , "Schinken" ], alergenes: "AGP"},
{ name:"Salami", regex:"Salami", ingredients: ["Tomaten", "Käse" , "Salami" ], alergenes: "AGP"},
{ name:"Al Funghi", regex:"(Al )?Funghi", ingredients: ["Tomaten", "Käse" , "Champignons" ], alergenes: "AGP"},
{ name:"Tritato Di Carne", regex:"Tritato (Di )?Carne", ingredients: ["Tomaten", "Käse" , "Fleischsauce" ], alergenes: "AGPC"},
{ name:"Al Tonno", regex:"(Al )?Tonno", ingredients: ["Tomaten", "Käse", "Thunfisch" , "Zwiebel" ], alergenes: "AGPD"},
{ name:"Toscana", regex:"Toscana", ingredients: ["Tomaten", "Käse", "Schinken" , "Champignons" ], alergenes: "AGP"},
{ name:"Cippola", regex:"Cippola", ingredients: ["Tomaten", "Käse" , "Zwiebel" ], alergenes: "AGP"},
{ name:"Hawai", regex:"Hawai", ingredients: ["Tomaten", "Käse", "Schinken" , "Ananas" ], alergenes: "AGPH"},
{ name:"Romana", regex:"Romana", ingredients: ["Tomaten", "Käse" , "Sardellen" ], alergenes: "AGDP"},
{ name:"Carciofini", regex:"Carciofini", ingredients: ["Tomaten", "Käse" , "Artischocken" ], alergenes: "AGP"},
{ name:"Primavera", regex:"Primavera", ingredients: ["Tomaten", "Käse", "Broccoli", "Mais", "Pfefferoni" , "Zwiebel" ], alergenes: "AGPL"},
{ name:"Speziale", regex:"Spe[zc]iale", ingredients: ["Tomaten", "Käse", "Mozzarella", "Prosciutto" , "Rucola" ], alergenes: "AGPL"},
{ name:"Casalinga", regex:"Casalinga", ingredients: ["Tomaten", "Käse", "Schinken", "Champignons", "Artischocken" , "Ei" ], alergenes: "AGP"},
{ name:"Quattro Stagioni", regex:"Quattro Stagioni", ingredients: ["Tomaten", "Käse", "Champignons", "Schinken" , "Artischocken" ], alergenes: "AGP"},
{ name:"Calzone", regex:"Calzone", ingredients: ["Tomaten", "Käse", "Schinken", "Champignons" , "Artischocken" ], alergenes: "AGPL"},
{ name:"Fiaker", regex:"Fiaker", ingredients: ["Tomaten", "Käse", "Speck", "Pfefferoni" , "Ei" ], alergenes: "AGP"},
{ name:"Mamamia", regex:"Mamm?a\ ?mia", ingredients: ["Tomaten", "Käse", "Schafkäse", "Ei" , "Zwiebel" ], alergenes: "AGP"},
{ name:"Capricciosa", regex:"Cap+ricc?iosa", ingredients: ["Tomaten", "Käse", "Schinken", "Champignons", "Artischocken", "Oliven" , "Sardellen" ], alergenes: "AGDP"},
{ name:"Diavolo", regex:"Dia[v|b]olo", ingredients: ["Tomaten", "Käse", "Schinken" , "Pfefferoni" ], alergenes: "AGPL"},
{ name:"Milano", regex:"Milano", ingredients: ["Tomaten", "Käse", "Schinken", "Speck", "Salami" , "Pfefferoni" ], alergenes: "AGPL"},
{ name:"Quattro Formaggi", regex:"(Quatt?ro )?Formag?gi", ingredients: ["Tomaten", "Käse", "Mozzarella", "Gorgonzola" , "Schafkäse" ], alergenes: "AGP"},
{ name:"Provinciale", regex:"Provinciale", ingredients: ["Tomaten", "Käse", "Speck", "Schinken", "Pfefferoni" , "Mais" ], alergenes: "AGPL"},
{ name:"Rusticana", regex:"Rusticana", ingredients: ["Tomaten", "Käse", "Schinken" , "Oliven" ], alergenes: "ACPL"},
{ name:"Sanremo", regex:"Sanremo", ingredients: ["Tomaten", "Käse", "Spinat", "Schafkäse" , "Knoblauch" ], alergenes: "AGPL"},
{ name:"Fantasia", regex:"Fantasia", ingredients: ["Tomaten", "Käse", "Schinken", "Spinat", "Schafkäse", "Ei" , "Pfefferoni" ], alergenes: "AGDPL"},
{ name:"Verdure", regex:"Verdure", ingredients: ["Tomaten", "Käse", "Champignons", "Artischocken", "Mais", "Brokkoli" , "Pfefferoni" ], alergenes: "AGPL"},
{ name:"Al Frutti Di Mare", regex:"(Al )?Frutti (Di )?Mare", ingredients: ["Tomaten", "Käse", "Muscheln", "Schrimps", "Calamari", "Thunfisch" , "Knoblauch" ], alergenes: "AGPLRD"}
];

let detectPizza = (text) => {
    let found = pizzalist.find( p => {
        return text.toLowerCase().search(p.regex.toLowerCase()) != -1;
    });
    return found != undefined;
}

let hasPizza = (sencentce, cb) => {

    let found = pizzalist.find( p => {
        return sencentce.toLowerCase().search(p.regex.toLowerCase()) != -1;
    });
    if(found){
        if(cb){
          cb(found);
        }

        return found;
    }else {
        return null;
    }
};

let findPizza = (...args) => {
    return pizzalist.filter((pizza) => {
        let match = pizza.ingredients.filter((p) => {
            for(term of args){
                if(term.toLowerCase() === p.toLowerCase()){
                    return true;
                }
            }
            return false;
        });
        return match.length == args.length;
    }).map(p => `${p.name} (${p.ingredients})`);
}

module.exports = {
    hasPizza : hasPizza,
    detectPizza : detectPizza,
    pizzalist : pizzalist,
    findPizza : findPizza
};
