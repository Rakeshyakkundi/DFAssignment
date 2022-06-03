import { LightningElement,wire,api,track } from 'lwc';
import getTargetDeviation from '@salesforce/apex/AccountFinance.getTargetDeviationList';
import saveTargetAmount from '@salesforce/apex/AccountFinance.saveTargetAmount';
import HighCharts from '@salesforce/resourceUrl/HighCharts';
import {refreshApex} from '@salesforce/apex';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

const columnsDetail = [
    { label: 'Month', fieldName: 'month' },
    { label: 'Target', fieldName: 'totalAmount', type: 'currency' },
    { label: 'Pipeline', fieldName: 'pipeLineAmount', type: 'currency' },
    { label: 'Deviation', fieldName: 'Deviation', type: 'percentage' }
];

export default class AccountFinanceDetailDisplay extends LightningElement {

@api recordId;
totalTarget;
totalPipeline;
totalDeviation;
values;
@track data = [];
chartTarget = [];
chartPipeline =[];
chartMonth = [];
//for database display
//columns = columnsDetail;

@track chartTable = true;
chartTableToggle(event){
    this.chartTable =!this.chartTable;
    let chartContainer=this.template.querySelector(".chartContainer");
    chartContainer.classList.toggle("slds-hide");
}

@track checked = false;
changeToggle(event){
    this.checked = !this.checked;
    console.log(this.checked);
}

@track targetValues;
@track targetName;
@track mapData= [];
getValue(event){
    this.targetValues = event.target.value;
    this.targetName = event.target.name;
    let month = this.targetName+' '+this.recordId;
    let amount = this.targetValues;
    //mapData add values
    this.mapData.push({month:month, amount:amount});
    //console.log( month[0],':',amount);
}

//save the changed target
saveTarget(event){
    this.checked = !this.checked;
    // send data to apex
    saveTargetAmount({targetData:JSON.stringify(this.mapData)})
    .then((results) => {
        console.log('this result save taget',results);
         getTargetDeviation({ accId:this.recordId })
            .then((data) => {
                console.log('this result',data);
                this.totalTarget = data.totalTarget;
                this.totalPipeline = data.totalPipeline;
                this.totalDeviation = (Math.round(data.totalDeviation * 100) / 100).toFixed(2); 
                this.data = data.dataValues; 
                this.chartTarget = data.chartTarget;
                this.chartPipeline = data.chartPipeline;
                this.chartMonth = data.chartMonth;
                console.log('Data=',data );
                this.renderChart();    
            })
            .catch((error) => {
                console.log(error,'this error');
            });
    })
    .catch((error) => {
        console.log(error,'this error');
    });
    console.log('1','Map data :',this.mapData);
    console.log('2',typeof(this.mapData));
    //console.log('3',JSON.stringify(this.mapData));
    console.log('MapData :',this.mapData);
    this.mapData= [];
    //refreshApex(this.accountSummary);
   
   
}
changeToggleCancle(event){
    this.checked = !this.checked;
    this.mapData= [];
}

    
    /*
    @wire(getTargetDeviation,{accId:'$recordId'})
    accountSummary({data,error}){
         if (data) {
            this.totalTarget = data.totalTarget;
            this.totalPipeline = data.totalPipeline;
            this.totalDeviation = (Math.round(data.totalDeviation * 100) / 100).toFixed(2); 
            this.data = data.dataValues; 
            this.chartTarget = data.chartTarget;
            this.chartPipeline = data.chartPipeline;
            this.chartMonth = data.chartMonth;
            console.log('Data=',data );
            this.renderChart();
           
            //console.log('accountId',accUrl);

        } else if (error) {
            console.log('Error',error);
        }
    };
    */
  
    // Charts
        connectedCallback() {
            console.log('connectedCallback Hi');
               getTargetDeviation({accId:this.recordId})
                .then((data) => {
                    console.log('connectedCallback  list :',this.data);
                    this.totalTarget = data.totalTarget;
                    this.totalPipeline = data.totalPipeline;
                    this.totalDeviation = (Math.round(data.totalDeviation * 100) / 100).toFixed(2); 
                    this.data = data.dataValues; 
                    this.chartTarget = data.chartTarget;
                    this.chartPipeline = data.chartPipeline;
                    this.chartMonth = data.chartMonth;
                    console.log('Data=',data );
                    this.renderChart();
                })
                .catch((error) => {
                    console.log('Error is', this.error); 
                });
            Promise.all([
                loadScript(this, HighCharts ),

            ]).then(() => {
              
            });
        }
    renderChart(){
          let chartContainer=this.template.querySelector(".chartContainer");
                console.log(chartContainer);
                console.log('chartTarget:',this.chartTarget);
                console.log('chartPipeline:',this.chartPipeline);
                console.log('chartMonth:',this.chartMonth);
                    Highcharts.chart(chartContainer, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Monthly Target Pipeline'
                },
                xAxis: {
                   categories:  this.chartMonth,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                    text: 'Amount'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                    }
                },
                series: [{
                    name: 'Target',
                    data: this.chartTarget

                }, {
                    name: 'Pipeline',
                    data: this.chartPipeline

                }]
                });
            }

}