//set up config
const container = d3.select('#container');

let w, h, isLandscape, isMobile, isSmallScreen;

getSizes();

function getSizes() {
    w = window.innerWidth;
    h = window.innerHeight;

    isLandscape = w > h;
    isMobile = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
    isSmallScreen = document.body.clientWidth <= 768;

}
configFooter();

function LaunchIndex() {
    configNav();
    configHead('COVIC');

    const _RANDOMIMAGES = d3.shuffle(RANDOMIMAGES);
    const size = container.selectAll('.mosaic').size();
    const updatemosaics = container.selectAll('.mosaic').data(_RANDOMIMAGES.splice(0, size))
    updatemosaics.exit().remove();
    const entermosaics = updatemosaics.enter().append('div').attr('class', 'col-2 mosaic')

    const updateImages = entermosaics.merge(updatemosaics).selectAll('.image').data(d => [d])
    updateImages.exit().remove();
    const enterImages = updateImages.enter().append('div').attr('class', 'image')
    enterImages.merge(updateImages)
        .style('background-image', d => `url(./static/imgs/random/${d}`)

    getSizes();
    scrollingHeader()

    function scrollingHeader() {
        const nav = d3.select('#navbarNav');
        const header = d3.select('header');
        const brand = d3.selectAll('.navbar-brand');
        const logo = brand.select('#logo');

        if (!isSmallScreen) {

            const largeH = 60;
            const topH = 60;
            header
                .style('background-color', 'rgba(255,255,255,0)')
                .classed('sticky-top', false).classed('fixed-top', true);
            const headerHeight = largeH + topH + 2 * 16;
            container.style('padding-top', `${headerHeight}px`)
            nav.classed('align-items-start', true)
                .selectAll('.nav-item').classed('d-md-flex', false);

            brand.style('padding-top', '60px')

            logo.style('height', `${largeH}px`);


            window.onscroll = function() { scrollFunction() };

            function scrollFunction() {

                if (window.scrollY > largeH * 0.3) {

                    header.style('background-color', 'rgba(255,255,255,1)')
                    brand.style('padding-top', `.3125rem`);
                    logo.style('height', `2.2rem`);
                    nav.selectAll('.nav-item').classed('d-md-flex', true);
                } else {

                    header.style('background-color', 'rgba(255,255,255,0)')
                    brand.style('padding-top', `${topH}px`);
                    logo.style('height', `${largeH}px`);
                    nav.selectAll('.nav-item').classed('d-md-flex', false);
                }
            }
        } else {
            header
                .style('background-color', 'rgba(255,255,255,1)')
                .classed('sticky-top', true).classed('fixed-top', false);
            container.style('padding-top', `1.5rem`)
            d3.select('#navbarNav').classed('align-items-start', false);
            header.style('background-color', 'rgba(255,255,255,1)')
            brand.style('padding-top', `.3125rem`);
            logo.style('height', `2.2rem`);
        }
    }
    window.addEventListener("resize", () => {
        const _tempW = window.innerWidth;
        if (_tempW === w && isSmallScreen) return;

        getSizes();
        scrollingHeader()



    });
}

function LaunchContains() {
    configNav('covic-contains');
    configHead('COVIC Contains');
    Promise.all([MetaInfo_row])
        .then(([MetaInfo]) => {
            // console.log(MetaInfo)
            const graphsData = ['graph-Article', 'graph-Image'].map(d => {
                let t = {};
                t.id = d.toLowerCase();
                t.name = d.replaceAll('graph-', ' ')
                return t;
            })
            container.select('#covic-contains-pills-tab').selectAll('li').data(graphsData)
                .join('li').attr('class', 'nav-item').attr('role', 'presentation')
                .html((d, i) => `<button class="nav-link btn btn-light ${i === 0 ? "active" : ""}" id="pills-${d.id}-tab" data-bs-toggle="pill" data-bs-target="#pills-${d.id}" type="button" role="tab" aria-controls="pills-${d.id}" aria-selected="true">${d.name}</button>`)

            const tableContainer = container.select('#covic-contains-pills-tabContent').selectAll('.tab-pane').data(graphsData)
                .join('div').attr('class', (d, i) => i === 0 ? "col-12 tab-pane fade show active" : "col-12 tab-pane fade")
                .attr('id', d => `pills-${d.id}`).attr('role', 'tabpanel').attr('aria-labelledby', d => `pills-${d.id}-tab`)
                .append('div').attr('class', d => `graph graph-tree col-12 d-flex align-items-center justify-content-center`)
                .attr('id', d => d.id)

            const metaData = d3.nest()
                .key(d => `${d['type']}`)
                .key(d => `${d['metatype']}`)
                .key(d => `${d['attributes']}`)
                .key(d => `${d['sub-attributes']}`)
                .entries(MetaInfo)
                .map(d => {
                    let t = {};
                    t.name = d.key;
                    t.value = d.values.length;
                    t.children = d.values.map(x => {
                        x.name = x.key;
                        x.value = x.values.length;
                        x.children = x.values.map(t => {
                            t.name = t.key;
                            if (t.values[0].key !== "") {
                                t.children = t.values.map(n => {
                                    n.value = 1;
                                    n.name = n.key;
                                    return n;
                                })
                            }

                            t.value = 1;
                            return t;
                        });
                        return x;
                    })
                    return t;
                })

            draw()

            function draw() {
                const _h = isLandscape ? h : w * 0.5;
                const _w = isLandscape ? w * 0.8 : w;
                const viewBox = [],
                    _viewBox = {};
                tableContainer.each(function(d, i) {
                    d3.select(this).call(g => {
                        treeChart(g, metaData[i])
                            .radial(1 * Math.PI)
                            .width(_w)
                            .height(_h)
                            ()
                        viewBox.push(g.select('.nodes').node().getBBox());
                    })
                })
                _viewBox.x = d3.min(viewBox, d => d.x);
                _viewBox.w = d3.max(viewBox, d => d.width + 10);
                _viewBox.width = Math.max(Math.abs(_viewBox.x) * 2, _viewBox.w);


                tableContainer.each(function(d, i) {
                    d3.select(this).call(g => {
                        g.select('svg')
                            .attr('viewBox', `${_viewBox.x} ${viewBox[i].y} ${_viewBox.width} ${viewBox[i].height}`)
                            // .attr('width', _viewBox.width)
                            .attr('width', Math.min(_viewBox.width, _w - 10))
                            .attr('height', viewBox[i].height * viewBox[i].width / _viewBox.width)

                    })
                })
            }

            window.addEventListener("resize", () => {
                const _tempW = window.innerWidth;
                if (_tempW === w && isSmallScreen) return;

                getSizes();
                draw()

            });
        })
}

function LaunchMeta() {
    configNav();
    configHead('Metadata Documentation');

    Promise.all([MetaDocument_row])
        .then(([MetaDocument]) => {
            const tableKeys = [
                'CODE', 'SUBCODE', 'DESCRIPTION'
            ]

            const metaData = d3.nest()
                .key(d => `${d['META']}`)
                .entries(MetaDocument)
                .map(d => {
                    d.id = d.key.replaceAll(' ', '-').toLowerCase();
                    return d;
                })

            container.select('#pills-tab').selectAll('li').data(metaData)
                .join('li').attr('class', 'nav-item').attr('role', 'presentation')
                .html((d, i) => `<button class="nav-link btn btn-light ${i === 0 ? "active" : ""}" id="pills-${d.id}-tab" data-bs-toggle="pill" data-bs-target="#pills-${d.id}" type="button" role="tab" aria-controls="pills-${d.id}" aria-selected="true">${d.key}</button>`)

            const tableContainer = container.select('#pills-tabContent').selectAll('.tab-pane').data(metaData)
                .join('div').attr('class', (d, i) => i === 0 ? "tab-pane fade show active" : "tab-pane fade")
                .attr('id', d => `pills-${d.id}`).attr('role', 'tabpanel').attr('aria-labelledby', d => `pills-${d.id}-tab`)
                .append('div').attr('class', 'table-responsive table-fixed-head my-5')
                .append('table').attr('class', 'table')

            tableContainer.append('thead')
                .html(`
                    <tr>
                        ${tableKeys.map(d => `<th scope="col">${d}</th>`).join('')}
                    </tr>
                    `);

            tableContainer.selectAll('tbody').data(d => [d])
                .join('tbody').selectAll('tr').data(d => d.values)
                .join('tr')
                // .html(d => tableKeys.map(e => {
                //     const link = d[`${e}_Link`];
                //     if (link !== "" && d.hasOwnProperty(`${e}_Link`)) {
                //         return `<td><a href="${link}" target="_blank">${d[e]}</a></td>`
                //     } else {
                //         return `<td>${d[e]}</td>`
                //     }
                // }).join(''))
                .html(d => tableKeys.map(e => `<td>${d[e]}</td>`).join(''))
        })
}

function LaunchPub() {
    configNav('publications-and-talks');
    configHead('Publications & Talks');
    configFooter()

    d3.select('#publications').selectAll('.pub').data(PUBLICATIONS)
        .join('div').attr('class', 'pub col-12 mb-4 float-start')
        .attr('data-aos', "fade-up")
        .html(d => `
            <div class="col-12 col-sm-4 col-xxl-6 mb-2 float-start">
                <img class="img-fluid" src="./static/imgs/publications/${d.img}">
            </div>
            <div class="col-12 col-sm-8 col-xxl-6 d-flex flex-column px-3 float-start">
                <a href="${d.link}" class="fst-italic tx-bolder" target="_blank">${d.title}</a>
                <p class="my-0">${d.authors}</p>
                <p class="my-0">${d.publisher}</p>
            </div>

            `)
    d3.select('#talks').selectAll('.talk').data(TALKS)
        .join('div').attr('class', 'talk col-12 mb-4 float-start')
        .attr('data-aos', "fade-up")
        .html(d => `
            <div class="col-12 col-sm-4 col-xxl-6 mb-2 float-start">
                <img class="img-fluid" src="./static/imgs/publications/${d.img}">
            </div>
            <div class="col-12 col-sm-8 col-xxl-6 d-flex flex-column px-3 float-start">
                <a href="${d.link}" class="fst-italic tx-bolder" target="_blank">${d.title}</a>
                <p class="my-0">${d.authors}</p>
                <p class="my-0">${d.publisher}</p>
            </div>
            

            `)
}

function LaunchTeam() {
    configNav('team');
    configHead('COVIC Team');
    const studentsGraph = container.select('#students-graph');
    const contributorsGraph = container.select('#contributors-graph');

    draw()

    function draw() {


        const chartStudents = (!isLandscape & isSmallScreen) ? spiralLineChart_v(studentsGraph, STUDENTS).height(STUDENTS.length / 2 * 80) : spiralLineChart_h(studentsGraph, STUDENTS).height(260)
        chartStudents()

        const chartContributors = spiralLineChart_v(contributorsGraph, CONTRIBUTORS).height(CONTRIBUTORS.length / 2 * 70)
        chartContributors()
    }

    window.addEventListener("resize", () => {
        const _tempW = window.innerWidth;
        if (_tempW === w && isSmallScreen) return;

        getSizes();
        draw()

    });
}
function LaunchTutorial(){
    configNav('tutorial');
    configHead('COVIC Visualizer Tutorial');
}
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    Array.from(document.querySelectorAll('.sticky-top.top-distance')).forEach(e => {
        if (e) {

            if (e.getBoundingClientRect().top <0) {

                e.classList.add("is-pinned")
            } else {

                e.classList.remove("is-pinned")
            }
        }
    })

}
