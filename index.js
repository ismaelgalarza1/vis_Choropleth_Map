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



//create the map for county and US
createMap = () =>{
    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')




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
