import {Select} from "./select/select";
import "./select/styles.css"

const select  =new Select("#select", {
    placeholder:"Choose the country",
    selectedId:'4',
    data:[
        {id:'1',value:'Tajikistan'},
        {id:'2',value:'Russian'},
        {id:'3',value:'USA'},
        {id:'4',value:'Canada'},
        {id:'5',value:'Afghanistan'},
        {id:'6',value:'China'},
        {id:'7',value:'UK'},
        {id:'8',value:'Uzbekistan'}
    ],
    onSelect(item){
        console.log("Selected item",item)
    }
})