import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
    name: 'matchDate'
})
export class MatchDate implements PipeTransform {

    transform(onlyDate: any, fullDate: any): any {
        console.log(onlyDate, ">>>>>>>>>>", fullDate)
        let decide = false;
        let halfDate = fullDate.split("-");
        let monthDate = halfDate[0];
        if (onlyDate == monthDate) {
            decide = true
        }
        return decide
    }

}