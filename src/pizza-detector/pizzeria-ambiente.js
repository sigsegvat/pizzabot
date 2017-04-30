const pizzalist = [
    {
        "name": "Margherita",
        "regex": "Mar?gh?[e|a]rita",
        "ingredients": [
            "Tomaten",
            "Käse"
        ],
        "alergenes": [
            "A",
            "G"
        ],
        "_id": "margherita"
    },
    {
        "name": "Siciliana",
        "regex": "Siciliana",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Oliven",
            "Kapern",
            "Sardellen"
        ],
        "alergenes": [
            "A",
            "G",
            "D",
            "P"
        ],
        "_id": "siciliana"
    },
    {
        "name": "Cardinale",
        "regex": "Cardinale",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "cardinale"
    },
    {
        "name": "Salami",
        "regex": "Salami",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Salami"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "salami"
    },
    {
        "name": "Al Funghi",
        "regex": "(Al )?Funghi",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Champignons"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "al-funghi"
    },
    {
        "name": "Tritato Di Carne",
        "regex": "Tritato (Di )?Carne",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Fleischsauce"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "C"
        ],
        "_id": "tritato-di-carne"
    },
    {
        "name": "Al Tonno",
        "regex": "(Al )?Tonno",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Thunfisch",
            "Zwiebel"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "D"
        ],
        "_id": "al-tonno"
    },
    {
        "name": "Toscana",
        "regex": "Toscana",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Champignons"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "toscana"
    },
    {
        "name": "Cippola",
        "regex": "Cippola",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Zwiebel"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "cippola"
    },
    {
        "name": "Hawai",
        "regex": "Hawai",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Ananas"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "H"
        ],
        "_id": "hawai"
    },
    {
        "name": "Romana",
        "regex": "Romana",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Sardellen"
        ],
        "alergenes": [
            "A",
            "G",
            "D",
            "P"
        ],
        "_id": "romana"
    },
    {
        "name": "Carciofini",
        "regex": "Carciofini",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Artischocken"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "carciofini"
    },
    {
        "name": "Primavera",
        "regex": "Primavera",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Brokkoli",
            "Mais",
            "Pfefferoni",
            "Zwiebel"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "primavera"
    },
    {
        "name": "Speziale",
        "regex": "Spe[zc]iale",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Mozzarella",
            "Prosciutto",
            "Rucola"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "speziale"
    },
    {
        "name": "Casalinga",
        "regex": "Casalinga",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Champignons",
            "Artischocken",
            "Ei"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "casalinga"
    },
    {
        "name": "Quattro Stagioni",
        "regex": "Quattro Stagioni",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Champignons",
            "Schinken",
            "Artischocken"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "quattro-stagioni"
    },
    {
        "name": "Calzone",
        "regex": "Calzone",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Champignons",
            "Artischocken"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "calzone"
    },
    {
        "name": "Fiaker",
        "regex": "Fiaker",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Speck",
            "Pfefferoni",
            "Ei"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "fiaker"
    },
    {
        "name": "Mamamia",
        "regex": "Mamm?a ?mia",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schafkäse",
            "Ei",
            "Zwiebel"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "mamamia"
    },
    {
        "name": "Capricciosa",
        "regex": "Cap+ricc?iosa",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Champignons",
            "Artischocken",
            "Oliven",
            "Sardellen"
        ],
        "alergenes": [
            "A",
            "G",
            "D",
            "P"
        ],
        "_id": "capricciosa"
    },
    {
        "name": "Diavolo",
        "regex": "Dia[v|b]olo",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Pfefferoni"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "diavolo"
    },
    {
        "name": "Milano",
        "regex": "Milano",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Speck",
            "Salami",
            "Pfefferoni"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "milano"
    },
    {
        "name": "Quattro Fromaggi",
        "regex": "(Quatt?ro )?Fromag?gi",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Mozzarella",
            "Gorgonzola",
            "Schafkäse"
        ],
        "alergenes": [
            "A",
            "G",
            "P"
        ],
        "_id": "quattro-fromaggi"
    },
    {
        "name": "Provinciale",
        "regex": "Provinciale",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Speck",
            "Schinken",
            "Pfefferoni",
            "Mais"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "provinciale"
    },
    {
        "name": "Rusticana",
        "regex": "Rusticana",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Oliven"
        ],
        "alergenes": [
            "A",
            "C",
            "P",
            "L"
        ],
        "_id": "rusticana"
    },
    {
        "name": "Sanremo",
        "regex": "Sanremo",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Spinat",
            "Schafkäse",
            "Knoblauch"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "sanremo"
    },
    {
        "name": "Fantasia",
        "regex": "Fantasia",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Schinken",
            "Spinat",
            "Schafkäse",
            "Ei",
            "Pfefferoni"
        ],
        "alergenes": [
            "A",
            "G",
            "D",
            "P",
            "L"
        ],
        "_id": "fantasia"
    },
    {
        "name": "Verdure",
        "regex": "Verdure",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Champignons",
            "Artischocken",
            "Mais",
            "Brokkoli",
            "Pfefferoni"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L"
        ],
        "_id": "verdure"
    },
    {
        "name": "Al Frutti Di Mare",
        "regex": "(Al )?Frutti (Di )?Mare",
        "ingredients": [
            "Tomaten",
            "Käse",
            "Muscheln",
            "Schrimps",
            "Calamari",
            "Thunfisch",
            "Knoblauch"
        ],
        "alergenes": [
            "A",
            "G",
            "P",
            "L",
            "R",
            "D"
        ],
        "_id": "al-frutti-di-mare"
    }
];

module.exports = pizzalist;