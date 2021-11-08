function configHead(title) {
    document.head.innerHTML =
        `
        <meta http-equiv="content-type" content="text/html;charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta http-equiv="cache-control" content="max-age=0, no-cache, no-store, must-revalidate" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="pragma" content="no-cache" />
        <title>${title}</title>
        <meta name="description" content="A collection of Covid-19 pandemic visualizations intended for teaching and research purposes" />
        <meta name="keywords" content="covid-19, coronavirus, pandemic, data visualization, information design" />
        <link rel="shortcut icon" href="./favicons/favicon.ico" type="image/x-icon">
        <link rel="icon" type="image/png" sizes="192x192" href="./favicons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="./favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="./favicons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="./favicons/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="57x57" href="./favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="./favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="./favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="./favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="./favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="./favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="./favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="./favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="./favicons/apple-icon-180x180.png" />
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="./favicons/apple-icon-57x57-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="./favicons/apple-icon-72x72-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="./favicons/apple-icon-114x114-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="./favicons/apple-icon-144x144-precomposed.png" />
        <link rel="manifest" href="./favicons/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
        ` + document.head.innerHTML;
}

function configFooter() {
    d3.select('footer')
        .attr('class', 'border-top d-flex align-items-center justify-content-center py-5 px-3')
        .html(`
            <div><a href="mailto:feedback@covic-archive.org">Feedback</a> @2021</div>
            `)
}

function configNav(active) {
    d3.select('header')
        .html(`
            <nav id="navbar" class="navbar navbar-expand-md navbar-light">
            <div class="container-fluid d-flex align-items-start">
                <a class="navbar-brand col-3 text-center d-flex d-md-none align-items-center justify-content-start" href="index.html"><img id="logo" class="logo" src="./static/imgs/logos/logo.svg"></a>
                <button class="navbar-toggler d-block d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <div class="d-flex col-12 flex-column flex-md-row">
                        <ul class="navbar-nav mb-lg-0 col-12 col-md-4 d-md-flex flex-column flex-md-row">
                            <li class="nav-item d-md-flex">
                                <a class="nav-link d-flex justify-content-center flex-row flex-md-column ${active == 'covic-is' ? 'active' : ''}" ${active == 'covic-is' ? 'aria-current="page"' : ''} href="covic-is.html"><span class="pe-1">COVIC</span><span>Is</span></a>
                            </li>
                            <li class="nav-item d-md-flex">
                                <a class="nav-link d-flex justify-content-center flex-row flex-md-column ${active == 'covic-contains' ? 'active' : ''}" ${active == 'covic-contains' ? 'aria-current="page"' : ''} href="covic-contains.html"><span class="pe-1">COVIC</span><span>Contains</span></a>
                            </li>
                            <li class="nav-item d-md-flex">
                                <a class="nav-link d-flex justify-content-center flex-row flex-md-column ${active == 'covic-browser' ? 'active' : ''}" ${active == 'covic-browser' ? 'aria-current="page"' : ''} href="https://covic-visualizer.herokuapp.com/" target="_blank" <span class="pe-1">COVIC</span><span>Visualizer</span></a>
                            </li>
                        </ul>
                        <a class="navbar-brand col-4 text-center d-none d-md-flex flex-row align-items-center justify-content-center" href="index.html"><img id="logo" class="logo" src="./static/imgs/logos/logo.svg"></a>
                        <ul class="navbar-nav mb-lg-0 col-12 d-md-flex flex-column flex-md-row col-md-4 justify-content-end">
                            <li class="nav-item d-md-flex">
                                <a class="nav-link d-flex justify-content-center ${active == 'tutorial' ? 'active' : ''}" ${active == 'tutorial' ? 'aria-current="page"' : ''}" href="#">Tutorial</a>
                            </li>
                            <li class="nav-item d-md-flex">
                                <a class="nav-link d-flex justify-content-center flex-row flex-md-column ${active == 'publications-and-talks' ? 'active' : ''}" ${active == 'publications-and-talks' ? 'aria-current="page"' : ''} href="publications-and-talks.html"><span class="pe-1">Publications</span><span class="text-nowrap">& Talks</span></a>
                            </li>
                            <li class="nav-item d-md-flex">
                                <a class="nav-link d-flex justify-content-center ${active == 'team' ? 'active' : ''}" ${active == 'team' ? 'aria-current="page"' : ''} href="team.html">Team</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
            `)
}
