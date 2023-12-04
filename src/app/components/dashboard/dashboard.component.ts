import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';
import * as d3 from 'd3';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private matDialog:MatDialog,
              private dataservice: DataserviceService,
              private toastr: ToastrService) {}

  storedData:any;
  uploadDate!:Date;
  fileName:string = '';
  
  key:string = '';
  selectedType:string = '';
  chartTypes:string[] = ['LineChart','BarChart','LollipopChart'];

  fileDatas: { fileName: string, uploadDate: Date }[] = [];


  fileUpload()
  {
    this.matDialog.open(FileDialogComponent);
  }


  delete()
  {
    const confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        this.key = 'excelData-' + userId;
      }
      localStorage.removeItem(this.key);
      this.fileDatas = [];
      this.storedData = '';
     }
  }

  ngOnInit(): void {
    
    this.gettingFileFromLocal();
    
    this.dataservice.fileUploaded.subscribe(data =>
      {
        if(data === "fileUploaded") {
          this.gettingFileFromLocal();
        }
      })
    }

  gettingFileFromLocal()
  {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.key = 'excelData-' + userId;
    }
      const localData = localStorage.getItem(this.key);
      if (localData) {
        const parsedata = JSON.parse(localData);
        this.storedData = parsedata.data;

        const newFile = {
          fileName: parsedata.filename,
          uploadDate: new Date(parsedata.uploadDate)
        }
        if(this.fileDatas.length ==0)
        {
          this.fileDatas.push(newFile);
        }
        
      } else {
        console.log('No data found in localStorage');
      }
  }

  selectType()
  {
    this.clearCharts();

    if(this.selectedType == "LineChart")
    {
      this.createLineChart();
    }
    else if(this.selectedType == "LollipopChart")
    {
      this.createLollipopChart();
    }
    else if(this.selectedType == "BarChart")
    {
      this.createBarChart();
    }
  }
 
  clearCharts() {
    d3.select('#Chart').selectAll('*').remove();
  }

  createLineChart() {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 }; // Adjusted bottom margin for labels
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select('#Chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    
    // Assuming this.storedData contains your data
    const x = d3.scaleLinear().domain([1, 24]).range([0, width]); // Assuming Time ranges from 1 to 24
    const y = d3.scaleLinear().domain([18, 32]).range([height, 0]); // Adjust the domain based on your data
  
    const valueline = d3.line()
      .x((d: any) => x(d.TIME)) // Access the TIME property for x-axis
      .y((d: any) => y(d.TEMPERATURE)); // Access the TEMPERATURE property for y-axis
  
    svg.append('path')
      .datum(this.storedData)
      .attr('class', 'line')
      .attr('d', valueline)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);
  
    // Add the x-axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40) // Adjust the position of the label
      .style('text-anchor', 'middle')
      .style('fill', 'blue')
      .text('Time (Hr) --->');
  
    // Add the y-axis
    svg.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20) // Adjust the position of the label
      .attr('x', -height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('fill', 'blue')
      .text('Temperature (c) --->');
  
    svg.selectAll('dot')
      .data(this.storedData)
      .enter().append('circle')
      .attr('r', 5)
      .attr('cx', (d: any) => x(d.TIME))
      .attr('cy', (d: any) => y(d.TEMPERATURE))
      .style('fill', 'steelblue');
  }
  
  createBarChart() {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 }; // Adjust margins as needed
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select('#Chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  
    // Convert temperature values to numbers
    const temperatures = this.storedData.map((d: any) => +d.TEMPERATURE).filter((d: any) => !isNaN(d));

    const x = d3.scaleBand()
      .domain(this.storedData.map((d: any) => d.TIME)) // Assuming this.storedData has TIME values
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(temperatures) as unknown as number || 0])
      .range([height, 0]);
  
      svg.selectAll('.bar')
      .data(this.storedData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => x(d.TIME) || 0)
      .attr('width', x.bandwidth())
      .attr('y', (d: any) => y(d.TEMPERATURE))
      .attr('height', (d: any) => height - y(d.TEMPERATURE))
      .style('fill', (d: any) => {
        const temp = +d.TEMPERATURE;
        if (temp < 22) {
          return 'lightblue';
        } else if (temp > 30) {
          return 'red';
        } else {
          return 'orange';
        }
      });

      const temperatureCategories = [
        { range: [18, 22], color: 'lightblue', label: 'Cold' },
        { range: [22, 30], color: 'orange', label: 'Moderate' },
        { range: [30, 40], color: 'red', label: 'Hot' },
        ];
  
  // Adding circles with colors for legend
  const legendOffsetX = 670;
  const legendOffsetY = 0;
  const legendSpacing = 25;

  const legend = svg.selectAll('.legend')
    .data(temperatureCategories)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(${legendOffsetX},${legendOffsetY + i * legendSpacing})`);

  legend.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)
    .style('fill', (d: any) => d.color);

  legend.append('text')
    .attr('x', 10)
    .attr('y', 5)
    .text((d: any) => d.label)
    .style('fill', 'black')
    .style('font-size', '12px')
    .attr('alignment-baseline', 'middle');

 
    // Add the x-axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40) // Adjust label position as needed
      .style('text-anchor', 'middle')
      .style('fill', 'blue')
      .text('Time (Hr) --->');
  
    // Add the y-axis
    svg.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20) // Adjust label position as needed
      .attr('x', -height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('fill', 'blue')
      .text('Temperature (c) --->');      
  }  

createLollipopChart() {
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select('#Chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const x = d3.scaleBand()
    .domain(this.storedData.map((d: any) => d.TIME)) // Assuming this.storedData has TIME values
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([18, 32])
    .range([height, 0]);

  svg.selectAll('.line')
    .data(this.storedData)
    .enter().append('line')
    .attr('class', 'line')
    .attr('x1', (d: any) => x(d.TIME)! + x.bandwidth() / 2)
    .attr('x2', (d: any) => x(d.TIME)! + x.bandwidth() / 2)
    .attr('y1', (d: any) => y(d.TEMPERATURE))
    .attr('y2', height)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2);

  svg.selectAll('.dot')
    .data(this.storedData)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', (d: any) => x(d.TIME)! + x.bandwidth() / 2)
    .attr('cy', (d: any) => y(d.TEMPERATURE))
    .attr('r', 5)
    .style('fill', (d: any) => {
      const temp = +d.TEMPERATURE;
      if (temp < 22) {
        return 'lightblue';
      } else if (temp > 30) {
        return 'red';
      } else {
        return 'orange';
      }
    });
  ;

  const temperatureCategories = [
    { range: [18, 22], color: 'lightblue', label: 'Cold' },
    { range: [22, 30], color: 'orange', label: 'Moderate' },
    { range: [30, 40], color: 'red', label: 'Hot' },
    ];
    
    // Adding circles with colors for legend
    const legendOffsetX = 670;
    const legendOffsetY = 0;
    const legendSpacing = 25;
  
    const legend = svg.selectAll('.legend')
      .data(temperatureCategories)
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${legendOffsetX},${legendOffsetY + i * legendSpacing})`);
  
    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 5)
      .style('fill', (d: any) => d.color);
  
    legend.append('text')
      .attr('x', 10)
      .attr('y', 5)
      .text((d: any) => d.label)
      .style('fill', 'black')
      .style('font-size', '12px')
      .attr('alignment-baseline', 'middle');

  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
    .append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .style('text-anchor', 'middle')
    .style('fill', 'blue')
    .text('Time (Hr) --->');

  svg.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 20)
    .attr('x', -height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .style('fill', 'blue')
    .text('Temperature (c) --->');
}


}



