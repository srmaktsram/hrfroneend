
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({

  name: 'production',
  pure: false

})

export class ProductionPipe implements PipeTransform {

  transform(punch: any, arr): any {

    const prod = punch
    console.log(punch)
    arr = prod.map(({ time }) => {
      console.log("mapTime", `${time}`)

    });

    return "k"

  }

}







