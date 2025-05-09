var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var fader = function (color) { return d3.interpolateRgb(color, "#fff")(0.2); },
    color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
    format = d3.format(",d");

var treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingInner(1);

//d3.json("flare.json", function (/*error*/, data) {
GetBrowserHistory(function (objs) {
    //if (error) throw error;

    //Transform the data in the required format
    var data = {}, dict = {};
    //var objs = JSON.parse('[' + s.join(',') + ']');




    for (var i = 0; i < objs.length; i++) {
        x = objs[i];
        areaobj = { url: x['url'], timeStamp: x['timeStamp'], title: x['title'], domain: x['domain'] };
        //var car = { type: "Fiat", model: "500", color: "white" };
        for (var j = 0; j < x["categories"].length; j++) {
            category = x["categories"][j];
            if (category in dict) {
                dict[category].push(areaobj);
            } else {
                dict[category] = [areaobj];
            }
        }
    }

    var data1 = [];
    for (i = 0; i < Object.keys(dict).length; i++) {
        data1 = data1.concat(
            {
                name: Object.keys(dict)[i],
                Sites: dict[Object.keys(dict)[i]]
            }
        );
    }

    data = {
        name: "root",
        children: data1
    };

    //    console.log(dict);

    var root = d3.hierarchy(data)
        .eachBefore(function (d) { d.data.id = /*(d.parent ? d.parent.data.id + "." : "") + */d.data.name; })
        .sum(sumByCount)
    //.sort(function (a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);

    var cell = svg.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform", function (d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

    d3.json("icons.json", function (error, defs) {
        svg.append("defs").selectAll("pattern")
            .data(defs.list).enter()
            .append("pattern")
            .attr("id", function (d) { return "bg_" + btoa(d.name/*"Technology & Computing"*/);})
            .attr('patternContentUnits', 'objectBoundingBox')
            .attr('preserveAspectRatio', false)
            .attr('width', 1)
            .attr('height', 1)
            .attr("x", 0)
            .attr("y", 0)
            .append("image")
            .attr("xlink:href", function (d) { return d.icon; })
            .attr("width", 1)
            .attr("height", 1)
            .attr("x", 0)
            .attr("y", 0)
            ;

        //svg.append("defs")
        //    .append("pattern")
        //    .attr("id", "bg_" + btoa("Web Search"))
        //    .attr('patternContentUnits', 'objectBoundingBox')
        //    .attr('preserveAspectRatio', false)
        //    .attr('width', 1)
        //    .attr('height', 1)
        //    .attr("x", 0)
        //    .attr("y", 0)
        //    .append("image")
        //    .attr("xlink:href", "images/search.png")
        //    .attr("width", 1)
        //    .attr("height", 1)
        //    .attr("x", 0)
        //    .attr("y", 0)
        //    ;

        cell.append("rect")
            .attr("id", function (d) { return d.data.id; })
            .attr("width", function (d) { return d.x1 - d.x0; })
            .attr("height", function (d) { return d.y1 - d.y0; })
            //.attr("fill", function(d) { return color(d.parent.data.id)})
            .attr("fill", function (d) { return "url(#bg_" + btoa(d.data.name)/*d.data.name.replace(/\s/g, '')*/ + ")" })
            .style("stroke", 'black')

            .style("stroke-width", 3)
            .on("click", function (d) {
                //console.log("rect");
                MoveToCategoryPage(d.data);
                d3.event.stopPropagation();
            })
            ;
        //.attr("xlink:href", function(d) { return "images/20.png"; });
        //var rect = cell.selectAll("rect");

        cell.append("clipPath")
            .attr("id", function (d) { return "clip-" + btoa(d.data.id); })
            .append("use")
            .attr("xlink:href", function (d) { return "#" + d.data.id; });

        cell.append("text")
            .attr("clip-path", function (d) { return "url(#clip-" + btoa(d.data.id) + ")"; })
            .attr("x", function (d) { return ((d.x1 - d.x0) / 2); })
            .attr("y", function (d) { return ((d.y1 - d.y0) / 2); })
            .attr("font-size", 20)
            .attr("text-anchor", "middle")
            .selectAll("tspan")
            .data(function (d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            //.attr("dx", function (d, i) { return (i == 0 ? -1: 0);})
            //.attr("dy", function (d, i) { return /*13 + */i * 30; })
            .text(function (d) { return d; });

        cell.append("title")
            .text(function (d) { return d.data.id; });
    });

    //d3.selectAll("input")
    //    .data([sumBySize, sumByCount], function (d) { return d ? d.name : this.value; })
    //    .on("change", changed);

    //var timeout = d3.timeout(function () {
    //    d3.select("input[value=\"sumByCount\"]")
    //        .property("checked", true)
    //        .dispatch("change");
    //}, 2000);

    //function changed(sum) {
    //    timeout.stop();

    //    treemap(root.sum(sum));

    //    cell.transition()
    //        .duration(750)
    //        .attr("transform", function (d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
    //        .select("rect")
    //        .attr("width", function (d) { return d.x1 - d.x0; })
    //        .attr("height", function (d) { return d.y1 - d.y0; });
    //}
});

function sumByCount(d) {
    //return d.children ? 0 : 1;
    return d.Sites ? d.Sites.length : 0;
}

//function sumBySize(d) {
//    return d.size;
//}