// console.log("This is plots.js")


function optionChanged(id)

{
    // console.log(`optionChanged(${id})`);
    
    DrawBarchart(id);
    DrawBubbleChart(id);
    showMetadata(id);

}


//function stubs for each required chart/table
function DrawBarchart(sampleId){

    // console.log(`Drawbarchart(${sampleId})`);

   //reading in JSON data, verifying data in console
    d3.json("samples.json"). then(data=>{
        // console.log(data);

        let samples=data.samples;
        let resultsArray=samples.filter(s=>s.id===sampleId);
        let result=resultsArray[0];
        
        // console.log(result);


        let otu_ids=result.otu_ids;
        let otu_labels=result.otu_labels;
        let sample_values=result.sample_values;

        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(sample_values);

        let yTicks=otu_ids.slice(0,10).map(otuId=>`OTU ${otuId}`).reverse();

        let barData={
            x: sample_values.slice(0,10).reverse(),
            y: yTicks,
            type:"bar",
            text:otu_labels.slice(0,10).reverse(),
            orientation:"h"

        };


        let barArray=[barData];


        let barLayout={

            title:"Top 10 Bacterial Cultures Found",
            yaxis: {
                title: 'OTU Number',
            
                },
                
            xaxis: {title: 'Sequencing read numbers'},   
            margin:{t:50,l:150}

        }


        Plotly.newPlot("bar",barArray,barLayout);

    });
}
 

function DrawBubbleChart(sampleId){


    //same procedure as bar chart for pulling out data
    // console.log(`DrawBubblechart (${sampleId})`);
    d3.json("samples.json"). then(data=>{
        // console.log(data);

    let samples=data.samples;
    let resultsArray=samples.filter(s=>s.id===sampleId);
    let result=resultsArray[0];

    //no slicing needed as we want to plot all the data not just top 10
    let otu_ids=result.otu_ids;
    let otu_labels=result.otu_labels;
    let sample_values=result.sample_values;

    let BubbleData={
        x:otu_ids,
        y:sample_values,
        text:otu_labels,
        mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values,
                colorscale: "YlGnBu",
                type:'heatmap'
            },
    };

    let bubbleLayout = {
        title: "Sequencing reads per OTU per Test Subject Individual",
        margin: { t:0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID (operational taxonomic units ID)" },
        yaxis: { title: "Sequencing read numbers", range: sample_values.length},
        margin: { t:100 },
        height: 400,
        width: 1200
    }


    let bubbleArray=[BubbleData];

    Plotly.newPlot("bubble", bubbleArray,bubbleLayout);
    });
}




function showMetadata(sampleId){

    // console.log(`showMetadata(${sampleId})`);
    
    

    //pulling in sample data
    d3.json("samples.json").then(data => {

       

    

    let metaData=data.metadata;

    // console.log (metaData);


    let resultArray=metaData.filter(s=>s.id===parseInt(sampleId));
    let result= resultArray[0];

    //creating array with key value pairs
    let metaArray= Object.entries(result);
    
    // console.log('Meta array is:');
    // console.log(metaArray);

    


    //getting handle of sample-metadata id in HTML div to add values from array
    let selector = d3.select("#sample-metadata");
    selector.html("");
        metaArray.forEach(([key,value]) => {
        uppercaseKey = key.toUpperCase();
        selector.append("p")
            .text(`${uppercaseKey}:${value}`);
        });

    });
}


//this code taken from Dom's office hours session Dec 11th.
function InitDashboard()
{
    // console.log("Initializing Dashboard");

    //getting a handle on the selDataset in the index.HTML 
    let selector = d3.select("#selDataset");

    d3.json("samples.json").then(data=>{

        //data is the samples  json data but first we have to pull out the data we want
        
        //take a look at verify the data is being read
        // console.log(data);

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

        // console.log("this is the sample Id at init")
        // console.log(sampleId)
        DrawBarchart(sampleId);
        DrawBubbleChart(sampleId);
        showMetadata(sampleId);



    }); 

}






InitDashboard(); 

