$(document).ready(function(){
    d3.json('data.json').then(data=>{
        data.map(x=>x.USD = +x.USD)
        const width = 900;
        const height = 500;
        const margin = {top : 50 , right : 50 , bottom : 50 , left : 50};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const barWidth = innerWidth / data.length;
        const dataMax = d3.max(data.map(x=>x.USD));

        const xScale = d3.scaleBand()
                            .domain(data.map(x=>x.year))
                            .range([0 , innerWidth]);
        const yScale = d3.scaleLinear()
                            .domain([0 , dataMax])
                            .range([innerHeight , 0])

        const svg = d3.select("#chart")
                        .append("svg")
                            .attr("width" , width)
                            .attr("height" , height);
        
        svg.append("text")
            .text("Gross Domestic Product")
            .attr("transform" , "rotate(-90)")
            .attr("x" , -220)
            .attr("y" , 70);
                
        svg.append("text")
            .text("more information on : https://google.com")
            .attr("x" , width - 300)
            .attr("y" , height - 8);
        
        const group = svg.append("g")
                            .attr("transform" , `translate(${margin.left} , ${margin.top})`);
                            
        
        const rect = group.selectAll("rect")
                            .data(data)
                            .enter()
                                .append("rect")
                                    .attr("width" , barWidth - 2)
                                    .attr("x" , d=>xScale(d.year))
                                    .attr("y" , innerHeight)
                                    .attr("fill" , "#6fc5ff")
                                    .on("mouseover" , d=>{
                                        d3.select("#hover")
                                            .style("width" , "185px")
                                            .style("height" , "50px")
                                            .style("border" , "1px black solid")
                                            .style("top" , "50%")
                                            .style("left" , (d3.event.pageX + 30) + "px")
                                            .html(`Year : ${d.year} <br /> USD : ${d.USD} Billion`)
                                    })
                                    .on("mouseleave" , d=>{
                                        d3.select("#hover")
                                            .style("width" , "0")
                                            .style("height", "0")
                                            .style("left" , "0px")
                                            .style("top" , "0px")
                                            .style("border" , "none")
                                            .html("")
                                    });

        const xAxis = group.append("g")
                        .call(d3.axisBottom(xScale))
                        .attr("transform" , `translate(0 , ${innerHeight})`);

        const yAxis = group.append("g")
                            .call(d3.axisLeft(yScale));

        d3.selectAll("rect")
            .transition()
            .duration(500)
            .delay((d, i)=>i * 50)
            .attr("height" , d=>innerHeight - yScale(d.USD))
            .attr("y" , d=>yScale(d.USD))
            
  
    })
})