const RANDOMIMAGES = [
    '2793-1.png',
    '0014-4.jpg',
    '2866-2.png',
    'SC0023-3.jpg',
    '0079-5.png',
    '0117-3.png',
    '2636-2.png',
    '2645-5.png',
    '2896-13.png',
    '2716-2.png',
    '2723-2.png',
    '2746-1.png',
    '2760-4.gif',
    '2760-7.png',
'2959-3.gif',
'0338-3.png',
'1683-1.png',
'0742-1.png',
'0383-9.png',
'1573-1.png',
'2227-6.png',
'0939-2.png',
    '2822-1.png',

]
const MetaInfo_row = d3.csv('./static/data/Metadata - meta.csv', parseMetaInfo);
const MetaDocument_row = d3.csv('./static/data/Metadata - meta documentation.csv', parseMetaDocument);


function parseMetaInfo(d) {

    return d;
}

function parseMetaDocument(d) {
    return d;
}
const STUDENTS = [
    'Alison Booth',
    'Nik Brown',
    'Elizabeth Cory',
    'Christian Dicker',
    'Yinan Dong',
    'Mayra Parrilla Guerrero',
    'Betsy Kaeberle',
    'Jayden Khatib',
    'Yuke Li',
    'Yuqing Liu',
    'Rachel Peterson',
    'Ha Ta',
    'Siyue Tan',
    'Ning Wang',
    'Matthew Wolfinger',
    'Zixuan Yang'
]
const CONTRIBUTORS = [
    'Bassel Abu Fakher',
    'Attila Batorfy',
    'David Bumbeishvili',
    'Sarah Callaghan',
    'Estefania Ciliotta Chehade',
    'Karim Chaibi',
    'Tarun Deep Chhabra',
    'Lewis Chou',
    'Aprisa Chrysantina',
    'Nuno Correia',
    'Megan Danielson',
    'Lily Diaz',
    'Hugh Dubberly',
    'Susan Hazan',
    'Chihiro Hosoe',
    'Kita Kaczmarek',
    'Andy Krackov',
    'Ewa Lenk',
    'Jack Lenk',
    'Matthias Mueller-Prove',
    'M. Natsagbadam',
    'Zeynep Ozturk',
    'Joep Paemen',
    'Catherine Plaisant',
    'Magga Dora Ragnarsdottir',
    'Eric Reiss',
    'Irene Rietschel',
    'Matteo Riva',
    'David Rothenberg',
    'Lorenzo Scarpelli',
    'Andreas Schneider',
    'David Serrault',
    'Ben Shneiderman',
    'Arushi Singh',
    'Antonio Solano',
    'Max Spielmann',
    'Andrew Tang',
    'Sergelen Tsogt-Ochir',
    'Hannes van Zyl',
    'Rupesh Vyas',
    'Liuhuaying Yang',
    'Zhengyan Yu'

]
const PUBLICATIONS = [{
        title: "COVIC: Collecting Visualizations of Covid-19 to Outline a Space of Possibilities",
        link: "",
        authors: "Paul Kahn, Hugh Dubberly, Dario Rodighiero",
        publisher: "Design Issues (in press)",
        img:"COVIC map.png"
    },
    {
        title: "From scientific visualization to public engagement: learning from a public archive of COVID-19 related visualizations",
        link: "//covic-archive.org/static/docs/M28_Libro_SpecialCovid_E1_corrections.pdf",
        authors: "Paolo Ciuccarelli & Paul Kahn",
        publisher: "Malofiej 28, 2021",
        img:"malofiej.png"
    },

    {
        title: "The Pandemic That Launched A Thousand Visualizations",
        link: "//eyemagazine.com/feature/article/the-pandemic-that-launched-a-thousand-visualisations",
        authors: "Paul Kahn",
        publisher: "Eye Magazine 101, Summer 2021",
        img:"Eye.png"
    }
    
]
const TALKS = [
    {
        title: "Collecting Visualizations in the Time of Coronavirus",
        link: "//#",
        authors: "Paul Kahn, Dario Rodighiero",
        publisher: "BostonCHI, Feb. 2022",
        img:"BostonCHI talk.jpg"
    },

    {
        title: "Visualizing the Invisible: COVID-19 and Information Design",
        link: "//camd.northeastern.edu/center-for-design/events/",
        authors: "Paul Kahn, Hugh Dubberly, Isabelle Boutron, Mortiz Stefaner",
        publisher: "Center for Design, Northeastern University, Jan. 2022",
        img:"CfD Conversation image.jpg"
    },
    {
        title: "Data visualization during the COVID-19 pandemic",
        link: "//www.namahn.com/event/paul-kahn-2/",
        authors: "Paul Kahn",
        publisher: "Namahn, Brussels, Belgium, June 2020",
        img:"namahn.png"
    },
    {
        title: "Visualization During The COVID-19 Pandemic (starting at 5:35:00)",
        link: "//www.youtube.com/watch?v=GX9a0u4zkfg",
        authors: "Paul Kahn",
        publisher: "datarama #5, L'&#201;cole de design Nantes Atlantique, September 2020",
        img:"datarama.png"
    }
]
