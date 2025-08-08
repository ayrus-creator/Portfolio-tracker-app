import { Appbar } from "../components/Appbar";
import { useState,useEffect } from "react"
import  axios  from 'axios'
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartTooltip,
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css'; 


export const Endpoint = ()=>{
    const[tenure,setTenure] = useState('');
    const[data,setData] = useState([]);
    const[categories,setCategories] = useState([]);

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const tenureparam = params.get('tenure')
        
        if(tenureparam){
            setTenure(tenureparam)

            axios.get('http://localhost:3000/api/v1/user/endpoint',{
                params:{tenure:tenureparam}
            })
            .then((response)=>{
                const labels = response.data.map((item)=>item.label);
                const values = response.data.map((item)=>item.value)
                setCategories(labels);
                setData(values);
            })
        }
    },[])
    return <div>
        <Appbar></Appbar>
        <h2>{tenure} Performance chart</h2>
        <Chart >
        <ChartTitle text={`Portfolio-${tenure}`}></ChartTitle>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} title={{text:"Time"}}  />
        </ChartCategoryAxis>    
        <ChartSeries>
            <ChartSeriesItem type="line" data={data}></ChartSeriesItem>
        </ChartSeries>
        <ChartTooltip render={(props)=>(
            <div>{props.point?.value}%</div>
        )}/>
        </Chart>
        </div>
}