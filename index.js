// URL for the API 
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

let countyData
let educationData

let width = 1200;
let height = 600
let padding = 60;

//create the canvas 

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

//create the map for county and US. us geopath function (https://d3js.org/d3-geo/path)
createMap = () =>{
    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')
            .attr('fill', (countyDataItems)=> {
                let id = countyDataItems['id']
                let county = educationData.find((items) =>{
                    return items['fips'] === id
                })
                let percentage = county['bachelorsOrHigher']
                if(percentage <= 15){
                    return 'red'
                }else if (percentage <= 30){
                    return 'orange'
                }else if (percentage <= 45){
                    return 'lightgreen'
                }else {
                    return 'green'
                }

            })
            .attr('data-fips', (countyDataItems)=> {
                return countyDataItems['id']
            })
            .attr('data-education',(countyDataItems) =>{
                let id = countyDataItems['id']
                 let county = educationData.find((items) =>{
                    return items['fips'] === id
                })
                let percentage = county['bachelorsOrHigher']
                return percentage
            }) 
            .on('mouseover', (countyDataItems) =>{
                tooltip.transition()
                        .style('visibility', 'visible')
                         let id = countyDataItems['id']
                 let county = educationData.find((items) => {
                    return items['fips'] === id
                })  
                tooltip.text(county['fips'] + ' | ' + county['area_name'] + ' | ' + county['state'] + ' : ' + county['bachelorsOrHigher'] + ' % ')
                tooltip.attr('data-education', county['bachelorsOrHigher'] )       
            })
            .on('mouseout', (countyDataItems) => {
                tooltip.transition()
                        .style('visibility', 'hidden')
            })




}


//call the API for education and county
d3.json(countyURL).then((data,error)=>{
    if (error){
        console.log(log)
    }else{
        countyData = topojson.feature(data, data.objects.counties).features
        console.log(countyData)
        d3.json(educationURL).then((data,error)=> {
            if(error){
                console.log(log)

            }else {
                educationData = data
                console.log(educationData)
                createMap()
            }
        })
    }
}
)
