const spiralLineChart_h = (_, data) => {

    let node = _;
    let _width = null;
    let _height = null;

    let svg = node.selectAll('.canvas').data([0])
    svg = svg.enter().append('svg').merge(svg)
        .attr('class', 'canvas')

    function updateViz() {

        let [width, height] = [_width || node.node().clientWidth, _height || node.node().clientHeight];
        width = Math.min(width, 1000);
        const [ms, me] = [10, 180];

        const fontsize = 16;

        svg.attr('width', width)
            .attr('height', height)

        let drawData = data.map(d => {
            let t = {};
            t.name = d;
            t.id = t.name.replace(/[^a-zA-Z]/g, "");
            t.size = d.split('').length;
            t.x = width / 2;
            t.y = height / 2;
            return t;
        })

        const scaleX = d3.scalePoint().domain(drawData.map(d => d.name))
            .range([ms, width - me]);

        const scaleSpiral = d3.scaleLog().domain(d3.extent(drawData, d => d.size))
            .range([80, 210]);
        const getSpiral = (length, r, reverse) => {

            if (reverse) {
                return `M0 ${length} C-${length * 0.2} ${length * 0.6}, ${length * 0.2} ${length * 0.1} 0 0`
            } else {
                return `M0 0 C${length * 0.2} ${length * 0.4}, -${length * 0.2} ${length * 0.9} 0 ${length}`
            }
        }
        drawData = drawData.map((d, i) => {
            d.r = fontsize;
            d.x = scaleX(d.name);

            if (i % 2) {
                d.y = height / 2;
                d.spiral = getSpiral(scaleSpiral(d.size), d.r, false);
                d.rotate = -60;
            } else {

                d.y = height / 2 - 10;
                d.x = d.x + fontsize;
                d.spiral = getSpiral(scaleSpiral(d.size), d.r, false);
                d.rotate = -125;
            }

            return d;
        })


        let nodes = svg.selectAll('.nodes').data([0])
        nodes = nodes.enter().append('g').attr('class', 'nodes').merge(nodes)
        const updateNodes = nodes.selectAll('.node').data(drawData, d => d.id)
        updateNodes.exit().remove();
        const enterNodes = updateNodes.enter().append('g').attr('class', 'node')
            .attr('transform-origin', '0 0')


        enterNodes.append('path').attr('class', 'spiral')
            .attr("stroke-width", 0.8)
            .attr("stroke", "#000")
            .attr('opacity', 0.8)
            .attr('fill', 'none')
        enterNodes.append('text').attr('class', 'label')
            .append("textPath")
            .attr('startOffset', 20)
            .attr('font-size', fontsize)
        enterNodes.append("def")
            .append("path")
            
        updateNodes.merge(enterNodes)
            .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
            .select('.spiral')
            .attr("d", d => d.spiral);
        updateNodes.merge(enterNodes)
            .select('def').select('path')
            .attr("id", (d, i) => `label-line-h-${d.id}`)
            .attr('d', d => d.spiral)
        updateNodes.merge(enterNodes)
            .select('.label')
            .select('textPath')
            .attr("xlink:href", (d, i) => `#label-line-h-${d.id}`)
            .text(d => d.name)

        // const simulation = d3.forceSimulation()
        //     // .alphaTarget(0.3)
        //     // .alphaDecay(0.05)
        //     // .alphaMin(0.5)
        //     .force("charge", d3.forceCollide().radius(d => d.r))
        //     .force("x", d3.forceX(d => d.x).strength(0.02))
        //     .force("y", d3.forceY(d => d.y).strength(0.6))
        //     .nodes(drawData)
        //     .on("tick", ticked);

        // function ticked() {
        //     updateNodes.merge(enterNodes)
        //         .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        // }



    }

    updateViz.height = function(_) {
        if (typeof _ === 'undefined') return _height;
        _height = _;
        return this;
    }
    updateViz.width = function(_) {
        if (typeof _ === 'undefined') return _width;
        _width = _;
        return this;
    }




    return updateViz
}