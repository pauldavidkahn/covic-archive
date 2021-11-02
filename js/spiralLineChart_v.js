const spiralLineChart_v = (_, data) => {

    let node = _;
    let _width = null;
    let _height = null;

    let svg = node.selectAll('.canvas').data([0])
        svg = svg.enter().append('svg').merge(svg)
            .attr('class', 'canvas')

    function updateViz() {

        let [width, height] = [_width || node.node().clientWidth, _height || node.node().clientHeight];
        const [mt, mb] = [130, 0];

        const fontsize = 15;
        
        svg.attr('width', width)
            .attr('height', height)
        // .call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd))

        let drawData = data.map(d => {
            let t = {};
            t.name = d;
            t.id = t.name.replace(/[^a-zA-Z]/g, "");
            t.size = d.split('').length;
            t.x = width / 2;
            t.y = height / 2;
            return t;
        })
        const nodeIds = drawData.map(d => d.name);
        const scaleY = d3.scalePoint().domain(nodeIds)
            .range([mt, height - mb]);

        const spiralRange = isSmallScreen ? [100, 210] : [100, 210];
        const scaleSpiral = d3.scaleLog().domain(d3.extent(drawData, d => d.size))
            .range(spiralRange);
        const getSpiral = (length, r, reverse) => {
            if(reverse){
                return `M0 ${length} C-${length * 0.2} ${length * 0.9}, ${length * 0.2} ${length * 0.4} 0 0`
            }else{
                return `M0 0 C${length * 0.2} ${length * 0.4}, -${length * 0.2} ${length * 0.9} 0 ${length}`
            }

        }
        const length = drawData.length;
        
        drawData = drawData.map((d,i) => {
            d.r = fontsize;
            d.y = scaleY(d.name);
            d.x = width/2;
            d.length = scaleSpiral(d.size);

            if(i % 2){
                d.startOffset = 20;
                d.textAnchor = 'start';
                d.spiral = getSpiral(d.length, d.r, false);
                d.rotate = -125;
            }else{
                d.startOffset = d.length - 20;
                d.textAnchor = 'end';
                d.spiral = getSpiral(d.length, d.r, true);
                d.rotate = 120;
                d.x = d.x;
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
            
        enterNodes.append("def")
            .append("path")

        updateNodes.merge(enterNodes)
            .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
            .select('.spiral')
            .attr("d", d => d.spiral);

        updateNodes.merge(enterNodes)
            .select('def').select('path')
            .attr("id", (d, i) => `label-line-v-${d.id}`)
            .attr('d', d => d.spiral)
        updateNodes.merge(enterNodes)
            .select('.label')
            .select('textPath')
            .attr('startOffset', d => d.startOffset)
            .attr('text-anchor', d => d.textAnchor)
            .attr("xlink:href", (d, i) => `#label-line-v-${d.id}`)
            .attr('font-size', fontsize)
            .text(d => d.name)


        // const simulation = d3.forceSimulation()
        //     // .alphaTarget(0.3)
        //     // .alphaDecay(0.05)
        //     // .alphaMin(0.5)
        //     .force("charge", d3.forceCollide().radius(d => d.r))
        //     .force("x", d3.forceX(d => d.x).strength(0.6))
        //     .force("y", d3.forceY(d => d.y).strength(0.02))
        //     .nodes(drawData)
        //     .on("tick", ticked);

        // function ticked() {
        //     updateNodes.merge(enterNodes)
        //         // .transition()
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