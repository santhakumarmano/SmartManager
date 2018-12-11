import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

 
  transform(items: any[], field : string): any[] {

    if (!items) return [];
    var flags = [], output = [], l = items.length, i

    for( i=0; i<l; i++) {
        //console.log("flagggg",flags[items[i][field]],items[i][field])
        if( flags[items[i][field]])  continue;       
        flags[items[i][field]] = true;
        output.push(items[i]);
        
    }
    //console.log("output0000000",output)
    for( var j=0; j<output.length; j++) {
      //console.log("outputtttttt",output[j])
        if (output[j].rate_plan == "NA"){
          output.splice(j,1);
        }
        else{
          
        }
      
  }
  //console.log("output111111111",output)
    return output
}

}
