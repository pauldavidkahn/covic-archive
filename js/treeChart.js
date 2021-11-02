const treeChart = (_, data) => {

    let node = _;
    let _width = null;
    let _height = null;
    let _radial = 1 * Math.PI;
    let _startAngle = 0;

    function updateViz() {

        let [width, height] = [_width || node.node().clientWidth, _height || node.node().clientHeight];
        const [mx, my] = [10, 50];
        const size = Math.min(width, height);
        // const radius = Math.max(Math.min(size * 0.8,size - 220),300);
        // const radius = Math.min(size * 0.9,size - 220);
        const radius = Math.max(size/2, 200)
        const fontsize = 15;

        let svg = node.selectAll('.canvas').data([0])
        svg = svg.enter().append('svg').merge(svg)
            .attr('class', 'canvas')
            
        const scaleR = d3.scaleLinear().domain([1, 10])
            .range([10, 40]);

        const tree = d3.cluster()
            // const tree = d3.tree()
            .size([_radial, radius - mx])
        // .separation((a, b) => (a.parent == b.parent ? 2 : 1) / a.depth)
        const _data = data;

        const root = tree(d3.hierarchy(_data)
            // .sort((a, b) => d3.ascending(a.data.name, b.data.name))
        );
        
        let _nodes = root.descendants().map(d => {
            d.angle = d.x + Math.PI * 0.5 + _startAngle / 180 * Math.PI;
            d.degree = d.x / Math.PI * 180;
            d.r = 3;
            d.offset_x = 10;
            d.offset_y = 5;
            d.text_anchor = 'start';
            d.fontsize = fontsize;
            d.fill = '#fff';
            d.strokewidth = 2;
            d.stroke = '#000';
            if (d.degree < -90) {
                d.degree += 180
                d.offset_x = -d.offset_x
                d.text_anchor = 'end'
            } else if (d.degree > 90) {
                d.degree -= 180
                d.offset_x = -d.offset_x
                d.text_anchor = 'end'
            }
            if (d.depth === 0) {

                d.degree = 0;
                d.text_anchor = 'middle';
                d.offset_x = 0;
                d.offset_y = -30;
                d.fontsize = fontsize * 1.7;
            }

            d.text = [d.data.name].map(e => ({ offset_y: d.offset_y, offset_x: d.offset_x, name: e }));
            if (d.children) {
                d.r = scaleR(d.children.length);
                d.fill = "none";
                d.strokewidth = 0;
                d.degree = 0;
                d.text_anchor = 'middle';
                if (d.depth > 0) {
                    d.offset_x = 0;
                    d.offset_y = 0;
                    d.text = d.data.name.split(' ').map(e => ({ offset_y: d.offset_y, offset_x: d.offset_x, name: e }))
                }
            }

            return d;
        })
        const _links = root.links().map(d => {
            d.source.angle = d.source.x + Math.PI * 0.5 + _startAngle / 180 * Math.PI;
            d.target.angle = d.target.x + Math.PI * 0.5 + _startAngle / 180 * Math.PI;

            d.target.radius = d.target.y - d.target.r;
            if(d.source.parent){

                d.source.radius = d.source.y + d.source.r;
            }else{
                d.source.radius = d.source.y;
            }

            return d;
        })

        let links = svg.selectAll('.links').data([0])
        links = links.enter().append('g').attr('class', 'links').merge(links)
        const updateLinks = links.selectAll('.link').data(_links);
        updateLinks.exit().remove();
        const enterLinks = updateLinks.enter().append('path')
            .attr('class', 'link')
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1)
        updateLinks.merge(enterLinks)
            .attr("stroke-width", d => (d.source.depth < 1 || d.target.depth < 1) ? 0.5 : 1)
            .attr("d", d3.linkRadial()
                .angle(d => d.angle)
                .radius(d => d.radius));

        let nodes = svg.selectAll('.nodes').data([0])
        nodes = nodes.enter()
            .insert('g', '.links')
            .attr('class', 'nodes').merge(nodes)
        const updateNodes = nodes.selectAll('.node').data(_nodes)
        updateNodes.exit().remove();
        const enterNodes = updateNodes.enter().append('g').attr('class', 'node')
        enterNodes.append('circle').attr('class', 'dot')

        enterNodes.append('text').attr('class', 'label')

        updateNodes.merge(enterNodes)
            .attr("transform", d => `
                translate(${Math.sin(d.angle) * d.y},${-Math.cos(d.angle) * d.y})
              `)
            .select('.dot')
            .attr("fill", d => d.fill)
            .attr("stroke-width", d => d.strokewidth)
            .attr("stroke", d => d.stroke)
            .attr("r", d => d.r);
        updateNodes.merge(enterNodes)
            .select('.label')
            .attr('transform', d => `rotate(${d.degree})`)
            .attr('text-anchor', d => d.text_anchor)
            .attr('font-size', d => d.fontsize)
            .selectAll("tspan")
            .data(d => d.text)
            .join("tspan")
            .attr("x", d => d.offset_x)
            .attr("y", (d, i) => i * fontsize + d.offset_y)
            .text(d => d.name)


        

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
    updateViz.radial = function(_) {
        if (typeof _ === 'undefined') return _radial;
        _radial = _;
        return this;
    }
    updateViz.startAngle = function(_) {
        if (typeof _ === 'undefined') return _startAngle;
        _startAngle = _;
        return this;
    }



    return updateViz;
}