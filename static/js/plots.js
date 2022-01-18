console.log("This is plots.js")


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

        //define object of names
        let sampleNames=data.names;

        sampleNames.forEach(sampleId=>{
            selector.append("option")
                    .text(sampleId)
                    .property("value",sampleId);

        });
    }); 

}

InitDashboard();