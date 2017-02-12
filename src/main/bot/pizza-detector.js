 let pizzalist = [
{ name:"Margherita", regex:"Mar?gh?[e|a]rita", ingredients: "Tomaten und Käse (AG)"},
{ name:"Siciliana", regex:"Siciliana", ingredients: "Tomaten, Käse, Oliven, Kapern und Sardellen (AGDP)"},
{ name:"Cardinale", regex:"Cardinale", ingredients: "Tomaten, Käse und Schinken (AGP)"},
{ name:"Salami", regex:"Salami", ingredients: "Tomaten, Käse und Salami (AGP)"},
{ name:"Al Funghi", regex:"(Al )?Funghi", ingredients: "Tomaten, Käse und Champignons (AGP)"},
{ name:"Tritato Di Carne", regex:"Tritato (Di )?Carne", ingredients: "Tomaten, Käse und Fleischsauce (AGPC)"},
{ name:"Al Tonno", regex:"(Al )?Tonno", ingredients: "Tomaten, Käse, Thunfisch und Zwiebeln (AGPD)"},
{ name:"Toscana", regex:"Toscana", ingredients: "Tomaten, Käse, Schinken und Champignons (AGP)"},
{ name:"Cippola", regex:"Cippola", ingredients: "Tomaten, Käse und Zwiebeln (AGP)"},
{ name:"Hawai", regex:"Hawai", ingredients: "Tomaten, Käse, Schinken und Ananas (AGPH)"},
{ name:"Romana", regex:"Romana", ingredients: "Tomaten, Käse und Sardellen (AGDP)"},
{ name:"Carciofini", regex:"Carciofini", ingredients: "Tomaten, Käse und Artischocken (AGP)"},
{ name:"Primavera", regex:"Primavera", ingredients: "Tomaten, Käse, Broccoli, Mais, Pfefferoni und Zwiebeln (AGPL)"},
{ name:"Speziale", regex:"Spe[zc]iale", ingredients: "Tomaten, Käse, Mozzarella, Prosciutto und Rucola (AGPL)"},
{ name:"Casalinga", regex:"Casalinga", ingredients: "Tomaten, Käse, Schinken, Champignons, Artischocken und Spiegelei (AGP)"},
{ name:"Quattro Stagioni", regex:"Quattro Stagioni", ingredients: "Tomaten, Käse, Champignons, Schinken und Artischocken (AGP)"},
{ name:"Calzone", regex:"Calzone", ingredients: "Tomaten, Käse, Schinken, Champignons und Artischocken (AGPL)"},
{ name:"Fiaker", regex:"Fiaker", ingredients: "Tomaten, Käse, Speck, Pfefferoni und Spiegelei (AGP)"},
{ name:"Mamamia", regex:"Mamm?a\ ?mia", ingredients: "Tomaten, Käse, Schafkäse, Ei und Zwiebeln (AGP)"},
{ name:"Capricciosa", regex:"Cap+ricc?iosa", ingredients: "Tomaten, Käse, Schinken, Champignons, Artischocken, Oliven und Sardellen (AGDP)"},
{ name:"Diavolo", regex:"Dia[v|b]olo", ingredients: "Tomaten, Käse, Schinken und Pfefferoni (AGPL)"},
{ name:"Milano", regex:"Milano", ingredients: "Tomaten, Käse, Schinken, Speck, Salami und Pfefferoni (AGPL)"},
{ name:"Quattro Formaggi", regex:"(Quatt?ro )?Formag?gi", ingredients: "Tomaten, Käse, Mozzarella, Gorgonzola und Schafkäse (AGP)"},
{ name:"Provinciale", regex:"Provinciale", ingredients: "Tomaten, Käse, Speck, Schinken, Pfefferoni und Mais (AGPL)"},
{ name:"Rusticana", regex:"Rusticana", ingredients: "Tomaten, Käse, Schinken und Oliven (ACPL)"},
{ name:"Sanremo", regex:"Sanremo", ingredients: "Tomaten, Käse, Spinat, Schafkäse und Knoblauch (AGPL)"},
{ name:"Fantasia", regex:"Fantasia", ingredients: "Tomaten, Käse, Schinken, Spinat, Schafkäse, Ei und Pfefferoni (AGDPL)"},
{ name:"Verdure", regex:"Verdure", ingredients: "Tomaten, Käse, Champignons, Artischocken, Mais, Brokkoli und Pfefferoni (AGPL)"},
{ name:"Al Frutti Di Mare", regex:"(Al )?Frutti (Di )?Mare", ingredients: "Tomaten, Käse, Muscheln, Schrimps, Calamari, Thunfisch und Knoblauch (AGPLRD)"}
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
        for(let term of args){
            if(pizza.ingredients.search(term)==-1){
                return false;
            }
        }
        return true;
        
    }).map(p => `${p.name} (${p.ingredients})`);
}

module.exports = {
    hasPizza : hasPizza,
    detectPizza : detectPizza,
    pizzalist : pizzalist,
    findPizza : findPizza
};
