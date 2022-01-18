console.log("This is plots.js")


function optionChanged(id)

{
    console.log(`optionChanged(${id})`);
    
    DrawBarchart(id);
    DrawBubbleChart(id);
    showMetadata(id);

}


//function stubs for each required chart/table
function DrawBarchart(sampleId){

    console.log(`Drawbarchart(${sampleId})`);

    //define function here



}
 

function DrawBubbleChart(sampleId){

    console.log(`DrawBubblechart (${sampleId})`);
}

function showMetadata(sampleId){

    console.log(`showMetadata(${sampleId})`);
}


//this code taken from Dom's office hours session Dec 11th.
function InitDashboard()
{
    console.log("Initializing Dashboard");

    //getting a handle on the selDataset in the index.HTML 
    let selector = d3.select("#selDataset");

    d3.json("samples.json").then(data=>{

        //data is the samples  json data but first we have to pull out the data we want
        
        //take a look at verify the data is being read
        console.log(data);

        //define object of only names
        let sampleNames=data.names;

        //in the array of names, add this
        sampleNames.forEach(sampleId=>{
            selector.append("option")
                    .text(sampleId)
                    .property("value",sampleId);
        });

        //initializing dashboard with first value in array from JSONS
        let sampleId=sampleNames[0];

        console.log("this is the sample Id at init")
        console.log(sampleId)
        DrawBarchart(sampleId);
        DrawBubbleChart(sampleId);
        showMetadata(sampleId);



    }); 

}






InitDashboard(); 

